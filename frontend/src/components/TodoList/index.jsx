import Todo from "../Todo";
import { updateTodo, deleteTodo } from "../../utils";
import "./index.css";

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
