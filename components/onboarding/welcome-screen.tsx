import { Store, ArrowLeft } from "lucide-react";
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
		<div
			className="min-h-screen flex flex-col items-center justify-center p-8 space-y-12 bg-white"
			style={{
				backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1)), url(${parentBackgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat"
			}}
		>
			{/* Logo */}
			<div className="flex justify-center">
				<img
					src={logoImage}
					alt="Threddle Logo"
					className="h-8 object-contain"
				/>
			</div>
			<div className="max-w-6xl h-auto rounded-3xl overflow-clip p-12 bg-white border border-slate-200 shadow-md">
				<div className="w-full max-w-md text-center space-y-10">
					{/* Headlines */}
					<div className="space-y-4">
						<h1 className="text-3xl font-medium text-slate-900">
							Turn Fashion Trends Into Sales
						</h1>
						<p className="text-lg text-slate-600 font-normal">
							Connect your store and get AI-powered insights in
							minutes.
						</p>
					</div>

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

						{/* Trust line */}
						<p className="text-sm text-slate-500 font-normal">
							Secure connection. We never modify your store data.
						</p>
					</div>

					{/* Progress Indicator */}
					<div className="pt-8">
						<ProgressIndicator currentStep={1} totalSteps={6} />
					</div>
				</div>
			</div>
		</div>
	);
}
