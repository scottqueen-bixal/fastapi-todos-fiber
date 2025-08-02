import type { Todo } from './types';

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
const TodoComponent: React.FC<{ todo: Todo; onDelete: (id: Partial<Todo>) => void; onToggle: (todo: Partial<Todo>) => void }> = ({ todo, onDelete, onToggle }) => {
  console.log(todo, todo.id);
  return (
    <div className='todo-item-wrapper'>
      <div className={`todo-item-task ${todo.is_completed ? "completed" : ""}`}>{todo.task}</div>
      <div className='todo-item-actions'>
      <input
        className='todo-item-checkbox'
        type="checkbox"
        id={todo.id}
        checked={todo.is_completed}
        onChange={() =>
          onToggle({ id: todo.id, is_completed: !todo.is_completed })
        }
      />
      <button className='delete-button' onClick={() => onDelete({ id: todo.id })}>Delete</button>
      </div>
    </div>
  );
};

export default TodoComponent;
