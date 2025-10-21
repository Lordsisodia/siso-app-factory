"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowUpRight, LifeBuoy, Settings, Bug, Mail, } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
function KeyboardKey({ children, className }) {
    return (_jsx("kbd", { className: cn("px-1 py-0.5 min-w-[22px] flex items-center justify-center text-xs text-foreground bg-muted rounded border shadow-sm", className), children: children }));
}
function ShortcutItem({ label, shortcut, }) {
    return (_jsxs("div", { className: "flex items-center justify-between px-2 py-1 text-sm text-muted-foreground", children: [_jsx("span", { children: label }), _jsx("div", { className: "flex gap-1", children: shortcut })] }));
}
function ExternalLink({ href, icon: Icon, children, showArrow = true, }) {
    return (_jsx(DropdownMenuItem, { asChild: true, children: _jsxs(Link, { href: href, target: "_blank", rel: "noopener noreferrer", className: "flex items-center justify-between group", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Icon, { className: "h-4 w-4" }), children] }), showArrow && (_jsx(ArrowUpRight, { className: "h-4 w-4 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" }))] }) }));
}
function ShortcutsList() {
    return (_jsxs("div", { className: "py-2", children: [_jsx(DropdownMenuLabel, { children: "Keyboard Shortcuts" }), _jsxs("div", { className: "mb-2", children: [_jsx(ShortcutItem, { label: "Show help", shortcut: _jsx(KeyboardKey, { children: "?" }) }), _jsx(ShortcutItem, { label: "Search", shortcut: _jsx(_Fragment, { children: _jsx(KeyboardKey, { children: "\u2318 K" }) }) }), _jsx(ShortcutItem, { label: "Toggle sidebar", shortcut: _jsx(KeyboardKey, { children: "S" }) })] }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuLabel, { children: "Actions" }), _jsx(ExternalLink, { href: "https://discord.gg/Qx4rFunHfm", icon: LifeBuoy, children: "Community Support" }), _jsx(ExternalLink, { href: "mailto:support@21st.dev", icon: Mail, children: "Support Email" }), _jsx(ExternalLink, { href: "https://github.com/serafimcloud/21st/issues", icon: Bug, children: "Report a Bug" }), _jsx(ExternalLink, { href: "https://21st.dev/settings", icon: Settings, showArrow: false, children: "Settings" })] }));
}
export function Help({ open, onOpenChange }) {
    return (_jsxs(DropdownMenu, { open: open, onOpenChange: onOpenChange, children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 hover:bg-accent", "aria-label": "Help menu", children: _jsx(HelpCircle, { className: "h-4 w-4" }) }) }), _jsx(DropdownMenuContent, { side: "top", align: "end", className: "w-64", sideOffset: 8, forceMount: true, children: _jsx(ShortcutsList, {}) })] }));
}
//# sourceMappingURL=component.js.map