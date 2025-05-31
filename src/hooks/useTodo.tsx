// src/hooks/useTodos.ts
import { useEffect, useState } from "react";
import { Todo } from "../types/Todo";
import { TodoService } from "../services/todoServices";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTodos(TodoService.getAll());
    setLoading(false);
  }, []);

  const addTodo = (
    todoData: Omit<Todo, "id" | "concluido" | "createdAt" | "updatedAt">
  ) => {
    const newTodo = TodoService.create(todoData);
    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodo = (id: string, updateData: Partial<Todo>) => {
    const updatedTodo = TodoService.update(id, updateData);
    if (updatedTodo) {
      setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
    }
  };

  const deleteTodo = (id: string) => {
    if (TodoService.delete(id)) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const toggleComplete = (id: string) => {
    const updatedTodo = TodoService.toggleComplete(id);
    if (updatedTodo) {
      setTodos((prev) => prev.map((t) => (t.id === id ? updatedTodo : t)));
    }
  };

  return {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
  };
};
