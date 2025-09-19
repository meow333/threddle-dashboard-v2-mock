import { motion } from "motion/react";
import { CheckCircle } from "lucide-react";

interface AnimatedCheckProps {
	size?: "sm" | "md" | "lg" | "xl";
	className?: string;
	animate?: boolean;
}

const sizeClasses = {
	sm: "h-6 w-6",
	md: "h-8 w-8",
	lg: "h-12 w-12",
	xl: "h-16 w-16"
};

export function AnimatedCheck({
	size = "lg",
	className = "",
	animate = true
}: AnimatedCheckProps) {
	const baseSize = sizeClasses[size];

	if (!animate) {
		return (
			<CheckCircle
				className={`${baseSize} text-green-500 ${className}`}
			/>
		);
	}

	return (
		<div className={`relative ${baseSize} ${className}`}>
			{/* Animated background circle */}
			<motion.div
				className="absolute inset-0 rounded-full bg-green-500/20"
				initial={{ scale: 0, opacity: 0 }}
				animate={{
					scale: [0, 1.2, 1],
					opacity: [0, 0.8, 0.3]
				}}
				transition={{
					duration: 0.6,
					ease: "easeOut"
				}}
			/>

			{/* Pulsing ring effect */}
			<motion.div
				className="absolute inset-0 rounded-full border border-green-500"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{
					scale: [0.8, 1.1, 1],
					opacity: [0, 1, 1]
				}}
				transition={{
					duration: 0.5,
					ease: "easeOut",
					delay: 0.1
				}}
			/>

			{/* Main check icon with sophisticated animation */}
			<motion.div
				className="relative flex items-center justify-center h-full w-full"
				initial={{ scale: 0, rotate: -180 }}
				animate={{
					scale: [0, 1.1, 1],
					rotate: [-180, 10, 0]
				}}
				transition={{
					duration: 0.7,
					ease: "easeOut",
					delay: 0.2
				}}
			>
				<svg
					className={`${baseSize} text-green-500`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					{/* Circle background */}
					<motion.circle
						cx="12"
						cy="12"
						r="10"
						strokeWidth="2"
						fill="rgb(34 197 94)"
						initial={{ pathLength: 0, opacity: 0 }}
						animate={{ pathLength: 1, opacity: 1 }}
						transition={{
							duration: 0.4,
							ease: "easeInOut",
							delay: 0.3
						}}
					/>

					{/* Checkmark path with draw-on animation */}
					<motion.path
						d="M9 12l2 2 4-4"
						strokeWidth="2.5"
						stroke="white"
						strokeLinecap="round"
						strokeLinejoin="round"
						fill="none"
						initial={{ pathLength: 0 }}
						animate={{ pathLength: 1 }}
						transition={{
							duration: 0.3,
							ease: "easeOut",
							delay: 0.5
						}}
					/>
				</svg>
			</motion.div>

			{/* Success sparkles */}
			<motion.div
				className="absolute inset-0 pointer-events-none"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8 }}
			>
				{[...Array(6)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-green-400 rounded-full"
						style={{
							left: `${20 + i * 12}%`,
							top: `${15 + (i % 2) * 20}%`
						}}
						animate={{
							scale: [0, 1, 0],
							opacity: [0, 1, 0],
							y: [0, -10, -20]
						}}
						transition={{
							duration: 1,
							delay: 0.8 + i * 0.1,
							ease: "easeOut"
						}}
					/>
				))}
			</motion.div>
		</div>
	);
}
