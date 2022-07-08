import { Box, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import React  , { useEffect}from "react";
import colors from "../../colors";
import { icoAddress } from "../../config";
import { useAppContext } from "../../hooks";
import { StyledPaper } from "../../styled";
import Copy from "../Copy";
import Loader from "../Loader";




export default function InfoSection({
  tokenAddress,
  tokenName,
  tokenSymbol,
  tokenDecimals,
  tokenSupply,
  tokenPrice,
  tokenOffered,
  tokenStartTime,
  tokenEndTime,
}) {


 

 
  


  const { isSmall } = useAppContext();

  const FullMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];


  return (
    <div>
      <StyledPaper sx={{ p: 1, px: 2 }}>
    
      {!tokenAddress && <Loader />}
        {React.Children.toArray(
          [
            {
              left: "Pre-Sale Contract Address",
              right: `${icoAddress}`,
              copy: true,
            },
            {
              left: "Token Contract Address",
              right: `${tokenAddress}`,
              helper: "(Do not send $USD to the token contract address)",
              copy: true,
              color: colors.yellow.v3,
            },
            {
              left: "Token Name",
              right: `${tokenName}`,
              copy: true,
            },
            {
              left: "Symbol",
              right: `${tokenSymbol}`,
              copy: true,
            },
            {
              left: "Decimals",
              right: `${tokenDecimals}`,
              copy: true,
            },
            {
              left: "Total Supply",
              right: `${
                Number(tokenSupply) / 10 ** Number(tokenDecimals)
              } ${tokenSymbol}`,
            },
            {
              left: "Token Price",
              right: `$${(tokenPrice / 1000000000000000000).toFixed(6)} per token`,
            },
            {
              left: "Tokens Offered",
              right: `${(Number(tokenOffered) / Number(tokenSupply)*100).toFixed(8)}% | ${
                Number(tokenOffered) / 10 ** Number(tokenDecimals)
              } ${tokenSymbol}`, //  "50% | 50,00,00,000",
            },
            {
              left: "Sale Start Time",
              right: `${new Date(Number(tokenStartTime)).getDate()} ${
                FullMonth[new Date(Number(tokenStartTime)).getMonth()]
              }  ${new Date(
                Number(tokenStartTime)
              ).getFullYear()}  | ${new Date(
                Number(tokenStartTime)
              ).getHours()} : ${new Date(
                Number(tokenStartTime)
              ).getMinutes()} (IST) `, //"15 Apr 2022 | 14:48 (IST)",
            },
            {
              left: "Sale End Time",
              right: `${new Date(Number(tokenEndTime)).getDate()} ${
                FullMonth[new Date(Number(tokenEndTime)).getMonth()]
              }  ${new Date(Number(tokenEndTime)).getFullYear()}  | ${new Date(
                Number(tokenEndTime)
              ).getHours()} : ${new Date(
                Number(tokenEndTime)
              ).getMinutes()} (IST) `, //"15 Apr 2022 | 14:48 (IST)",
            },
          ].map(({ left, right, copy, helper, color }, index) => {
            return isSmall ? (
              <Box
                sx={{
                  borderBottom: `1px dashed ${colors.white.v4}`,
                  py: 1,
                }}
              >
                <Typography variant="body2" fontWeight={"bold"}>
                  {left}
                </Typography>

                <Stack
                  sx={{ overflowWrap: "anywhere" }}
                  direction="row"
                  spacing={1}
                  width="100%"
                  justifyContent={"space-between"}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color={color}
                      className="textPrimary"
                      fontWeight={400}
                      mb={-0.5}
                    >
                      {right}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="error.main"
                      fontSize={"10px"}
                    >
                      {helper}
                    </Typography>
                  </Box>
                  <Box>{copy && <Copy value={right} title={left} />}</Box>
                </Stack>
              </Box>
            ) : (
              <Grid
                container
                justifyContent="space-between"
                alignItems={"center"}
                sx={{
                  borderBottom: `1px dashed ${colors.white.v4}`,
                  py: helper ? 0 : 1,
                }}
              >
                <Grid item>
                  <Typography variant="body2" fontWeight={"bold"}>
                    {left}
                  </Typography>
                </Grid>
                <Grid item sx={{ ml: "auto", overflowWrap: "break-word" }}>
                  <Stack direction="row" spacing={1}>
                    <section>
                      <Typography
                        variant="body2"
                        color={color}
                        className="textPrimary"
                        fontWeight={400}
                        align="right"
                        mb={-0.5}
                      >
                        {right}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="error.main"
                        fontSize={"10px"}
                        align="right"
                        display="block"
                      >
                        {helper}
                      </Typography>
                    </section>
                    {copy && <Copy value={right} title={left} />}
                  </Stack>
                </Grid>
              </Grid>
            );
          })
        )}
      </StyledPaper>
    </div>
  );
}
