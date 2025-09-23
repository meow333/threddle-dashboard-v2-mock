import { useEffect, useState } from "react";
import {
	TrendingUp,
	Heart,
	Radar,
	DollarSign,
	Lightbulb,
	Clock,
	ArrowUp,
	ArrowUpRight,
	ArrowDownRight,
	Minus,
	Flame,
	TrendingDown,
	Zap,
	Globe,
	Search,
	ExternalLink,
	Target,
	Package,
	Percent,
	Shirt
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "./ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "./ui/select";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { TrendAnalysisDialog } from "./trend-analysis-dialog";
const exampleImage = "/images/examples/dashboard-logo-threddle.png";
const cardDarkBackground = "/images/backgrounds/card.png";
const cardLightBackground = "/images/backgrounds/card-white.png";

const trendingProducts = [
	{
		name: "Wide-Leg Trousers",
		trajectory: "hot",
		icon: Flame,
		searchVolume: "High",
		growth: "+340%",
		countries: ["US", "UK", "CA"],
		category: "Trousers"
	},
	{
		name: "Oversized Blazers",
		trajectory: "rising",
		icon: TrendingUp,
		searchVolume: "Medium",
		growth: "+125%",
		countries: ["US", "FR", "DE"],
		category: "Blazers"
	},
	{
		name: "Power Suits",
		trajectory: "accelerating",
		icon: Zap,
		searchVolume: "High",
		growth: "+280%",
		countries: ["US", "UK", "JP"],
		category: "Suits"
	},
	{
		name: "Sustainable Wool",
		trajectory: "rising",
		icon: TrendingUp,
		searchVolume: "Medium",
		growth: "+89%",
		countries: ["DE", "NL", "SE"],
		category: "Suits"
	},
	{
		name: "Double-Breasted Coats",
		trajectory: "hot",
		icon: Flame,
		searchVolume: "High",
		growth: "+210%",
		countries: ["US", "IT", "FR"],
		category: "Blazers"
	},
	{
		name: "Silk Pocket Square",
		trajectory: "rising",
		icon: TrendingUp,
		searchVolume: "Medium",
		growth: "+156%",
		countries: ["US", "UK", "IT"],
		category: "Accessories"
	},
	{
		name: "Premium Cufflinks",
		trajectory: "accelerating",
		icon: Zap,
		searchVolume: "High",
		growth: "+198%",
		countries: ["US", "UK", "CA"],
		category: "Accessories"
	},
	{
		name: "Wool Dress Trousers",
		trajectory: "rising",
		icon: TrendingUp,
		searchVolume: "High",
		growth: "+167%",
		countries: ["US", "FR", "DE"],
		category: "Trousers"
	},
	{
		name: "Executive Slim Suits",
		trajectory: "hot",
		icon: Flame,
		searchVolume: "High",
		growth: "+289%",
		countries: ["US", "UK", "AU"],
		category: "Suits"
	},
	{
		name: "Modern Blazer Cut",
		trajectory: "accelerating",
		icon: Zap,
		searchVolume: "Medium",
		growth: "+145%",
		countries: ["US", "CA", "UK"],
		category: "Blazers"
	}
];

// AI Playbook data for Action Priority List
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

// AI Playbook recommendations data
const recommendations = {
	"Product Ideas": [
		{
			title: "Bronze Brooches & Pins",
			potential: "$149K",
			confidence: 93
		},
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
		},
		{
			title: "Increase Butterscotch Ties Stock",
			potential: "$67K",
			confidence: 73
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
			title: "Corporate Partnership with Gaux3",
			potential: "$124K",
			confidence: 88
		},
		{
			title: "Discount: Butterscotch Ties",
			potential: "$18K",
			confidence: 64
		}
	]
};

