import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList from "../components/TodoList";

describe("TodoList", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
    expect(screen.getByText("Ship feature")).toBeInTheDocument();
    expect(screen.getByRole("list", { name: /todo-list/i })).toBeInTheDocument();
  });

  test("adds a new todo", async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const input = screen.getByPlaceholderText(/e\.g\., read a chapter/i);
    const addBtn = screen.getByRole("button", { name: /add/i });
    await user.type(input, "Practice RTL");
    await user.click(addBtn);
    expect(screen.getByText("Practice RTL")).toBeInTheDocument();
  });

  test("toggles a todo when its text is clicked", async () => {
    const user = userEvent.setup();
    render(<TodoList />);
    const toggleBtn = screen.getByRole("button", { name: /toggle learn react/i });
    expect(toggleBtn).not.toHaveClass("completed");
    expect(toggleBtn).toHaveAttribute("aria-pressed", "false");
    await user.click(toggleBtn);
    expect(toggleBtn).toHaveClass("completed");
    expect(toggleBtn).toHaveAttribute("aria-pressed", "true");
    await user.click(toggleBtn);
    expect(toggleBtn).not.toHaveClass("completed");
    expect(toggleBtn).toHaveAttribute("aria-pressed", "false");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    expect(screen.getByText("Ship feature")).toBeInTheDocument();
    const delBtn = screen.getByRole("button", { name: /delete ship feature/i });
    fireEvent.click(delBtn);
    expect(screen.queryByText("Ship feature")).not.toBeInTheDocument();
  });
});
