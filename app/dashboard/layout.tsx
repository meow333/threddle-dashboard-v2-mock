"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarFooter,
	SidebarInset
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardContent } from "@/components/ui/card";
import { ExecutionPanel } from "@/components/execution-panel";
import {
	TrendingUp,
	Target,
	Lightbulb,
	Users,
	Brain,
	BarChart3,
	FileText,
	Settings,
	Bell
} from "lucide-react";

const logoImage = "/images/logos/logo-threddle.png";

const items = [
	{ href: "/dashboard", title: "Dashboard", icon: TrendingUp },
	{
		href: "/dashboard/market-intelligence",
		title: "Market Intelligence",
		icon: Target
	},
	{
		href: "/dashboard/product-spotlight",
		title: "Product Spotlight",
		icon: Lightbulb
	},
	{
		href: "/dashboard/competitor-mirror",
		title: "Competitor Mirror",
		icon: Users
	},
	{ href: "/dashboard/ai-playbook", title: "AI Playbook", icon: Brain },
	{
		href: "/dashboard/performance-impact",
		title: "Performance Impact",
		icon: BarChart3
	},
	{ href: "/dashboard/insights-hub", title: "Insights Hub", icon: FileText }
];

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout } from "@/lib/session";

export default function DashboardLayout({
	children
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const router = useRouter();
	useEffect(() => {
		if (!isAuthenticated()) router.replace("/login");
	}, [router]);
	return (
		<SidebarProvider>
			<div className="flex min-h-screen w-full bg-background text-foreground transition-colors">
				<Sidebar
					collapsible="icon"
					className="bg-white dark:bg-background border-r border-border"
				>
					<SidebarHeader className="p-6 bg-white dark:bg-background">
						<div className="flex items-center gap-3">
							<div className="text-xl font-bold text-primary">
								<img
									src={logoImage}
									alt="Threddle Logo"
									className="h-8 object-contain transform dark:invert"
								/>
							</div>
						</div>
					</SidebarHeader>
					<SidebarContent className="bg-white dark:bg-background">
						<SidebarGroup>
							<SidebarGroupLabel className="text-muted-foreground font-medium text-sm">
								Navigation
							</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{items.map((item) => (
										<SidebarMenuItem key={item.href}>
											<Link
												href={item.href}
												passHref
												legacyBehavior
											>
												<SidebarMenuButton
													asChild
													isActive={
														pathname === item.href
													}
													className="text-foreground font-normal transition-colors"
												>
													<a>
														<item.icon className="h-4 w-4" />
														<span>
															{item.title}
														</span>
													</a>
												</SidebarMenuButton>
											</Link>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter className="p-6 space-y-3 bg-background border-t border-border group-data-[collapsible=icon]:hidden">
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton className="text-foreground hover:bg-accent font-normal transition-colors">
									<Bell className="h-4 w-4" />
									<span>Notifications</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton className="text-foreground hover:bg-accent font-normal transition-colors">
									<Settings className="h-4 w-4" />
									<span>Settings</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									onClick={() => {
										logout();
										router.replace("/login");
									}}
									className="text-foreground hover:bg-accent font-normal transition-colors"
								>
									<svg
										className="h-4 w-4"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
										<polyline points="16 17 21 12 16 7" />
										<line x1="21" y1="12" x2="9" y2="12" />
									</svg>
									<span>Logout</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
						<Card className="bg-card rounded-lg shadow-sm transition-colors">
							<CardContent className="p-4">
								<div className="flex items-center gap-3">
									<Avatar className="h-8 w-8">
										<AvatarImage src="" />
										<AvatarFallback className="bg-accent text-white text-sm font-medium">
											EF
										</AvatarFallback>
									</Avatar>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-foreground truncate">
											Elite Formal Wear
										</p>
										<p className="text-xs text-muted-foreground font-normal truncate">
											elitestore.shopify.com
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</SidebarFooter>
				</Sidebar>
				<SidebarInset className="flex flex-col min-w-0 bg-background text-foreground transition-colors">
					<ExecutionPanel />
					<main className="flex-1 overflow-auto bg-background transition-colors">
						{children}
					</main>
				</SidebarInset>
			</div>
		</SidebarProvider>
	);
}
