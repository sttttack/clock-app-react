import { useEffect, useState } from "react";
import "./App.css";
import WorldTimeApi from "./components/WorldTimeApi";
import Quotes from "./components/Quotes";

function App() {
  return (
    <>
      <Quotes />
      <WorldTimeApi />
      <p></p>
    </>
  );
}

export default App;
