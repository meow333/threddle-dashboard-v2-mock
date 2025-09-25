"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BusinessContext } from "@/components/onboarding/business-context";
import { WelcomePage } from "@/components/onboarding/welcome-page";

export default function OnboardingBusinessPage() {
	const router = useRouter();
	const [phase, setPhase] = useState<"business" | "welcome">("business");

	useEffect(() => {
		// One full pass of agentAnimationSteps in BusinessContext (4 steps x 1.5s)
		const toWelcome = setTimeout(() => setPhase("welcome"), 4 * 2000);
		return () => clearTimeout(toWelcome);
	}, []);

	useEffect(() => {
		if (phase === "welcome") {
			const toDashboard = setTimeout(
				() => router.push("/dashboard"),
				2000
			);
			return () => clearTimeout(toDashboard);
		}
	}, [phase, router]);

	if (phase === "welcome") {
		return <WelcomePage onComplete={() => router.push("/dashboard")} />;
	}

	return (
		<BusinessContext
			onNext={() => setPhase("welcome")}
			onBack={() => router.back()}
		/>
	);
}
