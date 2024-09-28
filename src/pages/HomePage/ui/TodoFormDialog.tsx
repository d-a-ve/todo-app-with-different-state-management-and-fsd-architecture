import type { Todo } from "../types"
import type { FormEvent, ReactNode } from "react"

import { useCallback, useState } from "react"

import { cn } from "@shared/lib/utils"
import { Button } from "@shared/ui/Button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@shared/ui/dialog"

const DEFAULT_TODO = {
	title: "",
	description: "",
}

export function TodoFormDialog({
	trigger,
	title,
	defaultTodo = DEFAULT_TODO,
	onSubmit,
}: {
	trigger: ReactNode
	title: string
	defaultTodo?: Omit<Todo, "status">
	onSubmit: (todo: Omit<Todo, "status">) => void
}) {
	const [open, setOpen] = useState(false)
	const [titleError, setTitleError] = useState<string | null>(null)

	const dialogOpenHandler = useCallback((isOpen: boolean) => {
		if (isOpen) return setOpen(true)

		setTitleError(null)
		return setOpen(false)
	}, [])

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		let title = formData.get("title")

		if (!title) {
			return setTitleError("Please add a title")
		}

		title = title.toString()

		if (title.trim().length < 1) {
			return setTitleError("Title cannot be empty, please add a title")
		}

		const description = formData.get("description")?.toString()
		setTitleError(null)
		setOpen(false)
		void onSubmit({ title, description })
	}

	return (
		<Dialog open={open} onOpenChange={dialogOpenHandler}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogTitle>{title}</DialogTitle>
				<form className="space-y-4" onSubmit={submitHandler}>
					<div className="space-y-2">
						<label>Title</label>
						<input
							className={cn("w-full", {
								"border-red-500": titleError,
							})}
							name="title"
							defaultValue={defaultTodo.title}
						/>
						{titleError && <p className="text-sm text-red-500">{titleError}</p>}
					</div>
					<div className="space-y-2">
						<label>
							Description <span className="text-gray-400">(Optional)</span>
						</label>
						<textarea
							className="w-full h-28 resize-none"
							name="description"
							defaultValue={defaultTodo.description}
						/>
					</div>
					<DialogFooter className="pt-4">
						<DialogClose asChild>
							<Button type="button" intent={"destructive"} className="w-full">
								Cancel
							</Button>
						</DialogClose>
						<Button className="w-full" type="submit">
							Add
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
