import {
  Box,
  CardActionArea,
  FormHelperText,
  InputAdornment,
  Menu,
  MenuItem,
  Stack,
  Typography
} from "@mui/material";

import React, { Children, useState } from "react";
import { useEffect } from "react";
import Web3 from "web3";
import { DropdownArrowIcon } from "../../../assets/Icons";
import colors from "../../../colors";
import { BUSDContract, icoAbi, icoAddress, tokenAbi, USDCContract, USDTContract } from "../../../config.js";
import { COIN_OPTIONS } from "../../../constants";
import { StyledTextField, StyledYellowButton } from "./styled";


export default function InputBox({
  MAX,
  price,
  tokenSymbol,
  min,
  toggle,
  setToggle,
  USDTprice,
 // address
}) {
  const web3 = new Web3(Web3.givenProvider)
  const [val, setVal] = useState();
  const [val1, setVal1] = useState("BUSD");
  const [open, setOpen] = useState(false);
  const [allowance, setAllowance] = useState(0);
  const [address, setAddress] = useState();


  useEffect(()=>{
    const abc = async ()=>{
      let accounts = await web3.eth.getAccounts()
      setAddress(accounts[0])
      let conAddress; 
      conAddress = val1 == "USDC" ? USDCContract : 
                val1 == "USDT" ? USDTContract : BUSDContract

      const contract = new web3.eth.Contract(tokenAbi,conAddress)
      const Allowance  = await contract.methods.allowance(accounts[0],icoAddress).call()
      
      setAllowance(Allowance)
    }
    abc()
  },[toggle,address])

  const handleClose = () => {
    setOpen(null);
  };

  const handleSubmit = async ()=>{
    if(val1==="BNB"){
      BuyToken()
      console.log("condition 1")
    }else{
      if(allowance>=val*1000000000000000000){
        BuyTokenwithTokens()
        console.log("condition 2")
      }else{
        console.log("condition 3",val1)
        let USDAddress; 
        USDAddress = val1 === "USDC" ? USDCContract : 
                  val1 === "USDT" ? USDTContract : BUSDContract
        console.log("contract",USDAddress)
        console.log("contract",val1 === "USDT")
        const contract = new web3.eth.Contract(tokenAbi,USDAddress)
        contract.methods.approve(icoAddress,web3.utils.toWei(val.toString(),"ether")).send({from:address})
        .on("confirmation",(e,r)=>{ setToggle(!toggle);})
      }

    }

  }

  async function BuyToken() {
    setVal("");
    const web3 = new Web3(Web3.givenProvider);
    const icoContract = new web3.eth.Contract(icoAbi, icoAddress);
    const addresses = await web3.eth.getAccounts();
    const address = addresses[0];



    if (address != undefined) {
      if ((val*1000000000000000000/ price* USDTprice) > MAX*100000000000000000) {
        window.alert("Cannot exceed maximum amount");
      } else if ((val*1000000000000000000/price * USDTprice) < min) {
        window.alert("below minimum amount is not acceptable");
      } else {
        try {
          icoContract.methods
            .buyTokens()
            .send({
              from: address,
              value: web3.utils.toWei(val.toString(), "ether"),
            })
            ?.on("confirmation", (e, r) => {
              setToggle(!toggle);
            });
        } catch (error) {
          console.log("Error", error);
        }
      }
    } else {
      window.alert("please connect wallet first");
    }
  }


  async function BuyTokenwithTokens() {
    setVal("");
    const web3 = new Web3(Web3.givenProvider);
    const icoContract = new web3.eth.Contract(icoAbi, icoAddress);
    const addresses = await web3.eth.getAccounts();
    const address = addresses[0];

    let USDcontract; 
    USDcontract = val1 == "USDC" ? USDCContract : 
              val1 == "USDT" ? USDTContract : BUSDContract

    if (address != undefined) {
      if ((val *1000000000000000000/ price  ) > MAX) {
        window.alert("Cannot exceed maximum amount");
      } else if ((val *1000000000000000000/ price) < min) {
        window.alert("below minimum amount is not acceptable");
      } else {
        try {
          icoContract.methods
            .buyTokensUSD(USDcontract,web3.utils.toWei(val.toString(),"ether"))
            .send({
              from: address
            })
            ?.on("confirmation", (e, r) => {
              setToggle(!toggle);
            });
        } catch (error) {
          console.log("Error", error);
        }
      }
    } else {
      window.alert("please connect wallet first");
    }
  }

  

const selectedCoin = COIN_OPTIONS.filter((item) => item.value === val1)?.[0];




return (
    <Box px={2}>
      <Typography variant="caption" fontWeight={"normal"}>
        Amount (Max: {MAX} {tokenSymbol})
      </Typography>

      <Stack direction={"row"} spacing={1}>
        <StyledTextField
          variant="outlined"
          size="small"
          type="text"
          value={val}
          onChange={(event) => {
            setVal(event.target.value);
          }}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: `${
                val ? colors.yellow.v3 : colors.white.v4
              }!important`,
              borderWidth: 1.5,
            },
          }}
          placeholder="0.0"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Stack direction="row" spacing={1.3} alignItems="center">
                  <Typography
                    fontWeight={"bolder"}
                    component={CardActionArea}
                    pb={0.5}
                    color={colors.yellow.v2}
                    variant={"h6"}
                    onClick={() => setVal(MAX)}
                  >
                    max
                  </Typography>

                  <Stack
                    direction={"row"}
                    spacing="1"
                    alignItems={"center"}
                    fontWeight={"bolder"}
                    height={"100%"}
                    component={CardActionArea}
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) => setOpen(e.currentTarget)}
                    border={"1.5px solid"}
                    bgcolor={colors.white.v5}
                    borderColor={colors.white.v4}
                    borderRadius={1}
                    py={0.2}
                    px={0.6}
                  >
                    {selectedCoin?.icon &&
                      React.createElement(selectedCoin?.icon, {
                        height: 18,
                        width: 18,
                      })}
                    &nbsp;&nbsp;{selectedCoin?.label}
                    &nbsp;
                    <DropdownArrowIcon
                      style={{ marginTop: 1 }}
                      height={18}
                      width={18}
                    />
                  </Stack>

                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={open}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    MenuListProps={{
                      disablePadding: true,
                    }}
                  >
                    {Children.toArray(
                      COIN_OPTIONS.map(({ icon, label, value }) => {
                        return (
                          <MenuItem
                            onClick={() => {
                              handleClose();
                              setVal1(value);
                            }}
                            disableRipple
                            sx={{
                              px: 1.8,
                              py: 0.5,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {React.createElement(icon, {
                              height: 18,
                              width: 18,
                            })}
                            &nbsp;&nbsp;
                            <Typography fontSize=".8rem" fontWeight={500}>
                              {label}
                            </Typography>
                          </MenuItem>
                        );
                      })
                    )}
                  </Menu>
               </Stack>
              </InputAdornment>
            ),
          }}
        />
        <StyledYellowButton
          onClick={() => {
            handleSubmit();
          }}
          disableElevation
          variant="contained"
          size="small"
        >
          {val1 === "BNB"? "BUY" : val && allowance<val*1000000000000000000? <span style={{fontSize:"11px", fontWeight:"bold"}}>APPROVE</span> : "BUY"}
        </StyledYellowButton>
      </Stack>
      <FormHelperText sx={{ fontWeight: 500, color: colors.blue.v1 }}>
        You'll receive: {val1 === "BNB" ? (val*1000000000000000000 / price * USDTprice ).toFixed(2) : (val*1000000000000000000 / price ).toFixed(2)  }{" "}
        {tokenSymbol}
      </FormHelperText>
    </Box>
  );
}
