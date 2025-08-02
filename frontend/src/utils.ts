// This file contains utility functions for fetching, creating, updating, and deleting todos.
// It uses the Fetch API to interact with a backend service.
import { todosPath } from "./constants";
import type { Todo } from "./components/types";

/**
 * Fetches the list of todos from the backend and updates the state.
 * @param {Function} setTodos - Function to update the state with the fetched todos.
 * @returns {Promise<void>} A promise that resolves when the todos are fetched.
 */
const getTodos = async (setTodos: (todos: Todo[]) => void): Promise<void> => {
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

    const data: Todo[] = await response.json();
    setTodos(data);
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

/**
 * Creates a new todo and updates the state with the updated list of todos.
 * @param {string} task - The task description for the new todo.
 * @param {Function} setTodos - Function to update the state with the updated todos.
 * @returns {Promise<void>} A promise that resolves when the todo is created.
 */
const createTodo = async (task: string, setTodos: (todos: Todo[]) => void): Promise<void> => {
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

/**
 * Updates an existing todo and updates the state with the updated list of todos.
 * @param {Object} updatedTodo - The updated todo object.
 * @param {number} updatedTodo.id - The unique identifier of the todo to update.
 * @param {string} updatedTodo.task - The updated task description.
 * @param {boolean} updatedTodo.is_completed - The updated completion status.
 * @param {Function} setTodos - Function to update the state with the updated todos.
 * @returns {Promise<void>} A promise that resolves when the todo is updated.
 */
const updateTodo = async (updatedTodo: Partial<Todo>, setTodos: (todos: Todo[]) => void): Promise<void> => {
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

/**
 * Deletes a todo and updates the state with the updated list of todos.
 * @param {number} id - The unique identifier of the todo to delete.
 * @param {Function} setTodos - Function to update the state with the updated todos.
 * @returns {Promise<void>} A promise that resolves when the todo is deleted.
 */
const deleteTodo = async (id: number, setTodos: (todos: Todo[]) => void): Promise<void> => {
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

/**
 * Edits an existing todo's task and updates the state with the updated list of todos.
 * @param {Object} editedTodo - The edited todo object.
 * @param {number} editedTodo.id - The unique identifier of the todo to edit.
 * @param {string} editedTodo.task - The updated task description.
 * @param {Function} setTodos - Function to update the state with the updated todos.
 * @returns {Promise<void>} A promise that resolves when the todo is edited.
 */
const editTodo = async (editedTodo: Partial<Todo>, setTodos: (todos: Todo[]) => void) => {
  const { id } = editedTodo;

  try {
    const response = await fetch(`${todosPath}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTodo),
    });

    if (!response.ok) {
      throw new Error("Failed to edit todo");
    }

    getTodos(setTodos);
  } catch (error) {
    console.error("Error editing todo:", error);
  }
};

export { getTodos, createTodo, updateTodo, deleteTodo, editTodo };
