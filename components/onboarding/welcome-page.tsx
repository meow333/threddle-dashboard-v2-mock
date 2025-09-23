import {
	CheckCircle,
	Clock,
	ArrowLeft,
	Sparkles,
	Check,
	TrendingUp
} from "lucide-react";
const logoImage = "/images/logos/logo-threddle.png";
const parentBackgroundImage = "/images/backgrounds/bg6.jpg";
import { Button } from "../ui/button";
import { login } from "@/lib/session";
import { AnimatedCheck } from "../ui/animated-check";
import { Card, CardContent } from "../ui/card";
import { ProgressIndicator } from "./progress-indicator";

interface WelcomePageProps {
	onComplete: () => void;
	onBack?: () => void;
}

export function WelcomePage({ onComplete, onBack }: WelcomePageProps) {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12 bg-background text-foreground transition-colors">
			<div className="w-full max-w-2xl text-center space-y-10">
				{/* Logo */}
				<div className="flex justify-center">
					<img
						src={logoImage}
						alt="Threddle Logo"
						className="h-8 object-contain transform dark:invert"
					/>
				</div>
				<div className="w-full text-center space-y-10 bg-card rounded-3xl p-12 border border-slate-200 dark:border-slate-900 shadow-sm ">
					{/* Welcome Message */}
					<div className="space-y-4">
						<div className="flex justify-center">
							<AnimatedCheck className="h-12 w-12 text-green-500" />
						</div>
						<h1 className="text-4xl font-medium text-foreground">
							Welcome to Threddle!
						</h1>
						<p className="text-xl text-slate-600 font-normal">
							{/* Your AI-powered fashion insights platform is ready
                            to help you stay ahead of trends and boost sales. */}
							Your dashboard is ready with AI-curated trends,
							competitor moves, and product insights so you can
							make the right calls before the market shifts.
						</p>
					</div>

					{/* What's Next Card */}
					{/* <Card className="border border-slate-200 shadow-sm bg-white rounded-xl text-left">
						<CardContent className="p-8">
							<div className="flex items-center gap-4 mb-6">
								<div className="p-3 bg-blue-50 rounded-lg">
									<TrendingUp className="h-6 w-6 text-blue-600" />
								</div>
								<div>
                            <h3 className="text-xl font-medium text-foreground">
										What&apos;s Next?
									</h3>
									<p className="text-slate-600 font-normal">
										Here&apos;s what you can expect in your
										dashboard
									</p>
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
										<span className="text-sm text-slate-700 font-normal">
											Real-time trend analysis for formal
											wear
										</span>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-green-500 rounded-full"></div>
										<span className="text-sm text-slate-700 font-normal">
											Competitor pricing & product
											insights
										</span>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-orange-500 rounded-full"></div>
										<span className="text-sm text-slate-700 font-normal">
											Inventory optimization
											recommendations
										</span>
									</div>
								</div>
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
										<span className="text-sm text-slate-700 font-normal">
											AI-powered product match suggestions
										</span>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
										<span className="text-sm text-slate-700 font-normal">
											Social media trend tracking
										</span>
									</div>
									<div className="flex items-center gap-3">
										<div className="w-2 h-2 bg-green-500 rounded-full"></div>
										<span className="text-sm text-slate-700 font-normal">
											Performance impact analytics
										</span>
									</div>
								</div>
							</div>
						</CardContent>
					</Card> */}

					{/* Progress Indicator */}
					{/* <div className="pt-6">
						<ProgressIndicator currentStep={6} totalSteps={6} />
					</div> */}

					{/* CTA Buttons */}
					<div className="space-y-4">
                <Button
                    onClick={() => {
                        // Ensure user is marked authenticated before navigating
                        try {
                            login();
                        } catch {}
                        onComplete();
                    }}
                    className="w-full h-12 text-base bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                >
                    Show My Dashboard
                </Button>

						{/* Back Button */}
						{onBack && (
							<Button
								variant="secondary"
								onClick={onBack}
								className="w-full h-12 flex items-center justify-center gap-2 border-slate-200 text-slate-700 rounded-lg font-normal"
							>
								<ArrowLeft className="h-4 w-4" />
								Back
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
