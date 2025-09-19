"use client";
import { useRouter } from "next/navigation";
import { ProductInsightsDashboard } from "@/components/onboarding/product-insights-dashboard";

export default function OnboardingInsightsPage() {
  const router = useRouter();
  return (
    <ProductInsightsDashboard onNext={() => router.push("/onboarding/recommendations")} onBack={() => router.back()} />
  );
}

