import { useState } from "react";
import {
	Package,
	Mail,
	Users,
	ArrowLeft,
	TrendingUp,
	Bell,
	Calendar,
	Zap,
	Sparkles
} from "lucide-react";
const logoImage = "/images/logos/logo-threddle.png";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Switch } from "../ui/switch";
import { ProgressIndicator } from "./progress-indicator";
const parentBackgroundImage = "/images/backgrounds/bg6.jpg";

interface RecommendationsSetupProps {
	onNext: (notifications: {
		inventoryAlerts: boolean;
		weeklyDigest: boolean;
		competitorAlerts: boolean;
	}) => void;
	onBack?: () => void;
}

export function RecommendationsSetup({
	onNext,
	onBack
}: RecommendationsSetupProps) {
	const [notifications, setNotifications] = useState({
		inventoryAlerts: true,
		weeklyDigest: true,
		competitorAlerts: false
	});

	const handleToggle = (key: keyof typeof notifications) => {
		setNotifications((prev) => ({
			...prev,
			[key]: !prev[key]
		}));
	};

	const handleContinue = () => {
		onNext(notifications);
	};

	const notificationOptions = [
		{
			id: "inventoryAlerts",
			title: "Inventory Alerts",
			description: "Get notified about stockouts and overstocks",
			icon: Package,
			enabled: notifications.inventoryAlerts
		},
		{
			id: "weeklyDigest",
			title: "Weekly Trend Digest",
			description: "Receive weekly trend reports via email",
			icon: Mail,
			enabled: notifications.weeklyDigest
		},
		{
			id: "competitorAlerts",
			title: "Competitor Alerts",
			description: "Track competitor pricing and product launches",
			icon: Users,
			enabled: notifications.competitorAlerts
		}
	];

	return (
		<div
			className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-100"
			style={{
				backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1)), url(${parentBackgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat"
			}}
		>
			<div className="w-full max-w-2xl space-y-6">
				{/* Logo */}
				<div className="flex justify-center">
					<img
						src={logoImage}
						alt="Threddle Logo"
						className="h-8 object-contain"
					/>
				</div>

				{/* Header */}
				<div className="text-center space-y-4">
					<h1 className="text-3xl font-medium text-slate-900">
						Customize Your Insights
					</h1>
					<p className="text-lg text-slate-600 font-normal">
						Choose how you want to receive updates and
						recommendations
					</p>
				</div>

				{/* Recommendations Cards */}
				<div className="space-y-2">
					{/* Inventory Alerts */}
					<Card className="border border-slate-200 shadow-sm bg-white rounded-xl">
						<CardContent className="p-6">
							<div className="flex items-start justify-between">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-orange-50 rounded-lg">
										<Package className="h-6 w-6 text-orange-600" />
									</div>
									<div className="flex-1">
										<h3 className="font-medium text-slate-900 mb-2">
											Inventory Health Alerts
										</h3>
										<p className="text-sm text-slate-600 font-normal mb-3">
											Get notified when products are
											running low or trending items need
											restocking
										</p>
										<div className="flex items-center gap-2 text-xs text-slate-500">
											<Bell className="h-3 w-3" />
											<span className="font-normal">
												Daily notifications • Email +
												Dashboard
											</span>
										</div>
									</div>
								</div>
								<Switch
									checked={notifications.inventoryAlerts}
									onCheckedChange={(checked) =>
										setNotifications((prev) => ({
											...prev,
											inventoryAlerts: checked
										}))
									}
								/>
							</div>
						</CardContent>
					</Card>

					{/* Weekly Digest */}
					<Card className="border border-slate-200 shadow-sm bg-white rounded-xl">
						<CardContent className="p-6">
							<div className="flex items-start justify-between">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-blue-50 rounded-lg">
										<TrendingUp className="h-6 w-6 text-blue-600" />
									</div>
									<div className="flex-1">
										<h3 className="font-medium text-slate-900 mb-2">
											Weekly Trends Digest
										</h3>
										<p className="text-sm text-slate-600 font-normal mb-3">
											Comprehensive weekly report with
											market trends, competitor insights,
											and growth opportunities
										</p>
										<div className="flex items-center gap-2 text-xs text-slate-500">
											<Calendar className="h-3 w-3" />
											<span className="font-normal">
												Every Monday • Email summary
											</span>
										</div>
									</div>
								</div>
								<Switch
									checked={notifications.weeklyDigest}
									onCheckedChange={(checked) =>
										setNotifications((prev) => ({
											...prev,
											weeklyDigest: checked
										}))
									}
								/>
							</div>
						</CardContent>
					</Card>

					{/* Competitor Alerts */}
					<Card className="border border-slate-200 shadow-sm bg-white rounded-xl">
						<CardContent className="p-6">
							<div className="flex items-start justify-between">
								<div className="flex items-start gap-4">
									<div className="p-3 bg-green-50 rounded-lg">
										<Users className="h-6 w-6 text-green-600" />
									</div>
									<div className="flex-1">
										<h3 className="font-medium text-slate-900 mb-2">
											Competitor Activity Alerts
										</h3>
										<p className="text-sm text-slate-600 font-normal mb-3">
											Real-time alerts when competitors
											launch new products, change pricing,
											or run promotions
										</p>
										<div className="flex items-center gap-2 text-xs text-slate-500">
											<Zap className="h-3 w-3" />
											<span className="font-normal">
												Real-time • Push notifications
											</span>
										</div>
									</div>
								</div>
								<Switch
									checked={notifications.competitorAlerts}
									onCheckedChange={(checked) =>
										setNotifications((prev) => ({
											...prev,
											competitorAlerts: checked
										}))
									}
								/>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Summary */}
				<Card className="border border-slate-200 shadow-sm bg-slate-50 rounded-xl">
					<CardContent className="p-6">
						<div className="flex items-center gap-3 mb-4">
							<Sparkles className="h-5 w-5 text-blue-600" />
							<h3 className="font-medium text-slate-900">
								You&apos;re All Set!
							</h3>
						</div>
						<p className="text-sm text-slate-600 font-normal mb-4">
							Based on your selections, you&apos;ll receive
							personalized insights to help grow your formal wear
							business.
						</p>
						<div className="flex items-center gap-2">
							<div className="w-2 h-2 bg-green-500 rounded-full"></div>
							<span className="text-xs text-green-600 font-normal">
								{
									Object.values(notifications).filter(Boolean)
										.length
								}{" "}
								notification types enabled
							</span>
						</div>
					</CardContent>
				</Card>

				{/* CTA Buttons */}
				<div className="space-y-4">
					<Button
						onClick={handleContinue}
						className="w-full h-12 text-base bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium"
					>
						Complete Setup
					</Button>
					{onBack && (
						<Button
							variant="outline"
							onClick={onBack}
							className="w-full h-12 flex items-center justify-center gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg font-normal"
						>
							<ArrowLeft className="h-4 w-4" />
							Back
						</Button>
					)}
				</div>
				{/* Progress Indicator */}
				<div className="pt-6">
					<ProgressIndicator currentStep={5} totalSteps={6} />
				</div>
			</div>
		</div>
	);
}
