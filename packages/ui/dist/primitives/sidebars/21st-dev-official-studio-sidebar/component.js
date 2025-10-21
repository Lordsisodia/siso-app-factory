"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { partnerModalOpenAtom } from "@/app/studio/[username]/analytics/page.client";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, } from "@/components/ui/sidebar";
import { UserAvatar } from "@/components/ui/user-avatar";
import { userStateAtom } from "@/lib/store/user-store";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { BarChartBig, CreditCard, Home, Layers, Package, Settings, } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
export function StudioSidebar({ user }) {
    const pathname = usePathname();
    const [userState] = useAtom(userStateAtom);
    const [currentHash, setCurrentHash] = useState("");
    const [, setPartnerModalOpen] = useAtom(partnerModalOpenAtom);
    const { open } = useSidebar();
    // Get the base username path
    const baseUsername = user.display_username || user.username;
    const basePath = `/studio/${baseUsername}`;
    // Update hash on client side
    useEffect(() => {
        const updateHash = () => {
            setCurrentHash(window.location.hash);
        };
        // Set initial hash
        if (typeof window !== "undefined") {
            updateHash();
        }
        // Listen for hash changes
        window.addEventListener("hashchange", updateHash);
        return () => window.removeEventListener("hashchange", updateHash);
    }, []);
    // Check which item should be active
    const isComponentsActive = pathname === basePath;
    const isBundlesActive = pathname.includes("/bundles");
    const isAnalyticsActive = pathname.includes("/analytics");
    const isMonetizationActive = pathname.includes("/monetization");
    return (_jsxs(Sidebar, { className: "z-4 pt-14  bg-background border-r-transparent border-none", collapsible: "icon", children: [_jsx(SidebarHeader, { className: "border-b bg-background", children: _jsxs("div", { className: "flex flex-col items-center py-4", children: [_jsx(UserAvatar, { src: user.display_image_url || user.image_url || "/placeholder.svg", alt: user.display_name || user.name || "", size: open ? 48 : 24, className: cn("transition-all duration-300 ease-in-out", open ? "mb-4" : "mb-0") }), _jsxs("div", { className: cn("flex flex-col items-center transition-all duration-300 ease-in-out overflow-hidden", open ? "max-h-16 opacity-100 mt-1" : "max-h-0 opacity-0 mt-0"), children: [_jsx("h2", { className: "text-xl font-medium text-center", children: user.display_name || user.name || user.username }), _jsxs("p", { className: "text-sm text-muted-foreground text-center", children: ["@", user.display_username || user.username] })] })] }) }), _jsx(SidebarContent, { className: "px-2 py-4  bg-background", children: _jsxs(SidebarMenu, { children: [_jsx(SidebarMenuItem, { children: _jsx(Link, { href: basePath, className: "flex items-center gap-2", children: _jsxs(SidebarMenuButton, { isActive: isComponentsActive, tooltip: "Components", children: [_jsx(Layers, { className: "h-4 w-4" }), _jsx("span", { children: "Components" })] }) }) }), _jsx(SidebarMenuItem, { children: _jsx(Link, { href: `${basePath}/bundles`, className: "flex items-center gap-2", children: _jsxs(SidebarMenuButton, { isActive: isBundlesActive, children: [_jsx(Package, { className: "h-4 w-4" }), _jsx("span", { children: "Bundles" })] }) }) }), _jsx(SidebarMenuItem, { children: _jsx(Link, { href: `${basePath}/analytics`, className: "flex items-center gap-2", children: _jsxs(SidebarMenuButton, { isActive: isAnalyticsActive, tooltip: "Analytics", children: [_jsx(BarChartBig, { className: "h-4 w-4" }), _jsx("span", { children: "Analytics" })] }) }) }), _jsx(SidebarMenuItem, { children: _jsx(Link, { href: `${basePath}/monetization`, className: "flex items-center gap-2", children: _jsxs(SidebarMenuButton, { isActive: isMonetizationActive, tooltip: "Monetization", children: [_jsx(CreditCard, { className: "h-4 w-4" }), _jsx("span", { children: "Monetization" })] }) }) })] }) }), _jsx(SidebarFooter, { className: "border-t bg-background", children: _jsxs(SidebarMenu, { children: [_jsx(SidebarMenuItem, { children: _jsx(Link, { href: "/settings/profile", className: "flex items-center gap-2", children: _jsxs(SidebarMenuButton, { tooltip: "Settings", children: [_jsx(Settings, { className: "h-4 w-4" }), _jsx("span", { children: "Settings" })] }) }) }), _jsx(SidebarMenuItem, { children: _jsx(Link, { href: "/", className: "flex items-center gap-2", children: _jsxs(SidebarMenuButton, { tooltip: "Home", children: [_jsx(Home, { className: "h-4 w-4" }), _jsx("span", { children: "Back to 21st.dev" })] }) }) })] }) })] }));
}
//# sourceMappingURL=component.js.map