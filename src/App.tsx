import React, { useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Container from "@mui/material/Container";
import { useApiContext } from './ContextApi';
import SoundRecorder from './SoundRecorder';

const theme = {
  palette: {
    // mode: "dark",
    // primary: {
    //   main: "#990000",

    // },
    // secondary: {
    //   // main: "rgb(232 117 124/1)",
    //   main: "#0c8a4f",
    // }
  }
};

function App() {
  const value = useApiContext();
  const newTheme = useMemo(() => createTheme({ ...theme, palette: { mode: value.theme } }), [value.theme]);

  return (
    <MuiThemeProvider theme={newTheme}>
      <ThemeProvider theme={newTheme}>
        <CssBaseline />
        <Container >
          <SoundRecorder />
        </Container>
      </ThemeProvider>
    </MuiThemeProvider>
  )
}

export default App;
