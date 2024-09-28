import type { TODO_STATUS } from "./constants"

export type Todo = {
	id: string
	title: string
	description?: string
	status: typeof TODO_STATUS.NOT_STARTED | typeof TODO_STATUS.COMPLETED
}

export type TodoData = {
	title: string
	description?: string
}
