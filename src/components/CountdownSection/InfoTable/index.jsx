import { Box, TableCell, Typography } from "@mui/material";
import { StyledSmallTable } from "./StyledSmallTable";
import React from "react";

export default function InfoTable({
  min,
  max,
  cap,
  contributor,
  $USDInvestment,
  tokenInvestment,
  tokenSymbol,
  tokenDecimal,
  softCap,
  price,
  USDTprice
}) {


  return (
    <Box px={2} pb={1}>
      <StyledSmallTable>
        {React.Children.toArray(
          [
            {
              left: "Minimum Buy",
              right: `$${min}`, //"0.50 $USD",
            },
            {
              left: "Maximum Buy",
              right: `$${max}`, //"12 $USD",
            },
            {
              left: "Soft Cap",
              right: `$${softCap}`,
            },
            {
              left: "Hard Cap",
              right: `$${cap}`, //"200 $USD",
            },
            {
              left: "Total Contributors",
              right: `${contributor} `,
            },
            {
              left: "Your Contribution",
              right: `$${(tokenInvestment / 10 ** Number(tokenDecimal) * price /1000000000000000000).toFixed(3) }  | ${
                tokenInvestment / 10 ** Number(tokenDecimal)
              } ${tokenSymbol}`,
            },
          ].map(({ left, right }, index) => {
            return (
              <tbody key={`info-section-countdown-${index}`}>
                <tr>
                  <TableCell>
                    <Typography variant="caption" fontWeight={"bold"}>
                      {left}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="caption" fontWeight={400}>
                      {right}
                    </Typography>
                  </TableCell>
                </tr>
              </tbody>
            );
          })
        )}
      </StyledSmallTable>
    </Box>
  );
}
