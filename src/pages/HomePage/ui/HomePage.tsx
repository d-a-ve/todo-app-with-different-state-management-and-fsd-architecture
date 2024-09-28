import type { Todo } from "../types"

import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

import { cn } from "@shared/lib/utils"
import { Button } from "@shared/ui/Button"
import { InlinePaddingContainer, MaxContainer } from "@shared/ui/Container"

import { TODO_STATUS } from "../constants"
import { addTodoToStorage, getTodosFromStorage } from "../lib/utils"
import { TodoFormDialog } from "./TodoFormDialog"

export const HomePage = () => {
	const [todos, setTodos] = useState<Todo[]>(getTodosFromStorage)

	useEffect(() => {
		addTodoToStorage(todos)
	}, [todos])

	const addTodo = (todo: Omit<Todo, "status">) => {
		setTodos((prev) => [...prev, { ...todo, status: TODO_STATUS.NOT_STARTED }])
	}

	const updateTodo = (updatedTodo: Omit<Todo, "status">, todo: Todo) => {
		setTodos((prev) =>
			prev.map((prevTodo) =>
				prevTodo.title === todo.title
					? { ...prevTodo, ...updatedTodo }
					: prevTodo,
			),
		)
	}

	return (
		<MaxContainer>
			<InlinePaddingContainer className="max-w-3xl mx-auto py-6 space-y-6">
				<div className="flex items-center justify-between gap-4">
					<div className="space-y-1">
						<h1 className="font-semibold text-xl">Todo App</h1>
						<p className="text-sm">
							Add the activities, chores, and things you want to do.
						</p>
					</div>
					{todos.length > 0 && (
						<TodoFormDialog
							onSubmit={addTodo}
							trigger={
								<Button size={"sm"} className="shrink-0">
									Add Todo
								</Button>
							}
							title="Add a new todo"
						/>
					)}
				</div>
				<div className="space-y-4">
					<h2 className="font-medium text-lg">Your Todos</h2>
					{todos.length === 0 && (
						<div className="space-y-4 max-w-sm text-center mx-auto py-8">
							<p className="italic text-sm">
								No todos added yet, add some todos to get started.
							</p>
							<div>
								<TodoFormDialog
									onSubmit={addTodo}
									trigger={
										<Button size={"md"} className="w-full">
											Add a todo
										</Button>
									}
									title="Add a new todo"
								/>
							</div>
						</div>
					)}
					{todos.length > 0 &&
						todos.map((todo) => {
							const isTodoCompleted = todo.status === "completed"
							return (
								<article
									className="flex gap-3 items-start bg-blue-50/40 p-4 rounded-md"
									key={todo.title}
								>
									<div className="size-4 shrink-0">
										<input
											type="checkbox"
											className="w-full"
											checked={isTodoCompleted}
											value={todo.status}
											onChange={(e) => {
												setTodos((prev) =>
													prev.map((prevTodo) =>
														prevTodo.title === todo.title
															? {
																	...prevTodo,
																	status: e.target.checked
																		? TODO_STATUS.COMPLETED
																		: TODO_STATUS.NOT_STARTED,
																}
															: prevTodo,
													),
												)
											}}
										/>
									</div>
									<div className="grow justify-between gap-4 flex items-center">
										<div
											className={cn("space-y-1", {
												"line-through": isTodoCompleted,
											})}
										>
											<h3 className="font-medium">{todo.title}</h3>
											{todo.description && (
												<p className="text-sm">{todo.description}</p>
											)}
										</div>
										<div className="shrink-0 space-x-2">
											<TodoFormDialog
												trigger={
													<button className="border border-gray-200 py-1 px-3 rounded-md text-xs hover:bg-white duration-150">
														<span className="max-xs:hidden">Edit</span>
														<Pencil2Icon className="size-5 xs:hidden" />
													</button>
												}
												title="Edit Todo"
												onSubmit={(updatedTodo) =>
													updateTodo(updatedTodo, todo)
												}
												defaultTodo={todo}
											/>

											<button
												className="border border-gray-200 py-1 px-3 rounded-md text-xs hover:bg-white duration-150 text-red-500"
												onClick={() =>
													setTodos((prev) =>
														prev.filter(
															(prevTodo) => prevTodo.title !== todo.title,
														),
													)
												}
											>
												<span className="max-xs:hidden">Delete</span>
												<TrashIcon className="size-5 xs:hidden" />
											</button>
										</div>
									</div>
								</article>
							)
						})}
				</div>
			</InlinePaddingContainer>
		</MaxContainer>
	)
}
