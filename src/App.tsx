import Navbar from "./components/Navbar";
import ConfigDisplayer from "./ConfigDisplayer";
import AddApp from "./components/AddApp";
import "./App.css";
import { Suspense } from "react";
import SaveButton from "./components/SaveButton";

function App() {
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
