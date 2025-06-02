import { useEffect, useState, useRef } from "react";
import TodoList from "./components/TodoList";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./utils";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => []);
  const inputTask = useRef();

  // Lazy fetch todos after component mounts
  useEffect(() => {
    getTodos(setTodos);
  }, []);

  return (
    <div className="todo-app">
      <form className="todo-form">
        <input ref={inputTask} />
        <button onClick={() => createTodo(inputTask.current.value, setTodos)}>
          Create Todo
        </button>
      </form>
      <TodoList
        todos={todos}
        setTodos={setTodos}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
