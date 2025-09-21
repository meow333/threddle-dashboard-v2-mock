"use client";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  // Allow users to access onboarding even if authenticated
  return <>{children}</>;
}
