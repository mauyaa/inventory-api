import { useState } from "react";
import AddTodoForm from "./AddTodoForm";

let nextId = 4;

const initialTodos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Write tests", completed: true },
  { id: 3, text: "Ship feature", completed: false },
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (text) => {
    setTodos((prev) => [{ id: nextId++, text, completed: false }, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <section>
      <AddTodoForm onAdd={addTodo} />
      <ul aria-label="todo-list">
        {todos.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => toggleTodo(t.id)}
              aria-pressed={t.completed}
              aria-label={`toggle ${t.text}`}
              className={t.completed ? "completed" : ""}
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                background: "transparent",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              {t.text}
            </button>
            <button
              type="button"
              onClick={() => deleteTodo(t.id)}
              aria-label={`Delete ${t.text}`}
              style={{ marginLeft: ".75rem" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
