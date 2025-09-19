"use client";
import { useRouter } from "next/navigation";
import { RecommendationsSetup } from "@/components/onboarding/recommendations-setup";

export default function OnboardingRecommendationsPage() {
  const router = useRouter();
  return (
    <RecommendationsSetup onNext={() => router.push("/onboarding/final")} onBack={() => router.back()} />
  );
}

