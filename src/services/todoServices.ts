import { Todo } from "../types/Todo";

const STORAGE_KEY = 'todos';

export const TodoService = {
  // Retorna todos os Todos
  getAll(): Todo[] {
    if (typeof window === 'undefined') return [];
    
    const todosJson = localStorage.getItem(STORAGE_KEY);
    return todosJson ? JSON.parse(todosJson) : [];
  },

  // Cria um novo Todo
  create(todoData: Omit<Todo, 'id' | 'concluido' | 'createdAt' | 'updatedAt'>): Todo {
    const todos = this.getAll();
    const newTodo: Todo = {
      ...todoData,
      id: Date.now().toString(),
      concluido: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const updatedTodos = [...todos, newTodo];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    return newTodo;
  },

  // Atualiza um Todo existente
  update(id: string, updateData: Partial<Todo>): Todo | null {
    const todos = this.getAll();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) return null;
    
    const updatedTodo = {
      ...todos[todoIndex],
      ...updateData,
      updatedAt: new Date(),
    };
    
    const updatedTodos = [...todos];
    updatedTodos[todoIndex] = updatedTodo;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    
    return updatedTodo;
  },

  // Remove um Todo
  delete(id: string): boolean {
    const todos = this.getAll();
    const updatedTodos = todos.filter(todo => todo.id !== id);
    
    if (todos.length === updatedTodos.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTodos));
    return true;
  },

  // Alterna o status de completado
  toggleComplete(id: string): Todo | null {
    const todos = this.getAll();
    const todo = todos.find(t => t.id === id);
    
    if (!todo) return null;
    
    return this.update(id, {
      concluido: !todo.concluido,
    });
  },
};