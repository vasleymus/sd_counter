import {
  beforeAll,
  afterAll,
  beforeEach,
  describe,
  it,
  expect,
  vi,
} from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import App from "../src/App";
import { server } from "./mocks/node";
import { INITIAL_COUNT } from "./mocks/handlers";

describe("Stage D", () => {
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
      expect(heading.textContent).toBe(`The count is: ${INITIAL_COUNT}`);
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

  it("should render Randomize button", async () => {
    await waitFor(() => {
      const button = screen.getByRole("button", { name: "Randomize" });
      expect(button).toBeInTheDocument();
    });
  });

  it("should render Add Counter button", async () => {
    await waitFor(() => {
      const button = screen.getByRole("button", { name: "Add Counter" });
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
      expect(heading.textContent).toBe(`The count is: ${result}`);
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
      expect(heading.textContent).toBe(`The count is: ${result}`);
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
      expect(heading.textContent).toBe(`The count is: ${result}`);
    });
  });

  it("should check for randomness", async () => {
    // spy on Math.random to always return 0.5
    const mockRandom = vi.spyOn(Math, "random").mockReturnValue(0.5);
    // sign will always be -1
    const sign = Math.random() > 0.5 ? 1 : -1;
    // create random value via the same formula but with mocked random
    const randomValue = Math.floor(Math.random() * 100) * sign;

    await waitFor(async () => {
      const button = screen.getByRole("button", { name: "Randomize" });
      expect(button).toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(button);

      const heading = screen.getByRole("heading");
      expect(heading.textContent).toBe(`The count is: ${randomValue}`);
    });

    mockRandom.mockRestore();
  });

  it("should add more counters to the page", async () => {
    const button = screen.getByRole("button", { name: "Add Counter" });
    expect(button).toBeInTheDocument();

    const user = userEvent.setup();
    // add two more counters
    await user.click(button);
    await user.click(button);

    // expect that page has 3 headings
    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBe(3);

    // check that every heading have initial count
    headings.forEach((heading) => {
      expect(heading.textContent).toBe(`The count is: ${INITIAL_COUNT}`);
    });
  });

  // not 100% stable test
  it("should check detached state of multiple counters", async () => {
    const button = screen.getByRole("button", { name: "Add Counter" });
    expect(button).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(button);

    const headings = screen.getAllByRole("heading");
    expect(headings.length).toBe(2);

    headings.forEach((heading) => {
      expect(heading.textContent).toBe(`The count is: ${INITIAL_COUNT}`);
    });

    const randomButtons = screen.getAllByRole("button", { name: "Randomize" });
    await user.click(randomButtons[0]);
    await user.click(randomButtons[1]);

    // expect that two counters have different values
    expect(headings[0].textContent).not.toBe(headings[1].textContent);
  });
});
