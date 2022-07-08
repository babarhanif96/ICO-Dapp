// import { Stack, Typography } from "@mui/material";
// import { Box } from "@mui/system";
// import Web3 from "web3";
// import { useEffect, useState } from "react";
// import useCountdown from "../../../hooks";
// import colors from "./../../../colors";

// function Countdown({ tokenEndTime }) {
//   var structuredDate = new Date(tokenEndTime);

//   const [dys, hrs, mins, secs] = useCountdown({
//     days: structuredDate.getDay(),
//     hours: structuredDate.getHours(),
//     minutes: structuredDate.getMinutes(),
//     seconds: structuredDate.getSeconds(),
//   });

//   // console.log("end time", {
//   //   days: structuredDate.getDay() ,
//   //   hours: structuredDate.getHours(),
//   //   minutes: structuredDate.getMinutes(),
//   //   seconds: structuredDate.getSeconds(),
//   // })

//   return (
//     <Box py={2}>
//       <Stack
//         direction={"row"}
//         divider={<Typography variant="h5">:</Typography>}
//         justifyContent="center"
//         alignItems={"center"}
//         spacing={0.5}
//       >
//         {[dys, hrs, mins, secs].map((item, index) => {
//           return (
//             <Box
//               bgcolor={colors.yellow.v1}
//               border={2}
//               borderRadius={2}
//               borderColor={colors.yellow.v2}
//               height={"3rem"}
//               width={"3rem"}
//               display="flex"
//               alignItems={"center"}
//               justifyContent={"center"}
//               key={`countdown-fragemnts-${index}`}
//             >
//               <Typography variant="h5" p={0} m={0} fontWeight={500}>
//                 {item}
//               </Typography>
//             </Box>
//           );
//         })}
//       </Stack>
//     </Box>
//   );
// }

// export default Countdown;

import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import colors from "./../../../colors";

export default function DailyTimer({ tokenEndTime,tokenStartTime }) {
  const [seconds, setSeconds] = useState(60);

  const stakeTime1 = Number(tokenEndTime) / 1000;
  const stakeTime2 = Number(tokenEndTime) / 1000;

  var currentTimeinSeconds = new Date().getTime() / 1000;
  var tempTime1 = Math.trunc(stakeTime1 - currentTimeinSeconds);
  var tempTime2 = Math.trunc(stakeTime2 - currentTimeinSeconds);
  var differenceTimeinSeconds = tempTime1 >=0? tempTime1 : tempTime2
  var DaysRemaining = Math.trunc(differenceTimeinSeconds / 60 / 60 / 24);
  var HoursRemaining = Math.trunc(
    differenceTimeinSeconds / 60 / 60 - DaysRemaining * 24
  );
  var MinutesRemaining = Math.trunc(
    differenceTimeinSeconds / 60 - DaysRemaining * 24 * 60 - HoursRemaining * 60
  );
  var SecondsRemaining = Math.trunc(
    differenceTimeinSeconds -
      DaysRemaining * 24 * 60 * 60 -
      HoursRemaining * 60 * 60 -
      MinutesRemaining * 60
  );

  useEffect(() => {
    let interval = null;

    interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);


  return (
    <div>
      {stakeTime1 != 0 ? (
        <Box py={2}>
          <Stack
            direction={"row"}
            divider={
              <Typography variant="h5" pt={1}>
                :
              </Typography>
            }
            justifyContent="center"
            // alignItems={"center"}
            spacing={0.5}
          >
            {React.Children.toArray(
              [
                { value: DaysRemaining, label: "Days" },
                { value: HoursRemaining, label: "Hours" },
                { value: MinutesRemaining, label: "Minutes" },
                { value: SecondsRemaining, label: "Seconds" },
              ].map(({ label, value }, index) => {
                return (
                  <Box>
                    <Box
                      bgcolor={colors.yellow.v1}
                      border={2}
                      borderRadius={2}
                      borderColor={colors.yellow.v2}
                      height={"3rem"}
                      width={"3rem"}
                      display="flex"
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Typography variant="h5" p={0} m={0} fontWeight={500}>
                        {value < 10 ? (value < 0 ? "00" : `0${value}`) : value}
                      </Typography>
                    </Box>
                    <Typography
                      align="center"
                      display="block"
                      variant="caption"
                      p={0}
                      m={0}
                      fontWeight={500}
                    >
                      {label}
                    </Typography>
                  </Box>
                );
              })
            )}
          </Stack>
        </Box>
      ) : (
        <span></span>
      )}
    </div>
  );
}
