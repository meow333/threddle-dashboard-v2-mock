import { useState } from "react";
import {
	Eye,
	EyeOff,
	TrendingUp,
	Sparkles,
	Globe,
	Activity,
	ShieldCheck,
	Bot,
	LockKeyhole,
	Ban
} from "lucide-react";
const logoImage = "/images/logos/logo-threddle.png";
const backgroundImage = "/images/backgrounds/bg2.jpg";
const parentBackgroundImage = "/images/backgrounds/bg6.jpg";
const splitRegisterBackgroundImage = "/images/backgrounds/login-cover.png";
const splitLoginBackgroundImage = "/images/backgrounds/login-cover-2.png";
const loginRegisterBackgroundImage = "/images/backgrounds/login-cover-1.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { login as setLoggedIn, savePassword } from "@/lib/session";

interface LoginRegistrationProps {
	onSignIn: () => void;
	onRegister: () => void;
}

export function LoginRegistration({
	onSignIn,
	onRegister
}: LoginRegistrationProps) {
	const [isLogin, setIsLogin] = useState(false); // Start with registration
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: ""
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Frontend-only session + password persistence
		savePassword(formData.password);
		setLoggedIn();
		if (isLogin) {
			// For sign in, go directly to dashboard
			onSignIn();
		} else {
			// For registration, start onboarding flow
			onRegister();
		}
	};

	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center bg-black text-foreground transition-colors">
			{/* Left Panel - Hero Section */}
			<div className="w-full h-screen flex flex-col lg:flex-row items-center justify-center p-12">
				<div className="shrink h-full">
					{/* <img
						src={
							loginRegisterBackgroundImage
							// isLogin
							// 	? splitLoginBackgroundImage
							// 	: splitRegisterBackgroundImage
						}
						className="h-screen object-contain transform animate-all"
					/> */}
					<img
						src={loginRegisterBackgroundImage}
						className="hidden xl:block h-screen object-contain transform animate-all"
					/>
					<img
						src={splitRegisterBackgroundImage}
						className="xl:hidden h-screen object-contain transform animate-all"
					/>
					{/* <div className="relative z-10 flex flex-col justify-between px-12 py-16 text-white h-full">
						<div className="mb-8">
							<img
								src={logoImage}
								alt="Threddle Logo"
								className="h-8 object-contain mb-4 transform invert"
							/>
						</div>

						<div
							id="feature-intro"
							className="space-y-3 pb-4 border-b border-white/20"
						>
							<p
								id="feature-intro-trust"
								className="text-4xl font-bold opacity-90 font-normal"
							>
								Built for fashion-first ecommerce brands.
							</p>
							<div className="flex flex-row items-center justify-start text-lg font-light bg-white/10 px-4 py-2 border-4 border-white/10 rounded-2xl shadow backdrop-blur-lg">
								<Globe className="h-5 w-5 mr-3 opacity-90" />
								Get Market Intel across geographies
							</div>
							<div className="flex flex-row items-center justify-start text-lg font-light bg-white/10 px-4 py-2 border-4 border-white/10 rounded-2xl shadow backdrop-blur-lg">
								<TrendingUp className="h-5 w-5 mr-3 opacity-90" />
								Live Hype tracking before they peak
							</div>
							<div className="flex flex-row items-center justify-start text-lg font-light bg-white/10 px-4 py-2 border-4 border-white/10 rounded-2xl shadow backdrop-blur-lg">
								<Sparkles className="h-5 w-5 mr-3 opacity-90" />
								AI-matched products to your inventory
							</div>
							<div className="flex flex-row items-center justify-start text-lg font-light bg-white/10 px-4 py-2 border-4 border-white/10 rounded-2xl shadow backdrop-blur-lg">
								<Activity className="h-5 w-5 mr-3 opacity-90" />
								Know your Competitors
							</div>
							<p className="text-xl flex flex-row items-center justify-start">
								Powered by Threddle AI Agents
								<Bot className="h-8 w-8 ml-3" />{" "}
							</p>
						</div>

						<div
							id="trust-statements"
							className="w-full flex flex-row items-center justify-start gap-4 text-sm"
						>
							<div className="w-max flex flex-row items-center justify-start gap-1">
								<ShieldCheck className="h-5 w-5 opacity-90" />
								<span className="opacity-90">
									Privacy-first
								</span>
							</div>
							<div className="w-max flex flex-row items-center justify-start gap-1">
								<LockKeyhole className="h-5 w-5 opacity-90" />
								<span className="opacity-90">
									Your Data is Secure
								</span>
							</div>
							<div className="w-max flex flex-row items-center justify-start gap-1">
								<Ban className="h-5 w-5 opacity-90" />
								<span className="opacity-90">No Ads</span>
							</div>
							<span className="opacity-90"></span>
						</div>
					</div> */}
				</div>

				{/* Right Panel - Form Section */}
				<div className="flex-1 flex items-center h-full justify-center transition-colors">
					<div className="w-full h-full max-w-xl space-y-8 p-12 overflow-clip rounded-xl bg-card transition-colors  border border-border">
						{/* Mobile Logo */}
						<div className="lg:hidden flex justify-center">
							<img
								src={logoImage}
								alt="Threddle Logo"
								className="h-8 object-contain"
							/>
						</div>

						{/* Header */}
						<div className="space-y-3 text-center">
							<h1 className="text-2xl font-medium text-foreground">
								{isLogin ? "Welcome back" : "Create an account"}
							</h1>
							<p className="text-muted-foreground font-normal">
								{isLogin
									? "Sign in to access your fashion insights dashboard"
									: "Access your trends, insights, and analytics anytime, anywhere - and keep everything flowing in one place."}
							</p>
						</div>

						{/* Form */}
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="space-y-5">
								<div>
									<label className="text-sm font-medium text-foreground block mb-2">
										Your email
									</label>
									<Input
										type="email"
										placeholder="name@company.com"
										value={formData.email}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												email: e.target.value
											}))
										}
										required
										className="h-12 font-normal"
									/>
								</div>

								<div>
									<label className="text-sm font-medium text-foreground block mb-2">
										{isLogin
											? "Password"
											: "Create password"}
									</label>
									<div className="relative">
										<Input
											type={
												showPassword
													? "text"
													: "password"
											}
											placeholder="••••••••••••"
											value={formData.password}
											onChange={(e) =>
												setFormData((prev) => ({
													...prev,
													password: e.target.value
												}))
											}
											required
											className="h-12 pr-12 font-normal"
										/>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
											onClick={() =>
												setShowPassword(!showPassword)
											}
										>
											{showPassword ? (
												<EyeOff className="h-4 w-4 text-muted-foreground" />
											) : (
												<Eye className="h-4 w-4 text-muted-foreground" />
											)}
										</Button>
									</div>
								</div>
							</div>

							{isLogin && (
								<div className="flex justify-end">
									<Button
										variant="link"
										className="px-0 h-auto text-sm text-muted-foreground hover:text-foreground font-normal"
									>
										Forgot password?
									</Button>
								</div>
							)}

							{isLogin ? (
								<Button
									type="submit"
									className="w-full h-12"
									onClick={() => onSignIn()}
								>
									Sign in
								</Button>
							) : (
								<Button
									type="submit"
									className="w-full h-12"
									onClick={() => onRegister()}
								>
									Create account
								</Button>
							)}
						</form>

						{/* Divider */}
						<div className="relative">
							<Separator className="bg-border" />
							<div className="absolute inset-0 flex justify-center">
								<span className="bg-background px-4 text-xs text-muted-foreground font-normal">
									or continue with
								</span>
							</div>
						</div>

						{/* Social Login */}
						<div className="flex justify-center">
							<Button
								variant="default"
								className="w-full h-12 flex items-center justify-center gap-3 font-normal"
								onClick={() =>
									isLogin ? onSignIn() : onRegister()
								}
							>
								<svg className="h-5 w-5" viewBox="0 0 24 24">
									<path
										fill="#4285F4"
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									/>
									<path
										fill="#34A853"
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									/>
									<path
										fill="#FBBC05"
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									/>
									<path
										fill="#EA4335"
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									/>
								</svg>
								<span>Continue with Google</span>
							</Button>
						</div>

						{/* Toggle Login/Register */}
						<div className="text-center">
							<span className="text-sm text-muted-foreground font-normal">
								{isLogin
									? "Don't have an account?"
									: "Already have an account?"}
							</span>
							<Button
								variant="link"
								className="px-1 h-auto text-sm font-normal"
								onClick={() => setIsLogin(!isLogin)}
							>
								{isLogin ? "Register" : "Sign in"}
							</Button>
						</div>

						{/* Legal Links */}
						<div className="text-center space-y-2">
							<div className="flex justify-center items-center gap-1 text-xs text-muted-foreground font-normal">
								<span>
									By{" "}
									{isLogin
										? "signing in"
										: "creating an account"}
									, you agree to our
								</span>
							</div>
							<div className="flex justify-center items-center gap-4 text-xs">
								<Button
									variant="link"
									className="px-0 h-auto text-xs text-muted-foreground hover:text-foreground underline font-normal"
								>
									Terms of Service
								</Button>
								<span className="text-muted-foreground">•</span>
								<Button
									variant="link"
									className="px-0 h-auto text-xs text-muted-foreground hover:text-foreground underline font-normal"
								>
									Privacy Policy
								</Button>
								<span className="text-muted-foreground">•</span>
								<Button
									variant="link"
									className="px-0 h-auto text-xs text-muted-foreground underline font-normal"
								>
									Data Protection
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
