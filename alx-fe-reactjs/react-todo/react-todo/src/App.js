import { useState } from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';
import './App.css';

const initialTodos = [
  { id: 'todo-1', text: 'Review project requirements', completed: false },
  { id: 'todo-2', text: 'Implement todo list component', completed: false },
  { id: 'todo-3', text: 'Write component tests', completed: true },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  const handleAddTodo = (text) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: `todo-${Date.now()}`,
        text,
        completed: false,
      },
    ]);
  };

  const handleToggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
};

export default App;
