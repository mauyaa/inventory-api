const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return <p role="status">You have no todos yet. Add one above!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={todo.completed ? 'completed' : ''}>
          <button
            type="button"
            onClick={() => onToggleTodo(todo.id)}
            aria-pressed={todo.completed}
            className="todo-toggle"
          >
            {todo.text}
          </button>
          <button
            type="button"
            onClick={() => onDeleteTodo(todo.id)}
            aria-label={`Delete ${todo.text}`}
            className="todo-delete"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
