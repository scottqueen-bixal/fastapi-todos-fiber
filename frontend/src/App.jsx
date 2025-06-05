import { useEffect, useState, useRef, useMemo, lazy, Suspense } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { getTodos, createTodo } from "./utils";
import "./App.css";

const TodoList = lazy(() => import("./components/TodoList"));

function App() {
  const [todos, setTodos] = useState(() => []);
  const inputTask = useRef();
  const parentRef = useRef(null);

  const memoizedTodos = useMemo(() => todos, [todos]);
  const memoizedTodosList = useMemo(() => {
    return memoizedTodos.filter((todo) => !todo.is_completed);
  }, [memoizedTodos]);
  const memoizedCompletedList = useMemo(() => {
    return memoizedTodos.filter((todo) => todo.is_completed);
  }, [memoizedTodos]);

  // virtualizer
  const rowVirtualizerTodos = useVirtualizer({
    count: memoizedTodosList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  const rowVirtualizerCompleted = useVirtualizer({
    count: memoizedCompletedList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  const handleCreateTodo = (e) => {
    e.preventDefault();
    createTodo(inputTask.current.value, setTodos);
    inputTask.current.value = "";
    inputTask.current.focus();
  };

  useEffect(() => {
    getTodos(setTodos);
  }, []);

  return (
    <div className="todo-app">
      <form className="todo-form" onSubmit={handleCreateTodo}>
        <input ref={inputTask} />
        <button type="submit">Create Todo</button>
      </form>
      <div className="todo-list-container" ref={parentRef}>
        <div className="todo">
          <div
            style={{
              "--virtual-group-height": `${rowVirtualizerTodos.getTotalSize()}px`,
            }}
          >
            <Suspense fallback={<div>Loading Todos...</div>}>
              <TodoList
                todos={memoizedTodosList}
                setTodos={setTodos}
                rowVirtualizer={rowVirtualizerTodos}
              />
            </Suspense>
          </div>
        </div>
        <div className="completed">
          <div
            style={{
              "--virtual-group-height": `${rowVirtualizerCompleted.getTotalSize()}px`,
            }}
          >
            <Suspense fallback={<div>Loading Todos...</div>}>
              <TodoList
                todos={memoizedCompletedList}
                setTodos={setTodos}
                rowVirtualizer={rowVirtualizerCompleted}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
