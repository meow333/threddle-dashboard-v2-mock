import { useEffect, useState } from "react";
import {
	Loader2,
	Package,
	ArrowLeft,
	TrendingUp,
	AlertTriangle,
	Users,
	Sparkles,
	Target,
	Palette,
	BarChart3,
	ArrowRight
} from "lucide-react";
const logoImage = "/images/logos/logo-threddle.png";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { ProgressIndicator } from "./progress-indicator";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
const parentBackgroundImage = "/images/backgrounds/bg6.jpg";
import { AnimatedCheck } from "../ui/animated-check";

interface ProductInsightsDashboardProps {
	onNext: () => void;
	onBack?: () => void;
}

export function ProductInsightsDashboard({
	onNext,
	onBack
}: ProductInsightsDashboardProps) {
	const [isSyncing, setIsSyncing] = useState(true);
	const [isComplete, setIsComplete] = useState(false);
	const [productCount, setProductCount] = useState(0);

	useEffect(() => {
		// Simulate data sync and analysis process
		const timer = setTimeout(() => {
			setIsSyncing(false);
			setIsComplete(true);
			setProductCount(847);
		}, 4000);

		return () => clearTimeout(timer);
	}, []);

	// Sample data for the insights
	const inventoryInsight = {
		product: "Classic Navy Blazer",
		image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: "$349.99",
		stock: "Low Stock",
		status: "urgent",
		recommendation: "Restock recommended",
		detail: "Only 3 units left. Sales velocity suggests stockout in 5 days."
	};

	const competitorInsight = {
		product: "Premium Wool Suit",
		image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2980&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		price: "$699.99",
		competitor: "Hugo Boss",
		competitorPrice: "$799.99",
		advantage: "12% price advantage",
		detail: "Similar quality at competitive pricing. Great positioning opportunity."
	};

	const trendInsight = {
		trend: "Oversized Blazers",
		pattern: "Textured Wool",
		material: "Sustainable Fabrics",
		growth: "+285%",
		socialMention: "TikTok",
		recommendation: "High demand pattern",
		detail: "Oversized silhouettes with textured wool gaining momentum on social platforms."
	};

	if (isSyncing) {
		return (
			<div
				className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12 bg-slate-100"
				style={{
					backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1)), url(${parentBackgroundImage})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat"
				}}
			>
				{/* Logo */}
				<div className="flex justify-center">
					<img
						src={logoImage}
						alt="Threddle Logo"
						className="h-8 object-contain"
					/>
				</div>
				<div className="max-w-6xl h-auto rounded-3xl overflow-clip p-12 bg-white border border-slate-200 shadow-sm">
					<div className="w-full max-w-md text-center space-y-10">
						{/* Sync Status */}
						<div className="space-y-8">
							<div className="flex justify-center">
								<Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
							</div>
							<div className="space-y-3">
								<h2 className="text-2xl font-medium text-slate-900">
									Analyzing Your Products...
								</h2>
								<p className="text-slate-600 font-normal">
									Syncing catalog and generating AI insights
								</p>
							</div>

							{/* Progress Steps */}
							<div className="space-y-4 text-left max-w-xs mx-auto">
								<div className="flex items-center space-x-3">
									<div className="h-2 w-2 rounded-full bg-blue-500" />
									<span className="text-sm text-slate-600 font-normal">
										Importing products
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="h-2 w-2 rounded-full bg-blue-500" />
									<span className="text-sm text-slate-600 font-normal">
										Analyzing inventory health
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="h-2 w-2 rounded-full bg-blue-500" />
									<span className="text-sm text-slate-600 font-normal">
										Comparing with competitors
									</span>
								</div>
								<div className="flex items-center space-x-3">
									<div className="h-2 w-2 rounded-full bg-slate-300" />
									<span className="text-sm text-slate-600 font-normal">
										Matching social trends
									</span>
								</div>
							</div>
						</div>

						{/* Progress Indicator */}
						<div className="pt-8">
							<ProgressIndicator currentStep={4} totalSteps={6} />
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div
			className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12 bg-slate-100"
			style={{
				backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1)), url(${parentBackgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat"
			}}
		>
			{/* Logo */}
			<div className="flex justify-center">
				<img
					src={logoImage}
					alt="Threddle Logo"
					className="h-8 object-contain"
				/>
			</div>
			<div className="max-w-6xl h-auto">
				<div className="w-full space-y-6">
					{/* Success Header */}
					<div className="text-center space-y-6">
						<div className="flex justify-center">
							<AnimatedCheck className="h-12 w-12 text-green-500" />
						</div>
						<div className="space-y-3">
							<h1 className="text-2xl font-medium text-slate-900">
								Your Insights are Ready!
							</h1>
							<p className="text-slate-600 font-normal">
								We&apos;ve analyzed your{" "}
								{productCount.toLocaleString()} products and
								found key opportunities
							</p>
						</div>
					</div>

					{/* Insights Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Inventory Health Insight */}
						<Card className="border border-slate-200 shadow-sm bg-white rounded-2xl flex flex-col justify-between">
							<CardHeader className="pb-4 p-6">
								<div className="flex flex-col text-center items-center gap-4">
									<div className="p-3 bg-orange-50 rounded-lg">
										<AlertTriangle className="h-5 w-5 text-orange-500" />
									</div>
									<div className="flex-1">
										<h3 className="font-medium text-slate-900">
											Inventory Health Alert
										</h3>
										<p className="text-sm text-slate-500 font-normal">
											Stock level optimization
										</p>
									</div>
									<Badge
										variant="secondary"
										className="bg-orange-50 text-orange-600 border-orange-200 font-normal"
									>
										Urgent
									</Badge>
								</div>
							</CardHeader>
							<CardContent className="space-y-5 p-6 pt-0">
								<div className="flex items-center space-x-4">
									<div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100">
										<ImageWithFallback
											src={inventoryInsight.image}
											alt={inventoryInsight.product}
											className="w-full h-full object-cover"
										/>
									</div>
									<div className="flex-1">
										<h4 className="font-medium text-slate-900">
											{inventoryInsight.product}
										</h4>
										<p className="text-sm text-slate-500 font-normal">
											{inventoryInsight.price}
										</p>
										<div className="flex items-center space-x-2 mt-1">
											<Package className="h-3 w-3 text-orange-500" />
											<span className="text-xs text-orange-600 font-normal">
												{inventoryInsight.stock}
											</span>
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
									<div className="flex items-center space-x-2 mb-2">
										<div className="w-2 h-2 bg-orange-500 rounded-full"></div>
										<span className="font-medium text-sm text-orange-700">
											{inventoryInsight.recommendation}
										</span>
									</div>
									<p className="text-xs text-orange-600 font-normal">
										{inventoryInsight.detail}
									</p>
								</div>
							</CardFooter>
						</Card>

						{/* Competitor Analysis Insight */}
						<Card className="border border-slate-200 shadow-sm bg-white rounded-2xl  flex flex-col justify-between">
							<CardHeader className="pb-4 p-6">
								<div className="flex flex-col text-center items-center gap-4">
									<div className="p-3 bg-blue-50 rounded-lg">
										<Target className="h-5 w-5 text-blue-500" />
									</div>
									<div className="flex-1">
										<h3 className="font-medium text-slate-900">
											Competitor Match Found
										</h3>
										<p className="text-sm text-slate-500 font-normal">
											Competitive positioning analysis
										</p>
									</div>
									<Badge
										variant="secondary"
										className="bg-blue-50 text-blue-600 border-blue-200 font-normal"
									>
										Advantage
									</Badge>
								</div>
							</CardHeader>
							<CardContent className="space-y-5 p-6 pt-0">
								<div className="flex flex-col items-center space-y-4">
									<div className="w-full flex flex-row items-center justify-between space-x-4">
										<div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100">
											<ImageWithFallback
												src={competitorInsight.image}
												alt={competitorInsight.product}
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="flex-1">
											<h4 className="font-medium text-slate-900">
												{competitorInsight.product}
											</h4>
											<p className="text-sm text-slate-500 font-normal">
												{competitorInsight.price}
											</p>
											<div className="flex flex-col items-start justify-start space-y-1 mt-2">
												<div className="flex items-center space-x-2">
													<Users className="h-3 w-3 text-blue-500" />
													<span className="text-xs text-blue-600 font-normal">
														vs{" "}
														{
															competitorInsight.competitor
														}
													</span>
												</div>
												<div className="text-xs text-slate-500 text-left font-normal">
													{
														competitorInsight.competitorPrice
													}
												</div>
											</div>
										</div>
									</div>
									<div className="w-full text-right flex flex-row justify-center items-center ">
										<div className="font-medium text-center text-green-600 bg-green-500/10 px-3 py-1 border border-green-500/30 rounded-full shadow backdrop-blur-lg">
											{competitorInsight.advantage}
										</div>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
									<div className="flex items-center space-x-2 mb-2">
										<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
										<span className="font-medium text-sm text-blue-700">
											Competitive Edge
										</span>
									</div>
									<p className="text-xs text-blue-600 font-normal">
										{competitorInsight.detail}
									</p>
								</div>
							</CardFooter>
						</Card>

						{/* Social Trend Insight */}
						<Card className="border border-slate-200 shadow-sm bg-white rounded-2xl  flex flex-col justify-between">
							<CardHeader className="pb-4 p-6">
								<div className="flex flex-col text-center items-center gap-4">
									<div className="p-3 bg-green-50 rounded-lg">
										<Sparkles className="h-5 w-5 text-green-500" />
									</div>
									<div className="flex-1">
										<h3 className="font-medium text-slate-900">
											Social Trend Match
										</h3>
										<p className="text-sm text-slate-500 font-normal">
											Pattern & material opportunities
										</p>
									</div>
									<Badge
										variant="secondary"
										className="bg-green-50 text-green-600 border-green-200 font-normal"
									>
										<TrendingUp className="h-3 w-3 mr-1" />
										{trendInsight.growth}
									</Badge>
								</div>
							</CardHeader>
							<CardContent className="space-y-5 p-6 pt-0">
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<Palette className="h-4 w-4 text-green-500" />
											<span className="text-sm font-medium text-slate-700">
												Trending Pattern
											</span>
										</div>
										<span className="text-sm text-green-600 font-normal">
											{trendInsight.pattern}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<Package className="h-4 w-4 text-green-500" />
											<span className="text-sm font-medium text-slate-700">
												Material Focus
											</span>
										</div>
										<span className="text-sm text-green-600 font-normal">
											{trendInsight.material}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-3">
											<BarChart3 className="h-4 w-4 text-green-500" />
											<span className="text-sm font-medium text-slate-700">
												Platform
											</span>
										</div>
										<span className="text-sm text-green-600 font-normal">
											{trendInsight.socialMention}
										</span>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<div className="bg-green-50 rounded-2xl p-4 border border-green-100">
									<div className="flex items-center space-x-2 mb-2">
										<div className="w-2 h-2 bg-green-500 rounded-full"></div>
										<span className="font-medium text-sm text-green-700">
											{trendInsight.recommendation}
										</span>
									</div>
									<p className="text-xs text-green-600 font-normal">
										{trendInsight.detail}
									</p>
								</div>
							</CardFooter>
						</Card>
					</div>

					{/* CTA Buttons */}
					<div className="w-full flex flex-row justify-between items-center space-y-4">
						{/* Back Button */}
						{onBack && (
							<Button
								variant="outline"
								onClick={onBack}
								className="h-12 flex items-center justify-center gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-normal"
							>
								<ArrowLeft className="h-4 w-4" />
								Back
							</Button>
						)}
						<Button
							onClick={onNext}
							className="h-12 text-base flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg font-medium"
						>
							Continue to Recommendations
							<ArrowRight className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>

			{/* Progress Indicator */}
			<div className="pt-6">
				<ProgressIndicator currentStep={4} totalSteps={6} />
			</div>
		</div>
	);
}
