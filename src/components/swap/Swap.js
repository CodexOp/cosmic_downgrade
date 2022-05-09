import React, {useState} from 'react';
import './swap.scss';
import tokenAbi from '../../abi/token.json'
import swapAbi from '../../abi/swap.json'
import values from "../../values.json"
import {ethers,  providers } from "ethers";
import {provider, setProvider, signer, setSigner} from '../../App';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import { parseEther } from 'ethers/lib/utils';


const Swap = () => {
  const [swap, setSwap] = useState(false)
  const [valve, setValve] = useState('COSMIK')
  const [valve2, setValve2] = useState('WRAP')
  const [disabledinput, setDisabled] = useState('readonly')
  let [totalSupply, setTotalSupply] = React.useState(0);
  let [balance, setBalance] = React.useState(0);
  let [amount, setAmount] = React.useState(0);
  let [output, setOutput] = React.useState(0);

  let _provider = React.useContext (provider);
  let _setProvider = React.useContext (setProvider);
  let _signer = React.useContext (signer);
  let _setSigner = React.useContext (setSigner);

  React.useEffect(() => {

    async function fetchData(){
      getTotalSupply();
      let _token;
      if (!swap) _token = values.token;
      else _token = values.wrapped;
      let _balance = await _getBalance(_token);
      setBalance(_balance);
    }
    fetchData();

  }, [_provider, _signer, swap]);

  React.useEffect(() => {
    if (swap) getCosmikRefundValue();
    else getWrappedRefundValue();
  }, [swap, amount] )

  async function getTotalSupply (){
    try{
      let rpcUrl = values.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let token = new ethers.Contract(
        values.token,
        tokenAbi,
        provider_
      );
      let supply = await token.totalSupply();
      console.log("Supply", supply.toString());
      let decimals = await token.decimals();
      decimals = parseInt(decimals.toString());
      supply = ethers.utils.formatUnits(supply, decimals);
      setTotalSupply(parseInt(supply));
    } catch (err) {
      console.log(err);
    }
  }

  async function getCosmik () {
    try{
      let swap = new ethers.Contract(
        values.swap,
        swapAbi,
        _signer
      );
      let tx = await swap.getCosmik(ethers.utils.parseUnits(amount.toString(), '18'));
    }catch(err){
      console.log(err);
    }
  }

  async function getWrapped () {
    try{
      let swap = new ethers.Contract(
        values.swap,
        swapAbi,
        _signer
      );
      let tx = await swap.getWrapped(ethers.utils.parseUnits(amount.toString(), '5'));
    }catch(err){
      console.log(err);
    }
  }

  async function getCosmikRefundValue () {
    try{
      let rpcUrl = values.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let swap = new ethers.Contract(
        values.swap,
        swapAbi,
        provider_
      );
      let _amount = await swap.cosmikRefundValue(ethers.utils.parseUnits(amount.toString(), '18'));
      setOutput(ethers.utils.formatUnits(_amount.toString(), '5'));
      console.log("Output: ", ethers.utils.formatUnits(_amount.toString(), '5'));
    }catch(err){
      console.log(err);
    }
  }

  async function getWrappedRefundValue () {
    try{
      let rpcUrl = values.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let swap = new ethers.Contract(
        values.swap,
        swapAbi,
        provider_
      );
      let _amount = await swap.wrappedRefundValue(ethers.utils.parseUnits(amount.toString(), '5'));
      setOutput(ethers.utils.formatUnits(_amount.toString(), '18'));
    }catch(err){
      console.log(err);
    }
  }

  async function approve () {
    try{
      let _tokenAddress;
      if (swap) _tokenAddress = values.wrapped;
      else _tokenAddress = values.token;
      let token = new ethers.Contract(
        _tokenAddress,
        tokenAbi,
        _signer
      );
      let tx = await token.approve( values.swap, ethers.utils.parseUnits(amount.toString(), '25'));
      await tx.wait();
      console.log("TX", tx);
      if (!swap) getWrapped();
      else getCosmik()
    }catch(err){
      console.log(err);
    }
  } 

  async function _getBalance (tokenAddress, accountAddress){
    try {
      let rpcUrl = values.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let token = new ethers.Contract(
        tokenAddress,
        tokenAbi,
        provider_
      );
      if (!accountAddress){
        accountAddress = await _signer.getAddress();
      }
      let balance = await token.balanceOf (accountAddress);
      let decimals = await token.decimals();
      decimals = parseInt(decimals.toString());
      balance = ethers.utils.formatUnits(balance, decimals);
      console.log ("balance", balance.toString());
      return parseFloat(balance.toString()).toFixed(2);
    } catch (err){
      console.log (err, tokenAddress);
      return 0;
    }
  }

  const swapping = () => {
    setSwap(!swap)

    if(swap === false){
      setValve('WRAP')
      setValve2('COSMIC')
    }

    else{
      setValve('COSMIC')
      setValve2('WRAP')
    }
  }
  return (
    <div className='dash'>
    <div className='landing'>
        <div className='stak_box'>  
            <div className='stak_heading'>
                <h2>SWAP YOUR TOKEN</h2>
            </div>
        
            {/* <Timer /> */}
            <div className='stak_info'>
            <p>Your Balance : <span className='text-blue'>{balance} {(swap)? `W-COSMIK`: `COSMIK`} </span></p>
            </div>  

            <div className='inputs'>
         
            <div className='inputbox'>
            <div>
            </div>
            <div className="input1">
            <input placeholder='Enter Token Amount' type="number" onChange = {(event)=> {setAmount(event.target.value)}} value= {amount} />
                <div className='maxToken'>
                <p>{valve}</p>
                </div>
                </div>
                <div className='inputbox'>
                <div>
                  <BsFillArrowDownCircleFill className='swapp_arrow' onClick={() => swapping()}/>
                </div>
                <div className="input2">
                <input  placeholder={`Calculation`} value= {output} readOnly/>
                <div className='maxToken'>
                <p>{valve2}</p>
                </div>
                </div>
            </div>
            </div>
            </div>


           
            <div className='all_buttons'>
                <button className='greenButton' onClick={approve} >SWAP</button>
               
            </div>
            </div>
    </div>
    </div>
  )
}


export default Swap