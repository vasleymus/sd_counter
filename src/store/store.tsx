import { create } from "zustand";
import { getRandomValue } from "../utils/functions";

type Counter = {
  id: number;
  count: number | null;
  loading: boolean;
  error: string | null;
};

type CountResponse = {
  initialCount: number;
};

type InitialAppState = {
  counters: Counter[];
  addCounter: () => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  randomize: (id: number) => void;
};

// dummy id for newly added counters
let nextCounterId = 1;

// Utility object to track the application's initialization state.
// The `isInitialized` property ensures that the app is initialized only once,
// preventing multiple counters from appearing on the page.
// https://react.dev/learn/you-might-not-need-an-effect#initializing-the-application
export const initializationState = { initialized: false };

export const useAppStore = create<InitialAppState>((set) => ({
  counters: [],
  addCounter: async () => {
    const counterId = nextCounterId++;

    const initCounter = {
      id: counterId,
      count: null,
      loading: true,
      error: null,
    };

    set((state) => ({
      counters: [...state.counters, initCounter],
    }));

    const res = await fetch("/api/count");

    if (!res.ok) {
      set((state) => ({
        counters: state.counters.map((counter) =>
          counter.id === counterId
            ? { ...counter, loading: false, error: res.statusText }
            : counter
        ),
      }));
      return;
    }

    const data = await (res.json() as Promise<CountResponse>);

    set((state) => ({
      counters: state.counters.map((counter) =>
        counter.id === counterId
          ? { ...counter, count: data.initialCount, loading: false }
          : counter
      ),
    }));
  },
  increment: (id: number) => {
    set((state) => ({
      counters: state.counters.map((counter) =>
        counter.id === id ? { ...counter, count: counter.count! + 1 } : counter
      ),
    }));
  },
  decrement: (id: number) => {
    set((state) => ({
      counters: state.counters.map((counter) =>
        counter.id === id ? { ...counter, count: counter.count! - 1 } : counter
      ),
    }));
  },
  randomize: (id: number) => {
    set((state) => ({
      counters: state.counters.map((counter) =>
        counter.id === id ? { ...counter, count: getRandomValue() } : counter
      ),
    }));
  },
}));
