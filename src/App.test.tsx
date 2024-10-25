import { beforeAll, afterAll, beforeEach, describe, it, expect } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import { server } from "./mocks/node";
import { INITIAL_COUNT } from "./mocks/handlers";

describe("Stage B", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  // ensure a clean state for each test
  beforeEach(() => {
    server.resetHandlers();
    cleanup();
    render(<App />);
  });

  it("should render App component with the initial count", async () => {
    await waitFor(() => {
      const heading = screen.getByRole("heading");
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(`The count is: ${INITIAL_COUNT}`);
    });
  });

  it("should render Increment button", async () => {
    await waitFor(() => {
      const button = screen.getByRole("button", { name: "Increment" });
      expect(button).toBeInTheDocument();
    });
  });

  it("should render Decrement button", async () => {
    await waitFor(() => {
      const button = screen.getByRole("button", { name: "Decrement" });
      expect(button).toBeInTheDocument();
    });
  });

  it("should increment the count", async () => {
    const result = INITIAL_COUNT + 1;

    await waitFor(async () => {
      const incrementButton = screen.getByRole("button", { name: "Increment" });
      expect(incrementButton).toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(incrementButton);

      const heading = screen.getByRole("heading");
      expect(heading.textContent).toBe(`The count is: ${result}`);
    });
  });

  it("should increment the count 3 times", async () => {
    const result = INITIAL_COUNT + 3;

    await waitFor(async () => {
      const incrementButton = screen.getByRole("button", { name: "Increment" });
      expect(incrementButton).toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(incrementButton);
      await user.dblClick(incrementButton);

      const heading = screen.getByRole("heading");
      expect(heading.textContent).toBe(`The count is: ${result}`);
    });
  });

  it("should decrement the count", async () => {
    const result = INITIAL_COUNT - 1;

    await waitFor(async () => {
      const decrementButton = screen.getByRole("button", { name: "Decrement" });
      expect(decrementButton).toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(decrementButton);

      const heading = screen.getByRole("heading");
      expect(heading).toHaveTextContent(`The count is: ${result}`);
    });
  });

  it("should decrement the count 3 times", async () => {
    const result = INITIAL_COUNT - 3;

    await waitFor(async () => {
      const decrementButton = screen.getByRole("button", { name: "Decrement" });
      expect(decrementButton).toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(decrementButton);
      await user.dblClick(decrementButton);

      const heading = screen.getByRole("heading");
      expect(heading).toHaveTextContent(`The count is: ${result}`);
    });
  });

  it("should increment and decrement the count a few times", async () => {
    const result = INITIAL_COUNT - 2;

    await waitFor(async () => {
      const incrementButton = screen.getByRole("button", { name: "Increment" });
      expect(incrementButton).toBeInTheDocument();

      const decrementButton = screen.getByRole("button", { name: "Decrement" });
      expect(decrementButton).toBeInTheDocument();

      const user = userEvent.setup();

      await user.click(incrementButton); // +1
      await user.dblClick(incrementButton); // +3
      await user.click(decrementButton); // +2
      await user.dblClick(incrementButton); // +4
      await user.dblClick(incrementButton); // +6
      await user.dblClick(decrementButton); // +4
      await user.dblClick(decrementButton); // +2
      await user.dblClick(decrementButton); // 0
      await user.dblClick(decrementButton); // -2

      const heading = screen.getByRole("heading");
      expect(heading).toHaveTextContent(`The count is: ${result}`);
    });
  });
});
