import type { Todo, TodoData } from "../types"

import { useReducer } from "react"

import { TODO_STATUS } from "../constants"
import { addTodoToStorage, getTodosFromStorage, id } from "../lib/utils"

type TodoAddAction = {
	type: "ADD_TODO"
	payload: Todo
}

type TodoUpdateAction = {
	type: "UPDATE_TODO"
	payload: Partial<Todo>
}

type TodoDeleteAction = {
	type: "DELETE_TODO"
	payload: { id: string }
}

type TodoAction = TodoAddAction | TodoUpdateAction | TodoDeleteAction

const todosReducer = (state: Todo[], action: TodoAction) => {
	let newTodos: Todo[]

	switch (action.type) {
		case "ADD_TODO":
			newTodos = [action.payload, ...state]
			addTodoToStorage(newTodos)
			return newTodos

		case "UPDATE_TODO":
			newTodos = state.map((todo) =>
				todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
			)
			addTodoToStorage(newTodos)
			return newTodos

		case "DELETE_TODO":
			newTodos = state.filter((todo) => todo.id !== action.payload.id)
			addTodoToStorage(newTodos)
			return newTodos

		default:
			return state
	}
}

export function useTodos() {
	const [todos, dispatchTodos] = useReducer(
		todosReducer,
		[],
		getTodosFromStorage,
	)

	const addTodo = (todo: TodoData) => {
		dispatchTodos({
			type: "ADD_TODO",
			payload: { ...todo, status: TODO_STATUS.NOT_STARTED, id: id() },
		})
	}

	const updateTodo = (updatedTodo: TodoData, todoId: string) => {
		dispatchTodos({
			type: "UPDATE_TODO",
			payload: { id: todoId, ...updatedTodo },
		})
	}

	const updateTodoStatus = (isChecked: boolean, todoId: string) => {
		dispatchTodos({
			type: "UPDATE_TODO",
			payload: {
				id: todoId,
				status: isChecked ? TODO_STATUS.COMPLETED : TODO_STATUS.NOT_STARTED,
			},
		})
	}

	const deleteTodo = (todoId: string) => {
		dispatchTodos({ type: "DELETE_TODO", payload: { id: todoId } })
	}

	return {
		todos,
		addTodo,
		updateTodo,
		updateTodoStatus,
		deleteTodo,
	}
}
