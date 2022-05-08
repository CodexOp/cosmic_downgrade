import React, {useState} from 'react';
import './swap.scss';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';


const Swap = () => {
  const [swap, setSwap] = useState(false)
  const [valve, setValve] = useState('COSMIC')
  const [valve2, setValve2] = useState('WRAP')
  const [disabledinput, setDisabled] = useState('readonly')

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
            <p>Your Balance : <span className='text-blue'>{`2357 TOKEN`}</span></p>
            </div>  

            <div className='inputs'>
         
            <div className='inputbox'>
            <div>
            </div>
            <div className="input1">
            <input placeholder='Enter Token Amount' type="number" />
                <div className='maxToken'>
                <p>{valve}</p>
                </div>
                </div>
                <div className='inputbox'>
                <div>
                  <BsFillArrowDownCircleFill className='swapp_arrow' onClick={() => swapping()}/>
                </div>
                <div className="input2">
                <input  placeholder={`Calculation`} readOnly/>
                <div className='maxToken'>
                <p>{valve2}</p>
                </div>
                </div>
            </div>
            </div>
            </div>


           
            <div className='all_buttons'>
                <button className='greenButton'>SWAP</button>
               
            </div>
            </div>
    </div>
    </div>
  )
}


export default Swap