import { todosPath } from "./constants";

export const getTodos = async (setTodos) => {
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
    setTodos(data);
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

export const createTodo = async (task, setTodos) => {
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

    getTodos(setTodos);
  } catch (error) {
    console.error("Error creating todo:", error);
  }
};

export const updateTodo = async (updatedTodo, setTodos) => {
  const { id } = updatedTodo;

  try {
    const response = await fetch(`${todosPath}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
      throw new Error("Failed to update todo");
    }

    getTodos(setTodos);
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const deleteTodo = async (id, setTodos) => {
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

    getTodos(setTodos);
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
