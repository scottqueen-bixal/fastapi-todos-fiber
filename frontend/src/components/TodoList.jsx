import Todo from "./Todo";
import { updateTodo, deleteTodo } from "../utils";

const TodoList = ({ todos, setTodos }) => {
  return (
    <div className="todos">
      <div className="todo-list">
        {todos.map(
          (todo) =>
            !todo.is_completed && (
              <Todo
                key={todo.id}
                todo={todo}
                onToggle={(todo) => updateTodo(todo, setTodos)}
                onDelete={() => deleteTodo(todo.id, setTodos)}
              />
            )
        )}
      </div>
      <div className="completed-list">
        {todos.map(
          (todo) =>
            todo.is_completed && (
              <Todo
                key={todo.id}
                todo={todo}
                onToggle={(todo) => updateTodo(todo, setTodos)}
                onDelete={() => deleteTodo(todo.id, setTodos)}
              />
            )
        )}
      </div>
    </div>
  );
};

export default TodoList;
