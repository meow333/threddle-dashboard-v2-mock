import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// const badgeVariants = cva(
// 	"inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/60 dark:aria-invalid:ring-destructive/40 transition-[color,box-shadow] overflow-hidden",
// 	{
// 		variants: {
// 			variant: {
// 				// Primary state: solid text, 20% tinted background, and border
// 				default: "text-primary bg-primary/60 border border-primary",
// 				// Neutral/secondary state
// 				secondary:
// 					"text-secondary-foreground bg-secondary/60 border border-secondary",
// 				// Destructive state
// 				destructive:
// 					"text-destructive bg-destructive/60 border border-destructive",
// 				// Outline treated as neutral state with 20% tint as requested
// 				outline:
// 					"text-foreground bg-foreground/60 border border-foreground",
// 				// Additional semantic states
// 				success:
// 					"text-green-600 bg-green-600/60 border border-green-600",
// 				warning:
// 					"text-amber-600 bg-amber-600/60 border border-amber-600",
// 				info: "text-blue-600 bg-blue-600/60 border border-blue-600"
// 			}
// 		},
// 		defaultVariants: {
// 			variant: "default"
// 		}
// 	}
// );

const badgeVariants = cva(
	"inline-flex items-center justify-center rounded-md uppercase px-2 py-0.5 text-xs tracking-wide font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/60 dark:aria-invalid:ring-destructive/40 transition-[color,box-shadow] overflow-hidden",
	{
		variants: {
			variant: {
				// Core
				default:
					"text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/30",
				secondary:
					"text-muted-foreground bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700",
				outline:
					"text-foreground border border-slate-200 dark:border-slate-800",
				destructive:
					"text-red-500 bg-red-500/20 border border-red-500/30",

				// Semantic
				success:
					"text-green-500 bg-green-500/20 border border-green-500",
				warning:
					"text-amber-500 bg-amber-500/20 border border-amber-500",
				info: "text-blue-500 bg-blue-500/20 border border-blue-500",
				neutral: "text-zinc-500 bg-slate-500/20 border border-slate-500" // explicit neutral
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
);

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<"span"> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : "span";

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };
