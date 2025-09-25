import { useMemo, useState } from "react";
import {
	Plus,
	Search,
	Users,
	TrendingUp,
	BarChart3,
	Star,
	ArrowUp,
	ArrowDown
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
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "./ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "./ui/dialog";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	LineChart,
	Line
} from "recharts";
import { toast } from "sonner";

interface CompetitorMirrorProps {}

const competitors = [
	{
		id: 1,
		name: "Hugo Boss",
		logo: "HB",
		marketShare: 12.5,
		productCount: 2420,
		avgPrice: 445.99,
		trendAdoption: 87,
		geoReach: 45,
		recentActivity: "Launched sustainable suit collection",
		position: { x: 12.5, y: 15.2, size: 154 }
	},
	{
		id: 2,
		name: "Armani",
		logo: "AR",
		marketShare: 18.3,
		productCount: 1960,
		avgPrice: 659.99,
		trendAdoption: 92,
		geoReach: 78,
		recentActivity: "Price reduction on blazers",
		position: { x: 18.3, y: 22.1, size: 90 }
	},
	{
		id: 3,
		name: "Brooks Brothers",
		logo: "BB",
		marketShare: 16.7,
		productCount: 3300,
		avgPrice: 329.99,
		trendAdoption: 78,
		geoReach: 65,
		recentActivity: "Business casual initiative",
		position: { x: 16.7, y: 18.5, size: 123 }
	},
	{
		id: 4,
		name: "Men's Wearhouse",
		logo: "MW",
		marketShare: 22.1,
		productCount: 4500,
		avgPrice: 215.99,
		trendAdoption: 95,
		geoReach: 89,
		recentActivity: "Corporate partnership expansion",
		position: { x: 22.1, y: 28.3, size: 450 }
	},
	{
		id: 5,
		name: "Elite Formal Wear",
		logo: "EF",
		marketShare: 3.2,
		productCount: 350,
		avgPrice: 452.99,
		trendAdoption: 71,
		geoReach: 15,
		recentActivity: "Added power suit collection",
		position: { x: 3.2, y: 8.1, size: 85 },
		isYours: true
	}
];

const productComparisons = [
	{
		category: "Executive Suits",
		yourProduct: {
			name: "Premium Wool Executive Suit",
			price: 599.99,
			rating: 4.2,
			sales: 145
		},
		competitor: {
			name: "Classic Business Suit",
			brand: "Brooks Brothers",
			price: 579.99,
			rating: 4.0,
			sales: 890
		},
		trendAlignment: 85
	},
	{
		category: "Dress Shirts",
		yourProduct: {
			name: "Egyptian Cotton Dress Shirt",
			price: 89.99,
			rating: 4.5,
			sales: 203
		},
		competitor: {
			name: "Non-Iron Dress Shirt",
			brand: "Hugo Boss",
			price: 128.99,
			rating: 4.1,
			sales: 1200
		},
		trendAlignment: 92
	},
	{
		category: "Oxford Shoes",
		yourProduct: {
			name: "Classic Oxford Leather Shoes",
			price: 279.99,
			rating: 4.0,
			sales: 89
		},
		competitor: {
			name: "Business Oxford Shoes",
			brand: "Men's Wearhouse",
			price: 199.99,
			rating: 3.8,
			sales: 567
		},
		trendAlignment: 78
	}
];

const trendAdoptionData = [
	{
		month: "Jan",
		yourStore: 65,
		hugoBoss: 82,
		armani: 88,
		brooksBrothers: 75,
		mensWearhouse: 90
	},
	{
		month: "Feb",
		yourStore: 68,
		hugoBoss: 84,
		armani: 89,
		brooksBrothers: 76,
		mensWearhouse: 92
	},
	{
		month: "Mar",
		yourStore: 70,
		hugoBoss: 85,
		armani: 91,
		brooksBrothers: 77,
		mensWearhouse: 93
	},
	{
		month: "Apr",
		yourStore: 71,
		hugoBoss: 87,
		armani: 92,
		brooksBrothers: 78,
		mensWearhouse: 95
	}
];

