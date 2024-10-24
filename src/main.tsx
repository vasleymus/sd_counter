import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

export async function enableMocking() {
  // enabled only in development
  if (!import.meta.env.DEV) return;

  const { worker } = await import("./mocks/browser.ts");

  return worker.start();
}

enableMocking()
  .then(() => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  })
  .catch((err) => {
    console.error("Failed to enable mocking:", err);
  });
