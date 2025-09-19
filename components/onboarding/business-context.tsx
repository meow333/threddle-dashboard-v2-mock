import { useState } from "react";
import {
	Check,
	TrendingUp,
	Users,
	Package,
	Store,
	BarChart3,
	Sparkles,
	ArrowRight,
	ArrowLeft
} from "lucide-react";
const logoImage = "/images/logos/logo-threddle.png";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ProgressIndicator } from "./progress-indicator";
import { Badge } from "../ui/badge";

interface BusinessContextProps {
	onNext: (data: { primaryCategory: string; growthFocus: string[] }) => void;
	onBack?: () => void;
}

export function BusinessContext({ onNext, onBack }: BusinessContextProps) {
	// Auto-detected data from Shopify store
	const storeData = {
		storeName: "Elite Formal Wear",
		totalProducts: 847,
		topCategories: [
			{ name: "Suits", productCount: 234, salesPercentage: 45 },
			{ name: "Blazers", productCount: 198, salesPercentage: 28 },
			{ name: "Trousers", productCount: 156, salesPercentage: 18 },
			{ name: "Accessories", productCount: 259, salesPercentage: 9 }
		],
		recommendedCategory: "formal-wear",
		trendingItems: [
			"Double-breasted blazers",
			"Slim-fit trousers",
			"Italian wool suits"
		],
		averageOrderValue: 485,
		monthlyRevenue: 125000
	};

	const handleContinue = () => {
		// Auto-selected based on store analysis
		onNext({
			primaryCategory: storeData.recommendedCategory,
			growthFocus: ["trends", "competitors", "inventory"]
		});
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
			<div className="w-full max-w-4xl space-y-10">
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
					<h1 className="text-3xl font-medium text-gray-900">
						Your Business Profile
					</h1>
					<p className="text-lg text-gray-600 font-normal">
						We&apos;ve analyzed your Shopify store to understand
						your business better.
					</p>
				</div>

				{/* Store Overview Card */}
				<Card className="border border-gray-200 shadow-sm bg-white rounded-xl">
					<CardContent className="p-8">
						<div className="flex items-center gap-4 mb-8">
							<div className="p-3 bg-blue-50 rounded-lg">
								<Store className="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<h3 className="text-xl font-medium text-gray-900">
									{storeData.storeName}
								</h3>
								<p className="text-gray-600 font-normal">
									Connected Shopify Store
								</p>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="text-center">
								<div className="text-2xl font-medium text-gray-900">
									{storeData.totalProducts}
								</div>
								<div className="text-sm text-gray-500 font-normal">
									Total Products
								</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-medium text-gray-900">
									${storeData.averageOrderValue}
								</div>
								<div className="text-sm text-gray-500 font-normal">
									Avg Order Value
								</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-medium text-gray-900">
									$
									{(storeData.monthlyRevenue / 1000).toFixed(
										0
									)}
									K
								</div>
								<div className="text-sm text-gray-500 font-normal">
									Monthly Revenue
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Product Categories Analysis */}
					<Card className="border border-gray-200 shadow-sm bg-white rounded-xl">
						<CardContent className="p-8">
							<div className="flex items-center gap-3 mb-6">
								<Package className="h-5 w-5 text-blue-600" />
								<h3 className="text-lg font-medium text-gray-900">
									Product Categories
								</h3>
							</div>

							<div className="space-y-5">
								{storeData.topCategories.map(
									(category, index) => (
										<div
											key={category.name}
											className="flex items-center justify-between"
										>
											<div className="flex items-center gap-4">
												<div className="text-sm font-medium text-gray-500">
													#{index + 1}
												</div>
												<div>
													<div className="font-medium text-gray-900">
														{category.name}
													</div>
													<div className="text-sm text-gray-500 font-normal">
														{category.productCount}{" "}
														products
													</div>
												</div>
											</div>
											<div className="text-right">
												<div className="font-medium text-gray-900">
													{category.salesPercentage}%
												</div>
												<div className="text-sm text-gray-500 font-normal">
													of sales
												</div>
											</div>
										</div>
									)
								)}
							</div>

							<div className="mt-8 p-5 bg-blue-50 rounded-xl border border-blue-100">
								<div className="flex items-center gap-2 mb-2">
									<Check className="h-4 w-4 text-blue-600" />
									<span className="font-medium text-sm text-blue-800">
										Recommended Focus
									</span>
								</div>
								<p className="text-sm text-blue-700 font-normal">
									Based on your product mix and sales data, we
									recommend focusing on{" "}
									<strong>Formal Wear</strong> insights.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Social Media Trends */}
					<Card className="border border-gray-200 shadow-sm bg-white rounded-xl">
						<CardContent className="p-8">
							<div className="flex items-center gap-3 mb-6">
								<Sparkles className="h-5 w-5 text-green-600" />
								<h3 className="text-lg font-medium text-gray-900">
									Trending in Your Category
								</h3>
							</div>

							<div className="space-y-4">
								{storeData.trendingItems.map((item, index) => (
									<div
										key={item}
										className="flex items-center gap-3"
									>
										<TrendingUp className="h-4 w-4 text-green-600" />
										<span className="text-sm text-gray-700 font-normal">
											{item}
										</span>
										<Badge
											variant="secondary"
											className="ml-auto text-xs bg-green-50 text-green-700 border-green-200 font-normal"
										>
											+{15 + index * 8}%
										</Badge>
									</div>
								))}
							</div>

							<div className="mt-8 p-5 bg-green-50 rounded-xl border border-green-100">
								<div className="flex items-center gap-2 mb-2">
									<BarChart3 className="h-4 w-4 text-green-600" />
									<span className="font-medium text-sm text-green-800">
										Growth Opportunities
									</span>
								</div>
								<p className="text-sm text-green-700 font-normal">
									We&apos;ll help you track trends, monitor
									competitors, and optimize inventory for
									maximum growth.
								</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Navigation Buttons */}
				<div className="flex justify-between items-center">
					{onBack && (
						<Button
							variant="outline"
							onClick={onBack}
							className="h-12 px-6 flex items-center gap-2 border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg font-normal"
						>
							<ArrowLeft className="h-4 w-4" />
							Back
						</Button>
					)}
					<Button
						onClick={handleContinue}
						className="h-12 px-8 text-base flex items-center gap-2 ml-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
					>
						Continue with Recommendations
						<ArrowRight className="h-4 w-4" />
					</Button>
				</div>

				{/* Progress Indicator */}
				<div className="pt-6">
					<ProgressIndicator currentStep={3} totalSteps={6} />
				</div>
			</div>
		</div>
	);
}
