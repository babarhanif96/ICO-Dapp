import { Container, Grid } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import BannerSection from "../../components/BannerSection";
import CommentSection from "../../components/Comments";
import CountdownSection from "../../components/CountdownSection";
import InfoSection from "../../components/InfoSection";
import ThePieChart from "../../components/ThePieChart";
import { useAppContext } from "../../hooks";
import Web3 from "web3";
import { icoAbi, icoAddress, tokenAbi, chainId, ActualUSDT, WBNB, USDTContract, USDCContract, BUSDContract } from "../../config";
import axios from 'axios';

export default function IcoPage() {
  const web3 = new Web3(Web3.givenProvider);

  const icoContract = new web3.eth.Contract(icoAbi, icoAddress);
  const USDTContract1 = new web3.eth.Contract(tokenAbi,USDTContract)
  const USDCContract1 = new web3.eth.Contract(tokenAbi,USDCContract)
  const BUSDContract1 = new web3.eth.Contract(tokenAbi,BUSDContract)
  const [tokenAddress, setTokenAddress] = useState();
  const [tokenName, setTokenName] = useState();
  const [tokenSymbol, setTokenSymbol] = useState();
  const [tokenDecimals, setTokenDecimals] = useState();
  const [tokenSupply, setTokenSupply] = useState();
  const [tokenPrice, setTokenPrice] = useState();
  const [tokenOffered, setTokenOffered] = useState();
  const [tokenStartTime, setTokenStartTime] = useState();
  const [tokenEndTime, setTokenEndTime] = useState();
  const [data1, setData] = useState();
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [cap, setCap] = useState();
  const [contributor, setContributor] = useState();
  const [$USDInvestment, set$USDInvestment] = useState();
  const [tokenInvestment, settokenInvestment] = useState();
  const [$USDgenerated, set$USDGenerated] = useState();
  const [address, SetAddress] = useState();
  const [connected, SetConnected] = useState();
  const [toggle, setToggle] = useState();
  const [balance, setBalance] = useState();
  const [softCap, setsoftCap] = useState();
  const [USDTPrice, setUSDTPrice] = useState();
  const [USDTBalance, setUSDTBalance] = useState();
  const [USDCBalance, setUSDCBalance] = useState();
  const [BUSDBalance, setBUSDBalance] = useState();


  useEffect( () => {
     connect();
   
    
   
    
  }, [0]);

  async function connect() {
  
  
    try {
      const accounts = await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((r) => {
          
          // console.log("accounts",address)
          abc();
  
        });
    } catch (error) {
      if (error.code === 4001) {
      }
    }
  }

  async function abc() {
    //      await Web3.givenProvider.enable();
          const addresses = await web3.eth.getAccounts();
          const addressA = addresses[0];
          console.log("address",addressA)
          SetAddress(addressA);
          const Balance = await web3.eth.getBalance(addressA)
          setBalance(Balance)
          const sCap = await icoContract.methods.softCapInDollar().call()
          setsoftCap(sCap/1000000000000000000)
          const dataAA = await icoContract.methods.getData().call((e, r) => {
      
            setTokenAddress(r.Token);
            setTokenName(r.tokenName);
            setTokenSymbol(r.tokenSymbol);
            setTokenDecimals(Number(r.tokenDecimal));
            setTokenSupply(r.tokenTotalSupply);
            setTokenPrice(r.tokenPriceInUSD);
            setTokenOffered(r.tokensOffered);
            setTokenStartTime(r.openingTime * 1000);
            setTokenEndTime(r.closingtime * 1000);
            setMin(r.minBuyInDollar/1000000000000000000 );
            setMax(r.maxBuyInDollar /1000000000000000000);
            setCap(r.hardCapInDollar /1000000000000000000);
            setContributor(r.contributors);
            set$USDGenerated(r.TokensSold /1000000000000000000);
          });
    
          USDTContract1.methods.balanceOf(addressA).call((e,r1)=>{setUSDTBalance(r1)})
          USDCContract1.methods.balanceOf(addressA).call((e,r1)=>{setUSDCBalance(r1)})
          BUSDContract1.methods.balanceOf(addressA).call((e,r1)=>{setBUSDBalance(r1)})
    
          const Data = await icoContract.methods.getArray().call((e, r) => {
            setData(r);
          });
          const $USD = 0
          // await icoContract.methods
          //   .$USDinvested(addressA)
          //   .call((e, r) => {
          //     set$USDInvestment(r / 1000000000000000000);
          //   });
          const tokenInv = await icoContract.methods
            .tokenInvested(addressA)
            .call((e, r) => {
              settokenInvestment(r);
            });
    
        const USDTPrice1 =  await icoContract.methods.getLatestPrice().call();
        setUSDTPrice(USDTPrice1)
        }
 
  if (window.ethereum?.networkVersion !== chainId) {
    try {
      window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(chainId) }],
      });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (err.code === 4902) {
        window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "BSC Testnet",
              chainId: web3.utils.toHex(chainId),
              nativeCurrency: { name: "BSCTest", decimals: 18, symbol: "T$USD" },
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
            },
          ],
        });
      }
    }
  }



  window.ethereum?.on("chainChanged", (r) => {
    var counter = 0;
    if (counter == 0) {
      setToggle(!toggle);
      counter++;
    }
  });

  const { isSmall } = useAppContext();

console.log("data",min)

  return (
    <div>
      <BannerSection
        balance={balance}
        toggle={toggle}
        address={address}
        SetAddress={SetAddress}
        connected={connected}
        setConnected={SetConnected}
        BUSDBalance={BUSDBalance}
        USDTBalance={USDTBalance}
        USDCBalance={USDCBalance}
      />
      <Container sx={{ py: 2 }}>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            {isSmall && (
              <CountdownSection
                tokenEndTime={tokenEndTime}
                tokenStartTime={tokenStartTime}
                softCap = { softCap}
                min={min}
                max={max}
                cap={cap}
                contributor={contributor}
                $USDInvestment={0}
                tokenInvestment={tokenInvestment}
                tokenSymbol={tokenSymbol}
                price={tokenPrice}
                USDTprice={USDTPrice}
                tokenDecimal={tokenDecimals}
                $USDgenerated={$USDgenerated}
                address={address}
                toggle={toggle}
                setToggle={setToggle}
              />
            )}
            <InfoSection
              tokenAddress={tokenAddress}
              tokenName={tokenName}
              tokenSymbol={tokenSymbol}
              tokenDecimals={tokenDecimals}
              tokenSupply={tokenSupply}
              tokenPrice={tokenPrice}
              tokenOffered={tokenOffered}
              tokenStartTime={tokenStartTime}
              tokenEndTime={tokenEndTime}
            />
            {isSmall && (
              <ThePieChart data1={data1} $USDgenerated={$USDgenerated} />
            )}
            <CommentSection />
          </Grid>

          <Grid item md={4} xs={12}>
            {!isSmall && (
              <CountdownSection
                softCap = { softCap}
                tokenEndTime={tokenEndTime}
                tokenStartTime={tokenStartTime}
                min={min}
                max={max}
                cap={cap}
                contributor={contributor}
                $USDInvestment={0}
                tokenInvestment={tokenInvestment}
                tokenSymbol={tokenSymbol}
                price={tokenPrice}
                USDTprice={USDTPrice}
                tokenDecimal={tokenDecimals}
                $USDgenerated={$USDgenerated}
                address={address}
                toggle={toggle}
                setToggle={setToggle}
              />
            )}

            {!isSmall && (
              <ThePieChart data1={data1} $USDgenerated={$USDgenerated} />
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}



// axios.get(`https://api.pancakeswap.info/api/v2/tokens/${WBNB}`)
//     .then(res => {

//       const persons = res.data;
//       setUSDTPrice(Number(persons.data.price));
//     })