const competitiveMatrix = [
	{
		trend: "Power Suits",
		yourStore: "Fast Follower",
		hugoBoss: "First Mover",
		armani: "Late Adopter",
		brooksBrothers: "Not Adopted",
		mensWearhouse: "Fast Follower"
	},
	{
		trend: "Business Casual",
		yourStore: "Late Adopter",
		hugoBoss: "Fast Follower",
		armani: "First Mover",
		brooksBrothers: "Fast Follower",
		mensWearhouse: "First Mover"
	},
	{
		trend: "Sustainable Fabrics",
		yourStore: "Not Adopted",
		hugoBoss: "First Mover",
		armani: "Fast Follower",
		brooksBrothers: "First Mover",
		mensWearhouse: "Late Adopter"
	},
	{
		trend: "Wide-Leg Trousers",
		yourStore: "Fast Follower",
		hugoBoss: "Fast Follower",
		armani: "First Mover",
		brooksBrothers: "Fast Follower",
		mensWearhouse: "Fast Follower"
	},
	{
		trend: "Tech-Enhanced Suits",
		yourStore: "Late Adopter",
		hugoBoss: "Fast Follower",
		armani: "Fast Follower",
		brooksBrothers: "Late Adopter",
		mensWearhouse: "First Mover"
	}
];

