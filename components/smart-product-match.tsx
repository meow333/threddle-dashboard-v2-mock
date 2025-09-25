import { useMemo, useState } from "react";
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
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "./ui/dialog";
import { Slider } from "./ui/slider";
import {
	LineChart as ReLineChart,
	Line as ReLine,
	XAxis as ReXAxis,
	YAxis as ReYAxis,
	CartesianGrid as ReCartesianGrid,
	Tooltip as ReTooltip,
	ResponsiveContainer as ReResponsiveContainer
} from "recharts";
import { toast } from "sonner";

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
	// Dialog state
	const [trendDialogOpen, setTrendDialogOpen] = useState(false);
	const [optDialogOpen, setOptDialogOpen] = useState(false);
	const [gapDialogOpen, setGapDialogOpen] = useState(false);
	const [selectedProductId, setSelectedProductId] = useState<number | null>(
		null
	);
	const [selectedGapIndex, setSelectedGapIndex] = useState<number | null>(
		null
	);

	const selectedProduct = useMemo(
		() => productMatches.find((p) => p.id === selectedProductId) || null,
		[selectedProductId]
	);
	const selectedGap = useMemo(
		() => (selectedGapIndex != null ? marketGaps[selectedGapIndex] : null),
		[selectedGapIndex]
	);

	// Optimization form state
	const [optFocus, setOptFocus] = useState<"price" | "stock" | "promotion">(
		"price"
	);
	const [adjustedPrice, setAdjustedPrice] = useState<number | null>(null);
	const [reorderQty, setReorderQty] = useState<number>(0);
	const [whatIfPriceDelta, setWhatIfPriceDelta] = useState<number>(0);
	const [whatIfStockDelta, setWhatIfStockDelta] = useState<number>(0);

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
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
													className="text-xs"
												>
													{trend}
												</Badge>
											))}
									</div>
									{/* <div className="absolute top-2 right-2"></div> */}
								</div>

								<CardContent className="px-4 pb-5">
									<div className="space-y-3">
										<Badge
											variant={
												product.stockStatus ===
												"In Stock"
													? "success"
													: product.stockStatus ===
														  "Low Stock"
														? "destructive"
														: "neutral"
											}
											className="text-xs"
										>
											{product.stockStatus}
										</Badge>
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
														<Badge
															key={index}
															variant={
																"secondary"
															}
															className="text-xs"
														>
															{flag}
														</Badge>
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

												{/* AI Insights actions per contents.md */}
												<div className="grid grid-cols-3 gap-2 pt-2">
													<Button
														variant="outline"
														size="sm"
														className="text-[10px]"
														onClick={() =>
															toast(
																"Saved to Insights Hub"
															)
														}
													>
														Save to Insights Hub
													</Button>
													<Button
														variant="outline"
														size="sm"
														className="text-[10px]"
														onClick={() =>
															toast(
																"Exported as report"
															)
														}
													>
														Export as Report
													</Button>
													<Button
														variant="outline"
														size="sm"
														className="text-[10px]"
														onClick={() =>
															toast("Alert set")
														}
													>
														Set Alert
													</Button>
												</div>
											</CollapsibleContent>
										</Collapsible>

										{/* Action Buttons */}
										<div className="grid grid-cols-2 gap-2">
											<Button
												variant="outline"
												size="sm"
												className="text-xs"
												onClick={() => {
													setSelectedProductId(
														product.id
													);
													setTrendDialogOpen(true);
												}}
											>
												View Trend
											</Button>
											<Button
												size="sm"
												className="text-xs"
												onClick={() => {
													setSelectedProductId(
														product.id
													);
													setOptDialogOpen(true);
													setAdjustedPrice(
														product.currentPrice
													);
													setReorderQty(0);
													setWhatIfPriceDelta(0);
													setWhatIfStockDelta(0);
												}}
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
										onClick={() => {
											setSelectedGapIndex(index);
											setGapDialogOpen(true);
										}}
									>
										Explore Gap
									</Button>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Trend Deep Dive Dialog */}
			<Dialog open={trendDialogOpen} onOpenChange={setTrendDialogOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>
							Trend Breakdown:{" "}
							{selectedProduct?.primaryTrends?.[0] || "Trend"}
						</DialogTitle>
					</DialogHeader>

					<div className="space-y-4 w-full pr-6">
						<div className="h-48">
							<ReResponsiveContainer width="100%" height="100%">
								<ReLineChart
									data={Array.from({ length: 8 }, (_, i) => ({
										period: `M${i + 1}`,
										yoy: 40 + i * 5 + (i % 2 ? 6 : -3),
										mom: 30 + i * 4 + (i % 3 ? 5 : -2)
									}))}
								>
									<ReCartesianGrid strokeDasharray="3 3" />
									<ReXAxis dataKey="period" />
									<ReYAxis />
									<ReTooltip />
									<ReLine
										type="monotone"
										dataKey="yoy"
										stroke="#2563eb"
										name="YoY"
									/>
									<ReLine
										type="monotone"
										dataKey="mom"
										stroke="#10b981"
										name="MoM"
									/>
								</ReLineChart>
							</ReResponsiveContainer>
						</div>
						<div className="w-full grid grid-cols-1 gap-3 text-sm">
							<div className="border border-border rounded-md p-3">
								<div className="font-medium mb-1">
									Top Influencers
								</div>
								<ul className="list-disc pl-4 space-y-1">
									<li>@StyleAuthority (1.2K mentions)</li>
									<li>@ExecFit (860 mentions)</li>
								</ul>
							</div>
							<div className="border border-border rounded-md p-3">
								<div className="font-medium mb-1">
									Competitor Adoption
								</div>
								<div className="text-muted-foreground">
									5 brands launched SKUs
								</div>
							</div>
							<div className="border border-border rounded-md p-3">
								<div className="font-medium mb-1">
									Related Products
								</div>
								<ul className="list-disc pl-4 space-y-1">
									<li>Oxford Dress Shoes</li>
									<li>Silk Pocket Squares</li>
								</ul>
							</div>
						</div>
					</div>
					<DialogFooter>
						{/* <Button
							variant="outline"
							onClick={() =>
								toast("Opening competitor analysis…")
							}
						>
							Analyze Competitors
						</Button> */}
						<Button
							variant="secondary"
							onClick={() => toast("Added to Priority List")}
						>
							Add to Priority List
						</Button>
						<Button onClick={() => toast("Trend bookmarked")}>
							Bookmark Trend
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Optimization Wizard Dialog */}
			<Dialog open={optDialogOpen} onOpenChange={setOptDialogOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>
							Optimize {selectedProduct?.name || "Product"}
						</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="space-y-2">
								<div className="text-sm font-medium">
									Optimization Focus
								</div>
								<Select
									value={optFocus}
									onValueChange={(v) => setOptFocus(v as any)}
								>
									<SelectTrigger className="w-full">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="price">
											Price
										</SelectItem>
										<SelectItem value="stock">
											Stock
										</SelectItem>
										<SelectItem value="promotion">
											Promotion
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<div className="text-sm font-medium">
									Adjust Price
								</div>
								<div className="flex items-center gap-3">
									<Badge
										variant="outline"
										className="text-xs"
									>
										Current: $
										{selectedProduct?.currentPrice?.toFixed(
											2
										)}
									</Badge>
									<input
										type="number"
										className="w-full rounded-md border border-border bg-background p-2 text-sm"
										value={
											adjustedPrice ??
											selectedProduct?.currentPrice ??
											0
										}
										onChange={(e) =>
											setAdjustedPrice(
												parseFloat(e.target.value)
											)
										}
									/>
								</div>
							</div>
							<div className="space-y-2">
								<div className="text-sm font-medium">
									Reorder Quantity
								</div>
								<input
									type="number"
									className="w-full rounded-md border border-border bg-background p-2 text-sm"
									value={reorderQty}
									onChange={(e) =>
										setReorderQty(
											parseInt(e.target.value || "0", 10)
										)
									}
								/>
							</div>
							<div className="space-y-2">
								<div className="text-sm font-medium">
									What-If: Price Delta ($)
								</div>
								<Slider
									value={[whatIfPriceDelta]}
									min={-50}
									max={50}
									step={1}
									onValueChange={([v]) =>
										setWhatIfPriceDelta(v)
									}
								/>
								<div className="text-xs text-muted-foreground">
									Delta: {whatIfPriceDelta >= 0 ? "+" : ""}
									{whatIfPriceDelta}
								</div>
							</div>
							<div className="space-y-2">
								<div className="text-sm font-medium">
									What-If: Stock Delta (units)
								</div>
								<Slider
									value={[whatIfStockDelta]}
									min={-100}
									max={200}
									step={5}
									onValueChange={([v]) =>
										setWhatIfStockDelta(v)
									}
								/>
								<div className="text-xs text-muted-foreground">
									Delta: {whatIfStockDelta >= 0 ? "+" : ""}
									{whatIfStockDelta}
								</div>
							</div>
						</div>
						<div className="rounded-md border border-border p-3 text-sm">
							<div className="font-medium mb-1">
								AI Suggestions
							</div>
							<ul className="list-disc pl-4 space-y-1 text-muted-foreground">
								<li>
									Competitors priced $20 lower, consider $
									{(
										(selectedProduct?.currentPrice || 0) -
										20
									).toFixed(2)}
								</li>
								<li>
									Reorder recommended within 10 days for
									sustained demand
								</li>
								<li>
									Bundle with Oxford Shoes for +12% margin
									lift
								</li>
							</ul>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => {
								toast("Draft saved");
							}}
						>
							Save Draft
						</Button>
						<Button
							variant="secondary"
							onClick={() => {
								setOptDialogOpen(false);
							}}
						>
							Cancel
						</Button>
						<Button
							onClick={() => {
								toast("Optimization applied");
								setOptDialogOpen(false);
							}}
						>
							Apply Optimization
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Gap Opportunity Explorer Dialog */}
			<Dialog open={gapDialogOpen} onOpenChange={setGapDialogOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>
							Market Gap: {selectedGap?.category || "Category"}
						</DialogTitle>
					</DialogHeader>
					<div className="space-y-3 text-sm">
						<p className="text-muted-foreground">
							Competitors have entered this trend but your catalog
							is missing relevant SKUs.
						</p>
						<div className="w-full grid grid-cols-1 gap-3">
							<div className="rounded-md border border-border p-3">
								<div className="font-medium mb-1">
									Market Size Estimate
								</div>
								<div>
									~$
									{selectedGap
										? selectedGap.opportunity === "High"
											? "3.2M"
											: "1.4M"
										: "—"}{" "}
									potential / quarter
								</div>
								<div>
									Units:{" "}
									{selectedGap
										? selectedGap.opportunity === "High"
											? "18k"
											: "7k"
										: "—"}
								</div>
							</div>
							<div className="rounded-md border border-border p-3">
								<div className="font-medium mb-1">
									Competitor Presence
								</div>
								<div>
									{selectedGap?.competitors ?? "—"} active
									competitors
								</div>
							</div>
						</div>
						<div className="rounded-md border border-border p-3">
							<div className="font-medium mb-1">
								Potential Fit Products
							</div>
							<ul className="list-disc pl-4 space-y-1">
								<li>Eco Wool Suit</li>
								<li>Tech-Lined Blazer</li>
								<li>Tall Fit Dress Shirt</li>
							</ul>
						</div>
						<div className="rounded-md border border-border p-3">
							<div className="font-medium mb-1">
								Launch Timeline Advice
							</div>
							<div>
								Window: Next 4–6 weeks for early mover
								advantage.
							</div>
						</div>
					</div>
					<DialogFooter>
						{/* <Button
							variant="outline"
							onClick={() => toast("Added new product idea")}
						>
							Add New Product Idea
						</Button> */}
						<Button
							variant="secondary"
							onClick={() => toast("Assigned to Trend Agent")}
						>
							Assign to Trend Agent
						</Button>
						<Button onClick={() => toast("Saved to Watchlist")}>
							Save Gap to Watchlist
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
