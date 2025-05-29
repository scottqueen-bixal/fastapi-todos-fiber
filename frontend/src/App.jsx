import { useEffect, useState } from "react";
import Todo from "./components/Todo";
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
      // Sort todos by created_at in descending order
      const sortedTodos = data.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      console.log({ sortedTodos });
      setTodos(sortedTodos);
      console.info("Todos fetched successfully:", sortedTodos);
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

      const todo = await response.json();
      console.log(todo);
      setTodos(getTodos());
      console.info("Todo created successfully:", todo);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const updateTodo = async ({ content, id, is_completed }) => {
    const newTodo = { content, id, is_completed };

    try {
      const response = await fetch(`${todosPath}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updatedTodo = await response.json();
      setTodos(getTodos());
      console.info("Todo updated successfully:", updatedTodo);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async ({ id }) => {
    try {
      const response = await fetch(`${todosPath}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      console.info("Todo deleted successfully:", id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Lazy fetch todos after component mounts
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="todo-app">
      <button className="create-todo" onClick={() => createTodo("TEST Todo")}>
        Create Todo
      </button>
      {todos.length > 0 && (
        <div className="todos">
          <div className="todo-list">
            {todos.map(
              (todo, index) =>
                !todo.is_completed && (
                  <Todo
                    key={index}
                    todo={todo}
                    onToggle={updateTodo}
                    onDelete={deleteTodo}
                  />
                )
            )}
          </div>
          <div className="todo-list">
            {todos.map(
              (todo, index) =>
                todo.is_completed && (
                  <Todo
                    key={index}
                    todo={todo}
                    onToggle={updateTodo}
                    onDelete={deleteTodo}
                  />
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
