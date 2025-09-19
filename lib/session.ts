"use client";

const AUTH_KEY = "threddle_auth";
const PASSWORD_KEY = "threddle_password";

export function login() {
	try {
		localStorage.setItem(AUTH_KEY, "true");
	} catch {}
}

export function logout() {
	try {
		localStorage.removeItem(AUTH_KEY);
		localStorage.removeItem(PASSWORD_KEY);
	} catch {}
}

export function isAuthenticated(): boolean {
	try {
		return localStorage.getItem(AUTH_KEY) === "true";
	} catch {
		return false;
	}
}

export function savePassword(password: string) {
	try {
		// Store as-is per request (frontend only). Consider hashing for better safety.
		localStorage.setItem(PASSWORD_KEY, password);
	} catch {}
}

export function getPassword(): string | null {
	try {
		return localStorage.getItem(PASSWORD_KEY);
	} catch {
		return null;
	}
}
