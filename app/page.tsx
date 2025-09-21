"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/session";

export default function RootRedirect() {
	const router = useRouter();
	useEffect(() => {
		if (isAuthenticated()) {
			router.replace("/dashboard");
		} else {
			router.replace("/login");
		}
	}, [router]);
	return null;
}
