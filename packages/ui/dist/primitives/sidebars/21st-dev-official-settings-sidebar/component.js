"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, User, CreditCard, Wallet, BookText, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
export function SettingsSidebar() {
    const pathname = usePathname();
    const items = [
        {
            href: "/settings/profile",
            title: "Profile",
            icon: _jsx(User, { className: "h-3.5 w-3.5" }),
        },
        {
            href: "/settings/billing",
            title: "Billing",
            icon: _jsx(CreditCard, { className: "h-3.5 w-3.5" }),
        },
        {
            href: "/settings/rules",
            title: "Prompt Rules",
            icon: _jsx(BookText, { className: "h-3.5 w-3.5" }),
        },
    ];
    return (_jsxs("nav", { className: "grid items-start gap-2 pt-2", children: [_jsx(Button, { variant: "ghost", size: "sm", className: "flex h-8 items-center justify-start gap-2 text-xs text-muted-foreground", asChild: true, children: _jsxs(Link, { href: "/", children: [_jsx(ChevronLeft, { className: "h-3.5 w-3.5" }), _jsx("span", { children: "Back to app" })] }) }), _jsxs("div", { className: "mt-6", children: [_jsx("h2", { className: "mb-2 px-4 text-xs font-medium tracking-tight", children: "Settings" }), _jsxs("div", { className: "space-y-1", children: [items.map((item) => (_jsx(Button, { variant: pathname === item.href ? "secondary" : "ghost", size: "sm", className: cn("w-full justify-start gap-2 h-8 text-xs", pathname === item.href
                                    ? "bg-accent text-accent-foreground"
                                    : "text-muted-foreground"), asChild: true, children: _jsxs(Link, { href: item.href, children: [item.icon, item.title] }) }, item.href))), _jsx(Button, { variant: "ghost", size: "sm", className: "w-full justify-start gap-2 h-8 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground", asChild: true, children: _jsxs(Link, { href: "/studio", children: [_jsx(Wallet, { className: "h-3.5 w-3.5" }), _jsx("span", { className: "truncate", children: "Payouts moved to Studio" }), _jsx(ArrowUpRight, { className: "ml-auto h-3.5 w-3.5" })] }) })] })] })] }));
}
//# sourceMappingURL=component.js.map