const acceleratedGrowthTrends = [
	{
		name: "Power Suits",
		searchPattern: "power suit, executive wear, formal business",
		avgSearchWeekly: "45,320",
		growthData: {
			"7d": "45.2%",
			"30d": "189.4%",
			"3m": "1,847.6%",
			"6m": "8,503.2%",
			"1y": "384,503.6%"
		},
		growthIcon: "↗",
		trendLine: "........↗"
	},
	{
		name: "Premium Wool",
		searchPattern: "merino wool suit, premium wool blazer",
		avgSearchWeekly: "32,890",
		growthData: {
			"7d": "38.7%",
			"30d": "156.8%",
			"3m": "1,234.5%",
			"6m": "5,678.9%",
			"1y": "36,630.4%"
		},
		growthIcon: "↗",
		trendLine: "........↗"
	},
	{
		name: "Wide-Leg Trousers",
		searchPattern: "wide leg formal pants, palazzo pants",
		avgSearchWeekly: "28,742",
		growthData: {
			"7d": "32.1%",
			"30d": "134.7%",
			"3m": "876.3%",
			"6m": "3,456.2%",
			"1y": "8,144.0%"
		},
		growthIcon: "↗",
		trendLine: "........↗"
	},
	{
		name: "Double-Breasted",
		searchPattern: "double breasted blazer, formal coat",
		avgSearchWeekly: "18,567",
		growthData: {
			"7d": "28.9%",
			"30d": "98.7%",
			"3m": "567.8%",
			"6m": "2,345.6%",
			"1y": "4,989.1%"
		},
		growthIcon: "↗",
		trendLine: "........↗"
	},
	{
		name: "Executive Style",
		searchPattern: "executive formal wear, c-suite attire",
		avgSearchWeekly: "15,432",
		growthData: {
			"7d": "25.3%",
			"30d": "89.4%",
			"3m": "456.7%",
			"6m": "1,987.3%",
			"1y": "4,595.0%"
		},
		growthIcon: "↗",
		trendLine: "........↗"
	}
];

const steadyGrowthTrends = [
	{
		name: "Classic Oxford",
		searchPattern: "oxford dress shoes, formal leather shoes",
		avgSearchWeekly: "8,945",
		growthData: {
			"7d": "12.3%",
			"30d": "34.7%",
			"3m": "89.4%",
			"6m": "234.6%",
			"1y": "518.2%"
		},
		growthIcon: "↗",
		trendLine: "........↗"
	},
	{
		name: "Silk Accessories",
		searchPattern: "silk tie, pocket square, formal accessories",
		avgSearchWeekly: "6,732",
		growthData: {
			"7d": "11.8%",
			"30d": "32.1%",
			"3m": "83.7%",
			"6m": "218.9%",
			"1y": "485.7%"
		},
		growthIcon: "↗",
		trendLine: "........↗"
	},
	{
		name: "Professional Shirts",
		searchPattern: "dress shirt, formal shirt, business shirt",
		avgSearchWeekly: "14,567",
		growthData: {
			"7d": "10.9%",
			"30d": "28.4%",
			"3m": "76.8%",
			"6m": "189.3%",
			"1y": "396.3%"
		},
		growthIcon: "↗",
		trendLine: "........↗"
	},
	{
		name: "Formal Accessories",
		searchPattern: "cufflinks, tie clips, formal jewelry",
		avgSearchWeekly: "3,421",
		growthData: {
			"7d": "8.7%",
			"30d": "21.3%",
			"3m": "56.8%",
			"6m": "134.7%",
			"1y": "197.0%"
		},
		growthIcon: "↗",
		trendLine: "........↗"
	},
	{
		name: "Executive Bags",
		searchPattern: "leather briefcase, professional bag",
		avgSearchWeekly: "5,234",
		growthData: {
			"7d": "7.9%",
			"30d": "19.6%",
			"3m": "48.9%",
			"6m": "118.4%",
			"1y": "171.2%"
		},
		growthIcon: "↗",
		trendLine: "........↗"
	}
];

