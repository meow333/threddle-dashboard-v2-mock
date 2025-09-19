"use client";
import { useRouter } from "next/navigation";
import { WelcomeScreen } from "@/components/onboarding/welcome-screen";

export default function OnboardingWelcomePage() {
  const router = useRouter();
  return (
    <WelcomeScreen onNext={() => router.push("/onboarding/connection")} onBack={() => router.push("/login")} />
  );
}

