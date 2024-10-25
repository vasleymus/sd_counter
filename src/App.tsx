import { useState, Fragment } from "react";
import Counter from "./Counter";
import "./App.css";

type Counters = JSX.Element[];

function App() {
  const [counters, setCounters] = useState<Counters>([<Counter />]);

  const handleAddCounter = () => {
    setCounters((c) => [...c, <Counter />]);
  };

  return (
    <>
      {counters.map((counter, i) => {
        return <Fragment key={i}>{counter}</Fragment>;
      })}
      <button onClick={handleAddCounter}>Add Counter</button>
    </>
  );
}

export default App;
