import type { Todo } from "../types";

export function addTodoToStorage(todo: Todo[]) {
  localStorage.setItem("todos", JSON.stringify(todo));
}

export function getTodosFromStorage(): Todo[] {
  const todos = localStorage.getItem("todos");
  return todos ? JSON.parse(todos) : [];
}