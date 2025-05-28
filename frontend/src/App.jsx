import { useEffect, useState } from "react";
import "./App.css";

const todosPath = "http://localhost:8000/todos";

function App() {
  const [todos, setTodos] = useState(() => []);

  const getTodos = async () => {
    try {
      const response = await fetch(todosPath, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createTodo = async (task) => {
    const newTodo = { task };

    try {
      const response = await fetch(todosPath, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      const data = await response.json();
      setTodos((prevTodos) => [...prevTodos, data]);
      console.log("Todo created successfully:", data);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // Lazy fetch todos after component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };

    fetchTodos();
  }, []);

  return (
    <div className="todo-app">
      <button onClick={() => createTodo("TEST Todo")}>Create Todo</button>
      {todos.length > 0 &&
        todos.map((todo, index) => (
          <div key={index}>
            <p>{todo.task}</p>
          </div>
        ))}
    </div>
  );
}

export default App;
