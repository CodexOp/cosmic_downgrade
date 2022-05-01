import React, {useRef, useEffect, useState} from 'react';
import * as Aicons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SliderData, linkdata } from './SidebarData';
import './sidebar.scss';
import * as Faicons from 'react-icons/fa'
import * as Ai from 'react-icons/ai'
import { ethers, providers } from "ethers";
import logo from '../../images/logo.png';
// import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import values from "../../values.json"
import {provider, setProvider, signer, setSigner} from '../../App';




const Sidebar = () => {

    let [address, setAddress]= useState("Connect");
    let [active, setActive]= useState("active_logout");

    let [connectedWallet, setConnectedWallet] = React.useState(false);
    let [walletAddress, setWalletAddress] = React.useState("Connect");
  

    let _provider = React.useContext (provider);
    let _setProvider = React.useContext (setProvider);
    let _signer = React.useContext (signer);
    let _setSigner = React.useContext (setSigner);

    const web3ModalRef = useRef(); // return the object with key named current

    useEffect(() => {
        web3ModalRef.current = new Web3Modal({
          network: "rinkeby",
          providerOptions: {
            walletconnect: {
              // package: WalletConnectProvider, // required
              // options: {
              //   rpc: {
              //     56: values.rpcUrl
              //   } // required
              // }
              // coinbasewallet: {
              //   package: "CoinbaseWalletSDK", // Required
              //   options: {
              //     appName: "My Awesome App", // Required
              //     infuraId: "INFURA_ID", // Required
              //     rpc: "", // Optional if `infuraId` is provided; otherwise it's required
              //     chainId: 1, // Optional. It defaults to 1 if not provided
              //     darkMode: false // Optional. Use dark theme, defaults to false
              //   }
              // },
              // fortmatic: {
              //   package: Fortmatic, // required
              //   options: {
              //     key: "FORTMATIC_KEY", // required,
              //     // network: customNetworkOptions // if we don't pass it, it will default to localhost:8454
              //   }
              // },
              // torus: {
              //   package: Torus, // required
              //   options: {
              //     networkParams: {
              //       host: "https://localhost:8545", // optional
              //       chainId: 1337, // optional
              //       networkId: 1337 // optional
              //     },
              //     config: {
              //       buildEnv: "development" // optional
              //     }
              //   }
              // }
            }
          },
        });
        connectWallet();
    
      }, []);
    


      const connectWallet = async () => {
        try {
          await getSignerOrProvider(true);
        } catch (error) {
          console.log(" error Bhai", error);
        }
      };
    
      const getSignerOrProvider = async (needSigner = false) => {
        try{
          const _provider = new providers.JsonRpcProvider(values.rpcUrl);
          _setProvider(_provider);
          const provider = await web3ModalRef.current.connect();
          const web3Provider = new providers.Web3Provider(provider);
          const { chainId } = await web3Provider.getNetwork();
          console.log ("ChainId: ", chainId);
          // if (chainId !== 4) {
          //   alert("USE RINKEEBY NETWORK");
          //   throw new Error("Change network to Rinkeby");
          // }
          if (needSigner) {
            const signer = web3Provider.getSigner();
            _setSigner(signer)
            let temp = await signer.getAddress();
            setWalletAddress(temp.toString());
          }
          setConnectedWallet(true);
        } catch (error) {
          console.log (error);
          const provider = new providers.JsonRpcProvider(values.rpcUrl);
          _setProvider(provider);
        }
      };
    
    useEffect(()=>{
        if(window.innerWidth >= 1024){
            setSidebar(true)    

           
        }
    }, [])

    const [sidebar, setSidebar] = useState(false)
    const showSidebar = () => {
        setSidebar(!sidebar)
    }
  return (
      <>
      <div className='navbar_fixed'>
    <div className='navbar'>
        <div to="" className='menu-bars'>
        <div className='logo_Container'>
        <Falcons.FaBars onClick={showSidebar} color="#fff" className='bars'/>
        <img src={logo} alt='logo' className='logo'/>
        </div>
        </div>

        <div>
        <div className='login'>

            <Link to="/swap"> <button className='swap_button'>Swap</button></Link>
            <button onClick={connectWallet} className='connect_button' >{(connectedWallet)? <>{walletAddress.slice(0, 6) + "..."}</>
      :
      <>Connect</>}</button>
      <div className='logout'>
  Logout
</div>
</div>


        </div>
    </div>
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
                <Link to="#" className='menu-bars'>
                    <Aicons.AiOutlineClose color="#fff"/>
                </Link>
            </li>




            <h2 className='sidebar_title'>CORE</h2>
            <div className='section1_sidebar'>
            {SliderData.map((items, index)=>{
                return(
                    <li key={index} className="nav-text"><Link to={items.path}>
                    {items.icon}
                    <span>{items.title}</span>
                    </Link></li>
                )
            })}
            </div>




            <h2 className='sidebar_title sidebar_section2'>LINKS</h2>
            <div className='section1_sidebar'>
           

            {linkdata.map((items, index)=>{
                return(
                    <li key={index} className="nav-text"><a href={items.link}>
                    {items.icon}
                    <span>{items.title}</span>
                    </a></li>
                )
            })}
            
            </div>
            <div className='socials_select'>
            <a href="https://t.me/MMarketingDAO"><Faicons.FaTelegram className="social_icons"/></a>
            <a href="https://twitter.com/MetaMktingDAO"> <Faicons.FaTwitter className="social_icons"/></a>
            <a href="https://discord.com/invite/Y9sdpcCbnv">  <Faicons.FaDiscord className="social_icons"/> </a>
            </div>,

        </ul>
    </nav>
    </>
  )
}

export default Sidebar