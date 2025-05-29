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
