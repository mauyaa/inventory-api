import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the todo list heading', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /todo list/i })
  ).toBeInTheDocument();
});
