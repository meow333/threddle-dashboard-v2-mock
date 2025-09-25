import { useEffect, useMemo, useState } from "react";
import {
	Check,
	TrendingUp,
	Users,
	Package,
	Store,
	BarChart3,
	Sparkles,
	ArrowRight,
	ArrowLeft,
	Loader2,
	AlertTriangle,
	Target,
	Palette
} from "lucide-react";
const logoImage = "/images/logos/logo-threddle.png";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
const parentBackgroundImage = "/images/backgrounds/bg6.jpg";
import { ImageWithFallback } from "../fallback/ImageWithFallback";
import { ProgressIndicator } from "./progress-indicator";
import { Badge } from "../ui/badge";

interface BusinessContextProps {
	onNext: (data: { primaryCategory: string; growthFocus: string[] }) => void;
	onBack?: () => void;
}

export function BusinessContext({ onNext, onBack }: BusinessContextProps) {
	// Auto-detected data from Shopify store

	const agentAnimationSteps = [
		{
			image: "/images/backgrounds/syncer.png",
			title: "Analyzing your Store",
			description:
				"We are analyzing your store and connecting your data to our agents."
		},
		{
			image: "/images/backgrounds/pulse.png",
			title: "Searching What's In Demand",
			description:
				"Trend Agent is browsing Social Media & Websites, to find emerging trends for your store."
		},
		{
			image: "/images/backgrounds/mirror.png",
			title: "Monitoring Your Competitors",
			description:
				"Competitor Agent is scanning top competitors to find gaps and opportunities."
		},
		{
			image: "/images/backgrounds/vision.png",
			title: "Optimizing your Inventory",
			description:
				"Inventory Agent is evaluating your stock levels to prevent stockouts and overstock."
		}
	];

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

	// Animation state
	const [activeStep, setActiveStep] = useState(0);

	const stepToCardId = useMemo(
		() => [
			"card-step-syncer",
			"card-step-pulse",
			"card-step-competitor",
			"card-step-vision"
		],
		[]
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveStep((s) => (s + 1) % agentAnimationSteps.length);
		}, 2000);
		return () => clearInterval(interval);
	}, [agentAnimationSteps.length]);

	const getAnimClass = (id: string) =>
		stepToCardId[activeStep] === id ? "block animate-fade-up-in" : "hidden";

	return (
		<div className="min-h-screen flex flex-col items-center justify-start p-8 space-y-12 bg-background text-foreground transition-colors">
			{/* Logo */}
			<div className="flex justify-center">
				<img
					src={logoImage}
					alt="Threddle Logo"
					className="h-8 object-contain transform dark:invert"
				/>
			</div>
			{/* Header */}
			<div className="max-w-xl text-center space-y-4 flex flex-row items-center justify-start mx-auto gap-6">
				<img
					key={`agent-img-${activeStep}`}
					src={agentAnimationSteps[activeStep].image}
					className="w-28 h-28 mx-auto rounded-lg transition-all duration-500 animate-fade-up-in"
					id="card-step-3"
				/>
				<div className="text-left space-y-2">
					<h1
						key={`agent-title-${activeStep}`}
						className="text-3xl font-medium text-foreground animate-fade-up-in"
						id="business-context-title"
					>
						{agentAnimationSteps[activeStep].title}
					</h1>
					<p
						key={`agent-desc-${activeStep}`}
						className="text-lg text-slate-600 font-normal animate-fade-up-in"
						id="business-context-description"
					>
						{agentAnimationSteps[activeStep].description}
					</p>
				</div>
			</div>

			{/* Insights Grid */}
			<div className="max-w-md grid grid-cols-1 gap-8 text-left mx-auto">
				<Card className="border shadow-sm bg-card rounded-xl">
					<CardContent className="p-8">
						<div className="flex items-center gap-4">
							<div className="p-3 bg-blue-50 rounded-lg">
								<Store className="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<h3 className="text-xl font-medium text-foreground">
									{storeData.storeName}
								</h3>
								<p className="text-slate-600 font-normal">
									elitestore.shopify.com
								</p>
							</div>
						</div>
						<div className="border-t border-slate-400/30 w-full h-1 my-4 "></div>
						<div className="w-full flex flex-row items-center justify-between ">
							<div className="text-center">
								<div className="text-2xl font-medium text-foreground">
									{storeData.totalProducts}
								</div>
								<div className="text-sm text-slate-500 font-normal">
									Total Products
								</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-medium text-foreground">
									${storeData.averageOrderValue}
								</div>
								<div className="text-sm text-slate-500 font-normal">
									Avg Order Value
								</div>
							</div>
							<div className="text-center">
								<div className="text-2xl font-medium text-foreground">
									$
									{(storeData.monthlyRevenue / 1000).toFixed(
										0
									)}
									K
								</div>
								<div className="text-sm text-slate-500 font-normal">
									Monthly Revenue
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
				{/* Store Overview Card */}
				<div
					className={` space-y-4 ${getAnimClass("card-step-syncer")}`}
					id="card-step-syncer"
				>
					<div className="">
						{/* Product Categories Analysis */}
						<Card className="border shadow-sm bg-card rounded-xl flex flex-col justify-between gap-0">
							<CardContent className="p-8">
								<div className="flex items-center gap-3 mb-6">
									<Package className="h-5 w-5 text-blue-600" />
									<h3 className="text-lg font-medium text-foreground">
										Product Categories
									</h3>
								</div>

								<div className="space-y-2">
									{storeData.topCategories.map(
										(category, index) => (
											<div
												key={category.name}
												className="flex items-center justify-between"
											>
												<div className="flex items-center gap-4">
													<div className="text-sm font-medium text-slate-500">
														#{index + 1}
													</div>
													<div className="flex flex-row gap-3 items-center">
														<div className="font-medium text-foreground">
															{category.name}
														</div>
														<div className="text-sm text-slate-500 font-normal">
															{
																category.productCount
															}{" "}
															products
														</div>
													</div>
												</div>
												<div className="text-right">
													<div className="font-medium text-foreground">
														{
															category.salesPercentage
														}
														%
													</div>
													<div className="text-sm text-slate-500 font-normal">
														of sales
													</div>
												</div>
											</div>
										)
									)}
								</div>
							</CardContent>
							<CardFooter>
								<div className="w-full p-5 bg-blue-500/10 rounded-xl ">
									<div className="flex items-center justify-start gap-2 mb-2">
										<Check className="h-4 w-4 text-blue-600" />
										<span className="font-medium text-sm text-left text-blue-800">
											Recommended Focus
										</span>
									</div>
									<p className="text-sm text-blue-700 text-left font-normal">
										Based on your product mix and sales
										data, we recommend focusing on{" "}
										<strong>Formal Wear</strong> insights.
									</p>
								</div>
							</CardFooter>
						</Card>

						{/* Social Media Trends */}
						{/* <Card className="border shadow-sm bg-card rounded-xl flex flex-col justify-between gap-0">
							<CardContent className="p-8">
								<div className="flex items-center gap-3 mb-6">
									<Sparkles className="h-5 w-5 text-green-600" />
									<h3 className="text-lg font-medium text-foreground">
										Trending in Your Category
									</h3>
								</div>
								<div className="space-y-4">
									{storeData.trendingItems.map(
										(item, index) => (
											<div
												key={item}
												className="flex items-center gap-3"
											>
												<TrendingUp className="h-4 w-4 text-green-600" />
												<span className="text-sm text-slate-400 font-normal">
													{item}
												</span>
												<Badge
													variant="secondary"
													className="ml-auto text-xs text-green-500 border-green-500 font-normal"
												>
													+{15 + index * 8}%
												</Badge>
											</div>
										)
									)}
								</div>
							</CardContent>
							<CardFooter>
								<div className="p-5 bg-green-500/10 rounded-xl ">
									<div className="flex items-center gap-2 mb-2">
										<BarChart3 className="h-4 w-4 text-green-600" />
										<span className="font-medium text-sm text-left text-green-800">
											Growth Opportunities
										</span>
									</div>
									<p className="text-sm text-green-700 text-left font-normal">
										We&apos;ll help you track trends,
										monitor competitors, and optimize
										inventory for maximum growth.
									</p>
								</div>
							</CardFooter>
						</Card> */}
					</div>
				</div>
				{/* Inventory Health Insight */}
				<Card
					className={`border shadow-sm bg-card rounded-2xl flex flex-col justify-between ${getAnimClass("card-step-vision")}`}
					id="card-step-vision"
				>
					<CardHeader className="pb-4 p-6">
						<div className="flex flex-col text-center items-center gap-4">
							<div className="p-3 bg-orange-500/20 rounded-lg">
								<AlertTriangle className="h-5 w-5 text-orange-500" />
							</div>
							<div className="flex-1">
								<h3 className="font-medium text-foreground">
									Inventory Health Alert
								</h3>
								<p className="text-sm text-slate-500 font-normal">
									Stock level optimization
								</p>
							</div>
							<Badge
								variant="secondary"
								className="bg-orange-600 text-white font-normal"
							>
								Urgent
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-5 p-6 pt-0">
						<div className="flex items-center space-x-4">
							<div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 ">
								<ImageWithFallback
									src={inventoryInsight.image}
									alt={inventoryInsight.product}
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="flex-1">
								<h4 className="font-medium text-foreground">
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
						<div className="w-full bg-orange-500/10 rounded-2xl p-4">
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
				<Card
					className={`border shadow-sm bg-card rounded-2xl  flex flex-col justify-between ${getAnimClass("card-step-competitor")}`}
					id="card-step-competitor"
				>
					<CardHeader className="pb-4 p-6">
						<div className="flex flex-col text-center items-center gap-4">
							<div className="p-3 bg-blue-500/20 rounded-lg">
								<Target className="h-5 w-5 text-blue-500" />
							</div>
							<div className="flex-1">
								<h3 className="font-medium text-foreground">
									Competitor Match Found
								</h3>
								<p className="text-sm text-slate-500 font-normal">
									Competitive positioning analysis
								</p>
							</div>
							<Badge
								variant="secondary"
								className="bg-blue-600 text-white font-normal"
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
									<h4 className="font-medium text-foreground">
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
												{competitorInsight.competitor}
											</span>
										</div>
										<div className="text-xs text-slate-500 text-left font-normal">
											{competitorInsight.competitorPrice}
										</div>
										<div className="font-medium text-center text-green-600 bg-green-500/10 px-3 py-1 text-xs border border-green-500/30 rounded-lg backdrop-blur-lg">
											{competitorInsight.advantage}
										</div>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
					<CardFooter>
						<div className="w-full bg-blue-500/10 rounded-2xl p-4">
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
				<Card
					className={`border shadow-sm bg-card rounded-2xl flex flex-col justify-between ${getAnimClass("card-step-pulse")}`}
					id="card-step-pulse"
				>
					<CardHeader className="pb-4 p-6">
						<div className="flex flex-col text-center items-center gap-4">
							<div className="p-3 bg-green-500/20 rounded-lg">
								<Sparkles className="h-5 w-5 text-green-500" />
							</div>
							<div className="flex-1">
								<h3 className="font-medium text-foreground">
									Social Trend Match
								</h3>
								<p className="text-sm text-slate-500 font-normal">
									Pattern & material opportunities
								</p>
							</div>
							<div className="flex flex-row gap-2 items-center space-x-2 text-sm">
								<Badge
									variant="secondary"
									className="bg-green-600 text-white font-normal"
								>
									<TrendingUp className="h-3 w-3 mr-1" />
									{trendInsight.growth}
								</Badge>{" "}
								Since Last Week
							</div>
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
						<div className="w-full bg-green-500/10 rounded-2xl p-4">
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

			{/* Navigation Buttons */}
			{/* <div className="flex justify-between items-center">
						{onBack && (
							<Button
								variant="secondary"
								onClick={onBack}
								className="h-12 px-6 flex items-center gap-2 border-slate-200 text-slate-700 rounded-lg font-normal"
							>
								<ArrowLeft className="h-4 w-4" />
								Back
							</Button>
						)}
						<Button
							onClick={handleContinue}
							className="h-12 px-8 text-base flex items-center gap-2 ml-auto bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
						>
							Sync Your Catalog
							<ArrowRight className="h-4 w-4" />
						</Button>
					</div> */}

			{/* Progress Indicator */}
			{/* <div className="pt-6">
				<ProgressIndicator currentStep={3} totalSteps={5} />
			</div> */}
		</div>
	);
}
