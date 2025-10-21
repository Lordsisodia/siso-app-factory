"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
<ai_context>
Simplified header component without Clerk dependencies.
Safe version for deployment without authentication.
</ai_context>
*/
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
const navLinks = [
    { href: "/", label: "Home" },
    { href: "/activities", label: "Activities" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
];
export default function HeaderSimple() {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsx("header", { className: "sticky top-0 z-50 w-full border-b border-rose-500/20 bg-rose-400/95 backdrop-blur supports-[backdrop-filter]:bg-rose-400/60", children: _jsx("div", { className: "mx-auto max-w-7xl", children: _jsxs("div", { className: "flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8", children: [_jsxs(Link, { href: "/", className: "flex items-center space-x-2", children: [_jsx("div", { className: "rounded-lg bg-orange-600 p-2", children: _jsx(MapPin, { className: "size-5 text-white" }) }), _jsx("span", { className: "text-xl font-bold text-white", children: "Mallorca Activities" })] }), _jsx("nav", { className: "hidden md:flex md:items-center md:space-x-8", children: navLinks.map(link => (_jsx(Link, { href: link.href, className: "text-sm font-medium text-gray-300 transition-colors hover:text-orange-400", children: link.label }, link.href))) }), _jsxs("div", { className: "hidden md:flex md:items-center md:space-x-4", children: [_jsx(Button, { variant: "ghost", children: "Sign In" }), _jsx(Button, { children: "Sign Up" })] }), _jsxs(Sheet, { open: isOpen, onOpenChange: setIsOpen, children: [_jsx(SheetTrigger, { asChild: true, className: "md:hidden", children: _jsxs(Button, { variant: "ghost", size: "icon", children: [_jsx(Menu, { className: "size-5" }), _jsx("span", { className: "sr-only", children: "Toggle menu" })] }) }), _jsx(SheetContent, { side: "right", className: "w-full border-rose-500/20 bg-rose-400 sm:max-w-sm", children: _jsxs("nav", { className: "mt-8 flex flex-col space-y-6", children: [navLinks.map(link => (_jsx(Link, { href: link.href, className: "text-lg font-medium text-gray-300 transition-colors hover:text-orange-400", onClick: () => setIsOpen(false), children: link.label }, link.href))), _jsxs("div", { className: "mt-8 flex flex-col space-y-4", children: [_jsx(Button, { variant: "ghost", children: "Sign In" }), _jsx(Button, { children: "Sign Up" })] })] }) })] })] }) }) }));
}
//# sourceMappingURL=component.js.map