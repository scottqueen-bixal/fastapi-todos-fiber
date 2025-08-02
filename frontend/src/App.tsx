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
    </div>
  );
}

export default App;
