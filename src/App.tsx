import { useState } from "react";
import "./App.css";

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((c) => c + 1);
  };

  const handleDecrement = () => {
    setCount((c) => c - 1);
  };

  return (
    <div>
      <h1>The count is: {count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
}

function App() {
  return <Counter />;
}

export default App;
