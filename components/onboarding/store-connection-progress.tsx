import { useEffect, useState } from "react";
import { Loader2, Store, ArrowLeft } from "lucide-react";
const logoImage = "/images/logos/logo-threddle.png";
import { Button } from "../ui/button";
import { ProgressIndicator } from "./progress-indicator";
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

	useEffect(() => {
		// Simulate connection process
		const timer = setTimeout(() => {
			setIsConnecting(false);
			setIsComplete(true);

			// Auto-advance after showing success
			setTimeout(() => {
				onNext();
			}, 1500);
		}, 3000);

		return () => clearTimeout(timer);
	}, [onNext]);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
			<div className="w-full max-w-md text-center space-y-10">
				{/* Logo */}
				<div className="flex justify-center">
					<img
						src={logoImage}
						alt="Threddle Logo"
						className="h-12 object-contain"
					/>
				</div>

				{/* Connection Status */}
				<div className="space-y-8">
					{isConnecting ? (
						<>
							<div className="flex justify-center">
								<Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
							</div>
							<div className="space-y-3">
								<h2 className="text-2xl font-medium text-gray-900">
									Connecting your store...
								</h2>
								<p className="text-gray-600 font-normal">
									Setting up secure connection to your Shopify
									store
								</p>
							</div>
						</>
					) : (
						<>
							<div className="flex justify-center">
								<AnimatedCheck className="h-12 w-12 text-green-500" />
							</div>
							<div className="space-y-6">
								<div className="space-y-3">
									<h2 className="text-2xl font-medium text-gray-900">
										Store Connected!
									</h2>
									<p className="text-gray-600 font-normal">
										Successfully connected to Elite Formal
										Wear
									</p>
								</div>

								{/* Store Info Card */}
								<Card className="border border-gray-200 shadow-sm bg-white rounded-xl">
									<CardContent className="p-5">
										<div className="flex items-center space-x-4">
											<div className="p-3 bg-green-50 rounded-lg">
												<Store className="h-6 w-6 text-green-600" />
											</div>
											<div className="flex-1 text-left">
												<h4 className="font-medium text-gray-900">
													Elite Formal Wear
												</h4>
												<p className="text-sm text-gray-500 font-normal">
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
								<div className="space-y-4">
									<Button
										onClick={onNext}
										className="w-full h-12 text-base bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium"
									>
										Continue Setup
									</Button>

									{/* Back Button */}
									{onBack && (
										<Button
											variant="outline"
											onClick={onBack}
											className="w-full h-12 flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg font-normal"
										>
											<ArrowLeft className="h-4 w-4" />
											Back
										</Button>
									)}
								</div>
							</div>
						</>
					)}
				</div>

				{/* Progress Indicator */}
				<div className="pt-8">
					<ProgressIndicator currentStep={2} totalSteps={6} />
				</div>
			</div>
		</div>
	);
}
