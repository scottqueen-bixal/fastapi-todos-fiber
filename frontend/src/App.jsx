import { useEffect, useState, useRef, useMemo, lazy, Suspense } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getTodos, createTodo } from "./utils";
import "./App.css";

const TodoList = lazy(() => import("./components/TodoList"));

function App() {
  const [todos, setTodos] = useState(() => []);
  const inputTask = useRef();
  const parentRef = useRef(null);

  const memoizedTodos = useMemo(() => todos, [todos]);

  // virtualizer
  const rowVirtualizer = useVirtualizer({
    count: memoizedTodos.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  const handleCreateTodo = (e) => {
    e.preventDefault();
    createTodo(inputTask.current.value, setTodos);
    inputTask.current.value = "";
    inputTask.current.focus();
  };

  useEffect(() => {
    getTodos(setTodos);
  }, []);

  return (
    <div
      className="todo-app"
      ref={parentRef}
      style={{ height: "100vh", overflow: "auto" }}
    >
      <form className="todo-form" onSubmit={handleCreateTodo}>
        <input ref={inputTask} />
        <button type="submit">Create Todo</button>
      </form>
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        <Suspense fallback={<div>Loading Todos...</div>}>
          <TodoList
            todos={memoizedTodos}
            setTodos={setTodos}
            rowVirtualizer={rowVirtualizer}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
