import Todo from "./Todo";
import { updateTodo, deleteTodo } from "../utils";

const TodoList = ({ todos, setTodos, rowVirtualizer }) => {
  {
    /* Only the visible items in the virtualizer, manually positioned to be in view */
  }
  return (
    <div className="todos">
      <div className="todo-list">
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const item = todos[virtualItem.index];
          return (
            <div
              key={`todo-${virtualItem.key}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
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
    </div>
  );
};

export default TodoList;
