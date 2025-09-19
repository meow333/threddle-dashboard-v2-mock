"use client";
import { useRouter } from "next/navigation";
import { StoreConnectionProgress } from "@/components/onboarding/store-connection-progress";

export default function OnboardingConnectionPage() {
  const router = useRouter();
  return (
    <StoreConnectionProgress onNext={() => router.push("/onboarding/business")} onBack={() => router.back()} />
  );
}

