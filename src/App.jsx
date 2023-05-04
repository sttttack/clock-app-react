import { useEffect, useState } from "react";
import "./App.css";
import WorldTimeApi from "./components/WorldTimeApi";
import Quotes from "./components/Quotes";

function App() {
  return (
    <div>
      <Quotes />
      <WorldTimeApi />
      <p></p>
    </div>
  );
}

export default App;
