import {
	ArrowUp,
	ArrowDown,
	Target,
	TrendingUp,
	Package,
	DollarSign,
	AlertCircle,
	CheckCircle,
	Clock
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
import { Progress } from "./ui/progress";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "./ui/table";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar,
	LineChart,
	Line
} from "recharts";

interface StoreAnalyticsProps {}

const performanceKPIs = [
	{
		title: "Trend Alignment Score",
		value: 78,
		change: 5,
		insight:
			"Your products are 23% more trend-aligned than industry average",
		icon: TrendingUp,
		color: "text-blue-600"
	},
	{
		title: "Prediction Accuracy",
		value: 87,
		change: 3,
		successStories: 24,
		missedOpportunities: 6,
		nextPrediction: "Power suit demand spike expected",
		icon: Target,
		color: "text-green-600"
	},
	{
		title: "Revenue Attribution",
		value: "$28.2K",
		percentage: 42,
		change: 15,
		topPerformer: "Executive Suit Collection",
		icon: DollarSign,
		color: "text-green-600"
	},
	{
		title: "Inventory Optimization",
		value: 31,
		overstockAvoided: "$12.4K",
		stockoutsPrevented: 18,
		efficiencyScore: 92,
		icon: Package,
		color: "text-purple-600"
	}
];

const productPerformanceData = [
	{
		name: "Executive Suit",
		trendAlignment: 85,
		salesPerformance: 92,
		category: "Suits"
	},
	{
		name: "Silk Pocket Square",
		trendAlignment: 78,
		salesPerformance: 76,
		category: "Accessories"
	},
	{
		name: "Oxford Shoes",
		trendAlignment: 72,
		salesPerformance: 68,
		category: "Footwear"
	},
	{
		name: "Double-Breasted Blazer",
		trendAlignment: 94,
		salesPerformance: 88,
		category: "Blazers"
	},
	{
		name: "Wide-Leg Trousers",
		trendAlignment: 91,
		salesPerformance: 95,
		category: "Trousers"
	},
	{
		name: "Classic Cufflinks",
		trendAlignment: 65,
		salesPerformance: 45,
		category: "Accessories"
	},
	{
		name: "Dress Shirt",
		trendAlignment: 82,
		salesPerformance: 79,
		category: "Shirts"
	},
	{
		name: "Wool Vest",
		trendAlignment: 76,
		salesPerformance: 71,
		category: "Vests"
	}
];

const categoryPerformanceData = [
	{
		category: "Suits",
		trendAdoption: 85,
		revenueImpact: 78,
		industryAvg: 72
	},
	{
		category: "Accessories",
		trendAdoption: 78,
		revenueImpact: 82,
		industryAvg: 69
	},
	{
		category: "Footwear",
		trendAdoption: 71,
		revenueImpact: 65,
		industryAvg: 65
	},
	{
		category: "Trousers",
		trendAdoption: 88,
		revenueImpact: 85,
		industryAvg: 74
	}
];

const demandForecast = [
	{
		product: "Power Suit Collection",
		currentStock: 45,
		predicted30d: 78,
		predicted60d: 105,
		predicted90d: 135,
		action: "Increase Stock",
		confidence: 94,
		trendDrivers: ["Power Suits", "Professional Wear", "Premium Wool"]
	},
	{
		product: "Wide-Leg Trousers",
		currentStock: 23,
		predicted30d: 89,
		predicted60d: 156,
		predicted90d: 203,
		action: "Major Restock",
		confidence: 91,
		trendDrivers: ["Wide-Leg", "Business Casual", "Comfort Fit"]
	},
	{
		product: "Summer Blazers",
		currentStock: 67,
		predicted30d: 34,
		predicted60d: 28,
		predicted90d: 22,
		action: "Reduce Inventory",
		confidence: 78,
		trendDrivers: ["Seasonal", "Lightweight"]
	},
	{
		product: "Premium Cufflinks",
		currentStock: 34,
		predicted30d: 76,
		predicted60d: 98,
		predicted90d: 112,
		action: "Increase Stock",
		confidence: 89,
		trendDrivers: [
			"Luxury Accessories",
			"Executive Style",
			"Classic Details"
		]
	},
	{
		product: "Wool Overcoats",
		currentStock: 12,
		predicted30d: 45,
		predicted60d: 67,
		predicted90d: 78,
		action: "Restock Soon",
		confidence: 85,
		trendDrivers: ["Premium Wool", "Winter Formal", "Executive Wear"]
	}
];

