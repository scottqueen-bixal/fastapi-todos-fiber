// This file contains utility functions for fetching, creating, updating, and deleting todos.
// It uses the Fetch API to interact with a backend service.
import { todosPath } from "./constants";

/**
 * Fetches the list of todos from the backend and updates the state.
 * @param {Function} setTodos - Function to update the state with the fetched todos.
 * @returns {Promise<void>} A promise that resolves when the todos are fetched.
 */
const getTodos = async (setTodos) => {
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

/**
 * Creates a new todo and updates the state with the updated list of todos.
 * @param {string} task - The task description for the new todo.
 * @param {Function} setTodos - Function to update the state with the updated todos.
 * @returns {Promise<void>} A promise that resolves when the todo is created.
 */
const createTodo = async (task, setTodos) => {
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
const updateTodo = async (updatedTodo, setTodos) => {
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
const deleteTodo = async (id, setTodos) => {
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

export { getTodos, createTodo, updateTodo, deleteTodo };
