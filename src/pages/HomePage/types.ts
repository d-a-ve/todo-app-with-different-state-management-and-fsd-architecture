import type { TODO_STATUS } from "./constants"

export type Todo = {
	title: string
	description?: string
	status: typeof TODO_STATUS.NOT_STARTED | typeof TODO_STATUS.COMPLETED
}
