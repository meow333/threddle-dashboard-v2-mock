"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { Check, X } from "lucide-react";

import { cn } from "./utils";

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
	iconOn?: React.ReactNode;
	iconOff?: React.ReactNode;
};

function Switch({ className, iconOn, iconOff, ...props }: SwitchProps) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(
				"peer group relative data-[state=checked]:bg-blue-900 data-[state=unchecked]:bg-slate-200 focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			{...props}
		>
			{/* <span className="pointer-events-none absolute left-1 text-muted-foreground transition-opacity duration-200 group-data-[state=checked]:opacity-0 group-data-[state=unchecked]:opacity-100">
				{iconOff || <X className="size-3.5" />}
			</span>
			<span className="pointer-events-none absolute right-1 text-primary transition-opacity duration-200 group-data-[state=checked]:opacity-100 group-data-[state=unchecked]:opacity-0">
				{iconOn || <Check className="size-3.5" />}
			</span> */}
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					"bg-card dark:data-[state=unchecked]:bg-slate-400 dark:data-[state=checked]:bg-blue-500 pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
				)}
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
