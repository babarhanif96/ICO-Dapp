import { CircularProgress, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Fragment } from "react";
import colors from "../../colors";
import { useAppContext } from "../../hooks";
import { StyledPaper } from "../../styled";
import Loader from "../Loader";
import Countdown from "./Countdown";
import InfoTable from "./InfoTable";
import InputBox from "./InputBox";
import YelloSlider from "./YellowSlider/index";

const CountDownTimer = ({
  tokenEndTime,
  min,
  max,
  cap,
  contributor,
  $USDInvestment,
  tokenInvestment,
  tokenSymbol,
  price,
  address,
  tokenDecimal,
  $USDgenerated,
  toggle,
  setToggle,
  softCap,
  tokenStartTime,
  USDTprice
}) => {
  const { isSmall } = useAppContext();
  var newDate = new Date().getTime()



  return (
    <StyledPaper sx={{ mb: isSmall && 2 }}>
      {$USDInvestment===undefined && <Loader />}

      <Fragment>
        <Stack
          sx={{
            bgcolor: colors.yellow.v1,
            p: 1,
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
          }}
          alignItems="center"
          justifyContent="center"
          direction={"row"}
          spacing={1}
        >
          <Typography variant="subtitle1" align="center" fontWeight={"500"}>
          Stage 1 
          </Typography>
          <Typography
            variant="subtitle2"
            align="center"
            color={colors.white.v1}
            bgcolor={colors.yellow.v3}
            py={0.5}
            px={1}
            borderRadius={1}
          >
            {tokenStartTime>newDate? "Starts In": "Live"}
          </Typography>
        </Stack>
        {tokenEndTime && <Countdown tokenStartTime={tokenStartTime} tokenEndTime={tokenEndTime} />}
        
          <YelloSlider MAX={cap} $USDgenerated={$USDgenerated} tokenSymbol={tokenSymbol} />
        

        <InputBox
          MAX={max}
          price={price}
          USDTprice={USDTprice}
          tokenSymbol={tokenSymbol}
          min={min}
          address={address}
          toggle={toggle}
          setToggle={setToggle}
        />
        <InfoTable
          softCap={softCap}
          min={min}
          max={max}
          cap={cap}
          price={price}
          USDTprice={USDTprice}
          contributor={contributor}
          $USDInvestment={$USDInvestment}
          tokenInvestment={tokenInvestment}
          tokenSymbol={tokenSymbol}
          tokenDecimal={tokenDecimal}
        />
      </Fragment>
    </StyledPaper>
  );
};

export default CountDownTimer;
