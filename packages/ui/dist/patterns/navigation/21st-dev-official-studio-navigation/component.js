"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/ui/user-avatar";
import { BarChartBig, CreditCard, Layers } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar";
export function StudioSidebar({ user }) {
    const pathname = usePathname();
    // Get the base username path
    const baseUsername = user.display_username || user.username;
    const basePath = `/studio/${baseUsername}`;
    const navItems = [
        {
            title: "Components",
            href: basePath,
            icon: _jsx(Layers, { className: "h-4 w-4" }),
        },
        {
            title: "Analytics",
            href: `${basePath}/analytics`,
            icon: _jsx(BarChartBig, { className: "h-4 w-4" }),
            disabled: true,
        },
        {
            title: "Monetization",
            href: `${basePath}/monetization`,
            icon: _jsx(CreditCard, { className: "h-4 w-4" }),
            disabled: true,
        },
    ];
    return (_jsxs(Sidebar, { children: [_jsx(SidebarHeader, { className: "border-b", children: _jsxs("div", { className: "flex flex-col items-center py-4", children: [_jsx(UserAvatar, { src: user.display_image_url || user.image_url || "/placeholder.svg", alt: user.display_name || user.name || "", size: 64, className: "mb-4" }), _jsx("h2", { className: "text-xl font-medium text-center", children: user.display_name || user.name || user.username }), _jsxs("p", { className: "text-sm text-muted-foreground text-center", children: ["@", user.display_username || user.username] })] }) }), _jsx(SidebarContent, { className: "px-2 py-4", children: _jsx(SidebarMenu, { children: navItems.map((item) => (_jsx(SidebarMenuItem, { children: _jsx(Link, { href: item.disabled ? "#" : item.href, passHref: true, legacyBehavior: true, children: _jsx(SidebarMenuButton, { asChild: true, isActive: pathname === item.href, className: cn(item.disabled &&
                                    "opacity-50 cursor-not-allowed pointer-events-none"), children: _jsxs("a", { className: "flex items-center gap-2", children: [item.icon, _jsx("span", { children: item.title }), item.disabled && (_jsx("span", { className: "ml-auto text-xs px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground", children: "Soon" }))] }) }) }) }, item.href))) }) }), _jsx(SidebarFooter, { className: "border-t", children: _jsx(Link, { href: "/settings/profile", className: "flex w-full items-center gap-2 p-3 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted", children: _jsx("span", { children: "Settings" }) }) })] }));
}
//# sourceMappingURL=component.js.map