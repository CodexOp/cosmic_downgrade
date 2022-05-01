import React from "react";
import * as Faicons from 'react-icons/fa';
import * as Ai from 'react-icons/ai'
import {CgWebsite} from 'react-icons/cg'
import {MdSell} from 'react-icons/md'


export const SliderData = [
    {
        title:'Dashboard',
        path:'/',
        icon: <Ai.AiFillDashboard/>
    },
    {
        title:'Calculator',
        path:'/calculator',
        icon: <Ai.AiFillCalculator/>
    },
    {
        title:'Swap',
        path:'/swap',
        icon: <Ai.AiOutlineSwap/>
    },
    
    {
        title:'FAQ',
        path:'/faq',
        icon: <Ai.AiFillQuestionCircle/>
    }

]

export const linkdata = [

    {
        title:'Website',
        link:'https://www.cosmikfinance.com/',
        icon: <CgWebsite/>
    },
    {
        title:'Buy Now',
        link:'',
        icon: <MdSell/>
    },
  
 ]