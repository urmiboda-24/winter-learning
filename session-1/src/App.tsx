import React, { useState, useEffect } from "react";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem: Todo = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setIsEditing(true);
    setEditingTodo(todo);
    setNewTodo(todo.text);
  };

  const handleUpdateTodo = () => {
    if (editingTodo && newTodo.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingTodo.id ? { ...todo, text: newTodo } : todo
        )
      );
      setIsEditing(false);
      setEditingTodo(null);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="app">
      <h1>Todo App</h1>

      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        {isEditing ? (
          <button onClick={handleUpdateTodo}>Update</button>
        ) : (
          <button onClick={handleAddTodo}>Add Todo</button>
        )}
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span
              onClick={() => handleToggleComplete(todo.id)}
              className="todo-text"
            >
              {todo.text}
            </span>
            <button onClick={() => handleEditTodo(todo)} className="edit-btn">
              Edit
            </button>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
