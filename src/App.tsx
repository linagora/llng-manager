import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import "./App.css";
import { useAppSelector } from "./app/hooks";
import { history } from "./app/store";
import Navbar from "./components/Navbar";
import { Configuration } from "./pages/Configuration";
import { PartialConfiguration } from "./pages/PartialConfiguration";

function App({ partial }: { partial?: number }) {
  useTranslation();
  const location = useAppSelector((state) => state.router.location);
  const infos = location?.hash.replace("#", "").split("/");

  return (
    <Suspense fallback="loading">
      <Router history={history}>
        <Navbar partial={partial} />
        <Routes>
          <Route
            path=""
            element={
              partial ? (
                <PartialConfiguration
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
              ) : (
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
              )
            }
          />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
