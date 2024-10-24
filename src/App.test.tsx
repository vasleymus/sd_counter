import { beforeEach, describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import App from "../src/App";

describe("Stage A", () => {
  // ensure a clean state for each test
  beforeEach(() => {
    cleanup();
    render(<App />);
  });

  it("should render App component with the count of 0", async () => {
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("The count is: 0");
  });

  it("should render Increment button", async () => {
    const button = screen.getByRole("button", { name: "Increment" });
    expect(button).toBeInTheDocument();
  });

  it("should render Decrement button", async () => {
    const button = screen.getByRole("button", { name: "Decrement" });
    expect(button).toBeInTheDocument();
  });

  it("should increment the count", async () => {
    const incrementButton = screen.getByRole("button", { name: "Increment" });
    expect(incrementButton).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(incrementButton);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("The count is: 1");
  });

  it("should increment the count 3 times", async () => {
    const incrementButton = screen.getByRole("button", { name: "Increment" });
    expect(incrementButton).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(incrementButton);
    await user.dblClick(incrementButton);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("The count is: 3");
  });

  it("should decrement the count", async () => {
    const decrementButton = screen.getByRole("button", { name: "Decrement" });
    expect(decrementButton).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(decrementButton);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("The count is: -1");
  });

  it("should decrement the count 3 times", async () => {
    const decrementButton = screen.getByRole("button", { name: "Decrement" });
    expect(decrementButton).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(decrementButton);
    await user.dblClick(decrementButton);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("The count is: -3");
  });

  it("should increment and decrement the count a few times", async () => {
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
    expect(heading).toHaveTextContent("The count is: -2");
  });
});
