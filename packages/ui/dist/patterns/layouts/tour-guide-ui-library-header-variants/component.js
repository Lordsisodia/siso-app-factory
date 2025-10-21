"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Header Variants Component - Landing Page
 *
 * Demonstrates the Client Design Variant System with 3 distinct header styles
 * Allows real-time switching between Glass, Solid, and Gradient header designs
 *
 * Variants:
 * 1. Glass Morphism - Transparent with backdrop blur (current production)
 * 2. Solid Dark - Opaque dark background with strong contrast
 * 3. Brand Gradient - Pink-to-red gradient with brand emphasis
 */
import { motion } from "framer-motion";
import { useVariants, useComponentVariant } from "@/context/VariantContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Heart, Search, MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";
export function HeaderVariants() {
    const { variants } = useVariants();
    const headerVariant = useComponentVariant("header");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Define the three header style variants
    const headerStyles = {
        glass: {
            className: "backdrop-blur-md bg-white/25 border-b border-white/20 shadow-lg",
            style: {},
            description: "Glass Morphism - Modern transparent design",
            textColor: "text-white",
            hoverColor: "hover:text-pink-300"
        },
        solid: {
            className: "bg-gray-900/95 border-b border-pink-500/30 shadow-xl",
            style: {},
            description: "Solid Dark - Professional high contrast",
            textColor: "text-white",
            hoverColor: "hover:text-pink-400"
        },
        gradient: {
            className: "border-b border-pink-600/50 shadow-2xl",
            style: {
                background: "linear-gradient(135deg, #ff1dce 0%, #dc2626 50%, #b91c1c 100%)"
            },
            description: "Brand Gradient - Bold brand identity",
            textColor: "text-white",
            hoverColor: "hover:text-yellow-300"
        }
    };
    const currentStyle = headerStyles[headerVariant.current];
    // Navigation items
    const navItems = [
        { href: "/activities", label: "Activities" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
        { href: "/blog", label: "Blog" }
    ];
    return (_jsxs(motion.header, { className: `fixed top-0 z-40 w-full transition-all duration-500 ${currentStyle.className}`, style: currentStyle.style, initial: { y: -100 }, animate: { y: 0 }, transition: { duration: 0.6, ease: "easeOut" }, children: [_jsx("div", { className: "mx-auto max-w-7xl px-4", children: _jsxs("div", { className: "flex h-16 items-center justify-between", children: [_jsx(motion.div, { className: "flex items-center gap-3", whileHover: { scale: 1.02 }, transition: { duration: 0.2 }, children: _jsxs(Link, { href: "/", className: "flex items-center gap-3", children: [_jsx("div", { className: "flex size-10 items-center justify-center rounded-xl", style: {
                                            background: headerVariant.current === "gradient"
                                                ? "rgba(255, 255, 255, 0.2)"
                                                : "linear-gradient(135deg, #ff1dce, #dc2626)"
                                        }, children: _jsx(MapPin, { className: "size-5 text-white" }) }), _jsxs("div", { className: "hidden sm:block", children: [_jsxs("div", { className: `text-lg font-bold ${currentStyle.textColor}`, children: ["WE ARE", " ", _jsx("span", { className: headerVariant.current === "gradient"
                                                            ? "text-yellow-300"
                                                            : "text-pink-300", children: "EXCURSIONS" })] }), _jsx("div", { className: "text-xs text-white/70", children: "Mallorca Activities" })] })] }) }), _jsx("nav", { className: "hidden items-center gap-8 md:flex", children: navItems.map(item => (_jsx(motion.div, { whileHover: { y: -1 }, transition: { duration: 0.2 }, children: _jsx(Link, { href: item.href, className: `font-medium transition-colors duration-200 ${currentStyle.textColor} ${currentStyle.hoverColor}`, children: item.label }) }, item.href))) }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Button, { variant: "ghost", size: "sm", className: `hidden sm:flex ${currentStyle.textColor} ${currentStyle.hoverColor} hover:bg-white/10`, children: _jsx(Search, { className: "size-4" }) }) }), _jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Button, { variant: "ghost", size: "sm", className: `hidden sm:flex ${currentStyle.textColor} ${currentStyle.hoverColor} hover:bg-white/10`, children: _jsx(Heart, { className: "size-4" }) }) }), _jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsxs(Button, { variant: "ghost", size: "sm", className: `${currentStyle.textColor} ${currentStyle.hoverColor} hover:bg-white/10`, children: [_jsx(User, { className: "mr-1 size-4" }), _jsx("span", { className: "hidden sm:inline", children: "Account" })] }) }), _jsx(motion.div, { className: "md:hidden", whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), className: `${currentStyle.textColor} hover:bg-white/10`, children: isMobileMenuOpen ? (_jsx(X, { className: "size-5" })) : (_jsx(Menu, { className: "size-5" })) }) })] })] }) }), _jsx(motion.div, { className: `overflow-hidden border-t md:hidden ${headerVariant.current === "glass"
                    ? "border-white/20"
                    : headerVariant.current === "solid"
                        ? "border-pink-500/30"
                        : "border-pink-600/50"}`, initial: { height: 0, opacity: 0 }, animate: {
                    height: isMobileMenuOpen ? "auto" : 0,
                    opacity: isMobileMenuOpen ? 1 : 0
                }, transition: { duration: 0.3, ease: "easeInOut" }, style: {
                    background: headerVariant.current === "gradient"
                        ? "linear-gradient(135deg, #ff1dce 0%, #dc2626 50%, #b91c1c 100%)"
                        : currentStyle.style.background ||
                            (headerVariant.current === "glass"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(17, 24, 39, 0.95)")
                }, children: _jsxs("div", { className: "space-y-3 p-4", children: [navItems.map((item, index) => (_jsx(motion.div, { initial: { x: -20, opacity: 0 }, animate: {
                                x: isMobileMenuOpen ? 0 : -20,
                                opacity: isMobileMenuOpen ? 1 : 0
                            }, transition: { delay: index * 0.1 }, children: _jsx(Link, { href: item.href, className: `block rounded-lg px-3 py-2 font-medium transition-colors duration-200 ${currentStyle.textColor} ${currentStyle.hoverColor} hover:bg-white/10`, onClick: () => setIsMobileMenuOpen(false), children: item.label }) }, item.href))), _jsxs(motion.div, { className: "flex gap-3 border-t border-white/20 pt-3", initial: { y: 20, opacity: 0 }, animate: {
                                y: isMobileMenuOpen ? 0 : 20,
                                opacity: isMobileMenuOpen ? 1 : 0
                            }, transition: { delay: 0.3 }, children: [_jsxs(Button, { variant: "outline", size: "sm", className: "flex-1 border-white/30 text-white hover:bg-white/10", children: [_jsx(Search, { className: "mr-1 size-4" }), "Search"] }), _jsxs(Button, { variant: "outline", size: "sm", className: "flex-1 border-white/30 text-white hover:bg-white/10", children: [_jsx(Heart, { className: "mr-1 size-4" }), "Wishlist"] })] }), _jsxs(motion.div, { className: "space-y-2 border-t border-white/20 pt-3", initial: { y: 20, opacity: 0 }, animate: {
                                y: isMobileMenuOpen ? 0 : 20,
                                opacity: isMobileMenuOpen ? 1 : 0
                            }, transition: { delay: 0.4 }, children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-white/80", children: [_jsx(Phone, { className: "size-4" }), _jsx("span", { children: "+34 971 123 456" })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-white/80", children: [_jsx(Mail, { className: "size-4" }), _jsx("span", { children: "info@weareexcursions.com" })] })] })] }) }), process.env.NODE_ENV === "development" && (_jsx(motion.div, { className: "absolute right-4 top-16 z-50", initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 1 }, children: _jsxs("div", { className: "rounded-full border border-pink-500/30 bg-black/80 px-3 py-1 text-xs text-white backdrop-blur-sm", children: ["Header: ", currentStyle.description] }) }))] }, `header-${headerVariant.current}`));
}
//# sourceMappingURL=component.js.map