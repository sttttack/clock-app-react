import { createContext, useState } from "react";
import "./App.css";
import "./index.css";
import WorldTimeApi from "./components/WorldTimeApi";
import Quotes from "./components/Quotes";

export const HiddenContext = createContext();

function App() {
  const [hidden, setHidden] = useState(true);

  return (
    <div>
      <HiddenContext.Provider value={[hidden, setHidden]}>
        <Quotes />
        <WorldTimeApi />
      </HiddenContext.Provider>
    </div>
  );
}

export default App;
