import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import "./App.css";
import { useAppSelector } from "./app/hooks";
import { history } from "./app/store";
import Navbar from "./components/Navbar";
import { Configuration } from "./pages/Configuration";

function App() {
  useTranslation();
  const location = useAppSelector((state) => state.router.location);
  const infos = location?.hash.replace("#", "").split("/");

  return (
    <Suspense fallback="loading">
      <Router history={history}>
        <Navbar />
        <Routes>
          <Route
            path="manager.html"
            element={
              <Configuration
                location={{
                  type: infos ? infos[0] : "",
                  info: infos
                    ? {
                        name: infos.length === 3 ? infos[2] : infos[1],
                        type: infos.length === 3 ? infos[1] : "",
                      }
                    : { name: "", type: "" },
                }}
              />
            }
          />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
