import { useEffect, useState, useRef, useMemo, lazy, Suspense } from "react";
import { getTodos, createTodo } from "./utils";
import "./App.css";

const TodoList = lazy(() => import("./components/TodoList"));

function App() {
  const [todos, setTodos] = useState(() => []);
  const inputTask = useRef();

  const memoizedTodos = useMemo(() => todos, [todos]);

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
    <div className="todo-app">
      <form className="todo-form" onSubmit={handleCreateTodo}>
        <input ref={inputTask} />
        <button type="submit">Create Todo</button>
      </form>
      <Suspense fallback={<div>Loading Todos...</div>}>
        <TodoList todos={memoizedTodos} setTodos={setTodos} />
      </Suspense>
    </div>
  );
}

export default App;
