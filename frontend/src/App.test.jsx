import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import App from "./App";

// Mock the getTodos function
vi.mock("./utils", () => ({
  getTodos: vi.fn(() => Promise.resolve([])),
}));

test("renders App component", () => {
  render(<App />);

  // Check if the input field is rendered
  const inputElement = screen.getByPlaceholderText("Enter a new todo");
  expect(inputElement).to.exist;

  // Check if the create button is rendered
  // const buttonElement = screen.getByRole("button", { name: /create todo/i });
  // expect(buttonElement).to.exist;

  // Check if the todo list container is rendered
  // const todoListContainer = screen.getByClassName("todo-list-container");
  // expect(todoListContainer).to.exist;
});
