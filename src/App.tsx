import Navbar from "./components/Navbar";
import ConfigDisplayer from "./ConfigDisplayer";
import AddApp from "./components/AddApp";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <ConfigDisplayer />
        <AddApp />
      </div>
    </div>
  );
}

export default App;
