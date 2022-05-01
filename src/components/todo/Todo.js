import React from 'react';
import './todo.scss';
import {BiTask} from 'react-icons/bi'

const Todo = () => {

  let list = [
    {name: "CoinSniper", url: "https://coinsniper.net/coin/28955"},
    {name: "Coinscope", url: "https://www.coinscope.co/coin/2-earn"},
    {name: "Coindiscovery", url: "https://coindiscovery.app/coin/safeearn921/overview"},
    {name: "Coinhunt", url: "https://coinhunt.cc/coin/458842032"},
    {name: "Coinhunters", url: "https://coinhunters.cc/tokens/SafeEarnEARN"},
    {name: "Coinboom", url: "https://coinboom.net/coin/safeearn-1203"},
    {name: "Coinvote", url: "https://coinvote.cc/coin/SafeEarn"},
    {name: "Coinmooner", url: "https://coinmooner.com/"},
    {name: "Coinscope", url: "https://www.coinscope.co/coin/2-earn"},
    {name: "Gemhunter", url: "https://gemhunters.net/coin/safeearn/"},
    {name: "Rugfreecoins", url: "https://www.rugfreecoins.com"},
    {name: "Freshcoins", url: "https://www.freshcoins.io/coins/safeearn-b3451219-3a7531d4"},
    {name: "Coinxhigh", url: "https://coinxhigh.com/todays-best-cryptocurrencies/safeearn"},
    {name: "Mycoinvote", url: "https://www.mycoinvote.com/SafeEarn"},
    {name: "Gemfinder", url: "https://gemfinder.cc/gem/8383"},
    {name: "Coingods", url: "https://coinsgods.com/coin/4596"},
    {name: "Coinmooneer", url: "https://coinmooner.com/"},
  ]

  function ListItem (props) {
    return <div>
      <a href={props.url} target="_blank">
    <div className="block1 wallet_block contract_address todo_list">

        <div className="inner_block1  todo_block walletaddress_box todo_block">
          <div className='dashboard-card flex_card todo_card'>
            
            <div className="card_value address_box">
             <h2>{props.name}</h2>
            </div>
            <div className='card_titleaddress_title todo_title'>
            <h2><BiTask className='todo_icon' /></h2>
            </div>
          </div>
    
        </div> 
      
    </div>
    </a>
    </div>
  }

  return (
    <div className='dash'>

<div className="swap">Upvote List</div>

    {list.map((item)=>{
      return <ListItem name= {item.name} url ={item.url} /> 
    })}
      
        </div>
          )
}

export default Todo