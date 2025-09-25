import { Store, ArrowLeft, TrendingUp, Package, Users } from "lucide-react";
const logoImage = "/images/logos/logo-threddle.png";
const shopifyLogo = "/images/logos/logo-shopify.png";
import { Button } from "../ui/button";
const parentBackgroundImage = "/images/backgrounds/bg6.jpg";
import { ProgressIndicator } from "./progress-indicator";

interface WelcomeScreenProps {
	onNext: () => void;
	onBack?: () => void;
}

export function WelcomeScreen({ onNext, onBack }: WelcomeScreenProps) {
	return (
		// <div
		// 	className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12 bg-white"
		// 	style={{
		// 		backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1)), url(${parentBackgroundImage})`,
		// 		backgroundSize: "cover",
		// 		backgroundPosition: "center",
		// 		backgroundRepeat: "no-repeat"
		// 	}}
		// >
		<div className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12 bg-background text-foreground transition-colors">
			{/* Logo */}
			<div className="flex justify-center">
				<img
					src={logoImage}
					alt="Threddle Logo"
					className="h-8 object-contain transform dark:invert"
				/>
			</div>
			<div className="max-w-6xl h-auto rounded-3xl overflow-clip p-12 bg-card border border-slate-200 dark:border-slate-900 shadow-md">
				<div className="w-full max-w-md text-center space-y-10">
					{/* Headlines */}
					<div className="space-y-4">
						<h1 className="text-3xl font-medium text-foreground">
							Connect your store and unleash Threddle's AI Agents
						</h1>
						<img
							src="/images/backgrounds/agents-light.png"
							className="rounded-xl overflow-clip"
						/>
						<p className="text-lg text-slate-600 font-normal">
							In minutes, they'll scan your business and the
							market to reveal your next winning product, smarter
							pricing, and promotion strategies that drive real
							growth.
						</p>
					</div>

					{/* Agent tiles */}
					{/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
						<div className="flex items-start gap-3 p-3 rounded-lg border border-border">
							<div className="p-2 rounded-md bg-primary/10 text-primary">
								<TrendingUp className="h-4 w-4" />
							</div>
							<div>
								<div className="text-sm font-medium">Trend Agent</div>
								<div className="text-xs text-muted-foreground">Identifies whatʼs selling, spots new trends, and highlights top opportunities.</div>
							</div>
						</div>
						<div className="flex items-start gap-3 p-3 rounded-lg border border-border">
							<div className="p-2 rounded-md bg-amber-500/10 text-amber-600">
								<Package className="h-4 w-4" />
							</div>
							<div>
								<div className="text-sm font-medium">Inventory Agent</div>
								<div className="text-xs text-muted-foreground">Detects low-stock SKUs, flags deadstock, and automates inventory analysis.</div>
							</div>
						</div>
						<div className="flex items-start gap-3 p-3 rounded-lg border border-border">
							<div className="p-2 rounded-md bg-blue-500/10 text-blue-600">
								<Users className="h-4 w-4" />
							</div>
							<div>
								<div className="text-sm font-medium">Competitor Agent</div>
								<div className="text-xs text-muted-foreground">Tracks pricing, products, and promotions to signal market shifts early.</div>
							</div>
						</div>
					</div> */}

					{/* CTA Button */}
					<div className="space-y-4">
						<Button
							onClick={onNext}
							className="w-full h-12 text-base bg-white text-blue-700 rounded-lg font-medium shadow border border-slate-200 transfor scale-100 hover:scale-105"
						>
							<img
								src={shopifyLogo}
								alt="Shopify"
								className="h-5 w-5 mr-2"
							/>
							Connect your Shopify Store
						</Button>

						{/* Back Button */}
						{/* {onBack && (
							<Button
								variant="secondary"
								onClick={onBack}
								className="w-full h-12 flex items-center justify-center gap-2 border-slate-200 text-slate-700 rounded-lg font-normal"
							>
								<ArrowLeft className="h-4 w-4" />
								Back
							</Button>
						)} */}

						{/* Trust line */}
						<p className="text-sm text-slate-500 font-normal">
							Your data is safe with us. We use a secure,
							read-only connection to analyze your store. We never
							modify, share, or sell your data.
						</p>
					</div>

					{/* Progress Indicator */}
					{/* <div className="pt-8">
						<ProgressIndicator currentStep={1} totalSteps={5} />
					</div> */}
				</div>
			</div>
		</div>
	);
}
