"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
export function NavBar({ items, className }) {
    const [activeTab, setActiveTab] = useState(items[0].name);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (_jsx("div", { className: cn("fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6", className), children: _jsx("div", { className: "flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg", children: items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (_jsxs(Link, { href: item.url, onClick: () => setActiveTab(item.name), className: cn("relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors", "text-foreground/80 hover:text-primary", isActive && "bg-muted text-primary"), children: [_jsx("span", { className: "hidden md:inline", children: item.name }), _jsx("span", { className: "md:hidden", children: _jsx(Icon, { size: 18, strokeWidth: 2.5 }) }), isActive && (_jsx(motion.div, { layoutId: "lamp", className: "absolute inset-0 w-full bg-primary/5 rounded-full -z-10", initial: false, transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }, children: _jsxs("div", { className: "absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full", children: [_jsx("div", { className: "absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" }), _jsx("div", { className: "absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" }), _jsx("div", { className: "absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" })] }) }))] }, item.name));
            }) }) }));
}
//# sourceMappingURL=component.js.map