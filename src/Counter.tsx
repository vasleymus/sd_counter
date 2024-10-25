import { useAppStore } from "./store/store";

type CounterProps = {
  id: number;
};

export default function Counter({ id }: CounterProps) {
  const { counters, increment, decrement, randomize } = useAppStore();
  const counter = counters.find((c) => c.id === id);

  if (!counter) return null;

  const { count, loading, error } = counter;

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div>
      <h1>The count is: {count}</h1>
      <button onClick={() => increment(id)}>Increment</button>
      <button onClick={() => decrement(id)}>Decrement</button>
      <button onClick={() => randomize(id)}>Randomize</button>
    </div>
  );
}
