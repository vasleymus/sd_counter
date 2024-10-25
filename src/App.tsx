import { useEffect } from "react";
import Counter from "./Counter";
import { useAppStore } from "./store/store";
import { initializationState } from "./store/store";
import "./App.css";

function App() {
  const { counters, addCounter } = useAppStore();

  // Add first counter on application start
  useEffect(() => {
    if (!initializationState.initialized) {
      initializationState.initialized = true;
      addCounter();
    }
  }, [addCounter]);

  return (
    <>
      {counters.map((counter) => (
        <Counter key={counter.id} id={counter.id} />
      ))}
      <button onClick={addCounter}>Add Counter</button>
    </>
  );
}

export default App;
