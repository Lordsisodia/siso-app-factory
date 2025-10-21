"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
// @ts-ignore
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
const settingsLinks = [
    {
        title: "Profile",
        href: "/settings/profile",
    },
    {
        title: "Billing",
        href: "/settings/billing",
    },
    {
        title: "Payouts moved to Studio",
        href: "/settings/payouts",
    },
];
export function SettingsMobileNav() {
    const pathname = usePathname();
    const currentTitle = settingsLinks.find((link) => pathname?.startsWith(link.href))?.title ||
        "Profile";
    return (_jsx("div", { className: "fixed top-0 left-0 right-0 z-50 bg-background border-b", children: _jsx("div", { className: "flex items-center justify-between p-4", children: _jsxs("div", { className: "flex gap-2 items-center", children: [_jsx(Link, { href: "/", className: "flex items-center justify-center w-[22px] h-[22px] rounded-full cursor-pointer bg-foreground" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Icons.slash, { className: "text-border w-[22px] h-[22px]" }), _jsx("h1", { className: "text-[14px] font-medium", children: "Settings" })] }), _jsx(Icons.slash, { className: "text-border w-[22px] h-[22px]" }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "sm", className: "flex items-center gap-2 h-auto py-1 px-2", children: [_jsx("span", { className: "text-[14px] font-medium", children: currentTitle }), _jsx(ChevronDown, { className: "h-4 w-4" })] }) }), _jsx(DropdownMenuContent, { align: "start", className: "w-[200px]", children: settingsLinks.map((link) => (_jsx(DropdownMenuItem, { className: pathname?.startsWith(link.href) ? "bg-accent" : "", asChild: true, children: _jsx(Link, { href: link.href, children: link.title }) }, link.href))) })] })] }) }) }));
}
//# sourceMappingURL=component.js.map