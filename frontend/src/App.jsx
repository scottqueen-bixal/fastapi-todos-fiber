import { useEffect, useState, useRef, useMemo } from "react";
import TodoList from "./components/TodoList";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./utils";
import "./App.css";

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

  // Lazy fetch todos after component mounts
  useEffect(() => {
    getTodos(setTodos);
  }, []);

  return (
    <div className="todo-app">
      <form className="todo-form" onSubmit={handleCreateTodo}>
        <input ref={inputTask} />
        <button type="submit">Create Todo</button>
      </form>
      <TodoList
        todos={memoizedTodos}
        setTodos={setTodos}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
