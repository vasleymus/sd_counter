import { useState, useEffect } from "react";
import "./App.css";

type InitialState = {
  count: number | null;
  loading: boolean;
  error: null | string;
};

type CountResponse = {
  initialCount: number;
};

function Counter() {
  const [state, setState] = useState<InitialState>({
    count: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetch("/api/count")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json() as Promise<CountResponse>;
      })
      .then((data) =>
        setState({ count: data.initialCount, loading: false, error: null })
      )
      .catch((err) => {
        setState({ count: null, loading: false, error: err.message });
      });
  }, []);

  const handleIncrement = () => {
    // there should be no situation when state.count is null
    setState((s) => ({ ...s, count: s.count! + 1 }));
  };

  const handleDecrement = () => {
    setState((s) => ({ ...s, count: s.count! - 1 }));
  };

  if (state.loading) return <h1>Loading...</h1>;
  if (state.error) return <h1>Error: {state.error}</h1>;

  return (
    <div>
      <h1>The count is: {state.count}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    </div>
  );
}

function App() {
  return <Counter />;
}

export default App;
