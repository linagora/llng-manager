import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green, grey, orange, yellow } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    primary: orange,
    secondary: {
      main: grey[800],
      dark: grey[900],
      light: grey[500],
    },
    success: green,
    warning: yellow,
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
