import React, {useRef} from 'react'
import './dash.scss';
import * as Ai from 'react-icons/ai'
import {FaWallet} from 'react-icons/fa'
import {ethers,  providers } from "ethers";
import routerAbi from '../../abi/router.json'
import addresses from '../../abi/addresses.json'
import tokenAbi from '../../abi/token.json'
import chart from '../../images/Group.png'
import ring from '../../images/ring.png'
import {provider, setProvider, signer, setSigner} from '../../App';
import values from "../../values.json"
import {Link} from 'react-router-dom'


const Dash = () => {
  let [price, setPrice] = React.useState(0);
  let [balance, setBalance] = React.useState(0);
  let [burn, setBurn] = React.useState(0);
  let [totalSupply, setTotalSupply] = React.useState(0);
  let [taxBracket, setTaxBracket] = React.useState(0);
  let [rebaseTime, setRebaseTime] = React.useState(0);
  let [apy, setAPY] = React.useState(0);
  let [currencyExchange, setCurrencyExchange] = React.useState(0);

  let [connectedWallet, setConnectedWallet] = React.useState(false);
  let [walletAddress, setWalletAddress] = React.useState("");

  let _provider = React.useContext (provider);
  let _setProvider = React.useContext (setProvider);
  let _signer = React.useContext (signer);
  let _setSigner = React.useContext (setSigner);


  React.useEffect(() => {
    var configuration = {
      from: 'ETH',
      to: 'RBC',
      fromChain: 'ETH',
      toChain: 'ETH',
      amount: 1,
      iframe: 'flex',
      hideSelectionFrom: false,
      hideSelectionTo: true,
      theme: 'dark',
      background: '#28372e',
      injectTokens: {
          eth: ['0xd123575d94a7ad9bff3ad037ae9d4d52f41a7518'],
          bsc: ['0x7509DB061C45e8EcEb01739D104f78F85eF22Dbf']
      },
      slippagePercent: {
          instantTrades: 2,
          crossChain: 5
      },
      promoCode: 'srTqRKUz',
      fee: 0.075,
      feeTarget: '0x6e5f633dAD05540403feFbfbd4F45860b081FF68'
    }

    // prevent accidental changes to the object, for example, when re-creating a widget for another theme
    Object.freeze(configuration);

    // create widget
    window.rubicWidget.init(configuration);
    getRebaseTime();


  }, []);


  React.useEffect(() => {

    async function fetchData(){
      getPrice();
      getTotalSupply();
      getCurrentTaxBracket();
      let _balance = await _getBalance(values.token);
      let _burn = await _getBalance(values.dead);
      setBalance(_balance);
      setBurn(_burn);
    }
    fetchData();

  }, [_provider, _signer]);


    const onclickhandlers = (e) => { 
      console.log(e.target.value);
      if(e.target.value == 'USDT'){
      setCurrencyExchange(price)
      }

      else if(e.target.value == 'YEN'){
        setCurrencyExchange(price* 130.36)
      }

      else if(e.target.value == 'YUAN'){
        setCurrencyExchange(price* 6.61)
      }

      else if (e.target.value == 'INR'){
        setCurrencyExchange(price* 76.47)
      }
    }


  async function getPrice(){
    try{
      let rpcUrl = values.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let router = new ethers.Contract(
        values.router,
        routerAbi,
        provider_
      );
      const tokenIn = values.token;
      const tokenOut = values.wbnb;
      
      const amountIn = ethers.utils.parseUnits("1", 5);
      let amounts = await router.getAmountsOut(amountIn, [tokenIn, tokenOut]);
      let busd = values.busd;
      let amounts2 = await router.getAmountsOut(amounts[1], [tokenOut, busd]);
      console.log(`
          tokenIn: ${ethers.utils.formatEther(amountIn.toString())} ${tokenIn} (safeearn)
          tokenOut: ${ethers.utils.formatEther(amounts2[1].toString())} ${busd} (BUSD)
        `);
      setPrice(parseFloat(ethers.utils.formatEther(amounts2[1].toString())).toFixed(8));
      setCurrencyExchange(parseFloat(ethers.utils.formatEther(amounts2[1].toString())).toFixed(8));
    } catch (err) {
      console.log (err);
    }
  }

  async function _getBalance (address){
    try {
      let rpcUrl = values.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let token = new ethers.Contract(
        address,
        tokenAbi,
        provider_
      );
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner();
      const walletAddress = await signer.getAddress();
      let balance = await token.balanceOf (walletAddress);
      let decimals = await token.decimals();
      decimals = parseInt(decimals.toString());
      balance = ethers.utils.formatUnits(balance, decimals);
      console.log ("balance", balance.toString());
      return parseFloat(balance.toString()).toFixed(2);
    } catch (err){
      console.log (err, address);
      return 0;
    }
  }

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
      let time = await token._initRebaseStartTime();
      let timestamp = new Date().getTime();
      timestamp = (timestamp/1000).toFixed(0);
      console.log("Time", time.toString(), timestamp);
      time = parseInt((timestamp- parseInt(time.toString()))/600);
      let _power = parseInt((6*24*365)/time);
      let _apy = Math.pow(((supply - 325000)/325000), _power) * 100;
      setAPY(_apy);
    } catch (err) {
      console.log(err);
    }
  }

  async function getCurrentTaxBracket () {
    try{
      let rpcUrl = values.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let token = new ethers.Contract(
        values.token,
        tokenAbi,
        provider_
      );

      let _taxBracket = await token.getCurrentTaxBracket();
      setTaxBracket(parseInt(_taxBracket.toString())/10);

    } catch (err) {
      console.log(err);
    }
  }

  async function getRebaseTime (){
    try {
      let rpcUrl = values.rpcUrl;
      let provider_ = new ethers.providers.JsonRpcProvider(rpcUrl);
      let token = new ethers.Contract(
        values.token,
        tokenAbi,
        provider_
      );
      let time = await token._lastRebasedTime();
      let timestamp = new Date().getTime();
      timestamp = (timestamp/1000).toFixed(0);
      console.log("Time", time.toString(), timestamp);
      time = timestamp- parseInt(time.toString());
      time = (10*60) - time;
      if (time<0) time = 600- timestamp%600;
      setRebaseTime(time);
      
      let updateTime = setInterval(() => {
        setRebaseTime((value) => {
          if (value <=0)return 600;
          return value -1;
        });
      }, 1000);
    } catch (error) {
      console.log ("Rebase Error:", error);
    }
  }

  return (
    <div className='dash'>


<div className='container'>


  
<div className="block1 blockmid chartblock">
        <div className="inner_block1 chart" >
          <div className='dashboard-card'>
            <div className='card_title'>
            <img className='chart_image' src={chart} alt='chart'/>
            </div>
          </div>
        </div>
        <div className="inner_block1 rebase">
        <div className='dashboard-card rebase_heading'>
            <div className='card_title'>
           <img src={ring} className='ring' alt='ring'/>
           <div className='card_title'>
            <h2>Rebase Timer</h2>
            </div>
            <div className="card_value">
             <h2>{parseInt(rebaseTime/60)}:{rebaseTime%60}</h2>
            </div>
          </div>
          </div>
        </div>
  
   
   
      </div>
      </div>


      <div className='container'>
      <div className="block1">
        <div className="inner_block1">
          <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Your Holdings</h2>
            </div>
            <div className="card_value">
             <h2>{balance.toLocaleString()} COSMIK</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Total Value</h2>
            </div>
            <div className="card_value">
             <h2>${(price * balance).toFixed(2).toLocaleString()}</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Current Price</h2>
            </div>
            <div className="card_value">
             <h2>${parseFloat(price).toFixed(4).toLocaleString()}</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Current APY</h2>
            </div>
            <div className="card_value">
             <h2>{apy.toLocaleString()}%</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Total Marketcap</h2>
            </div>
            <div className="card_value">
            <h2>${parseInt(price * totalSupply).toLocaleString()}</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Total Supply</h2>
            </div>
            <div className="card_value">
             <h2>{totalSupply.toLocaleString()}</h2>
            </div>
          </div>
        </div>
      </div>



      <div className="block1 blockmid">
        <div className="inner_block1">
          <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Currency Exchange</h2>
            </div>
            <div className="card_value">
            <h2>{parseFloat(currencyExchange).toFixed(3).toLocaleString()}</h2>
            <select name="exchange" id="exchange" onChange={(e)=>onclickhandlers(e)}>
            <option value="USDT" >USDT</option>
            <option value="YEN">YEN</option>
            <option value="YUAN">YUAN</option>
            <option value="INR">INR</option>
            </select>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Total Token Burn</h2>
            </div>
            <div className="card_value">
             <h2>${burn.toLocaleString()}</h2>
            </div>
          </div>
        </div>
        <div className="inner_block1">
        <div className='dashboard-card'>
            <div className='card_title'>
            <h2>Total Burn</h2>
            </div>
            <div className="card_value">
             <h2>${parseFloat(burn * price).toFixed(2).toLocaleString()}</h2>
            </div>
          </div>
        </div>
   
   
      </div>






{/* second block started */}



      <div className="block2">
      <div className='inner_block2 claim_block'>
      <div className='dashboard-card dash_last'>
            <div className='card_title'>
            <h2>Buy Tax</h2>
            </div>
            <div className="card_value">
             <h2>{14}%</h2>
            </div>
          </div>
      <div className='dashboard-card dash_last'>
            <div className='card_title'>
            <h2>Sell Tax</h2>
            </div>
            <div className="card_value">
             <h2>{16}%</h2>
            </div>
          </div>
      <div className='dashboard-card dash_last'>
            <div className='card_title'>
            <h2>Your Current Extra Tax</h2>
            </div>
            <div className="card_value">
             <h2>{taxBracket}</h2>
            </div>
            <Link to='/calculator'><button className='claim_button'>Calculator</button></Link>
          </div>
      </div>

      </div>

      {/* third block started */}


    </div>
    <div id="rubic-widget-root"></div>

  
    </div>
  )
}

export default Dash;