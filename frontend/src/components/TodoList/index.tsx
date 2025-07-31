import Todo from "../Todo";
import { updateTodo, deleteTodo } from "../../utils";
import "./index.css";

/**
 * A functional component that renders a list of todos using virtualization.
 * @param {Object} props - The props object.
 * @param {Array} props.todos - The array of todo objects to display.
 * @param {Function} props.setTodos - Function to update the list of todos.
 * @param {Object} props.rowVirtualizer - Virtualizer object for managing visible items.
 * @returns {JSX.Element} The rendered TodoList component.
 */
const TodoList = ({ todos, setTodos, rowVirtualizer }) => {
  {
    /* Only the visible items in the virtualizer, manually positioned to be in view */
  }
  return (
    <div className="todo-list">
      {rowVirtualizer.getVirtualItems().map((virtualItem) => {
        const item = todos[virtualItem.index];
        return (
          <div
            className="virtual-item"
            key={`todo-${virtualItem.key}`}
            style={{
              "--virtual-item-height": `${virtualItem.size}px`,
              "--virtual-item-translate-y": `${virtualItem.start}px`,
            }}
          >
            <Todo
              key={`todo-${item.id}`}
              todo={item}
              onToggle={(item) => updateTodo(item, setTodos)}
              onDelete={() => deleteTodo(item.id, setTodos)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
