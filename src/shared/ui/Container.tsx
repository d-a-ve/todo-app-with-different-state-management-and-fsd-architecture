import { cn } from "@shared/lib/utils"
import { type PropsWithChildren } from "react"


export function MaxContainer({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) {
	return <div className={cn("max-w-[1440px] mx-auto", className)}>{children}</div>
}

export function InlinePaddingContainer({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) {
	return (
		<div
			className={cn("w-full px-4 xs:px-6 md:px-8", className)}
		>
			{children}
		</div>
	)
}
