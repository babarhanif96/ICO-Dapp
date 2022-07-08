import { Box, Typography } from "@mui/material";
import { StyledSlider } from "./styled";

export default function YelloSlider({ MAX, $USDgenerated, tokenSymbol }) {
  function valueLabelFormat(value) {
 
    return `${value.toFixed(2)}% | ${($USDgenerated).toFixed(3)} $USD`;
  }


  return (
    $USDgenerated && (
      <Box px={4} pt={4}>
        <StyledSlider
          max={100}
          value={($USDgenerated / MAX) * 100}
          aria-label="Default"
          valueLabelDisplay="on"
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
        />
        <Typography align="right" p={0} m={0} variant="body2" mt={-1}>
          $ {MAX}
        </Typography>
      </Box>
    )
  );
}