const recentActivities = [
	{
		time: "2 hours ago",
		type: "trend",
		description: "New trend detected: 'Minimalist Formal Accessories'"
	},
	// {
	// 	time: "4 hours ago",
	// 	type: "product",
	// 	description:
	// 		"Product analysis completed for 'Executive Suit Collection'"
	// },
	{
		time: "6 hours ago",
		type: "competitor",
		description: "Competitor launched similar 'Business Casual' line"
	},
	{
		time: "1 day ago",
		type: "insight",
		description: "Market opportunity identified in formal accessories"
	}
];

export function DashboardOverview() {
	const [timeRange, setTimeRange] = useState("30d");
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const root = document.documentElement;
		const update = () => setIsDark(root.classList.contains("dark"));
		update();
		const observer = new MutationObserver(update);
		observer.observe(root, {
			attributes: true,
			attributeFilter: ["class"]
		});
		return () => observer.disconnect();
	}, []);
	const [geography, setGeography] = useState("global");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedTrend, setSelectedTrend] = useState<{
		name: string;
		data: (typeof trendingProducts)[0];
	} | null>(null);

	const handleAnalyzeTrend = (trend: (typeof trendingProducts)[0]) => {
		setSelectedTrend({
			name: trend.name,
			data: trend
		});
	};

	// Get growth header text based on time range
	const getGrowthHeader = (timeRange: string) => {
		switch (timeRange) {
			case "7d":
				return "Weekly Growth";
			case "30d":
				return "Monthly Growth";
			case "3m":
				return "Quarterly Growth";
			case "6m":
				return "Half-Year Growth";
			case "1y":
				return "YoY Growth";
			default:
				return "Growth";
		}
	};

	// Filter trending products by category
	const getFilteredTrendingProducts = () => {
		if (selectedCategory === "All") {
			return trendingProducts;
		}
		return trendingProducts.filter(
			(product) => product.category === selectedCategory
		);
	};

	// Get categories for badges
	const categories = ["All", "Suits", "Blazers", "Trousers", "Accessories"];

	// Helper functions for AI Playbook sections
	const getRiskColor = (risk: string) => {
		switch (risk.toLowerCase()) {
			case "high":
				return "text-red-600 ";
			case "medium":
				return "text-orange-600 ";
			case "low":
				return "text-green-600 ";
			default:
				return "text-slate-600 ";
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

	// Component for individual trend rows
	const TrendRow = ({
		trend,
		isAccelerated = false
	}: {
		trend: any;
		isAccelerated?: boolean;
	}) => {
		const currentGrowth =
			trend.growthData[timeRange] || trend.growthData["1y"];

		return (
			<div className="flex flex-wrap items-center justify-between py-3 border-b border-border last:border-b-0 hover:bg-accent/50 transition-colors">
				<div className="flex items-center gap-3 flex-1 min-w-0">
					<div className="w-2 h-2 rounded-full bg-slate-400"></div>
					<div className="flex-1">
						<div className="font-medium text-sm mb-1 text-foreground">
							{trend.name}
						</div>
						<div className="text-xs text-muted-foreground font-normal truncate max-w-[200px]">
							{trend.searchPattern}
						</div>
					</div>
				</div>

				{/* Mini trend chart */}
				<div className="hidden sm:flex items-center gap-4 text-xs min-w-[80px] sm:min-w-[120px]">
					<div className="w-12 h-6 flex items-center justify-center">
						<svg
							width="48"
							height="24"
							viewBox="0 0 48 24"
							fill="none"
						>
							<path
								d="M2 22 L8 20 L14 18 L20 15 L26 12 L32 8 L38 6 L44 4 L46 2"
								stroke="#3b82f6"
								strokeWidth="1.5"
								strokeDasharray="2,2"
								fill="none"
							/>
							<circle cx="46" cy="2" r="2" fill="#3b82f6" />
						</svg>
					</div>
					<div className="hidden sm:block text-right min-w-[80px] sm:min-w-[120px]">
						<div className="font-medium text-foreground">
							{trend.avgSearchWeekly}
						</div>
					</div>
					<div className="text-right min-w-[80px] sm:min-w-[120px]">
						<div
							className={`font-medium ${
								isAccelerated
									? "text-green-600"
									: "text-blue-600"
							}`}
						>
							{currentGrowth} <span className="text-lg">↗</span>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<div className="p-8 space-y-8 bg-background text-foreground transition-colors">
				{/* Page Header */}
				{/* <div>
          <h1 className="text-foreground font-medium">Trend Monitor</h1>
          <p className="text-slate-600 font-normal">
            AI-powered fashion trend intelligence for your
            Shopify store
          </p>
        </div> */}

				{/* Header */}
				<header className="border border-slate-200 dark:border-slate-900 bg-card rounded-xl px-4 sm:px-6 md:px-8 py-4 md:py-6 shadow-sm ">
					<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-6 flex-1 max-w-2xl ">
							<div className="relative flex-1">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground " />
								<Input
									placeholder="Search trends, products, competitors..."
									className="pl-10 font-normal"
								/>
							</div>
						</div>

						<div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
							{/* Time Range Control */}
							<Select
								value={timeRange}
								onValueChange={setTimeRange}
							>
								<SelectTrigger className="w-32 font-normal">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="7d">7 days</SelectItem>
									<SelectItem value="30d">30 days</SelectItem>
									<SelectItem value="3m">3 months</SelectItem>
									<SelectItem value="6m">6 months</SelectItem>
									<SelectItem value="1y">1 year</SelectItem>
								</SelectContent>
							</Select>

							{/* Geography Control */}
							<Select
								value={geography}
								onValueChange={setGeography}
							>
								<SelectTrigger className="w-32 font-normal">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="global">
										Global
									</SelectItem>
									<SelectItem value="us">
										United States
									</SelectItem>
									<SelectItem value="eu">Europe</SelectItem>
									<SelectItem value="uk">
										United Kingdom
									</SelectItem>
									<SelectItem value="ca">Canada</SelectItem>
									<SelectItem value="au">
										Australia
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</header>

				{/* KPI Summary Cards - Enhanced Hero Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
					<Card
						className="rounded-xl relative overflow-hidden group transition-all duration-300 hover:scale-105"
						style={{
							backgroundImage: `url(${isDark ? cardDarkBackground : cardLightBackground})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat"
						}}
					>
						{/* <div className="absolute top-0 right-0 w-20 h-20 bg-green-200/30 rounded-full -translate-y-6 translate-x-6"></div> */}
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
							<CardTitle className="text-xl text-foreground font-semibold">
								Trending Now
							</CardTitle>
							<div className="p-3 bg-purple-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
								<TrendingUp className="h-5 w-5 text-white" />
							</div>
						</CardHeader>
						<CardContent className="relative z-10">
							<div className="text-5xl font-semibold text-slate-700 dark:text-white mb-1">
								23
							</div>
							<p className="text-sm text-foreground font-medium mb-3">
								Active Trends in your category this month
							</p>
							<div className="flex items-center mb-3">
								<ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
								<span className="text-sm text-green-600 font-medium">
									+15% vs last month
								</span>
							</div>
							<Button
								variant="link"
								className="p-0 h-auto text-sm text-foreground hover:text-green-800 font-medium"
							>
								View all trends →
							</Button>
						</CardContent>
					</Card>

					<Card
						className="rounded-xl relative overflow-hidden group transition-all duration-300 hover:scale-105"
						style={{
							backgroundImage: `url(${isDark ? cardDarkBackground : cardLightBackground})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat"
						}}
					>
						{/* <div className="absolute top-0 right-0 w-20 h-20 bg-red-200/30 rounded-full -translate-y-6 translate-x-6"></div> */}
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
							<CardTitle className="text-xl text-foreground font-semibold">
								Trend Alignment
							</CardTitle>
							<div className="p-3 bg-red-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
								<Heart className="h-5 w-5 text-white" />
							</div>
						</CardHeader>
						<CardContent className="relative z-10">
							<div className="text-5xl font-semibold text-slate-700  dark:text-white mb-1">
								78
								<span className="text-lg text-slate-400">
									{" "}
									/ 100
								</span>
							</div>
							<Progress
								value={78}
								className="mt-2 mb-3 bg-slate-700"
							/>
							<div className="flex items-center mb-3">
								<ArrowUp className="h-4 w-4 text-green-600 mr-1" />
								<span className="text-sm text-green-600 font-medium">
									+15% vs last month
								</span>
							</div>
							<p className="text-xs text-muted-foreground mt-2">
								Your products are 23% more trend-aligned than
								industry average
							</p>
							{/* <p className="text-sm text-red-700 font-medium mb-3">
								12 products need attention
							</p> */}
							{/* <Button
								variant="link"
                                className="p-0 h-auto text-sm text-foreground hover:text-red-800 font-medium"
							>
								View recommendations →
							</Button> */}
						</CardContent>
					</Card>

					{/* <Card className="border bg-white rounded-xl relative overflow-hidden group transition-all duration-300 hover:scale-105">
						<div className="absolute top-0 right-0 w-20 h-20 bg-red-200/30 rounded-full -translate-y-6 translate-x-6"></div>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
                        <CardTitle className="text-xl text-foreground font-semibold">
								Product Health
							</CardTitle>
							<div className="p-3 bg-red-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
								<Heart className="h-5 w-5 text-white" />
							</div>
						</CardHeader>
						<CardContent className="relative z-10">
							<div className="text-5xl font-semibold text-slate-700  dark:text-white mb-1">
								78
								<span className="text-lg  text-slate-400">
									{" "}
									/ 100
								</span>
							</div>
							<Progress value={78} className="mt-2 mb-3" />
							<p className="text-sm text-red-700 font-medium mb-3">
								12 products need attention
							</p>
							<Button
								variant="link"
                                className="p-0 h-auto text-sm text-foreground hover:text-red-800 font-medium"
							>
								View recommendations →
							</Button>
						</CardContent>
					</Card> */}

					<Card
						className="rounded-xl relative overflow-hidden group transition-all duration-300 hover:scale-105"
						style={{
							backgroundImage: `url(${isDark ? cardDarkBackground : cardLightBackground})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat"
						}}
					>
						{/* <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -translate-y-6 translate-x-6"></div> */}
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
							<CardTitle className="text-xl text-foreground font-semibold">
								Market Position
							</CardTitle>
							<div className="p-3 bg-blue-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
								<Radar className="h-5 w-5 text-white" />
							</div>
						</CardHeader>
						<CardContent className="relative z-10">
							<div className="text-5xl font-semibold text-slate-700  dark:text-white mb-1">
								#3
							</div>
							<p className="text-sm text-foreground font-medium mb-3">
								in category
							</p>
							<div className="flex items-center mb-3">
								<span className="text-sm text-blue-600 font-medium">
									2 new opportunities found
								</span>
							</div>
							<Button
								variant="link"
								className="p-0 h-auto text-sm text-foreground hover:text-blue-800 font-medium"
							>
								Analyze competitors →
							</Button>
						</CardContent>
					</Card>

					<Card
						className="rounded-xl relative overflow-hidden group transition-all duration-300 hover:scale-105"
						style={{
							backgroundImage: `url(${isDark ? cardDarkBackground : cardLightBackground})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat"
						}}
					>
						{/* <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -translate-y-6 translate-x-6"></div> */}
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
							<CardTitle className="text-xl text-foreground font-semibold">
								Inventory Optimization
							</CardTitle>
							<div className="p-3 bg-green-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
								<Shirt className="h-5 w-5 text-white" />
							</div>
						</CardHeader>
						<CardContent className="relative z-10">
							<div className="text-5xl font-semibold text-slate-700  dark:text-white mb-1">
								31%
							</div>
							<p className="text-sm text-foreground font-medium mb-3">
								improvement
							</p>
							<div className="text-xs space-y-1 mt-2">
								<div className="flex justify-between">
									<span className="text-muted-foreground">
										Overstock avoided:
									</span>
									<span className="text-green-600">
										$12.4K
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">
										Stockouts prevented:
									</span>
									<span className="text-green-600">18</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">
										Efficiency score:
									</span>
									<span>92/100</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card
						className="rounded-xl relative overflow-hidden group transition-all duration-300 hover:scale-105"
						style={{
							backgroundImage: `url(${isDark ? cardDarkBackground : cardLightBackground})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat"
						}}
					>
						{/* <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200/30 rounded-full -translate-y-6 translate-x-6"></div> */}
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative z-10">
							<CardTitle className="text-xl text-foreground font-semibold">
								Threddle Impact
							</CardTitle>
							<div className="p-3 bg-orange-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
								<Zap className="h-5 w-5 text-white" />
							</div>
						</CardHeader>
						<CardContent className="relative z-10">
							<div className="text-5xl font-semibold text-slate-700 dark:text-white  mb-1">
								$12.4K
							</div>
							<p className="text-sm text-foreground font-medium mb-3">
								Revenue attributed
							</p>
							<div className="flex items-center mb-3">
								<ArrowUpRight className="h-4 w-4 text-orange-600 mr-1" />
								<span className="text-sm text-orange-600 font-medium">
									+8.5% conversion improvement
								</span>
							</div>
							<Button
								variant="link"
								className="p-0 h-auto text-sm text-foreground hover:text-purple-800 font-medium"
							>
								View full report →
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Action Priority List from AI Playbook - Horizontal Cards */}
				<Card className="border shadow-sm bg-card rounded-xl">
					<CardHeader>
						<CardTitle className="text-xl text-foreground font-semibold flex items-center gap-2">
							<Target className="h-5 w-5 text-foreground" />
							Your Priority List
						</CardTitle>
						<CardDescription>
							AI-recommended actions prioritized by impact and
							urgency
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
							{priorityActions.map((action) => (
								<Card
									key={action.id}
									className="border hover:border-blue-300 transition-all duration-200 hover:shadow-md bg-card rounded-lg"
								>
									<CardContent className="p-6">
										<div className="flex items-start justify-between mb-4">
											<div className="flex-1">
												<h3 className="font-semibold text-foreground mb-2 text-base">
													{action.title}
												</h3>
												<Badge variant="secondary">
													{action.category}
												</Badge>
											</div>
										</div>

										{/* Metrics Grid */}
										<div className="space-y-4 mb-6">
											{/* Confidence */}
											<div>
												<div className="flex items-center justify-between mb-2">
													<span className="text-sm text-slate-600">
														Confidence
													</span>
													<span className="text-sm font-medium text-foreground">
														{action.confidence}%
													</span>
												</div>
												<Progress
													value={action.confidence}
													className="h-2"
												/>
											</div>

											{/* Revenue and Margin */}
											<div className="grid grid-cols-2 gap-4">
												<div>
													<span className="text-sm text-slate-600 block mb-1">
														Revenue
													</span>
													<div className="text-lg font-semibold text-foreground">
														{action.expectedRevenue}
													</div>
												</div>
												<div>
													<span className="text-sm text-slate-600 block mb-1">
														Margin
													</span>
													<div className="text-lg font-semibold text-blue-600">
														{action.expectedMargin}
													</div>
												</div>
											</div>

											{/* Risk and Time */}
											<div className="grid grid-cols-2 gap-4">
												<div>
													<span className="text-sm text-slate-600 block mb-2">
														Risk Level
													</span>
													<Badge
														variant="outline"
														className={`text-xs ${getRiskColor(
															action.competitorRisk
														)}`}
													>
														{action.competitorRisk}
													</Badge>
												</div>
												<div>
													<span className="text-sm text-slate-600 block mb-2">
														Timeline
													</span>
													<div
														className={`text-sm font-medium ${getUrgencyColor(
															action.urgency
														)}`}
													>
														{action.timeToAct}
													</div>
												</div>
											</div>
										</div>

										{/* Action Button */}
										<Button
											className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium"
											size="sm"
										>
											Take Action
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Grouped Recommendations from AI Playbook */}
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
					{Object.entries(recommendations).map(
						([category, items]) => (
							<Card key={category}>
								<CardHeader>
									<CardTitle className="text-xl text-foreground font-semibold flex items-center gap-2">
										{category === "Product Ideas" && (
											<Lightbulb className="h-6 w-6  text-blue-500" />
										)}
										{category === "Inventory Moves" && (
											<Package className="h-6 w-6  text-blue-500" />
										)}
										{category === "Promotions" && (
											<Percent className="h-6 w-6  text-blue-500" />
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
												<Button
													size="sm"
													variant="ghost"
												>
													<TrendingUp className="h-3 w-3" />
												</Button>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						)
					)}
					{/* Recent Activity */}
					<div className="h-full">
						<Card className="h-full">
							<CardHeader>
								<div className="flex items-center gap-2">
									<Clock className="h-6 w-6 text-blue-500" />
									<div className="font-semibold text-2xl text-foreground">
										Recent Insights
									</div>
								</div>
							</CardHeader>
							<CardContent className="space-y-4">
								{recentActivities.map((activity, index) => (
									<div
										key={index}
										className="flex items-start gap-3 p-3 border border-border rounded-lg"
									>
										<div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
										<div className="flex-1">
											<p className="text-sm">
												{activity.description}
											</p>
											<p className="text-xs text-muted-foreground mt-1">
												{activity.time}
											</p>
										</div>
										{/* <Button variant="outline" size="sm">
											View Details
										</Button> */}
									</div>
								))}
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Trending Products Carousel */}
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<div className=" font-semibold text-2xl text-foreground">
									What&apos;s Trending in Your Category
								</div>
								<CardDescription>
									Discover emerging trends in formal wear and
									professional attire
								</CardDescription>
							</div>
							<div className="flex gap-2">
								{categories.map((category) => (
									<Badge
										key={category}
										variant={
											selectedCategory === category
												? "default"
												: "secondary"
										}
										className="cursor-pointer transition-colors"
										onClick={() =>
											setSelectedCategory(category)
										}
									>
										{category}
									</Badge>
								))}
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4">
							{getFilteredTrendingProducts().map(
								(trend, index) => (
									<Card
										key={index}
										className="border hover:border-primary/50 transition-colors cursor-pointer"
									>
										<CardContent className="p-4">
											<div className="flex items-center justify-between mb-2">
												<trend.icon className="h-5 w-5 text-orange-500" />
												<Badge
													variant={
														trend.trajectory ===
														"hot"
															? "destructive"
															: trend.trajectory ===
																  "rising"
																? "default"
																: "secondary"
													}
												>
													{trend.trajectory}
												</Badge>
											</div>
											<h4 className="font-medium mb-2">
												{trend.name}
											</h4>
											<div className="space-y-1 text-xs text-muted-foreground">
												<div className="flex justify-between">
													<span>Search Volume</span>
													<span>
														{trend.searchVolume}
													</span>
												</div>
												<div className="flex justify-between">
													<span>Growth</span>
													<span className="text-green-600">
														{trend.growth}
													</span>
												</div>
												<div className="flex justify-between items-center">
													<span>Top Markets</span>
													<div className="flex gap-1">
														{trend.countries.map(
															(country, i) => (
																<Badge
																	key={i}
																	variant="outline"
																	className="text-xs flex items-center gap-1"
																>
																	<Globe className="h-2 w-2" />
																	{country}
																</Badge>
															)
														)}
													</div>
												</div>
											</div>
											<Button
												variant="secondary"
												size="sm"
												className="w-full mt-3"
												onClick={() =>
													handleAnalyzeTrend(trend)
												}
											>
												Analyze Trend
											</Button>
										</CardContent>
									</Card>
								)
							)}
						</div>
					</CardContent>
				</Card>

				{/* Fast & Slow Growth Trends */}
				<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
					<Card>
						<CardContent>
							{/* Accelerated Growth Column */}
							<div>
								<div className="flex items-center justify-between my-4">
									<h3 className="font-semibold text-2xl text-foreground">
										Accelerated Growth
									</h3>
								</div>
								<p className="text-sm text-muted-foreground mb-4">
									Year over year growth is positive and is
									rapidly increasing
								</p>

								{/* Header Row */}
								<div className="flex items-center justify-between py-2 text-xs font-medium text-muted-foreground border-b border-border mb-2">
									<div className="flex-1">Trend</div>
									<div className="text-right min-w-[120px]">
										Search Pattern
									</div>
									<div className="text-right min-w-[120px]">
										Avg Search Weekly
									</div>
									<div className="text-right min-w-[120px]">
										{getGrowthHeader(timeRange)}
									</div>
								</div>

								{/* Trend Rows */}
								<div className="space-y-0">
									{acceleratedGrowthTrends.map(
										(trend, index) => (
											<TrendRow
												key={index}
												trend={trend}
												isAccelerated={true}
											/>
										)
									)}
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent>
							{/* Steady Growth Column */}
							<div>
								<div className="flex items-center justify-between my-4">
									<h3 className=" font-semibold text-2xl text-foreground">
										Steady Growth
									</h3>
								</div>
								<p className="text-sm text-muted-foreground mb-4">
									Year over year growth is positive and is
									growing at a steady rate
								</p>

								{/* Header Row */}
								<div className="flex items-center justify-between py-2 text-xs font-medium text-muted-foreground border-b border-border mb-2">
									<div className="flex-1">Trend</div>
									<div className="text-right min-w-[120px]">
										Search Pattern
									</div>
									<div className="text-right min-w-[120px]">
										Avg Search Weekly
									</div>
									<div className="text-right min-w-[120px]">
										{getGrowthHeader(timeRange)}
									</div>
								</div>

								{/* Trend Rows */}
								<div className="space-y-0">
									{steadyGrowthTrends.map((trend, index) => (
										<TrendRow
											key={index}
											trend={trend}
											isAccelerated={false}
										/>
									))}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Quick Actions Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					{/* Smart Recommendations */}
					{/* <Card>
						<CardHeader>
							<div className="flex items-center gap-2">
								<Lightbulb className="h-5 w-5 text-yellow-500" />
								<CardTitle>AI Recommendations</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							{[
								{
									text: "Consider restocking 'Wide-Leg Trousers' - 340% search increase in formal wear",
									confidence: 94,
									priority: "High"
								},
								{
									text: "Power suits show strong momentum in professional demographics",
									confidence: 87,
									priority: "Medium"
								},
								{
									text: "Sustainable materials trending up 180% in premium formal wear markets",
									confidence: 92,
									priority: "High"
								},
								{
									text: "Double-breasted coats demand spike detected in luxury segment",
									confidence: 78,
									priority: "Medium"
								}
							].map((rec, index) => (
								<div
									key={index}
									className="flex items-start justify-between p-3 border rounded-lg"
								>
									<div className="flex-1">
										<p className="text-sm">{rec.text}</p>
										<div className="flex items-center gap-2 mt-2">
											<Badge
												variant="outline"
												className="text-xs"
											>
												{rec.confidence}% confidence
											</Badge>
											<Badge
												variant={
													rec.priority === "High"
														? "destructive"
														: "secondary"
												}
												className="text-xs"
											>
												{rec.priority}
											</Badge>
										</div>
									</div>
									<Button size="sm" variant="outline">
										Take Action
									</Button>
								</div>
							))}
						</CardContent>
					</Card> */}
				</div>

				{/* Trend Analysis Dialog */}
				<TrendAnalysisDialog
					open={!!selectedTrend}
					onOpenChange={(open) => !open && setSelectedTrend(null)}
					trendName={selectedTrend?.name || ""}
					trendData={selectedTrend?.data}
				/>
			</div>
		</>
	);
}
