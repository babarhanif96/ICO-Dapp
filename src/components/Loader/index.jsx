import React from "react";
import { CircularProgress, Stack } from "@mui/material";
import colors from "../../colors";

export default function Loader({ height = "55vh" }) {
  return (
    <Stack
      {...{ height }}
      alignItems="center"
      justifyContent={"center"}
      position="absolute"
      bgcolor={"rgba(255,255,255,0.7)"}
      top={0}
      left={0}
      height="100%"
      width="100%"
      zIndex={1}
    >
      <CircularProgress sx={{ color: colors.yellow.v3 }} />
    </Stack>
  );
}
