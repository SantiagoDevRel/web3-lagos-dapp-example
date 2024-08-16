import logo from "./logo.svg";
import "./App.css";
import { Web3 } from "web3";
import { ChainlinkPlugin, MainnetPriceFeeds } from "@chainsafe/web3-plugin-chainlink";
import { useState } from "react";

function App() {
  const [btcPrice, setBtcPrice] = useState("0");
  const [ethPrice, setEthPrice] = useState("0");

  // Initialize web3 and register plugin
  const web3 = new Web3(window.ethereum);
  web3.registerPlugin(new ChainlinkPlugin());

  async function getBtcPrice() {
    const result = await web3.chainlink.getPrice(MainnetPriceFeeds.BtcUsd);
    const formattedResult = result.answer.toString().substring(0, 5);
    setBtcPrice(formattedResult);
  }

  async function getEthPrice() {
    const result = await web3.chainlink.getPrice(MainnetPriceFeeds.EthUsd);
    const formattedResult = result.answer.toString().substring(0, 4);
    setEthPrice(formattedResult);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={getBtcPrice}>Get BTC Price</button>
        <p>{btcPrice}$</p>
        <button onClick={getEthPrice}>Get ETH Price</button>
        <p>{ethPrice}$</p>
      </header>
    </div>
  );
}

export default App;
