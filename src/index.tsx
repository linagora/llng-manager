import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import "./index.css";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { amber, green, grey, orange } from "@mui/material/colors";
import { Switch } from "@mui/material";
const theme = createTheme({
  palette: {
    primary: orange,
    secondary: {
      main: grey[800],
      dark: grey[900],
      light: grey[500],
    },
    success: green,
  },
});

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </ThemeProvider>
);

reportWebVitals();
