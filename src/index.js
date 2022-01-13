import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";
const mainTheme = createTheme({
  palette: {
    primary: green,
    secondary: orange,
  },
  typography: {
    fontFamily: ["Mochiy Pop P One", "sans-serif"].join(","),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={mainTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