const marketOpportunities = [
	{
		type: "New Trend",
		title: "Tech-Enhanced Suits Emerging",
		urgency: "High",
		impact: "$25.3K",
		actions: [
			"Research smart fabrics",
			"Source tech suppliers",
			"Test market"
		],
		timeSensitive: "2 weeks"
	},
	{
		type: "Competitor Gap",
		title: "Sustainable Formal Wear Underserved",
		urgency: "Medium",
		impact: "$18.7K",
		actions: [
			"Analyze competitors",
			"Source eco-friendly materials",
			"Plan sustainable line"
		],
		timeSensitive: "1 month"
	},
	{
		type: "Demand Spike",
		title: "Executive Accessories Sudden Interest",
		urgency: "High",
		impact: "$12.2K",
		actions: ["Increase inventory", "Optimize listings", "Run promotions"],
		timeSensitive: "1 week"
	},
	{
		type: "Seasonal Opportunity",
		title: "Fall Executive Collection Preparation",
		urgency: "Low",
		impact: "$35.8K",
		actions: [
			"Plan collection",
			"Coordinate launch",
			"Corporate partnerships"
		],
		timeSensitive: "3 months"
	}
];

export function StoreAnalytics() {
	const getQuadrantLabel = (x: number, y: number) => {
		if (x >= 80 && y >= 80) return "Star Products";
		if (x >= 80 && y < 80) return "Trending Potential";
		if (x < 80 && y >= 80) return "Optimize Needed";
		return "Consider Discontinuing";
	};

	const getActionColor = (action: string) => {
		switch (action) {
			case "Increase Stock":
			case "Major Restock":
			case "Restock Soon":
				return "text-green-600";
			case "Reduce Inventory":
				return "text-red-600";
			default:
				return "text-blue-600";
		}
	};

	const getUrgencyColor = (urgency: string) => {
		switch (urgency) {
			case "High":
				return "destructive";
			case "Medium":
				return "default";
			case "Low":
				return "secondary";
			default:
				return "secondary";
		}
	};

	return (
		<div className="p-6 space-y-6">
			{/* Page Header */}
			{/* <div>
        <h1>Performance Impact</h1>
        <p className="text-muted-foreground">Formal wear ROI attribution hub</p>
      </div> */}

			{/* Performance KPIs */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{performanceKPIs.map((kpi, index) => (
					<Card key={index}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-xl text-foreground font-bold">
								{kpi.title}
							</CardTitle>
							<kpi.icon className={`h-4 w-4 ${kpi.color}`} />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{typeof kpi.value === "number" &&
								kpi.title !== "Revenue Attribution"
									? `${kpi.value}`
									: kpi.value}
								{kpi.title === "Trend Alignment Score" ||
								kpi.title === "Prediction Accuracy"
									? "/100"
									: ""}
							</div>

							{kpi.title === "Trend Alignment Score" && (
								<>
									<Progress
										value={kpi.value as number}
										className="mt-2"
									/>
									<div className="flex items-center mt-2">
										<ArrowUp className="h-3 w-3 text-green-600 mr-1" />
										<span className="text-xs text-green-600">
											+{kpi.change}% vs last period
										</span>
									</div>
									<p className="text-xs text-muted-foreground mt-2">
										{kpi.insight}
									</p>
								</>
							)}

							{kpi.title === "Prediction Accuracy" && (
								<>
									<div className="flex items-center justify-between mt-2 text-xs">
										<span className="text-green-600">
											{kpi.successStories} successful
										</span>
										<span className="text-red-600">
											{kpi.missedOpportunities} missed
										</span>
									</div>
									<p className="text-xs text-muted-foreground mt-2">
										Next: {kpi.nextPrediction}
									</p>
								</>
							)}

							{kpi.title === "Revenue Attribution" && (
								<>
									<p className="text-xs text-muted-foreground">
										{kpi.percentage}% of total revenue
									</p>
									<div className="flex items-center mt-2">
										<ArrowUp className="h-3 w-3 text-green-600 mr-1" />
										<span className="text-xs text-green-600">
											+{kpi.change}% growth
										</span>
									</div>
									<p className="text-xs text-muted-foreground mt-1">
										Top: {kpi.topPerformer}
									</p>
								</>
							)}

							{kpi.title === "Inventory Optimization" && (
								<>
									<p className="text-xs text-muted-foreground">
										{kpi.value}% improvement
									</p>
									<div className="text-xs space-y-1 mt-2">
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Overstock avoided:
											</span>
											<span className="text-green-600">
												{kpi.overstockAvoided}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Stockouts prevented:
											</span>
											<span className="text-green-600">
												{kpi.stockoutsPrevented}
											</span>
										</div>
										<div className="flex justify-between">
											<span className="text-muted-foreground">
												Efficiency score:
											</span>
											<span>
												{kpi.efficiencyScore}/100
											</span>
										</div>
									</div>
								</>
							)}
						</CardContent>
					</Card>
				))}
			</div>

			{/* Trend Performance Analysis */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Product Performance Scatter */}
				<Card>
					<CardHeader>
						<CardTitle className="text-xl text-foreground font-bold">
							Product Performance by Trend Alignment
						</CardTitle>
						<CardDescription>
							How trend alignment correlates with sales
							performance
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-96">
								<ResponsiveContainer width="100%" height="100%">
									<ScatterChart
										data={productPerformanceData}
										margin={{ top: 16, right: 16, bottom: 40, left: 16 }}
									>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis
										dataKey="trendAlignment"
										name="Trend Alignment"
										label={{
											value: "Trend Alignment Score",
											position: "bottom",
											offset: 0
										}}
									/>
									<YAxis
										dataKey="salesPerformance"
										name="Sales Performance"
										label={{
											value: "Sales Performance",
											angle: -90,
											position: "insideLeft"
										}}
									/>
									<Tooltip
										cursor={{ strokeDasharray: "3 3" }}
										content={({ active, payload }) => {
											if (active && payload && payload.length) {
												const point = payload[0].payload as any;
												return (
													<div className="rounded-md border bg-white p-3 shadow-sm">
														<div className="text-sm font-medium">
															{point.name}
														</div>
														<div className="mt-1 text-xs text-muted-foreground">
															Trend: {point.trendAlignment}%
														</div>
														<div className="text-xs text-muted-foreground">
															Sales: {point.salesPerformance}%
														</div>
													</div>
												);
											}
											return null;
										}}
									/>
									<Scatter
										dataKey="salesPerformance"
										fill="#3b82f6"
									/>
									{/* Add quadrant lines */}
									<Line
										x1={80}
										y1={0}
										x2={80}
										y2={100}
										stroke="#e5e7eb"
										strokeDasharray="2 2"
									/>
									<Line
										x1={0}
										y1={80}
										x2={100}
										y2={80}
										stroke="#e5e7eb"
										strokeDasharray="2 2"
									/>
								</ScatterChart>
							</ResponsiveContainer>
						</div>
						<div className="grid grid-cols-2 gap-2 mt-4 text-xs">
							<div className="text-center p-2 bg-green-50 rounded">
								Star Products
							</div>
							<div className="text-center p-2 bg-blue-50 rounded">
								Trending Potential
							</div>
							<div className="text-center p-2 bg-yellow-50 rounded">
								Optimize Needed
							</div>
							<div className="text-center p-2 bg-red-50 rounded">
								Consider Discontinuing
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Category Performance */}
				<Card>
					<CardHeader>
						<CardTitle className="text-xl text-foreground font-bold">
							Category Performance Breakdown
						</CardTitle>
						<CardDescription>
							Trend adoption and revenue impact by category
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-80">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart
									data={categoryPerformanceData}
									layout="horizontal"
								>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis type="number" />
									<YAxis
										dataKey="category"
										type="category"
										width={80}
									/>
									<Tooltip />
									<Bar
										dataKey="trendAdoption"
										fill="#3b82f6"
										name="Trend Adoption"
									/>
									<Bar
										dataKey="revenueImpact"
										fill="#10b981"
										name="Revenue Impact"
									/>
									<Bar
										dataKey="industryAvg"
										fill="#e5e7eb"
										name="Industry Average"
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Predictive Insights */}
			<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
				{/* Demand Forecast Table */}
				<Card className="xl:col-span-2">
					<CardHeader>
						<CardTitle className="text-xl text-foreground font-bold">
							Demand Forecast
						</CardTitle>
						<CardDescription>
							Predicted inventory needs for the next 90 days
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Product</TableHead>
									<TableHead>Current</TableHead>
									<TableHead>30d</TableHead>
									<TableHead>60d</TableHead>
									<TableHead>90d</TableHead>
									<TableHead>Action</TableHead>
									<TableHead>Confidence</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{demandForecast.map((item, index) => (
									<TableRow key={index}>
										<TableCell>
											<div>
												<div className="font-medium">
													{item.product}
												</div>
												<div className="flex flex-wrap gap-1 mt-1">
													{item.trendDrivers
														.slice(0, 2)
														.map((driver, i) => (
															<Badge
																key={i}
																variant="outline"
																className="text-xs"
															>
																{driver}
															</Badge>
														))}
												</div>
											</div>
										</TableCell>
										<TableCell>
											{item.currentStock}
										</TableCell>
										<TableCell>
											{item.predicted30d}
										</TableCell>
										<TableCell>
											{item.predicted60d}
										</TableCell>
										<TableCell>
											{item.predicted90d}
										</TableCell>
										<TableCell>
											<span
												className={getActionColor(
													item.action
												)}
											>
												{item.action}
											</span>
										</TableCell>
										<TableCell>
											<Badge variant="outline">
												{item.confidence}%
											</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{/* Market Opportunity Alerts */}
				<Card>
					<CardHeader>
						<CardTitle className="text-xl text-foreground font-bold">
							Market Opportunities
						</CardTitle>
						<CardDescription>
							Prioritized opportunities requiring action
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{marketOpportunities.map((opportunity, index) => (
							<div
								key={index}
								className="border border-border  rounded-lg p-4"
							>
								<div className="flex items-start justify-between mb-2">
									<div className="flex items-center gap-2">
										{opportunity.urgency === "High" ? (
											<AlertCircle className="h-4 w-4 text-red-600" />
										) : opportunity.urgency === "Medium" ? (
											<Clock className="h-4 w-4 text-yellow-600" />
										) : (
											<CheckCircle className="h-4 w-4 text-green-600" />
										)}
										<Badge
											variant={getUrgencyColor(
												opportunity.urgency
											)}
											className="text-xs"
										>
											{opportunity.urgency}
										</Badge>
									</div>
									<Badge
										variant="outline"
										className="text-xs"
									>
										{opportunity.type}
									</Badge>
								</div>

								<h4 className="font-medium text-sm mb-2">
									{opportunity.title}
								</h4>

								<div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
									<span>Potential: {opportunity.impact}</span>
									<span>
										Timeline: {opportunity.timeSensitive}
									</span>
								</div>

								<div className="space-y-1 mb-3">
									{opportunity.actions.map((action, i) => (
										<div
											key={i}
											className="flex items-center text-xs"
										>
											<div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
											{action}
										</div>
									))}
								</div>

								<Button
									size="sm"
									className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium"
								>
									Take Action
								</Button>
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
