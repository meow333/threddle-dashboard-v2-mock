import { useState } from "react";
import {
	Search,
	Filter,
	ArrowUp,
	ArrowDown,
	TrendingUp,
	Bookmark,
	Share2,
	Flame,
	Zap
} from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	Area,
	AreaChart
} from "recharts";
import { InteractiveWorldMap } from "./interactive-world-map";

interface MarketIntelDashboardProps {}

const trendCategories = [
	{ id: "suits", label: "Suits", checked: true },
	{ id: "blazers", label: "Blazers", checked: false },
	{ id: "trousers", label: "Trousers", checked: true },
	{ id: "accessories", label: "Accessories", checked: false }
];

const trends = [
	{
		id: 1,
		name: "Wide-Leg Trousers",
		category: "Trousers",
		status: "Accelerating",
		statusIcon: Flame,
		searchVolume: 85,
		yoyGrowth: 340,
		countries: 15,
		sparklineData: [10, 15, 12, 25, 35, 45, 85, 92]
	},
	{
		id: 2,
		name: "Silk Pocket Squares",
		category: "Accessories",
		status: "Steady",
		statusIcon: TrendingUp,
		searchVolume: 72,
		yoyGrowth: 156,
		countries: 8,
		sparklineData: [20, 25, 30, 35, 50, 60, 65, 72]
	},
	{
		id: 3,
		name: "Double-Breasted Suits",
		category: "Suits",
		status: "Emerging",
		statusIcon: Zap,
		searchVolume: 45,
		yoyGrowth: 89,
		countries: 12,
		sparklineData: [5, 8, 12, 18, 25, 32, 38, 45]
	},
	{
		id: 4,
		name: "Oversized Blazers",
		category: "Blazers",
		status: "Accelerating",
		statusIcon: Flame,
		searchVolume: 91,
		yoyGrowth: 278,
		countries: 18,
		sparklineData: [15, 20, 25, 40, 55, 70, 85, 91]
	},
	{
		id: 5,
		name: "Classic Cufflinks",
		category: "Accessories",
		status: "Steady",
		statusIcon: TrendingUp,
		searchVolume: 38,
		yoyGrowth: 67,
		countries: 6,
		sparklineData: [25, 28, 30, 32, 35, 36, 37, 38]
	}
];

const selectedTrendData = [
	{
		month: "Jan",
		searchVolume: 15,
		socialMentions: 12,
		lastYear: 8
	},
	{
		month: "Feb",
		searchVolume: 20,
		socialMentions: 18,
		lastYear: 10
	},
	{
		month: "Mar",
		searchVolume: 25,
		socialMentions: 22,
		lastYear: 12
	},
	{
		month: "Apr",
		searchVolume: 40,
		socialMentions: 35,
		lastYear: 15
	},
	{
		month: "May",
		searchVolume: 55,
		socialMentions: 48,
		lastYear: 18
	},
	{
		month: "Jun",
		searchVolume: 70,
		socialMentions: 62,
		lastYear: 22
	},
	{
		month: "Jul",
		searchVolume: 85,
		socialMentions: 78,
		lastYear: 25
	},
	{
		month: "Aug",
		searchVolume: 91,
		socialMentions: 85,
		lastYear: 28
	}
];

const relatedProducts = [
	{
		image: "/images/products/exec-wool-suit.jpg",
		title: "Executive Wool Suit",
		price: "$599.99",
		matchScore: 94
	},
	{
		image: "/images/products/double-breasted-blazer.jpg",
		title: "Premium Blazer",
		price: "$324.99",
		matchScore: 87
	}
];

const competitorActivity = [
	{
		competitor: "Hugo Boss",
		action: "New formal wear collection launched",
		timestamp: "2 hours ago",
		impact: "High"
	},
	{
		competitor: "Armani",
		action: "Price reduced on premium suits",
		timestamp: "1 day ago",
		impact: "Medium"
	},
	{
		competitor: "Brooks Brothers",
		action: "Professional attire campaign announced",
		timestamp: "3 days ago",
		impact: "High"
	}
];

