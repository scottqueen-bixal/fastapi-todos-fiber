/**
 * The main App component for the Todo application.
 * Handles the creation, display, and management of todos.
 */

import { useEffect, useState, useRef, useMemo, lazy, Suspense } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getTodos, createTodo } from "./utils";
import "./App.css";
import type { Todo } from "./components/types";

/**
 * Lazy-loaded TodoList component for displaying todos.
 */
const TodoList = lazy(() => import("./components/TodoListComponent"));

function App() {
  /**
   * State to store the list of todos.
   * @type {[Array, Function]} todos - The current list of todos and a function to update it.
   */
  const [todos, setTodos] = useState<Todo[]>(() => []);

  /**
   * State to track if todos have been seeded.
   * @type {[boolean, Function]} isSeeded - A boolean indicating if todos are seeded and a function to update it.
   */
  const [isSeeded, setIsSeeded] = useState(false);

  /**
   * Ref for the input field to create a new todo.
   * @type {React.RefObject<HTMLInputElement>}
   */
  const inputTask = useRef<HTMLInputElement>(null);

  /**
   * Ref for the parent container of the virtualized list.
   * @type {React.RefObject<HTMLDivElement>}
   */
  const parentRef = useRef<HTMLDivElement>(null);

  /**
   * Memoized list of todos.
   * @type {Array}
   */
  const memoizedTodosList = useMemo(() => {
    return todos;
  }, [todos]);

  /**
   * Virtualizer for the list of todos.
   * @type {Object}
   */
  const rowVirtualizerTodos = useVirtualizer({
    count: memoizedTodosList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 75,
  });

  const virtualStyleTodos: React.CSSProperties = {
    "--virtual-group-height": `${rowVirtualizerTodos.getTotalSize()}px`,
  } as React.CSSProperties;

  /**
   * Handles the creation of a new todo.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleCreateTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputTask.current && inputTask.current.value.trim() !== "") {
      createTodo(inputTask.current.value, setTodos);
      inputTask.current.value = "";
      inputTask.current.focus();
    }
  };

  /**
   * Fetches the list of todos when the component mounts.
   */
  useEffect(() => {
    getTodos(setTodos);
  }, []);

  /**
   * Checks if seeded data exists in the API and updates the isSeeded state.
   */
  useEffect(() => {
    const checkSeededData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/todos");
        const data = await response.json();
        if (data.length > 0) {
          setIsSeeded(true);
        }
      } catch (error) {
        console.error("Error checking seeded data:", error);
      }
    };

    checkSeededData();
  }, []);

  /**
   * Handles seeding 100,000 todos by calling the API endpoint.
   */
  const handleSeedTodos = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/todos/seed?count=10000",
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("10,000 todos have been successfully created!");
      setIsSeeded(true);
      getTodos(setTodos);
    } catch (error) {
      console.error("Error seeding todos:", error);
      alert("Failed to seed todos. Please try again.");
    }
  };

  /**
   * Handles seeding 100,000 todos by calling the API endpoint.
   */
  const handleDeleteSeedTodos = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/todos/seed/delete",
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Seeded todos have been successfully deleted!");
      setIsSeeded(false);
      getTodos(setTodos);
    } catch (error) {
      console.error("Error deleting todos:", error);
      alert("Failed to delete todos. Please try again.");
    }
  };

  return (
    <div className="todo-app">
      <form className="todo-form" onSubmit={handleCreateTodo}>
        <label htmlFor="todo-input" className="sr-only">
          Enter a new todo
        </label>
        <input
          id="todo-input"
          ref={inputTask}
          placeholder="Enter a new todo"
          autoComplete="off"
        />
        <button
          type="submit"
          className="create-todo-button sr-only"
          aria-label="Create a new todo"
        >
          Create Todo
        </button>
      </form>

      <div
        className="todo-list-container"
        data-testid="todo-list-container"
        ref={parentRef}
      >
        <div className="todo">
          <div style={virtualStyleTodos}>
            <Suspense fallback={<div>Loading Todos...</div>}>
              <TodoList
                todos={memoizedTodosList}
                setTodos={setTodos}
                rowVirtualizer={rowVirtualizerTodos}
              />
            </Suspense>
          </div>
        </div>
      </div>
      {isSeeded ? (
        <button className="delete seed-todos-button" onClick={handleDeleteSeedTodos}>
          Click to delete seeded todos
        </button>
      ) : <button className="seed-todos-button" onClick={handleSeedTodos}>
          Click to Seed 10,000 todos
        </button>}
    </div>
  );
}

export default App;
