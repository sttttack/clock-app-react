import { useEffect, useState } from "react";
import "./App.css";
import WorldTimeApi from "./components/WorldTimeApi";
import GeoLocation from "./components/GeoLocation";

function App() {
  return (
    <>
      {/* <GeoLocation /> */}
      <WorldTimeApi />
      <p></p>
    </>
  );
}

export default App;
