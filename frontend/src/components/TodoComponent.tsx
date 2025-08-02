import { useState } from 'react';
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
 * @param {Function} props.onEdit - Callback function to handle editing the todo.
 * @returns {JSX.Element} The rendered todo component.
 */
const TodoComponent: React.FC<{ todo: Todo; onDelete: (id: Partial<Todo>) => void; onToggle: (todo: Partial<Todo>) => void; onEdit: (todo: Partial<Todo>) => void }> = ({ todo, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit({ id: todo.id, task: editedTask });
    setIsEditing(false);
  };

  return (
    <div className='todo-item-wrapper'>
      {isEditing ? (
        <input
          className='todo-item-edit-input'
          type='text'
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
          onBlur={handleSave}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSave();
          }}
          autoFocus
        />
      ) : (
        <div className={`todo-item-task ${todo.is_completed ? 'completed' : ''}`} onClick={handleEdit}>
          {todo.task}
        </div>
      )}
      {!isEditing && (
        <div className='todo-item-actions'>
          <input
            className='todo-item-checkbox'
            type='checkbox'
            id={todo.id}
            checked={todo.is_completed}
            onChange={() =>
              onToggle({ id: todo.id, is_completed: !todo.is_completed })
            }
          />
          <button className='delete-button' onClick={() => onDelete({ id: todo.id })}></button>
        </div>
      )}
    </div>
  );
};

export default TodoComponent;
