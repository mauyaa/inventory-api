import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

const renderApp = () => render(<App />);

test('renders the initial list of todos', () => {
  renderApp();
  expect(
    screen.getByRole('button', { name: /^Review project requirements$/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /^Implement todo list component$/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /^Write component tests$/i })
  ).toBeInTheDocument();
});

test('allows users to add a new todo item', () => {
  renderApp();
  const input = screen.getByLabelText(/add a new todo/i);
  fireEvent.change(input, { target: { value: 'Ship the release' } });
  fireEvent.click(screen.getByRole('button', { name: /add/i }));

  expect(
    screen.getByRole('button', { name: /^Ship the release$/i })
  ).toBeInTheDocument();
  expect(input).toHaveValue('');
});

test('allows users to toggle a todo item', () => {
  renderApp();
  const todoButton = screen.getByRole('button', {
    name: /^Implement todo list component$/i,
  });

  expect(todoButton).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(todoButton);
  expect(todoButton).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(todoButton);
  expect(todoButton).toHaveAttribute('aria-pressed', 'false');
});

test('allows users to delete a todo item', () => {
  renderApp();
  const todoText = /^Review project requirements$/i;
  expect(
    screen.getByRole('button', { name: todoText })
  ).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /delete review project requirements/i }));

  expect(
    screen.queryByRole('button', { name: todoText })
  ).not.toBeInTheDocument();
});
