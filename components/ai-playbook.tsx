import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import {
	Brain,
	TrendingUp,
	Package,
	Percent,
	Clock,
	AlertTriangle,
	Target,
	ShoppingCart,
	ExternalLink,
	Zap,
	Lightbulb
} from "lucide-react";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Cell
} from "recharts";

interface AIPlaybookProps {}

export function AIPlaybook() {
	// Mock data - in a real app this would come from API based on
	// timeRange/geography
	const priorityActions = [
		{
			id: 1,
			title: "Launch Power Suit Collection",
			confidence: 94,
			expectedRevenue: "$125,200",
			expectedMargin: "42%",
			competitorRisk: "Medium",
			timeToAct: "Next 5 days",
			category: "Product Ideas",
			urgency: "High",
			impact: "High"
		},
		{
			id: 2,
			title: "Restock Wide-Leg Trousers",
			confidence: 89,
			expectedRevenue: "$68,600",
			expectedMargin: "35%",
			competitorRisk: "High",
			timeToAct: "Immediate",
			category: "Inventory Moves",
			urgency: "Critical",
			impact: "Medium"
		},
		{
			id: 3,
			title: "Executive Bundle Promotion",
			confidence: 82,
			expectedRevenue: "$89,400",
			expectedMargin: "38%",
			competitorRisk: "Low",
			timeToAct: "Next 2 weeks",
			category: "Promotions",
			urgency: "Medium",
			impact: "High"
		},
		{
			id: 4,
			title: "Sustainable Wool Line",
			confidence: 76,
			expectedRevenue: "$156,000",
			expectedMargin: "44%",
			competitorRisk: "Medium",
			timeToAct: "Next 30 days",
			category: "Product Ideas",
			urgency: "Medium",
			impact: "High"
		}
	];

	const recommendations = {
		"Product Ideas": [
			{
				title: "Classic Cufflink Collection",
				potential: "$32K",
				confidence: 87
			},
			{
				title: "Tech-Enhanced Suits",
				potential: "$89K",
				confidence: 81
			},
			{
				title: "Premium Pocket Squares",
				potential: "$18K",
				confidence: 79
			}
		],
		"Inventory Moves": [
			{
				title: "Reduce Summer Blazers",
				potential: "-$8K loss",
				confidence: 92
			},
			{
				title: "Increase Wool Suit Stock",
				potential: "$45K",
				confidence: 85
			},
			{
				title: "Reallocate Accessories",
				potential: "$22K",
				confidence: 78
			}
		],
		Promotions: [
			{
				title: "Flash Sale: Dress Shirts",
				potential: "$35K",
				confidence: 84
			},
			{
				title: "BOGO: Luxury Ties",
				potential: "$28K",
				confidence: 76
			},
			{
				title: "Corporate Partnership",
				potential: "$124K",
				confidence: 88
			}
		]
	};

	const getRiskColor = (risk: string) => {
		switch (risk.toLowerCase()) {
			case "high":
				return "text-red-600 border-red-200/20";
			case "medium":
				return "text-orange-600 border-orange-200/20";
			case "low":
				return "text-green-600 border-green-200/20";
			default:
				return "text-slate-600 border-slate-200/20";
		}
	};

	const getUrgencyColor = (urgency: string) => {
		switch (urgency.toLowerCase()) {
			case "critical":
				return "text-red-600";
			case "high":
				return "text-orange-600";
			case "medium":
				return "text-blue-600";
			default:
				return "text-slate-600";
		}
	};

	// Convert urgency/impact to numerical values for the scatter plot
	const getUrgencyValue = (urgency: string) => {
		switch (urgency.toLowerCase()) {
			case "critical":
				return 5;
			case "high":
				return 4;
			case "medium":
				return 3;
			case "low":
				return 2;
			default:
				return 1;
		}
	};

	const getImpactValue = (impact: string) => {
		switch (impact.toLowerCase()) {
			case "high":
				return 5;
			case "medium":
				return 3;
			case "low":
				return 1;
			default:
				return 2;
		}
	};

	const getActionColor = (urgency: string, impact: string) => {
		const urgencyVal = getUrgencyValue(urgency);
		const impactVal = getImpactValue(impact);

		if (urgencyVal >= 4 && impactVal >= 4) return "#dc2626"; // Red - Critical
		if (urgencyVal >= 4 || impactVal >= 4) return "#ea580c"; // Orange - High Priority
		if (urgencyVal >= 3 && impactVal >= 3) return "#2563eb"; // Blue - Medium Priority
		return "#16a34a"; // Green - Low Priority
	};

	// Prepare data for scatter plot
	const scatterData = priorityActions.map((action) => ({
		x: getUrgencyValue(action.urgency),
		y: getImpactValue(action.impact),
		title: action.title,
		category: action.category,
		urgency: action.urgency,
		impact: action.impact,
		revenue: action.expectedRevenue,
		confidence: action.confidence,
		color: getActionColor(action.urgency, action.impact)
	}));

	const CustomTooltip = ({ active, payload }: any) => {
		if (active && payload && payload.length) {
			const data = payload[0].payload;
			return (
				<div className="bg-background border border-border rounded-lg p-3 shadow-lg">
					<p className="font-medium mb-1">{data.title}</p>
					<p className="text-sm text-muted-foreground mb-1">
						{data.category}
					</p>
					<div className="space-y-1 text-xs">
						<p>
							Urgency:{" "}
							<span className="font-medium">{data.urgency}</span>
						</p>
						<p>
							Impact:{" "}
							<span className="font-medium">{data.impact}</span>
						</p>
						<p>
							Revenue:{" "}
							<span className="font-medium text-green-600">
								{data.revenue}
							</span>
						</p>
						<p>
							Confidence:{" "}
							<span className="font-medium">
								{data.confidence}%
							</span>
						</p>
					</div>
				</div>
			);
		}
		return null;
	};

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			{/* <div className="flex items-center justify-between">
				<div>
					<h1 className="flex items-center gap-2 mb-2">
						<Brain className="h-6 w-6 text-primary" />
						AI Playbook
					</h1>
					<p className="text-muted-foreground">
						Priority engine for formal wear execution readiness
					</p>
				</div>
			</div> */}

			{/* Priority Actions List */}
			<Card>
				<CardHeader>
					<CardTitle className="text-xl text-foreground font-bold flex items-center gap-2">
						<Target className="h-5 w-5" />
						Action Priority List
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-6">
						{priorityActions.map((action) => (
							<Card
								key={action.id}
								className="border hover:border-primary/20 transition-colors"
							>
								<CardContent className="p-6">
									<div className="flex flex-row items-start justify-between gap-4 mb-6">
										<div className="">
											<div className="flex items-center gap-3 mb-2">
												<h3 className="text-lg font-medium">
													{action.title}
												</h3>
												<Badge variant="secondary">
													{action.category}
												</Badge>
											</div>
										</div>
										<div className="flex flex-row gap-3">
											<Button
												size="sm"
												className="bg-slate-900 hover:bg-slate-800 text-white font-medium"
											>
												Take Action
											</Button>
											<Button size="sm" variant="outline">
												<ExternalLink className="h-3 w-3 mr-2" />
												Export
											</Button>
										</div>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
										<div className="space-y-2">
											<span className="text-muted-foreground text-sm block">
												Confidence
											</span>
											<div className="space-y-2">
												<Progress
													value={action.confidence}
													className="h-2"
												/>
												<span className="text-green-600 font-medium text-sm">
													{action.confidence}%
												</span>
											</div>
										</div>
										<div className="space-y-2">
											<span className="text-muted-foreground text-sm block">
												Expected Revenue
											</span>
											<div className="text-xl font-semibold text-green-600">
												{action.expectedRevenue}
											</div>
										</div>
										<div className="space-y-2">
											<span className="text-muted-foreground text-sm block">
												Expected Margin
											</span>
											<div className="text-xl font-semibold text-blue-600">
												{action.expectedMargin}
											</div>
										</div>
										<div className="space-y-2">
											<span className="text-muted-foreground text-sm block">
												Competitor Risk
											</span>
											<Badge
												variant="outline"
												className={`${getRiskColor(action.competitorRisk)}`}
											>
												{action.competitorRisk}
											</Badge>
										</div>
										<div className="space-y-2">
											<span className="text-muted-foreground text-sm block">
												Time to Act
											</span>
											<div
												className={`font-medium ${getUrgencyColor(action.urgency)}`}
											>
												{action.timeToAct}
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Grouped Recommendations */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{Object.entries(recommendations).map(([category, items]) => (
					<Card key={category}>
						<CardHeader>
							<CardTitle className="text-xl text-foreground font-bold flex items-center gap-2">
								{category === "Product Ideas" && (
									<Lightbulb className="h-4 w-4" />
								)}
								{category === "Inventory Moves" && (
									<Package className="h-4 w-4" />
								)}
								{category === "Promotions" && (
									<Percent className="h-4 w-4" />
								)}
								{category}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{items.map((item, index) => (
									<div
										key={index}
										className="flex items-center justify-between p-3 border border-border rounded-lg"
									>
										<div className="flex-1">
											<p className="font-medium text-sm mb-1">
												{item.title}
											</p>
											<div className="flex items-center gap-2 text-xs text-muted-foreground">
												<span>
													Confidence:{" "}
													{item.confidence}%
												</span>
												<Separator
													orientation="vertical"
													className="h-3"
												/>
												<span className="font-medium">
													{item.potential}
												</span>
											</div>
										</div>
										<Button size="sm" variant="ghost">
											<TrendingUp className="h-3 w-3" />
										</Button>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Urgency Heatmap */}
			<Card>
				<CardHeader>
					<CardTitle className="text-xl text-foreground font-bold flex items-center gap-2">
						<Zap className="h-5 w-5" />
						Urgency Heatmap
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="h-80">
						<ResponsiveContainer width="100%" height="100%">
							<ScatterChart
								margin={{
									top: 20,
									right: 30,
									bottom: 60,
									left: 60
								}}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									className="opacity-30"
								/>
								<XAxis
									type="number"
									dataKey="x"
									name="Urgency"
									domain={[0.5, 5.5]}
									ticks={[1, 2, 3, 4, 5]}
									tickFormatter={(value) => {
										switch (value) {
											case 1:
												return "Very Low";
											case 2:
												return "Low";
											case 3:
												return "Medium";
											case 4:
												return "High";
											case 5:
												return "Critical";
											default:
												return "";
										}
									}}
									angle={-45}
									textAnchor="end"
									height={60}
								/>
								<YAxis
									type="number"
									dataKey="y"
									name="Impact"
									domain={[0.5, 5.5]}
									ticks={[1, 2, 3, 4, 5]}
									tickFormatter={(value) => {
										switch (value) {
											case 1:
												return "Low";
											case 2:
												return "Low-Med";
											case 3:
												return "Medium";
											case 4:
												return "High-Med";
											case 5:
												return "High";
											default:
												return "";
										}
									}}
									width={60}
								/>
								<Tooltip content={<CustomTooltip />} />
								<Scatter data={scatterData}>
									{scatterData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={entry.color}
										/>
									))}
								</Scatter>
							</ScatterChart>
						</ResponsiveContainer>
					</div>

					{/* Legend */}
					<div className="mt-4 flex flex-wrap gap-4 justify-center">
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 bg-red-600 rounded-full"></div>
							<span className="text-xs text-muted-foreground">
								Critical Priority
							</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 bg-orange-600 rounded-full"></div>
							<span className="text-xs text-muted-foreground">
								High Priority
							</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 bg-blue-600 rounded-full"></div>
							<span className="text-xs text-muted-foreground">
								Medium Priority
							</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 bg-green-600 rounded-full"></div>
							<span className="text-xs text-muted-foreground">
								Low Priority
							</span>
						</div>
					</div>

					<p className="text-xs text-muted-foreground text-center mt-2">
						Hover over points to see action details • Actions
						positioned by urgency vs business impact
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
