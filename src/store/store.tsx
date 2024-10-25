import { create } from "zustand";
import Counter from "../Counter";

type InitialAppState = {
  counters: JSX.Element[];
  addCounter: (newCounter: JSX.Element) => void;
};

export const useAppStore = create<InitialAppState>((set) => ({
  counters: [<Counter />],
  addCounter: (newCounter) => {
    set((state) => ({ counters: [...state.counters, newCounter] }));
  },
}));
