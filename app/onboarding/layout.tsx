"use client";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors">
      <div className="absolute left-4 top-4 z-20">
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}
