import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
		<div className="flex flex-1 items-center">
        <div
          className="w-full relative before:pointer-events-none focus-within:before:opacity-100 before:opacity-0 before:absolute before:-inset-1 before:rounded-[12px] before:border before:border-[#77f6aa]/70 before:ring-2 before:ring-[#77f6aa]/5 before:transition
after:pointer-events-none after:absolute after:inset-px after:rounded-[7px] after:shadow-highlight after:shadow-white/5 focus-within:after:shadow-[#77f6aa] after:transition"
        >
				<textarea
					data-slot="textarea"
					className={cn(
						"relative text-sm text-neutral-200 bg-neutral-750 placeholder:text-neutral-500 px-3.5 py-2 rounded-lg border border-black/5 shadow-input shadow-black/10 !outline-none flex field-sizing-content w-full min-h-20",
						className
					)}
					{...props}
				/>
				</div>
			</div>
			// border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm
  )
}

export { Textarea }
