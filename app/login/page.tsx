"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginRegistration } from "@/components/login-registration";
import { isAuthenticated } from "@/lib/session";

export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated()) router.replace("/dashboard");
  }, [router]);
  return (
    <LoginRegistration
      onSignIn={() => router.push("/dashboard")}
      onRegister={() => router.push("/onboarding/welcome")}
    />
  );
}
