import type { VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

import { forwardRef } from "react"

import { cva } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

import { cn } from "@shared/lib/utils"

const buttonVariants = cva(
	"relative px-4 py-3 flex items-center justify-center gap-5 rounded-md text-white font-medium leading-[1.2em] disabled:bg-opacity-40 disabled:cursor-not-allowed transition-all duration-150 ease-in border border-solid",
	{
		variants: {
			intent: {
				primary:
					"bg-blue-600 hover:bg-blue-500 border-blue-600 hover:border-blue-500",
				destructive:
					"bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600",
			},
			size: {
				sm: "text-sm py-1.5 px-4",
				md: "text-base py-2 px-6",
				lg: "text-lg py-2.5 px-7",
			},
		},
		defaultVariants: {
			intent: "primary",
			size: "md",
		},
	},
)

interface ButtonVariants
	extends DetailedHTMLProps<
			ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		>,
		VariantProps<typeof buttonVariants> {}

export interface ButtonProps extends ButtonVariants {
	className?: string
	leftIcon?: ReactNode
	rightIcon?: ReactNode
	isLoading?: boolean
	disabled?: boolean
	spinnerColor?: string
	children: ReactNode
	spinnerSize?: string | number
}

export const Button = forwardRef(function Button(
	{
		isLoading,
		disabled,
		leftIcon,
		rightIcon,
		className,
		spinnerSize,
		children,
		...props
	}: ButtonProps,
	ref: React.Ref<HTMLButtonElement>,
) {
	return (
		<button
			type="button"
			disabled={(isLoading ?? disabled) || disabled}
			className={twMerge(
				buttonVariants(props),
				isLoading ? "opacity-0" : "opacity-1",
				className,
			)}
			ref={ref}
			{...props}
		>
			<div className="absolute top-0 flex h-full w-full flex-col items-center justify-center">
				<svg
					width={spinnerSize ?? "20"}
					height={spinnerSize ?? "20"}
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					className={cn(
						"animate-spin transition delay-[.2] ",
						isLoading ? "opacity-1 visible" : "hidden opacity-0",
					)}
				>
					<path
						fill="currentColor"
						d="M12 21a9 9 0 1 1 6.18-15.55a.75.75 0 0 1 0 1.06a.74.74 0 0 1-1.06 0A7.51 7.51 0 1 0 19.5 12a.75.75 0 0 1 1.5 0a9 9 0 0 1-9 9Z"
					/>
				</svg>
			</div>
			{leftIcon}
			{children}
			{rightIcon && (
				<span
					style={{
						opacity: isLoading ? 0 : 1,
					}}
				>
					{rightIcon}
				</span>
			)}
		</button>
	)
})
