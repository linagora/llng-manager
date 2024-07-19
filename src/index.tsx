import { green, grey, orange, yellow } from "@mui/material/colors";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import "./i18n";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
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
    <StyledEngineProvider injectFirst>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    </StyledEngineProvider>
  </ThemeProvider>
);

reportWebVitals();
