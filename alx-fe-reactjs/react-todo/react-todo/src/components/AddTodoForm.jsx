import { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    onAddTodo(trimmed);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Add todo form">
      <label htmlFor="todo-input">Add a new todo</label>
      <div className="todo-form">
        <input
          id="todo-input"
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="e.g. Finish writing tests"
        />
        <button type="submit" disabled={!text.trim()}>
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTodoForm;
