import { useEffect, useState } from "react";
import { Loader2, Store, ArrowLeft, Circle, Check } from "lucide-react";
const logoImage = "/images/logos/logo-threddle.png";
import { Button } from "../ui/button";
import { ProgressIndicator } from "./progress-indicator";
const parentBackgroundImage = "/images/backgrounds/bg6.jpg";
import { AnimatedCheck } from "../ui/animated-check";
import { Card, CardContent } from "../ui/card";

interface StoreConnectionProgressProps {
	onNext: () => void;
	onBack?: () => void;
}

export function StoreConnectionProgress({
	onNext,
	onBack
}: StoreConnectionProgressProps) {
	const [isConnecting, setIsConnecting] = useState(true);
	const [isComplete, setIsComplete] = useState(false);
	const [stepIndex, setStepIndex] = useState(0);

	useEffect(() => {
		// Simulate multi-step connection process
		const timeouts: NodeJS.Timeout[] = [];
		const steps = [0, 1, 2, 3];
		steps.forEach((_, i) => {
			timeouts.push(
				setTimeout(() => {
					setStepIndex(i);
				}, 700 * i)
			);
		});
		timeouts.push(
			setTimeout(() => {
				setIsConnecting(false);
				setIsComplete(true);
			}, 700 * steps.length)
		);
		// Auto-advance after showing success
		timeouts.push(
			setTimeout(
				() => {
					onNext();
				},
				700 * steps.length + 1500
			)
		);

		return () => timeouts.forEach(clearTimeout);
	}, [onNext]);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12 bg-background text-foreground transition-colors">
			{/* Logo */}
			<div className="flex justify-center">
				<img
					src={logoImage}
					alt="Threddle Logo"
					className="h-8 object-contain transform dark:invert"
				/>
			</div>
			<div className="max-w-6xl h-auto rounded-3xl overflow-clip p-12 bg-card border border-slate-200 dark:border-slate-900 shadow-sm">
				<div className="w-full max-w-md text-center space-y-10">
					{/* Connection Status */}
					<div className="space-y-8">
						{isConnecting ? (
							<>
								<div className="flex justify-center">
									<Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
								</div>
								<div className="space-y-4">
									<h2 className="text-2xl font-medium text-foreground">
										Connecting your store...
									</h2>
									<ul className="text-sm text-muted-foreground text-left space-y-1">
										<li
											className={
												stepIndex >= 0
													? "flex flex-row items-center justify-start gap-2 text-blue-500"
													: "flex flex-row items-center justify-start gap-2 "
											}
										>
											{stepIndex >= 0 ? (
												<Check className="h-4 w-4" />
											) : (
												<div className="w-2 h-2 bg-slate-500 rounded-full"></div>
											)}
											Credentials authenticated
										</li>
										<li
											className={
												stepIndex >= 1
													? "flex flex-row items-center justify-start gap-2 text-blue-500"
													: "flex flex-row items-center justify-start gap-2 "
											}
										>
											{stepIndex >= 1 ? (
												<Check className="h-4 w-4" />
											) : (
												<div className="w-2 h-2 bg-slate-500 rounded-full"></div>
											)}
											Store linked
										</li>
										<li
											className={
												stepIndex >= 2
													? "flex flex-row items-center justify-start gap-2 text-blue-500"
													: "flex flex-row items-center justify-start gap-2 "
											}
										>
											{stepIndex >= 2 ? (
												<Check className="h-4 w-4" />
											) : (
												<div className="w-2 h-2 bg-slate-500 rounded-full"></div>
											)}
											Data sync in progress
										</li>
										<li
											className={
												stepIndex >= 3
													? "flex flex-row items-center justify-start gap-2 text-blue-500"
													: "flex flex-row items-center justify-start gap-2 "
											}
										>
											{stepIndex >= 3 ? (
												<Check className="h-4 w-4" />
											) : (
												<div className="w-2 h-2 bg-slate-500 rounded-full"></div>
											)}
											Agent network activated
										</li>
									</ul>
								</div>
							</>
						) : (
							<>
								<div className="flex justify-center">
									<AnimatedCheck className="h-12 w-12 text-green-500" />
								</div>
								<div className="space-y-6">
									<div className="space-y-3">
										<h2 className="text-2xl font-medium text-foreground">
											Store Connected!
										</h2>
										<p className="text-slate-600 font-normal">
											Credentials authenticated. Store
											linked. Agent network activated.
											Smart agents, smarter outcomes.
										</p>
									</div>

									{/* Store Info Card */}
									<Card className="border shadow-sm bg-card rounded-xl">
										<CardContent className="p-5">
											<div className="flex items-center space-x-4">
												<div className="p-3 bg-green-50 rounded-lg">
													<Store className="h-6 w-6 text-green-600" />
												</div>
												<div className="flex-1 text-left">
													<h4 className="font-medium text-foreground">
														Elite Formal Wear
													</h4>
													<p className="text-sm text-slate-500 font-normal">
														elitestore.shopify.com
													</p>
													<div className="flex items-center space-x-2 mt-1">
														<div className="w-2 h-2 bg-green-500 rounded-full"></div>
														<span className="text-xs text-green-600 font-normal">
															Connected
														</span>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>

									{/* CTA Button */}
									{/* <div className="space-y-4">
									<Button
										onClick={onNext}
										className="w-full h-12 text-base bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium"
									>
										Continue Setup
									</Button>

									{onBack && (
										<Button
											variant="secondary"
											onClick={onBack}
											className="w-full h-12 flex items-center justify-center gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-normal"
										>
											<ArrowLeft className="h-4 w-4" />
											Back
										</Button>
									)}
								</div> */}
								</div>
							</>
						)}
					</div>
				</div>
			</div>

			{/* Progress Indicator */}
			{/* <div className="pt-8">
				<ProgressIndicator currentStep={2} totalSteps={5} />
			</div> */}
		</div>
	);
}
