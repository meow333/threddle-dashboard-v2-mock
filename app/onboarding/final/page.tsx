"use client";
import { useRouter } from "next/navigation";
import { WelcomePage } from "@/components/onboarding/welcome-page";

export default function OnboardingFinalPage() {
  const router = useRouter();
  return (
    <WelcomePage onComplete={() => router.push("/dashboard")} onBack={() => router.back()} />
  );
}

