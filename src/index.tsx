import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { setupStore } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./i18n";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
