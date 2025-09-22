"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		try {
			const stored = localStorage.getItem("theme");
			const prefersDark =
				window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches;
			const next =
				(stored as "light" | "dark" | null) ||
				(prefersDark ? "dark" : "light");
			setTheme(next);
			document.documentElement.classList.toggle("dark", next === "dark");
		} catch {}
	}, []);

	const toggleTheme = () => {
		setTheme((prev) => {
			const next = prev === "dark" ? "light" : "dark";
			try {
				localStorage.setItem("theme", next);
			} catch {}
			if (typeof document !== "undefined") {
				document.documentElement.classList.toggle(
					"dark",
					next === "dark"
				);
			}
			return next;
		});
	};

	return (
		<button
			aria-label="Toggle theme"
			onClick={toggleTheme}
			className={`group relative inline-flex h-8 w-16 items-center rounded-full border border-border bg-blue-900 backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 ${className}`}
		>
			<span className="absolute inset-0 flex items-center justify-between px-2 text-white transition-colors">
				<Sun
					className={`h-4 w-4 transform transition-all duration-300 ${
						theme !== "dark"
							? "opacity-0 -translate-y-1 scale-90"
							: "opacity-100 translate-y-0 scale-100"
					}`}
				/>
				<Moon
					className={`h-4 w-4 transform transition-all duration-300 ${
						theme !== "dark"
							? "opacity-100 translate-y-0 scale-100"
							: "opacity-0 translate-y-1 scale-90"
					}`}
				/>
			</span>
			<span
				className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-blue-500 dark:bg-blue-500 shadow-sm transition-transform duration-300 ${
					theme === "dark" ? "translate-x-8" : "translate-x-0"
				}`}
			/>
		</button>
	);
}
