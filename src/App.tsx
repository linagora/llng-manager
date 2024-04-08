import Navbar from "./components/Navbar";
import ConfigDisplayer from "./ConfigDisplayer";
import AddApp from "./components/AddApp";
import "./App.css";
import { Suspense } from "react";
import SaveButton from "./components/SaveButton";
import { useTranslation } from "react-i18next";

function App() {
  useTranslation();
  return (
    <Suspense fallback="loading">
      <div className="App">
        <Navbar />
        <div className="main">
          <ConfigDisplayer />
          <SaveButton />
          <AddApp />
        </div>
      </div>
    </Suspense>
  );
}

export default App;
