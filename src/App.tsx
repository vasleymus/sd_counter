import { Fragment } from "react";
import Counter from "./Counter";
import { useAppStore } from "./store/store";
import "./App.css";

function App() {
  const { counters, addCounter } = useAppStore();

  return (
    <>
      {counters.map((counter, i) => {
        return <Fragment key={i}>{counter}</Fragment>;
      })}
      <button onClick={() => addCounter(<Counter />)}>Add Counter</button>
    </>
  );
}

export default App;
