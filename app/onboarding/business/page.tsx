"use client";
import { useRouter } from "next/navigation";
import { BusinessContext } from "@/components/onboarding/business-context";

export default function OnboardingBusinessPage() {
  const router = useRouter();
  return (
    <BusinessContext
      onNext={() => router.push("/onboarding/insights")}
      onBack={() => router.back()}
    />
  );
}

