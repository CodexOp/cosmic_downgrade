import {useState, createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dash from './components/dashboard/Dash';
import Calculator from './components/calculator/Calculator';
import Todo from './components/todo/Todo';
import Swap from './components/swap/Swap';
import Faq from './components/faq/Faq';

let provider = createContext();
let setProvider = createContext();
let signer = createContext();
let setSigner = createContext();
let walletAddress = createContext();
let setWalletAddress = createContext();

function App() {
  let [_provider, _setProvider] = useState("Hi provider");
  let [_signer, _setSigner] = useState("Hellow signer");
  let [_walletAddress, _setWalletAddress] = useState("");

  return (
    <>
    <provider.Provider value ={_provider}>
    <setProvider.Provider value ={_setProvider}>
    <signer.Provider value ={_signer}>
    <setSigner.Provider value ={_setSigner}>
    <Router>
      <Sidebar />
      <Routes>
        <Route  path='/'  exact element={<Dash/>}/>
        <Route path='/calculator' element={<Calculator/>} />
        <Route path='/upvote' element={<Todo />} />
        <Route path='/swap' element={<Swap />} />
        <Route path='/faq' element={<Faq/>} />
      </Routes>
    </Router>
    </setSigner.Provider>
    </signer.Provider>
    </setProvider.Provider>
    </provider.Provider>
    </>
  );
}

export default App;
export {provider, setProvider, signer, setSigner, walletAddress, setWalletAddress};