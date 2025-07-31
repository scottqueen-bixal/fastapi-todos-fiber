export type Todo = {
  id: string;
  task: string;
  is_completed: boolean;
};

export type TodoListProps = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  rowVirtualizer: {
    getVirtualItems: () => Array<{
      index: number;
      key: string | number | bigint;
      size: number;
      start: number;
    }>;
  };
};
