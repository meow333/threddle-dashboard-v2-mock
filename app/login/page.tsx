"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginRegistration } from "@/components/login-registration";
import { isAuthenticated } from "@/lib/session";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated()) router.replace("/dashboard");
  }, [router]);
  return (
    <div className="relative min-h-screen bg-background text-foreground transition-colors">
      <div className="absolute left-4 top-4 z-20">
        <ThemeToggle />
      </div>
      <LoginRegistration
        onSignIn={() => router.push("/dashboard")}
        onRegister={() => router.push("/onboarding/welcome")}
      />
    </div>
  );
}
