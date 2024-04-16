import Navbar from "./components/Navbar";
import "./App.css";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { Route, Routes } from "react-router-dom";
import { history } from "./app/store";
import { useAppSelector } from "./app/hooks";
import { Configuration } from "./pages/Configuration";

function App() {
  useTranslation();
  const location = useAppSelector((state) => state.router.location);
  const test = location?.hash.replace("#", "").split("/");

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
                  type: test ? test[0] : "",
                  info: test
                    ? {
                        name: test.length === 3 ? test[2] : test[1],
                        type: test.length === 3 ? test[1] : "",
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
