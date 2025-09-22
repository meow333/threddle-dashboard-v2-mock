"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
	TrendingUp,
	Hammer,
	AlertTriangle,
	Target,
	Clock,
	Sun,
	Moon
} from "lucide-react";
import { SidebarTrigger } from "./ui/sidebar";
import { useEffect, useState } from "react";

interface ExecutionPanelProps {
	className?: string;
}

export function ExecutionPanel({ className }: ExecutionPanelProps) {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	// Initialize from localStorage or system preference
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
		} catch (_) {
			// no-op
		}
	}, []);

	const toggleTheme = () => {
		setTheme((prev) => {
			const next = prev === "dark" ? "light" : "dark";
			try {
				localStorage.setItem("theme", next);
			} catch (_) {}
			if (typeof document !== "undefined") {
				document.documentElement.classList.toggle(
					"dark",
					next === "dark"
				);
			}
			return next;
		});
	};

	// Mock data - in a real app this would come from props or API
	const executionData = {
		topPriorityAction: "Launch Holiday Collection",
		marginImpact: "+$45,280",
		biggestThreat: "Amazon Prime Day",
		trendPeakWindow: "Next 7 days"
	};

	return (
		<div
			className={`border-b border-border bg-background px-8 py-5 transition-colors ${
				className || ""
			}`}
		>
			<div className="flex items-center justify-between">
				{/* Header */}
				<div className="flex items-center gap-3">
					<SidebarTrigger />
					<div className="p-2 bg-accent rounded-lg">
						<Target className="h-4 w-4 text-blue-200" />
					</div>
					<span className="font-medium text-foreground">
						Execution Panel
					</span>

					{/* Theme toggle */}
					<button
						aria-label="Toggle theme"
						onClick={toggleTheme}
						className="group relative inline-flex h-8 w-14 items-center rounded-full border border-border bg-input/50 backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
					>
						<span
							className={`absolute inset-0 flex items-center justify-between px-2 text-muted-foreground transition-colors`}
						>
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
							className={`absolute left-1 top-1 h-6 w-6 rounded-full bg-card shadow-sm transition-transform duration-300 ${
								theme === "dark"
									? "translate-x-6"
									: "translate-x-0"
							}`}
						/>
					</button>
				</div>

				{/* Metrics Grid */}
				<div className="flex items-center gap-8 xl:gap-12">
					{/* Top Priority Action */}
					<div className="flex items-center gap-4">
						<div className="p-2 bg-accent rounded-lg">
							<TrendingUp className="h-6 w-6 text-blue-200" />
						</div>
						<div>
							<span className="text-xs font-medium text-muted-foreground block uppercase tracking-wider">
								TOP PRIORITY
							</span>
							<span className="text-sm font-medium text-foreground">
								{executionData.topPriorityAction}
							</span>
						</div>
					</div>

					{/* Margin Impact */}
					<div className="flex items-center gap-4">
						<div className="p-2 bg-accent rounded-lg">
							<Hammer className="h-6 w-6 text-blue-200" />
						</div>
						<div>
							<span className="text-xs font-medium text-muted-foreground block uppercase tracking-wider">
								MARGIN IMPACT
							</span>
							<span className="font-medium text-primary">
								{executionData.marginImpact}
							</span>
						</div>
					</div>

					{/* Biggest Competitor Threat */}
					<div className="flex items-center gap-4">
						<div className="p-2 bg-accent rounded-lg">
							<AlertTriangle className="h-6 w-6 text-blue-200" />
						</div>
						<div>
							<span className="text-xs font-medium text-muted-foreground block uppercase tracking-wider">
								THREAT
							</span>
							<Badge
								variant="secondary"
								className="text-foreground border border-border font-normal"
							>
								{executionData.biggestThreat}
							</Badge>
						</div>
					</div>

					{/* Trend Peak Window */}
					<div className="flex items-center gap-4">
						<div className="p-2 bg-accent rounded-lg">
							<Clock className="h-6 w-6 text-blue-200" />
						</div>
						<div>
							<span className="text-xs font-medium text-muted-foreground block uppercase tracking-wider">
								PEAK WINDOW
							</span>
							<span className="text-sm font-medium text-primary">
								{executionData.trendPeakWindow}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