export function CompetitorMirror() {
	const [selectedCompetitor, setSelectedCompetitor] = useState<
		(typeof competitors)[0] | null
	>(null);
	// Detailed Comparison dialog state
	const [detailOpen, setDetailOpen] = useState(false);
	const [detailIndex, setDetailIndex] = useState<number | null>(null);
	const [showAdjustPricing, setShowAdjustPricing] = useState(false);
	// Gap dialog state
	const [gapOpen, setGapOpen] = useState(false);
	const [selectedGap, setSelectedGap] = useState<{
		category: string;
		competitors: string[];
		opportunity: string;
	} | null>(null);

	const comparison = useMemo(
		() => (detailIndex != null ? productComparisons[detailIndex] : null),
		[detailIndex]
	);

	const getImageForCategory = (category: string) => {
		switch (category) {
			case "Executive Suits":
				return "/images/products/exec-wool-suit.jpg";
			case "Oxford Shoes":
				return "/images/products/oxford-shoes.avif";
			case "Dress Shirts":
				// Fallback image (no specific shirt asset in repo)
				return "/images/products/exec-wool-suit.jpg";
			default:
				return "/images/products/exec-wool-suit.jpg";
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case "First Mover":
				return "bg-green-100 text-green-800";
			case "Fast Follower":
				return "bg-blue-100 text-blue-800";
			case "Late Adopter":
				return "bg-yellow-100 text-yellow-800";
			case "Not Adopted":
				return "bg-slate-100 text-slate-800";
			default:
				return "bg-slate-100 text-slate-800";
		}
	};

	return (
		<div className="p-6">
			{/* Page Header */}
			{/* <div className="mb-6">
				<h1>Competitor Mirror</h1>
				<p className="text-muted-foreground">
					Stay ahead with real-time formal wear competitor
					intelligence
				</p>
			</div> */}

			{/* Competitor Selection Panel */}
			<Card className="mb-6">
				<CardHeader>
					<div className="flex items-center justify-between">
						<CardTitle className="text-xl text-foreground font-bold">
							Competitor Management
						</CardTitle>
						<div className="flex gap-2">
							<Button variant="outline" size="sm">
								<Plus className="h-4 w-4 mr-2" />
								Add Competitor
							</Button>
							<Button variant="outline" size="sm">
								Create List
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
						{competitors.map((competitor) => (
							<Card
								key={competitor.id}
								className={`cursor-pointer transition-colors ${
									competitor.isYours
										? "border-primary bg-primary/5"
										: "hover:border-primary/50"
								}`}
								onClick={() =>
									setSelectedCompetitor(competitor)
								}
							>
								<CardContent className="p-4 text-center">
									<Avatar className="mx-auto mb-2">
										<AvatarFallback
											className={
												competitor.isYours
													? "bg-primary text-primary-foreground"
													: ""
											}
										>
											{competitor.logo}
										</AvatarFallback>
									</Avatar>
									<h4 className="font-medium text-sm">
										{competitor.name}
									</h4>
									{competitor.isYours && (
										<Badge
											variant="outline"
											className="mt-1 text-xs"
										>
											Your Store
										</Badge>
									)}
									<p className="text-xs text-muted-foreground mt-1">
										{competitor.marketShare}% share
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Main Analysis Tabs */}
			<Tabs defaultValue="overview" className="space-y-6">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="overview">Market Overview</TabsTrigger>
					<TabsTrigger value="products">
						Product Intelligence
					</TabsTrigger>
					<TabsTrigger value="trends">Trend Adoption</TabsTrigger>
				</TabsList>

				{/* Market Overview Tab */}
				<TabsContent value="overview" className="space-y-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						{/* Market Position Chart */}
						<Card>
							<CardHeader>
								<CardTitle className="text-xl text-foreground font-bold">
									Market Position Analysis
								</CardTitle>
								<CardDescription>
									Market share vs growth rate positioning
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-80">
									<ResponsiveContainer
										width="100%"
										height="100%"
									>
										<ScatterChart data={competitors}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis
												dataKey="position.x"
												type="number"
												name="Market Share (%)"
												label={{
													value: "Market Share (%)",
													position: "insideBottom",
													offset: -10
												}}
											/>
											<YAxis
												dataKey="position.y"
												type="number"
												name="Growth Rate (%)"
												label={{
													value: "Growth Rate (%)",
													angle: -90,
													position: "insideLeft"
												}}
											/>
											<Tooltip
												formatter={(
													value,
													name,
													props
												) => [
													props.payload.name,
													`Market Share: ${props.payload.position.x}%`,
													`Growth Rate: ${props.payload.position.y}%`
												]}
											/>
											<Scatter
												dataKey="position.size"
												fill={
													((entry: any) =>
														entry.isYours
															? "#3b82f6"
															: "#6b7280") as any
												}
											/>
										</ScatterChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>

						{/* Competitive Metrics Table */}
						<Card>
							<CardHeader>
								<CardTitle className="text-xl text-foreground font-bold">
									Competitive Metrics
								</CardTitle>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Competitor</TableHead>
											<TableHead>Share</TableHead>
											<TableHead>Products</TableHead>
											<TableHead>Avg Price</TableHead>
											<TableHead>Trend Score</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{competitors.map((competitor) => (
											<TableRow
												key={competitor.id}
												className={
													competitor.isYours
														? "bg-primary/5"
														: ""
												}
											>
												<TableCell>
													<div className="flex items-center gap-2">
														<Avatar className="h-6 w-6">
															<AvatarFallback className="text-xs">
																{
																	competitor.logo
																}
															</AvatarFallback>
														</Avatar>
														<span className="font-medium">
															{competitor.name}
														</span>
														{competitor.isYours && (
															<Badge
																variant="outline"
																className="text-xs"
															>
																You
															</Badge>
														)}
													</div>
												</TableCell>
												<TableCell>
													{competitor.marketShare}%
												</TableCell>
												<TableCell>
													{competitor.productCount.toLocaleString()}
												</TableCell>
												<TableCell>
													${competitor.avgPrice}
												</TableCell>
												<TableCell>
													<div className="flex items-center gap-2">
														<span>
															{
																competitor.trendAdoption
															}
														</span>
														{competitor.trendAdoption >
														80 ? (
															<ArrowUp className="h-3 w-3 text-green-600" />
														) : (
															<ArrowDown className="h-3 w-3 text-red-600" />
														)}
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				{/* Product Intelligence Tab */}
				<TabsContent value="products" className="space-y-6">
					<div className="grid gap-6">
						{/* Product Comparison Cards */}
						<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
							{productComparisons.map((comparison, index) => (
								<Card
									key={index}
									className="border border-border"
								>
									<CardHeader>
										<CardTitle className="text-xl text-foreground font-bold">
											{comparison.category}
										</CardTitle>
										<Badge
											variant="outline"
											className="w-fit"
										>
											{comparison.trendAlignment}% trend
											match
										</Badge>
									</CardHeader>
									<CardContent className="w-full grid grid-cols-2 items-center justify-between gap-4">
										{/* Your Product */}
										<div className="p-3 border rounded-lg flex flex-row items-end justify-between border border-border">
											<div>
												<img
													src={getImageForCategory(
														comparison.category
													)}
													alt={`${comparison.category} - Your Product`}
													className="w-full h-24 object-cover rounded mb-2 border border-slate-200 dark:border-slate-900"
												/>
												<h4 className="font-medium text-sm text-primary">
													Your Product
												</h4>
												<p className="text-sm mt-1">
													{
														comparison.yourProduct
															.name
													}
												</p>
												<span>
													$
													{
														comparison.yourProduct
															.price
													}
												</span>
											</div>
											<div className="flex flex-col items-center justify-between mt-2 text-xs ">
												<span>
													★{" "}
													{
														comparison.yourProduct
															.rating
													}
												</span>
												<span>
													{
														comparison.yourProduct
															.sales
													}{" "}
													sales
												</span>
											</div>
										</div>

										{/* Competitor Product */}
										<div className="p-3 border rounded-lg  flex flex-row items-end justify-between border border-border">
											<div>
												<img
													src={getImageForCategory(
														comparison.category
													)}
													alt={`${comparison.category} - Competitor Product`}
													className="w-full h-24 object-cover rounded mb-2 border border-slate-200 dark:border-slate-900"
												/>
												<h4 className="font-medium text-sm">
													{
														comparison.competitor
															.brand
													}
												</h4>
												<p className="text-sm mt-1">
													{comparison.competitor.name}
												</p>
												<span>
													$
													{
														comparison.competitor
															.price
													}
												</span>
											</div>
											<div className="flex flex-col items-center justify-between mt-2 text-xs">
												<span>
													★{" "}
													{
														comparison.competitor
															.rating
													}
												</span>
												<span>
													{
														comparison.competitor
															.sales
													}{" "}
													sales
												</span>
											</div>
										</div>

										<Button
											variant="outline"
											size="sm"
											className="w-full col-span-2"
											onClick={() => {
												setDetailIndex(index);
												setDetailOpen(true);
												setShowAdjustPricing(false);
											}}
										>
											Detailed Comparison
										</Button>
									</CardContent>
								</Card>
							))}
						</div>

						{/* Gap Analysis */}
						<Card>
							<CardHeader>
								<CardTitle className="text-xl text-foreground font-bold">
									Market Gap Analysis
								</CardTitle>
								<CardDescription>
									Products competitors have that you
									don&apos;t
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
									{[
										{
											category: "Sustainable Suits",
											competitors: [
												"Hugo Boss",
												"Brooks Brothers"
											],
											opportunity: "High"
										},
										{
											category: "Tech Accessories",
											competitors: [
												"Armani",
												"Men's Wearhouse"
											],
											opportunity: "Medium"
										},
										{
											category: "Business Casual Sets",
											competitors: [
												"Brooks Brothers",
												"Men's Wearhouse"
											],
											opportunity: "High"
										},
										{
											category: "Premium Cufflinks",
											competitors: ["Hugo Boss"],
											opportunity: "Low"
										}
									].map((gap, index) => (
										<div
											key={index}
											className="p-4 border rounded-lg border-border"
										>
											<h4 className="font-medium text-sm mb-2">
												{gap.category}
											</h4>
											<div className="space-y-2">
												<div className="flex flex-wrap gap-1">
													{gap.competitors.map(
														(comp, i) => (
															<Badge
																key={i}
																variant="secondary"
																className="text-xs"
															>
																{comp}
															</Badge>
														)
													)}
												</div>
												<Badge
													variant={
														gap.opportunity ===
														"High"
															? "default"
															: gap.opportunity ===
																  "Medium"
																? "secondary"
																: "outline"
													}
													className="text-xs"
												>
													{gap.opportunity}{" "}
													Opportunity
												</Badge>
											</div>
											<Button
												variant="outline"
												size="sm"
												className="w-full mt-3 text-xs"
												onClick={() => {
													setSelectedGap(gap);
													setGapOpen(true);
												}}
											>
												Explore Gap
											</Button>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				{/* Trend Adoption Tab */}
				<TabsContent value="trends" className="space-y-6">
					<div className="grid gap-6">
						{/* Trend Adoption Timeline */}
						<Card>
							<CardHeader>
								<CardTitle className="text-xl text-foreground font-bold">
									Trend Adoption Speed
								</CardTitle>
								<CardDescription>
									How quickly each competitor adopts new
									trends
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-80">
									<ResponsiveContainer
										width="100%"
										height="100%"
									>
										<LineChart data={trendAdoptionData}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="month" />
											<YAxis />
											<Tooltip />
											<Line
												type="monotone"
												dataKey="yourStore"
												stroke="#3b82f6"
												strokeWidth={3}
												name="Your Store"
											/>
											<Line
												type="monotone"
												dataKey="hugoBoss"
												stroke="#10b981"
												strokeWidth={2}
												name="Hugo Boss"
											/>
											<Line
												type="monotone"
												dataKey="armani"
												stroke="#f59e0b"
												strokeWidth={2}
												name="Armani"
											/>
											<Line
												type="monotone"
												dataKey="brooksBrothers"
												stroke="#ef4444"
												strokeWidth={2}
												name="Brooks Brothers"
											/>
											<Line
												type="monotone"
												dataKey="mensWearhouse"
												stroke="#8b5cf6"
												strokeWidth={2}
												name="Men's Wearhouse"
											/>
										</LineChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>

						{/* Competitive Advantage Matrix */}
						<Card>
							<CardHeader>
								<CardTitle className="text-xl text-foreground font-bold">
									Competitive Advantage Matrix
								</CardTitle>
								<CardDescription>
									Trend adoption status across major fashion
									trends
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="overflow-x-auto">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Trend</TableHead>
												<TableHead>
													Your Store
												</TableHead>
												<TableHead>Hugo Boss</TableHead>
												<TableHead>Armani</TableHead>
												<TableHead>
													Brooks Brothers
												</TableHead>
												<TableHead>
													Men&apos;s Wearhouse
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{competitiveMatrix.map(
												(row, index) => (
													<TableRow key={index}>
														<TableCell className="font-medium">
															{row.trend}
														</TableCell>
														<TableCell>
															<Badge
																className={`text-xs ${getStatusColor(
																	row.yourStore
																)}`}
															>
																{row.yourStore}
															</Badge>
														</TableCell>
														<TableCell>
															<Badge
																className={`text-xs ${getStatusColor(
																	row.hugoBoss
																)}`}
															>
																{row.hugoBoss}
															</Badge>
														</TableCell>
														<TableCell>
															<Badge
																className={`text-xs ${getStatusColor(
																	row.armani
																)}`}
															>
																{row.armani}
															</Badge>
														</TableCell>
														<TableCell>
															<Badge
																className={`text-xs ${getStatusColor(
																	row.brooksBrothers
																)}`}
															>
																{
																	row.brooksBrothers
																}
															</Badge>
														</TableCell>
														<TableCell>
															<Badge
																className={`text-xs ${getStatusColor(
																	row.mensWearhouse
																)}`}
															>
																{
																	row.mensWearhouse
																}
															</Badge>
														</TableCell>
													</TableRow>
												)
											)}
										</TableBody>
									</Table>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>
			</Tabs>

			{/* Detailed Comparison Dialog */}
			<Dialog open={detailOpen} onOpenChange={setDetailOpen}>
				<DialogContent className="sm:max-w-5xl">
					<DialogHeader>
						<DialogTitle>
							Detailed Comparison:{" "}
							{comparison?.category || "Product"}
						</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						{/* Tabs mimic: Overview, Price & Margin, Market & Adoption, AI Recs */}
						<Tabs defaultValue="overview" className="space-y-3">
							<TabsList className="grid w-full grid-cols-4">
								<TabsTrigger value="overview">
									Overview
								</TabsTrigger>
								<TabsTrigger value="price">
									Price & Margin
								</TabsTrigger>
								<TabsTrigger value="market">
									Market & Adoption
								</TabsTrigger>
								<TabsTrigger value="ai">AI Recs</TabsTrigger>
							</TabsList>

							<TabsContent value="overview" className="space-y-3">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
									<div className="rounded-md border border-border p-3">
										<img
											src={getImageForCategory(
												comparison?.category ||
													"Executive Suits"
											)}
											alt={`${comparison?.category || "Product"} - Your Product`}
											className="w-full h-28 object-cover rounded mb-2 border border-slate-200 dark:border-slate-900"
										/>
										<div className="font-medium mb-1">
											Your Product
										</div>
										<div>
											{comparison?.yourProduct.name}
										</div>
										<div>
											Price: $
											{comparison?.yourProduct.price}
										</div>
										<div>Stock: —</div>
										<div>
											Rating: ★{" "}
											{comparison?.yourProduct.rating}
										</div>
									</div>
									<div className="rounded-md border border-border p-3">
										<img
											src={getImageForCategory(
												comparison?.category ||
													"Executive Suits"
											)}
											alt={`${comparison?.category || "Product"} - Competitor Product`}
											className="w-full h-28 object-cover rounded mb-2 border border-slate-200 dark:border-slate-900"
										/>
										<div className="font-medium mb-1">
											Competitor
										</div>
										<div>
											{comparison?.competitor.brand} –{" "}
											{comparison?.competitor.name}
										</div>
										<div>
											Price: $
											{comparison?.competitor.price}
										</div>
										<div>
											Rating: ★{" "}
											{comparison?.competitor.rating}
										</div>
									</div>
								</div>
								<div className="text-sm text-muted-foreground">
									Trend match: {comparison?.trendAlignment}% |
									Demand signals: influencer mentions up 18%
								</div>
							</TabsContent>

							<TabsContent value="price" className="space-y-3">
								<div className="h-40">
									<ResponsiveContainer
										width="100%"
										height="100%"
									>
										<LineChart
											data={Array.from(
												{ length: 12 },
												(_, i) => ({
													d: i + 1,
													you: 500 + i * 2,
													comp: 520 + (i % 4) * 5
												})
											)}
										>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="d" />
											<YAxis />
											<Tooltip />
											<Line
												dataKey="you"
												type="monotone"
												stroke="#2563eb"
												name="Your Price"
											/>
											<Line
												dataKey="comp"
												type="monotone"
												stroke="#10b981"
												name="Competitor Price"
											/>
										</LineChart>
									</ResponsiveContainer>
								</div>
								<div className="rounded-md border border-border p-3 text-sm">
									Suggested corridor: $480 – $540. Competitor
									promo spikes visible in weeks 3 and 8.
								</div>
								{showAdjustPricing && (
									<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
										<div>
											<label className="text-xs text-muted-foreground">
												New Price
											</label>
											<Input
												type="number"
												defaultValue={
													comparison?.yourProduct
														.price
												}
												onChange={() => {}}
											/>
										</div>
										<div>
											<label className="text-xs text-muted-foreground">
												Effective Date
											</label>
											<Input type="date" />
										</div>
										<div className="flex items-end">
											<Button
												className="w-full"
												onClick={() => {
													toast("Pricing adjusted");
													setShowAdjustPricing(false);
												}}
											>
												Apply
											</Button>
										</div>
									</div>
								)}
							</TabsContent>

							<TabsContent value="market" className="space-y-3">
								<div className="text-sm">
									Sales velocity trending upward; strongest in
									US + UK.
								</div>
								<div className="h-40">
									<ResponsiveContainer
										width="100%"
										height="100%"
									>
										<LineChart
											data={Array.from(
												{ length: 10 },
												(_, i) => ({
													t: i + 1,
													units: 80 + i * 12
												})
											)}
										>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="t" />
											<YAxis />
											<Tooltip />
											<Line
												dataKey="units"
												type="monotone"
												stroke="#9333ea"
												name="Units Sold"
											/>
										</LineChart>
									</ResponsiveContainer>
								</div>
							</TabsContent>

							<TabsContent
								value="ai"
								className="space-y-2 text-sm"
							>
								<ul className="list-disc pl-5 space-y-1">
									<li>
										Lower price by 5% to regain market
										share.
									</li>
									<li>
										Highlight sustainable fabric in
										campaigns.
									</li>
									<li>
										Competitor stock depleting fast; restock
										within 3 weeks.
									</li>
								</ul>
							</TabsContent>
						</Tabs>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setShowAdjustPricing((v) => !v)}
						>
							Adjust Pricing
						</Button>
						<Button
							variant="secondary"
							onClick={() =>
								toast("Competitor added to Watchlist")
							}
						>
							Add to Watchlist
						</Button>
						<Button onClick={() => toast("Exported PDF")}>
							Export Comparison PDF
						</Button>
						<Button
							onClick={() => toast("Flagged for AI Playbook")}
						>
							Flag for AI Playbook
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{/* Market Gap Explorer Dialog */}
			<Dialog open={gapOpen} onOpenChange={setGapOpen}>
				<DialogContent className="sm:max-w-5xl">
					<DialogHeader>
						<DialogTitle>
							Market Gap: {selectedGap?.category || "Category"}
						</DialogTitle>
					</DialogHeader>
					<div className="space-y-3 text-sm">
						<div>
							<p className="text-muted-foreground">
								Competitors are capturing demand in{" "}
								{selectedGap?.category}. You don’t currently
								offer products here.
							</p>
							<div className="flex flex-wrap gap-1 mt-2">
								{selectedGap?.competitors.map((c, i) => (
									<Badge
										key={i}
										variant="outline"
										className="text-xs"
									>
										{c}
									</Badge>
								))}
							</div>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							<div className="rounded-md border border-border p-3">
								<div className="font-medium mb-1">
									Demand & Market Size
								</div>
								<div>
									TAM: $
									{selectedGap?.opportunity === "High"
										? "4.1M"
										: selectedGap?.opportunity === "Medium"
											? "1.8M"
											: "0.7M"}
								</div>
								<div className="h-28 mt-2">
									<ResponsiveContainer
										width="100%"
										height="100%"
									>
										<LineChart
											data={Array.from(
												{ length: 6 },
												(_, i) => ({
													m: i + 1,
													g: 60 + i * 8
												})
											)}
										>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="m" />
											<YAxis />
											<Tooltip />
											<Line
												dataKey="g"
												type="monotone"
												stroke="#16a34a"
												name="Growth"
											/>
										</LineChart>
									</ResponsiveContainer>
								</div>
							</div>
							<div className="rounded-md border border-border p-3">
								<div className="font-medium mb-1">
									Competitive Landscape
								</div>
								<div>
									Price bands: $120–$240 | Positioning:
									sustainability, value
								</div>
							</div>
						</div>
						<div className="rounded-md border border-border p-3">
							<div className="font-medium mb-1">
								AI Opportunity Fit
							</div>
							<ul className="list-disc pl-5 space-y-1">
								<li>
									Introduce Eco Wool Suit, projected margin
									48–55%.
								</li>
								<li>
									Timeline: Next 6 weeks = early mover
									advantage.
								</li>
							</ul>
							<div className="grid grid-cols-3 gap-2 mt-2">
								<Input
									placeholder="New Product Name (auto)"
									defaultValue={`${selectedGap?.category} – Concept`}
								/>
								<Input
									placeholder="Category"
									defaultValue={selectedGap?.category}
								/>
								<Input
									placeholder="Target Price"
									defaultValue={
										selectedGap?.opportunity === "High"
											? "229.99"
											: "179.99"
									}
								/>
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => toast("Generated product brief")}
						>
							Generate New Product Brief
						</Button>
						<Button
							variant="secondary"
							onClick={() => toast("Assigned to Trend Agent")}
						>
							Assign to Trend Agent
						</Button>
						<Button onClick={() => toast("Saved to Watchlist")}>
							Save to Watchlist
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