export function MarketIntelDashboard() {
	const [selectedTrend, setSelectedTrend] = useState(trends[0]);
	const [showSocialData, setShowSocialData] = useState(true);

	return (
		<div className="p-6">
			{/* Page Header */}
			{/* <div className="mb-6">
				<h1>Market Intelligence</h1>
				<p className="text-muted-foreground">
					Real-time formal wear trend intelligence for your store
				</p>
			</div> */}

			<div className="grid grid-cols-4 gap-6">
				{/* Left Column: Trend Discovery */}
				<div className="space-y-4">
					{/* Filters */}
					<Card>
						<CardHeader>
							<CardTitle className="text-xl text-black font-bold">
								Trend Discovery
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{/* Search */}
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search trends..."
									className="pl-10"
								/>
							</div>

							{/* Category Filters */}
							<div>
								<Label className="text-sm font-medium mb-2 block">
									Categories
								</Label>
								<div className="space-y-2">
									{trendCategories.map((category) => (
										<div
											key={category.id}
											className="flex items-center space-x-2"
										>
											<Checkbox
												id={category.id}
												defaultChecked={
													category.checked
												}
											/>
											<Label
												htmlFor={category.id}
												className="text-sm"
											>
												{category.label}
											</Label>
										</div>
									))}
								</div>
							</div>

							<Separator />

							{/* Trend Type */}
							<div>
								<Label className="text-sm font-medium mb-2 block">
									Trend Type
								</Label>
								<RadioGroup defaultValue="all">
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="all" id="all" />
										<Label
											htmlFor="all"
											className="text-sm"
										>
											All Trends
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="emerging"
											id="emerging"
										/>
										<Label
											htmlFor="emerging"
											className="text-sm"
										>
											Emerging
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="growing"
											id="growing"
										/>
										<Label
											htmlFor="growing"
											className="text-sm"
										>
											Growing
										</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem
											value="mature"
											id="mature"
										/>
										<Label
											htmlFor="mature"
											className="text-sm"
										>
											Mature
										</Label>
									</div>
								</RadioGroup>
							</div>
						</CardContent>
					</Card>

					{/* Trending Now List */}
					<Card className="flex-1">
						<CardHeader>
							<CardTitle className="text-xl text-black font-bold">
								Trending Now
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{trends.map((trend) => (
								<div
									key={trend.id}
									className={`p-3 border rounded-lg cursor-pointer transition-colors ${
										selectedTrend.id === trend.id
											? "border-primary bg-primary/5"
											: "hover:border-primary/50"
									}`}
									onClick={() => setSelectedTrend(trend)}
								>
									<div className="flex items-start justify-between mb-2">
										<h4 className="font-medium text-sm">
											{trend.name}
										</h4>
										<Badge
											variant="secondary"
											className="text-xs"
										>
											{trend.category}
										</Badge>
									</div>

									<div className="flex items-center gap-2 mb-2">
										<trend.statusIcon className="h-3 w-3" />
										<span className="text-xs">
											{trend.status}
										</span>
									</div>

									<div className="flex items-center justify-between text-xs text-muted-foreground">
										<span>
											Volume: {trend.searchVolume}
										</span>
										<div className="flex items-center">
											<ArrowUp className="h-3 w-3 text-green-600 mr-1" />
											<span className="text-green-600">
												{trend.yoyGrowth}%
											</span>
										</div>
									</div>

									<div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
										<span>{trend.countries} countries</span>
										<div className="w-16 h-6">
											<ResponsiveContainer
												width="100%"
												height="100%"
											>
												<LineChart
													data={trend.sparklineData.map(
														(value, index) => ({
															value,
															index
														})
													)}
												>
													<Line
														type="monotone"
														dataKey="value"
														stroke="#10b981"
														strokeWidth={1}
														dot={false}
													/>
												</LineChart>
											</ResponsiveContainer>
										</div>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</div>

				{/* Center Column: Trend Analysis */}
				<div className="lg:col-span-2 space-y-4">
					{/* Selected Trend Header */}
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="text-xl text-black font-bold">
										{selectedTrend.name}
									</CardTitle>
									<CardDescription className="flex items-center gap-2">
										{selectedTrend.category} •
										<selectedTrend.statusIcon className="h-3 w-3" />
										{selectedTrend.status}
									</CardDescription>
								</div>
								<div className="flex gap-2">
									<Button variant="outline" size="icon">
										<Bookmark className="h-4 w-4" />
									</Button>
									<Button variant="outline" size="icon">
										<Share2 className="h-4 w-4" />
									</Button>
								</div>
							</div>
						</CardHeader>
					</Card>

					{/* Search Interest Chart */}
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<CardTitle className="text-xl text-black font-bold">
									Search Interest Over Time
								</CardTitle>
								<div className="flex items-center space-x-2">
									<Checkbox
										id="social-data"
										checked={showSocialData}
										onCheckedChange={(checked) =>
											setShowSocialData(checked === true)
										}
									/>
									<Label
										htmlFor="social-data"
										className="text-sm"
									>
										Show Social Data
									</Label>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="h-80">
								<ResponsiveContainer width="100%" height="100%">
									<AreaChart data={selectedTrendData}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis />
										<Tooltip />
										<Area
											type="monotone"
											dataKey="searchVolume"
											stackId="1"
											stroke="#3b82f6"
											fill="#3b82f6"
											fillOpacity={0.6}
											name="Search Volume"
										/>
										{showSocialData && (
											<Area
												type="monotone"
												dataKey="socialMentions"
												stackId="2"
												stroke="#10b981"
												fill="#10b981"
												fillOpacity={0.6}
												name="Social Mentions"
											/>
										)}
										<Line
											type="monotone"
											dataKey="lastYear"
											stroke="#6b7280"
											strokeDasharray="5 5"
											name="Last Year"
										/>
									</AreaChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>

					{/* Geographic Heat Map Placeholder */}
					<Card>
						<CardHeader>
							<CardTitle className="text-xl text-black font-bold">
								Geographic Distribution
							</CardTitle>
							<CardDescription>
								Interactive world map showing trend intensity by
								region
							</CardDescription>
						</CardHeader>
						<CardContent>
							<InteractiveWorldMap
								selectedTrend={selectedTrend.name}
							/>
						</CardContent>
					</Card>
				</div>

				{/* Right Column: Market Intelligence */}
				<div className=" space-y-4">
					{/* Related Products */}
					<Card>
						<CardHeader>
							<CardTitle className="text-xl text-black font-bold">
								Related Products
							</CardTitle>
						</CardHeader>
						<CardContent className="grid grid-cols-1 md:grid-cols-1 gap-6">
							{relatedProducts.map((product, index) => (
								<div
									key={index}
									className="border rounded-lg p-3 h-full"
								>
									<img
										src={product.image}
										alt={product.title}
										className="w-full h-48 object-cover mb-2 border border-gray-100 rounded-xl"
									/>
									<h4 className="font-medium text-xs mb-1">
										{product.title}
									</h4>
									<p className="text-xs text-muted-foreground mb-1">
										{product.price}
									</p>
									<div className="flex items-center justify-between">
										<Badge
											variant="outline"
											className="text-xs"
										>
											{product.matchScore}% match
										</Badge>
									</div>
									<Button
										variant="outline"
										size="sm"
										className="w-full mt-2 text-xs"
									>
										View Details
									</Button>
								</div>
							))}
						</CardContent>
					</Card>

					{/* Competitor Activity */}
					<Card>
						<CardHeader>
							<CardTitle className="text-xl text-black font-bold">
								Competitor Moves
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							{competitorActivity.map((activity, index) => (
								<div
									key={index}
									className="border rounded-lg p-3"
								>
									<h4 className="font-medium text-xs mb-1">
										{activity.competitor}
									</h4>
									<p className="text-xs text-muted-foreground mb-2">
										{activity.action}
									</p>
									<div className="flex items-center justify-between">
										<span className="text-xs text-muted-foreground">
											{activity.timestamp}
										</span>
										<Badge
											variant={
												activity.impact === "High"
													? "destructive"
													: "secondary"
											}
											className="text-xs"
										>
											{activity.impact}
										</Badge>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
