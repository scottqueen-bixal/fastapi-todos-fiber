/**
 * A functional component that represents a single todo item.
 * @param {Object} props - The props object.
 * @param {Object} props.todo - The todo object containing details about the task.
 * @param {number} props.todo.id - The unique identifier for the todo.
 * @param {string} props.todo.task - The task description of the todo.
 * @param {boolean} props.todo.is_completed - Indicates whether the todo is completed.
 * @param {Function} props.onDelete - Callback function to handle the deletion of the todo.
 * @param {Function} props.onToggle - Callback function to handle toggling the completion status of the todo.
 * @returns {JSX.Element} The rendered todo component.
 */
const Todo = ({ todo, onDelete, onToggle }) => {
  console.log(todo, todo.id);
  return (
    <div>
      <input
        type="checkbox"
        id={todo.id}
        checked={todo.is_completed}
        onChange={() =>
          onToggle({ id: todo.id, is_completed: !todo.is_completed })
        }
      />
      {todo.task}
      <button onClick={() => onDelete({ id: todo.id })}>Delete</button>
    </div>
  );
};

export default Todo;
