"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/components/icons";
const features = [
    {
        title: "Add New Components",
        description: "Create UI components by describing what you need. Magic generates production-ready code instantly.",
        image: "/features-1.svg",
    },
    {
        title: "Enhance Existing UI",
        description: "Improve components with advanced features and animations. Upgrade without starting from scratch.",
        image: "/features-2.svg",
    },
    {
        title: "Access Logo Library",
        description: "Integrate company logos and icons via SVGL. Access a vast collection of professional brand assets.",
        image: "/features-3.svg",
        badge: {
            icon: Icons.svgl,
            text: "SVGL Integration",
            link: "https://svgl.app",
        },
    },
];
export function Features() {
    return (_jsxs("section", { className: "pt-24 pb-10 lg:pb-24 overflow-hidden relative", children: [_jsx("div", { className: "absolute inset-0 pointer-events-none bg-grid-white" }), _jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-5xl sm:text-[3.9rem]/16 pb-2 font-bold tracking-tighter text-pretty bg-clip-text text-transparent bg-gradient-to-t from-gray-300/70 to-white sm:text-balance", children: "Powerful Features" }), _jsx("p", { className: "mt-4 text-lg text-neutral-300", children: "Everything you need to build modern UI components" })] }), _jsx("div", { className: "mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 z-10", children: features.map((feature, index) => (_jsxs("div", { className: "group relative rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg z-10 backdrop-blur-sm", children: [feature.badge && (_jsxs(Link, { href: feature.badge.link, target: "_blank", rel: "noopener noreferrer", className: "absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-xl bg-neutral-800/50 pl-1 pr-2 py-1 text-sm text-neutral-200 hover:bg-neutral-700/50 transition-colors", children: [feature.badge.icon && (_jsx(feature.badge.icon, { className: "h-4 w-4" })), _jsx("span", { children: feature.badge.text })] })), _jsx("div", { className: "relative w-full", children: _jsx("div", { className: "relative w-full aspect-[21/5]", children: _jsx(Image, { src: feature.image, alt: feature.title, fill: true, className: "object-cover object-left-top" }) }) }), _jsxs("div", { className: "mt-5 flex items-center gap-2", children: [_jsx("h3", { className: "text-lg font-semibold text-neutral-200", children: feature.title }), feature.title === "Enhance Existing UI"] }), _jsx("p", { className: "mt-2 text-neutral-400 leading-relaxed", children: feature.description })] }, index))) })] }));
}
//# sourceMappingURL=component.js.map