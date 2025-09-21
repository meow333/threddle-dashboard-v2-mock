import { useEffect, useState } from "react";
import { Loader2, Package, ArrowLeft } from "lucide-react";
const logoImage = "/images/logos/logo-threddle.png";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ProgressIndicator } from "./progress-indicator";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { AnimatedCheck } from "../ui/animated-check";

interface ShopifyDataSyncProps {
	onNext: () => void;
	onBack?: () => void;
}

export function ShopifyDataSync({ onNext, onBack }: ShopifyDataSyncProps) {
	const [isSyncing, setIsSyncing] = useState(true);
	const [isComplete, setIsComplete] = useState(false);
	const [productCount, setProductCount] = useState(0);

	useEffect(() => {
		// Simulate data sync process
		const timer = setTimeout(() => {
			setIsSyncing(false);
			setIsComplete(true);
			setProductCount(1247);
		}, 4000);

		return () => clearTimeout(timer);
	}, []);

	const sampleProduct = {
		name: "Executive Wool Suit",
		price: "$599.99",
		image: "/images/products/exec-wool-suit.jpg"
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
			<div className="w-full max-w-md text-center space-y-8">
				{/* Logo */}
				<div className="flex justify-center">
					<img
						src={logoImage}
						alt="Threddle Logo"
						className="h-12 object-contain"
					/>
				</div>

				{/* Sync Status */}
				<div className="space-y-6">
					{isSyncing ? (
						<>
							<div className="flex justify-center">
								<Loader2 className="h-12 w-12 text-primary animate-spin" />
							</div>
							<div className="space-y-2">
								<h2 className="text-2xl font-medium text-foreground">
									Syncing your catalog...
								</h2>
								<p className="text-muted-foreground">
									Importing your products and analyzing trends
								</p>
							</div>
						</>
					) : (
						<>
							<div className="flex justify-center">
								<AnimatedCheck className="h-12 w-12 text-green-500" />
							</div>
							<div className="space-y-6">
								<div className="space-y-2">
									<h2 className="text-2xl font-medium text-foreground">
										Sync Complete!
									</h2>
									<p className="text-muted-foreground">
										Your catalog has been successfully
										imported
									</p>
								</div>

								{/* Product Count */}
								<div className="space-y-4">
									<div className="text-center">
										<div className="text-4xl font-bold text-primary">
											{productCount.toLocaleString()}
										</div>
										<p className="text-muted-foreground">
											Products imported
										</p>
									</div>

									{/* Sample Product Preview */}
									<Card className="border-border">
										<CardContent className="p-4">
											<div className="flex items-center space-x-4">
												<div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
													<ImageWithFallback
														src={
															sampleProduct.image
														}
														alt={sampleProduct.name}
														className="w-full h-full object-cover"
													/>
												</div>
												<div className="flex-1 text-left">
													<h4 className="font-medium text-foreground">
														{sampleProduct.name}
													</h4>
													<p className="text-sm text-muted-foreground">
														{sampleProduct.price}
													</p>
												</div>
												<Package className="h-5 w-5 text-muted-foreground" />
											</div>
										</CardContent>
									</Card>
								</div>

								{/* CTA Button */}
								<div className="space-y-4">
									<Button
										onClick={onNext}
										className="w-full h-12 text-base"
									>
										See What&apos;s Trending for You
									</Button>

									{/* Back Button */}
									{onBack && (
										<Button
											variant="outline"
											onClick={onBack}
											className="w-full h-12 flex items-center justify-center gap-2"
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
					<ProgressIndicator currentStep={4} totalSteps={7} />
				</div>
			</div>
		</div>
	);
}
