import { useState, Fragment, useRef } from "react";
import Counter from "./Counter";
import "./App.css";

type Counters = {
  id: number;
  element: JSX.Element;
}[];

function App() {
  const [counters, setCounters] = useState<Counters>([
    { id: 1, element: <Counter /> },
  ]);
  const nextId = useRef(1); // store counter id

  const handleAddCounter = () => {
    const id = ++nextId.current; // increment id
    const newCounter = { id, element: <Counter /> };
    setCounters((c) => [...c, newCounter]);
  };

  return (
    <>
      {counters.map((counter) => {
        return <Fragment key={counter.id}>{counter.element}</Fragment>;
      })}
      <button onClick={handleAddCounter}>Add Counter</button>
    </>
  );
}

export default App;
