import { useState } from "react";
import {
	Filter,
	ArrowUp,
	ArrowDown,
	TrendingUp,
	Star,
	ShoppingBag,
	BarChart3,
	Flag
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "./ui/select";
import { Progress } from "./ui/progress";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from "./ui/collapsible";

interface SmartProductMatchProps {}

const productMatches = [
	{
		id: 1,
		image: "/images/products/exec-wool-suit.jpg",
		name: "Executive Wool Suit",
		brand: "Prestige Collection",
		currentPrice: 599.99,
		originalPrice: 799.99,
		stockStatus: "In Stock",
		trendMatchScore: 94,
		primaryTrends: ["Power Suits", "Premium Wool", "Professional"],
		demandLevel: "High",
		growthTrajectory: 24,
		topMarkets: ["US", "UK", "CA"],
		localDemand: 85,
		aiInsight:
			"This product aligns perfectly with the growing 'Power Suits' trend. Consider promoting in US and UK markets where demand is highest.",
		confidence: 94,
		suggestedActions: [
			"Increase inventory by 50%",
			"Adjust pricing strategy",
			"Launch targeted campaign"
		],
		competitorAnalysis: "3 competitors launched similar items this week"
	},
	{
		id: 2,
		image: "/images/products/wide-leg-dress-trousers.jpg",
		name: "Wide-Leg Dress Trousers",
		brand: "Modern Professional",
		currentPrice: 149.99,
		originalPrice: null,
		stockStatus: "Low Stock",
		trendMatchScore: 87,
		primaryTrends: ["Wide-Leg", "Professional", "Comfort Fit"],
		demandLevel: "High",
		growthTrajectory: 18,
		topMarkets: ["US", "FR", "AU"],
		localDemand: 78,
		aiInsight:
			"Strong alignment with wide-leg trouser trend. Low stock presents restock opportunity.",
		confidence: 87,
		suggestedActions: [
			"Urgent restock needed",
			"Consider premium pricing",
			"Expand size variants"
		],
		competitorAnalysis: "Leading price point in segment"
	},
	{
		id: 3,
		image: "/images/products/sick-pocket-square-set.webp",
		name: "Silk Pocket Square Set",
		brand: "Elite Accessories",
		currentPrice: 89.99,
		originalPrice: null,
		stockStatus: "In Stock",
		trendMatchScore: 91,
		primaryTrends: ["Silk Accessories", "Premium Details", "Classic Style"],
		demandLevel: "Medium",
		growthTrajectory: 32,
		topMarkets: ["US", "IT", "UK"],
		localDemand: 68,
		aiInsight:
			"Accessories category showing strong momentum. Consider bundling with other formal accessories.",
		confidence: 91,
		suggestedActions: [
			"Create accessory bundles",
			"Executive partnerships",
			"Corporate gifting campaign"
		],
		competitorAnalysis: "Price competitive within range"
	},
	{
		id: 4,
		image: "/images/products/oxford-shoes.avif",
		name: "Oxford Dress Shoes",
		brand: "Premium Footwear",
		currentPrice: 279.99,
		originalPrice: 349.99,
		stockStatus: "In Stock",
		trendMatchScore: 76,
		primaryTrends: ["Classic Oxfords", "Leather Craftsmanship", "Timeless"],
		demandLevel: "Medium",
		growthTrajectory: 15,
		topMarkets: ["US", "UK", "DE"],
		localDemand: 62,
		aiInsight:
			"Classic style gaining momentum in professional demographics. Consider targeted business professional marketing.",
		confidence: 76,
		suggestedActions: [
			"Target professionals",
			"Business networking events",
			"Corporate partnerships"
		],
		competitorAnalysis: "Strong position vs competitors"
	},
	{
		id: 5,
		image: "/images/products/double-breasted-blazer.jpg",
		name: "Double-Breasted Blazer",
		brand: "Executive Style",
		currentPrice: 329.99,
		originalPrice: null,
		stockStatus: "Out of Stock",
		trendMatchScore: 83,
		primaryTrends: ["Double-Breasted", "Blazers", "Power Dressing"],
		demandLevel: "High",
		growthTrajectory: 28,
		topMarkets: ["US", "UK", "CA"],
		localDemand: 89,
		aiInsight:
			"High demand item currently out of stock. Immediate restock recommended to capture trend momentum.",
		confidence: 83,
		suggestedActions: [
			"Emergency restock",
			"Preorder campaign",
			"Expand blazer collection"
		],
		competitorAnalysis: "Missed opportunity - competitors gaining share"
	},
	{
		id: 6,
		image: "/images/products/merino-wool-sweater.jpg",
		name: "Merino Wool Sweater",
		brand: "Business Casual",
		currentPrice: 189.99,
		originalPrice: 249.99,
		stockStatus: "In Stock",
		trendMatchScore: 89,
		primaryTrends: ["Business Casual", "Premium Wool", "Comfort"],
		demandLevel: "High",
		growthTrajectory: 21,
		topMarkets: ["US", "UK", "NL"],
		localDemand: 81,
		aiInsight:
			"Perfect seasonal item aligned with business casual trends. Consider bundling with other professional pieces.",
		confidence: 89,
		suggestedActions: [
			"Create professional bundles",
			"Seasonal promotion",
			"Email marketing"
		],
		competitorAnalysis: "Premium positioning opportunity"
	}
];

const topOpportunities = [
	{
		product: "Executive Suit Collection",
		score: 96,
		potential: "$25.2K"
	},
	{
		product: "Premium Accessory Sets",
		score: 91,
		potential: "$12.7K"
	}
];

const marketGaps = [
	{
		category: "Sustainable Formal Wear",
		opportunity: "High",
		competitors: 2
	},
	{
		category: "Tech-Enhanced Suits",
		opportunity: "Medium",
		competitors: 3
	},
	{
		category: "Women's Power Suits",
		opportunity: "High",
		competitors: 4
	},
	{
		category: "Tall & Big Formal Wear",
		opportunity: "Medium",
		competitors: 3
	}
];

export function SmartProductMatch() {
	const [sortBy, setSortBy] = useState("relevance");
	const [expandedCard, setExpandedCard] = useState<number | null>(null);

	return (
		<div className="p-6">
			{/* Page Header */}
			{/* <div className="mb-6">
				<h1>Product Spotlight</h1>
				<p className="text-muted-foreground">
					AI-powered formal wear recommendations based on trending
					data
				</p>
			</div> */}

			{/* Filter Panel */}
			<Card className="mb-6">
				<CardContent className="p-4">
					<div className="flex flex-wrap items-center gap-4">
						<Select>
							<SelectTrigger className="w-40">
								<SelectValue placeholder="Category" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">
									All Categories
								</SelectItem>
								<SelectItem value="suits">Suits</SelectItem>
								<SelectItem value="blazers">Blazers</SelectItem>
								<SelectItem value="trousers">
									Trousers
								</SelectItem>
								<SelectItem value="accessories">
									Accessories
								</SelectItem>
								<SelectItem value="footwear">
									Footwear
								</SelectItem>
							</SelectContent>
						</Select>

						<Select>
							<SelectTrigger className="w-40">
								<SelectValue placeholder="Price Range" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Prices</SelectItem>
								<SelectItem value="0-50">$0 - $50</SelectItem>
								<SelectItem value="50-100">
									$50 - $100
								</SelectItem>
								<SelectItem value="100-300">
									$100 - $300
								</SelectItem>
								<SelectItem value="300-500">
									$300 - $500
								</SelectItem>
								<SelectItem value="500+">$500+</SelectItem>
							</SelectContent>
						</Select>

						<Select>
							<SelectTrigger className="w-40">
								<SelectValue placeholder="Stock Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Stock</SelectItem>
								<SelectItem value="in-stock">
									In Stock
								</SelectItem>
								<SelectItem value="low-stock">
									Low Stock
								</SelectItem>
								<SelectItem value="out-stock">
									Out of Stock
								</SelectItem>
							</SelectContent>
						</Select>

						<Select value={sortBy} onValueChange={setSortBy}>
							<SelectTrigger className="w-40">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="relevance">
									Relevance
								</SelectItem>
								<SelectItem value="trend-score">
									Trend Score
								</SelectItem>
								<SelectItem value="demand">Demand</SelectItem>
								<SelectItem value="price">Price</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			<div className="grid grid-cols-12 gap-6">
				{/* Main Product Grid */}
				<div className="col-span-12 xl:col-span-9">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{productMatches.map((product) => (
							<Card
								key={product.id}
								className="overflow-hidden hover:shadow-lg p-2 transition-shadow"
							>
								<div className="relative">
									<img
										src={product.image}
										alt={product.name}
										className="w-full h-64 object-cover border border-slate-200 dark:border-slate-900 rounded-xl"
									/>
									<div className="absolute top-2 left-2 flex flex-wrap gap-1">
										{product.primaryTrends
											.slice(0, 2)
											.map((trend, index) => (
												<Badge
													key={index}
													variant="secondary"
													className="text-xs bg-white border border-slate-200"
												>
													{trend}
												</Badge>
											))}
									</div>
									<div className="absolute top-2 right-2">
										<Badge
											variant={
												product.stockStatus ===
												"In Stock"
													? "default"
													: product.stockStatus ===
														  "Low Stock"
														? "destructive"
														: "destructive"
											}
											className="text-xs"
										>
											{product.stockStatus}
										</Badge>
									</div>
								</div>

								<CardContent className="p-4">
									<div className="space-y-3">
										{/* Product Info */}
										<div>
											<h3 className="font-medium">
												{product.name}
											</h3>
											<p className="text-sm text-muted-foreground">
												{product.brand}
											</p>
											<div className="flex items-center gap-2 mt-1">
												<span className="font-semibold">
													${product.currentPrice}
												</span>
												{product.originalPrice && (
													<span className="text-sm text-muted-foreground line-through">
														${product.originalPrice}
													</span>
												)}
											</div>
										</div>

										{/* Trend Match Score */}
										<div>
											<div className="flex items-center justify-between mb-1">
												<span className="text-sm">
													Trend Match
												</span>
												<span className="text-sm font-medium">
													{product.trendMatchScore}%
												</span>
											</div>
											<Progress
												value={product.trendMatchScore}
												className="h-2"
											/>
										</div>

										{/* Metrics */}
										<div className="grid grid-cols-2 gap-2 text-xs">
											<div className="flex items-center justify-between">
												<span className="text-muted-foreground">
													Demand
												</span>
												<Badge
													variant={
														product.demandLevel ===
														"High"
															? "default"
															: "secondary"
													}
													className="text-xs"
												>
													{product.demandLevel}
												</Badge>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-muted-foreground">
													Growth
												</span>
												<div className="flex items-center">
													<ArrowUp className="h-3 w-3 text-green-600 mr-1" />
													<span className="text-green-600">
														+
														{
															product.growthTrajectory
														}
														%
													</span>
												</div>
											</div>
										</div>

										{/* Geographic Relevance */}
										<div className="flex items-center justify-between">
											<span className="text-sm text-muted-foreground">
												Top Markets
											</span>
											<div className="flex gap-1">
												{product.topMarkets.map(
													(flag, index) => (
														<span
															key={index}
															className="text-lg"
														>
															{flag}
														</span>
													)
												)}
											</div>
										</div>

										{/* Local Demand */}
										<div>
											<div className="flex items-center justify-between mb-1">
												<span className="text-sm text-muted-foreground">
													Local Demand
												</span>
												<span className="text-xs">
													{product.localDemand}%
												</span>
											</div>
											<Progress
												value={product.localDemand}
												className="h-1"
											/>
										</div>

										{/* Expandable AI Insights */}
										<Collapsible
											open={expandedCard === product.id}
											onOpenChange={() =>
												setExpandedCard(
													expandedCard === product.id
														? null
														: product.id
												)
											}
										>
											<CollapsibleTrigger asChild>
												<Button
													variant="outline"
													className="w-full text-xs"
												>
													{expandedCard === product.id
														? "Hide"
														: "Show"}{" "}
													AI Insights
												</Button>
											</CollapsibleTrigger>
											<CollapsibleContent className="mt-3 space-y-3">
												<div className="bg-muted/30 p-3 rounded text-xs">
													<p className="mb-2">
														{product.aiInsight}
													</p>
													<div className="flex items-center justify-between">
														<span className="text-muted-foreground">
															Confidence
														</span>
														<Badge variant="outline">
															{product.confidence}
															%
														</Badge>
													</div>
												</div>

												<div>
													<h4 className="font-medium text-xs mb-2">
														Suggested Actions
													</h4>
													<ul className="text-xs space-y-1">
														{product.suggestedActions.map(
															(action, index) => (
																<li
																	key={index}
																	className="flex items-center"
																>
																	<div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
																	{action}
																</li>
															)
														)}
													</ul>
												</div>

												<div className="text-xs">
													<span className="text-muted-foreground">
														Competitor
														Analysis:{" "}
													</span>
													<span>
														{
															product.competitorAnalysis
														}
													</span>
												</div>
											</CollapsibleContent>
										</Collapsible>

										{/* Action Buttons */}
										<div className="grid grid-cols-2 gap-2">
											<Button
												variant="outline"
												size="sm"
												className="text-xs"
											>
												View Trend
											</Button>
											<Button
												size="sm"
												className="text-xs"
											>
												Optimize
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* Right Sidebar */}
				<div className="col-span-12 xl:col-span-3 space-y-6">
					{/* Top Opportunities */}
					<Card>
						<CardHeader>
							<CardTitle className="text-xl text-foreground font-bold">
								Top Opportunities
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{topOpportunities.map((opportunity, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-3 border  border-border rounded-lg"
								>
									<div className="flex-1">
										<h4 className="font-medium text-sm">
											{opportunity.product}
										</h4>
										<div className="flex items-center gap-2 mt-1">
											<Badge
												variant="outline"
												className="text-xs"
											>
												{opportunity.score}%
											</Badge>
											<span className="text-xs text-green-600">
												{opportunity.potential}
											</span>
										</div>
									</div>
									<Button size="sm" variant="outline">
										<Star className="h-3 w-3" />
									</Button>
								</div>
							))}
						</CardContent>
					</Card>

					{/* Market Gaps */}
					<Card>
						<CardHeader>
							<CardTitle className="text-xl text-foreground font-bold">
								Market Gaps
							</CardTitle>
							<CardDescription>
								Opportunities where trends exist but products
								don&apos;t
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-3">
							{marketGaps.map((gap, index) => (
								<div
									key={index}
									className="p-3 border  border-border rounded-lg"
								>
									<h4 className="font-medium text-sm mb-2">
										{gap.category}
									</h4>
									<div className="flex items-center justify-between">
										<Badge
											variant={
												gap.opportunity === "High"
													? "default"
													: "secondary"
											}
											className="text-xs"
										>
											{gap.opportunity} Opportunity
										</Badge>
										<span className="text-xs text-muted-foreground">
											{gap.competitors} competitors
										</span>
									</div>
									<Button
										variant="outline"
										size="sm"
										className="w-full mt-2 text-xs"
									>
										Explore Gap
									</Button>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
