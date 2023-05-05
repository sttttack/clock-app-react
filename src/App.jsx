import { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import WorldTimeApi from "./components/WorldTimeApi";
import Quotes from "./components/Quotes";

function App() {
  return (
    <div>
      <Quotes />
      <WorldTimeApi />
    </div>
  );
}

export default App;
