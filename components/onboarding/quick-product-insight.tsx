import { TrendingUp, Package, ArrowLeft } from "lucide-react";
const logoImage = "/images/logos/logo-threddle.png";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ProgressIndicator } from "./progress-indicator";
import { ImageWithFallback } from "../fallback/ImageWithFallback";

interface QuickProductInsightProps {
	onNext: () => void;
	onBack?: () => void;
}

export function QuickProductInsight({
	onNext,
	onBack
}: QuickProductInsightProps) {
	const trendData = {
		trend: "Wide-Leg Trousers",
		growth: "+340%",
		region: "Global",
		recommendation: "Restock suggested"
	};

	const product = {
		name: "Premium Wide-Leg Suit Trousers",
		price: "$259.99",
		image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		stock: "Low stock"
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
			<div className="w-full max-w-md space-y-8">
				{/* Logo */}
				<div className="flex justify-center">
					<img
						src={logoImage}
						alt="Threddle Logo"
						className="h-10 object-contain"
					/>
				</div>

				{/* Header */}
				<div className="text-center space-y-4">
					<h1 className="text-2xl font-medium text-foreground">
						Here&apos;s What We Found
					</h1>
					<p className="text-muted-foreground">
						Your first AI-powered insight is ready
					</p>
				</div>

				{/* Insight Card */}
				<Card className="border-border">
					<CardContent className="p-6 space-y-6">
						{/* Trend Tag */}
						<div className="flex items-center justify-between">
							<Badge
								variant="secondary"
								className="bg-green-50 text-green-700 border-green-200"
							>
								<TrendingUp className="h-3 w-3 mr-1" />
								{trendData.trend} {trendData.growth}{" "}
								{trendData.region}
							</Badge>
						</div>

						{/* Product Card */}
						<div className="space-y-4">
							<div className="flex items-center space-x-4">
								<div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
									<ImageWithFallback
										src={product.image}
										alt={product.name}
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="flex-1">
									<h3 className="font-medium text-foreground">
										{product.name}
									</h3>
									<p className="text-muted-foreground">
										{product.price}
									</p>
									<div className="flex items-center space-x-2 mt-1">
										<Package className="h-3 w-3 text-orange-500" />
										<span className="text-xs text-orange-600">
											{product.stock}
										</span>
									</div>
								</div>
							</div>

							{/* Recommendation */}
							<div className="bg-accent rounded-lg p-4">
								<div className="flex items-center space-x-2">
									<div className="w-2 h-2 bg-primary rounded-full"></div>
									<span className="font-medium text-foreground">
										Recommendation
									</span>
								</div>
								<p className="text-sm text-muted-foreground mt-1">
									{trendData.recommendation} - This trend is
									gaining momentum in your target market
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* CTA Buttons */}
				<div className="space-y-4">
					<Button onClick={onNext} className="w-full h-12 text-base">
						Continue to Setup
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
		</div>
	);
}
