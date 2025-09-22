import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import {
	FileText,
	Download,
	Star,
	Clock,
	Calendar,
	Users,
	TrendingUp,
	Target,
	BarChart3,
	Settings,
	Archive,
	Eye
} from "lucide-react";

interface InsightsHubProps {}

export function InsightsHub() {
	// Mock data - in a real app this would come from API
	const reportsLibrary = [
		{
			id: 1,
			title: "Executive Formal Wear Trends 2024",
			type: "Trend Report",
			generated: "2 days ago",
			size: "3.1 MB",
			format: "PDF",
			downloads: 245,
			isStarred: true,
			description:
				"Comprehensive analysis of executive formal wear trends across all professional categories"
		},
		{
			id: 2,
			title: "Formal Wear Competitor Benchmark Q4",
			type: "Competitor Benchmark",
			generated: "5 days ago",
			size: "2.4 MB",
			format: "PDF",
			downloads: 156,
			isStarred: false,
			description:
				"Market positioning analysis against luxury formal wear competitors"
		},
		{
			id: 3,
			title: "Power Suit Collection Performance - November",
			type: "Product Match Summary",
			generated: "1 week ago",
			size: "4.2 MB",
			format: "PPT",
			downloads: 89,
			isStarred: true,
			description:
				"Monthly analysis of power suit trend alignment and business opportunities"
		},
		{
			id: 4,
			title: "Formal Wear Market Intelligence Export",
			type: "Market Data",
			generated: "3 days ago",
			size: "5.8 MB",
			format: "CSV",
			downloads: 67,
			isStarred: false,
			description:
				"Raw formal wear market intelligence data for executive analysis"
		}
	];

	const savedInsights = [
		{
			id: 1,
			title: "Power Suit Trend Analysis",
			savedDate: "Yesterday",
			category: "Trend Analysis",
			confidence: 94
		},
		{
			id: 2,
			title: "Tech-Enhanced Suits Market Gap",
			savedDate: "3 days ago",
			category: "Market Opportunity",
			confidence: 87
		},
		{
			id: 3,
			title: "Sustainable Formal Wear Consumer Behavior",
			savedDate: "1 week ago",
			category: "Consumer Research",
			confidence: 91
		},
		{
			id: 4,
			title: "Corporate Partnership Shopping Analysis",
			savedDate: "2 weeks ago",
			category: "Business Development",
			confidence: 89
		}
	];

	const scheduledReports = [
		{
			id: 1,
			title: "Weekly Executive Trends Pulse",
			frequency: "Every Monday",
			format: "PDF + CSV",
			recipients: 5,
			nextRun: "Tomorrow 9:00 AM",
			isActive: true
		},
		{
			id: 2,
			title: "Monthly Formal Wear Competitor Review",
			frequency: "1st of every month",
			format: "PowerPoint",
			recipients: 3,
			nextRun: "Dec 1, 2024",
			isActive: true
		},
		{
			id: 3,
			title: "Quarterly Business Impact Report",
			frequency: "Every 3 months",
			format: "Executive PDF",
			recipients: 2,
			nextRun: "Jan 15, 2025",
			isActive: false
		}
	];

	const getTypeIcon = (type: string) => {
		switch (type) {
			case "Trend Report":
				return <TrendingUp className="h-4 w-4" />;
			case "Competitor Benchmark":
				return <Users className="h-4 w-4" />;
			case "Product Match Summary":
				return <Target className="h-4 w-4" />;
			default:
				return <BarChart3 className="h-4 w-4" />;
		}
	};

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			{/* <div className="flex items-center justify-between">
				<div>
					<h1 className="flex items-center gap-2 mb-2">
						Insights Hub
					</h1>
					<p className="text-muted-foreground">
						Executive-ready formal wear deep-dive reports & exports
					</p>
				</div>
			</div> */}

			{/* Reports Library */}
			<Card>
				<CardHeader>
					<CardTitle className="text-xl text-foreground font-bold flex flex-row justify-between">
						<div className=" flex items-center gap-2">
							<Archive className="h-5 w-5" />
							Reports Library
						</div>
						<Button>
							<Settings className="h-4 w-4 mr-2" />
							Report Settings
						</Button>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						{reportsLibrary.map((report) => (
							<Card key={report.id} className="">
								<CardContent className="p-4">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-2">
												{getTypeIcon(report.type)}
												<h3 className="font-medium">
													{report.title}
												</h3>
												{report.isStarred && (
													<Star className="h-4 w-4 text-yellow-500 fill-current" />
												)}
											</div>
											<p className="text-sm text-muted-foreground mb-2">
												{report.description}
											</p>
											<div className="flex items-center gap-4 text-xs text-muted-foreground">
												<Badge variant="outline">
													{report.type}
												</Badge>
												<span className="flex items-center gap-1">
													<Clock className="h-3 w-3" />
													{report.generated}
												</span>
												<span>{report.size}</span>
												<span className="flex items-center gap-1">
													<Eye className="h-3 w-3" />
													{report.downloads} downloads
												</span>
											</div>
										</div>
										<div className="flex gap-2">
											<Button size="sm" variant="outline">
												<Download className="h-3 w-3 mr-1" />
												{report.format}
											</Button>
											<Button size="sm" variant="outline">
												View
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Bottom Section - Two Columns */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Saved Insights */}
				<Card>
					<CardHeader>
						<CardTitle className="text-xl text-foreground font-bold flex items-center gap-2">
							<Star className="h-5 w-5" />
							Saved Insights
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{savedInsights.map((insight) => (
								<div
									key={insight.id}
									className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 cursor-pointer"
								>
									<div className="flex-1">
										<h4 className="font-medium text-sm mb-1">
											{insight.title}
										</h4>
										<div className="flex items-center gap-2 text-xs text-muted-foreground">
											<Badge
												variant="outline"
												className="text-xs"
											>
												{insight.category}
											</Badge>
											<Separator
												orientation="vertical"
												className="h-3"
											/>
											<span>{insight.savedDate}</span>
											<Separator
												orientation="vertical"
												className="h-3"
											/>
											<span className="text-green-600 font-medium">
												{insight.confidence}% confidence
											</span>
										</div>
									</div>
									<Button size="sm" variant="ghost">
										<Star className="h-3 w-3" />
									</Button>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Scheduled Reports */}
				<Card>
					<CardHeader>
						<CardTitle className="text-xl text-foreground font-bold flex items-center gap-2">
							<Calendar className="h-5 w-5" />
							Scheduled Reports
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{scheduledReports.map((schedule) => (
								<div
									key={schedule.id}
									className="p-4 border border-border rounded-lg"
								>
									<div className="flex items-start justify-between mb-3">
										<div className="flex-1">
											<h4 className="font-medium mb-1">
												{schedule.title}
											</h4>
											<div className="text-sm text-muted-foreground space-y-1">
												<p>
													Frequency:{" "}
													{schedule.frequency}
												</p>
												<p>Format: {schedule.format}</p>
												<p>
													Recipients:{" "}
													{schedule.recipients} people
												</p>
											</div>
										</div>
										<Switch
											checked={schedule.isActive}
											aria-label={`Toggle ${schedule.title}`}
										/>
									</div>
									<div className="flex items-center justify-between pt-2 border-t border-border">
										<span className="text-xs text-muted-foreground">
											Next run: {schedule.nextRun}
										</span>
										<Button size="sm" variant="ghost">
											Edit
										</Button>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
