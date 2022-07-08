import { AppProvider } from "./contexts";
import IcoPage from "./page/ico";
import { useState } from "react";
import { CircularProgress, Stack } from "@mui/material";
import colors from "./colors";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <IcoPage />
      </AppProvider>
    </div>
  );
}

export default App;
