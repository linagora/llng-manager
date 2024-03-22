import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import "./App.css";
import DataDisplayer from "./features/data/dataDisplayer";
import AddApp from "./components/AddApp";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <strong> TITRE </strong>
        <DataDisplayer />
        <AddApp />
      </div>
    </div>
  );
}

export default App;
