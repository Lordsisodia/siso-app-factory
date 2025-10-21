"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Client Design Variant Selector - Floating UI Component
 *
 * Professional client presentation tool for real-time design variant switching
 * Provides instant visual feedback and eliminates revision cycles
 *
 * Features:
 * - Floating trigger button with elegant animations
 * - Comprehensive variant selection panel
 * - Live preview of variant changes
 * - URL sharing for client collaboration
 * - Professional client-friendly interface
 * - Smooth transitions and micro-interactions
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useVariants } from "@/context/VariantContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Palette, Settings, Share2, RotateCcw, Eye, X, Check, Type, MousePointer, Layers, Sparkles, ExternalLink } from "lucide-react";
export function VariantSelector() {
    const { variants, setVariant, resetVariants, getShareableUrl, isVariantSelectorOpen, setVariantSelectorOpen, isDevMode } = useVariants();
    const [activeSection, setActiveSection] = useState("header");
    const [copiedUrl, setCopiedUrl] = useState(false);
    // Comprehensive variant definitions with visual previews
    const variantDefinitions = {
        header: {
            label: "Header Style",
            icon: _jsx(Settings, { className: "size-4" }),
            description: "Navigation bar appearance and behavior",
            options: [
                {
                    id: "glass",
                    name: "Glass Morphism",
                    preview: "bg-gradient-to-r from-white/25 to-white/10 backdrop-blur-md",
                    description: "Transparent glass effect with blur",
                    pros: ["Modern look", "Content visibility", "Premium feel"],
                    cons: ["Readability concerns", "Performance impact"]
                },
                {
                    id: "solid",
                    name: "Solid Dark",
                    preview: "bg-gray-900",
                    description: "Solid dark background with opacity",
                    pros: ["High contrast", "Great readability", "Fast performance"],
                    cons: ["Less modern", "Blocks content"]
                },
                {
                    id: "gradient",
                    name: "Brand Gradient",
                    preview: "bg-gradient-to-r from-pink-500 to-red-600",
                    description: "Pink to red brand gradient",
                    pros: ["Strong branding", "Eye-catching", "Unique"],
                    cons: ["May be overwhelming", "Brand dependent"]
                }
            ]
        },
        hero: {
            label: "Hero Section",
            icon: _jsx(Eye, { className: "size-4" }),
            description: "Main landing section style and interaction",
            options: [
                {
                    id: "video",
                    name: "Video Background",
                    preview: "bg-gradient-to-r from-gray-800 to-gray-900 relative",
                    description: "Dynamic video carousel with overlays",
                    pros: ["High engagement", "Dynamic content", "Premium feel"],
                    cons: ["Large file sizes", "Mobile performance", "Autoplay issues"]
                },
                {
                    id: "image",
                    name: "Static Parallax",
                    preview: "bg-gradient-to-r from-blue-800 to-purple-900",
                    description: "High-quality images with parallax effects",
                    pros: ["Fast loading", "Mobile friendly", "SEO optimized"],
                    cons: ["Less dynamic", "Static content", "Needs great images"]
                },
                {
                    id: "interactive",
                    name: "3D Interactive",
                    preview: "bg-gradient-to-r from-purple-800 to-pink-900",
                    description: "Interactive 3D elements and animations",
                    pros: ["Unique experience", "Memorable", "Tech-forward"],
                    cons: [
                        "Complex development",
                        "Performance intensive",
                        "Accessibility"
                    ]
                }
            ]
        },
        colorScheme: {
            label: "Color Scheme",
            icon: _jsx(Palette, { className: "size-4" }),
            description: "Overall brand color palette and theming",
            options: [
                {
                    id: "pink-red",
                    name: "Pink & Red",
                    preview: "bg-gradient-to-r from-pink-500 to-red-600",
                    description: "Current vibrant brand colors",
                    pros: ["Strong brand identity", "Energy and excitement", "Memorable"],
                    cons: ["Limited audience appeal", "Can be overwhelming"]
                },
                {
                    id: "blue-purple",
                    name: "Blue & Purple",
                    preview: "bg-gradient-to-r from-blue-500 to-purple-600",
                    description: "Professional and trustworthy theme",
                    pros: ["Professional appearance", "Wide appeal", "Trustworthy"],
                    cons: ["Less unique", "May seem corporate", "Common choice"]
                },
                {
                    id: "green-yellow",
                    name: "Green & Yellow",
                    preview: "bg-gradient-to-r from-green-500 to-yellow-500",
                    description: "Nature-inspired vibrant theme",
                    pros: ["Nature connection", "Optimistic", "Eco-friendly"],
                    cons: ["Seasonal limitation", "Readability issues", "Niche appeal"]
                }
            ]
        },
        typography: {
            label: "Typography",
            icon: _jsx(Type, { className: "size-4" }),
            description: "Font styles and text hierarchy",
            options: [
                {
                    id: "bold",
                    name: "Bold Impact",
                    preview: "font-bold text-xl",
                    description: "Strong, bold typography for impact",
                    pros: ["High impact", "Great readability", "Modern"],
                    cons: ["Can feel aggressive", "Less elegant"]
                },
                {
                    id: "elegant",
                    name: "Elegant Serif",
                    preview: "font-serif text-lg",
                    description: "Sophisticated serif fonts",
                    pros: ["Sophisticated", "Timeless", "Luxury feel"],
                    cons: ["Less modern", "Mobile readability", "Slower loading"]
                },
                {
                    id: "modern",
                    name: "Modern Sans",
                    preview: "font-light text-lg tracking-wide",
                    description: "Clean, modern sans-serif",
                    pros: ["Clean and modern", "Excellent readability", "Web optimized"],
                    cons: ["Can feel sterile", "Less personality"]
                }
            ]
        },
        buttons: {
            label: "Button Style",
            icon: _jsx(MousePointer, { className: "size-4" }),
            description: "Call-to-action button styling",
            options: [
                {
                    id: "rounded",
                    name: "Rounded Corners",
                    preview: "rounded-lg bg-pink-500",
                    description: "Moderately rounded button corners",
                    pros: ["Modern appearance", "Good balance", "Wide appeal"],
                    cons: ["Common design", "Less unique"]
                },
                {
                    id: "sharp",
                    name: "Sharp Edges",
                    preview: "rounded-none bg-pink-500",
                    description: "Clean, sharp rectangular buttons",
                    pros: ["Professional", "Clean design", "Technical feel"],
                    cons: ["Can feel harsh", "Less friendly", "Outdated feel"]
                },
                {
                    id: "pill",
                    name: "Pill Shape",
                    preview: "rounded-full bg-pink-500",
                    description: "Fully rounded pill-shaped buttons",
                    pros: ["Friendly feel", "Modern trend", "Smooth appearance"],
                    cons: ["Less text space", "Can look toy-like", "Trend dependent"]
                }
            ]
        }
    };
    // Handle URL sharing with toast notification
    const handleShare = async () => {
        try {
            const url = getShareableUrl();
            await navigator.clipboard.writeText(url);
            setCopiedUrl(true);
            setTimeout(() => setCopiedUrl(false), 2000);
        }
        catch (error) {
            console.error("Failed to copy URL:", error);
        }
    };
    // Only show if in dev mode
    if (!isDevMode) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx(motion.div, { className: "fixed bottom-6 right-6 z-50", initial: { scale: 0, rotate: -180 }, animate: { scale: 1, rotate: 0 }, transition: {
                    delay: 2,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                }, children: _jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsxs(Button, { onClick: () => setVariantSelectorOpen(true), className: "group relative size-16 overflow-hidden rounded-2xl shadow-2xl", style: {
                            background: "linear-gradient(135deg, #ff1dce, #dc2626)",
                            boxShadow: "0 8px 32px rgba(255, 29, 206, 0.4)"
                        }, children: [_jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }), _jsxs("div", { className: "relative z-10 flex flex-col items-center", children: [_jsx(Palette, { className: "mb-1 size-5 text-white" }), _jsx(Sparkles, { className: "size-3 text-white/80" })] })] }) }) }), _jsx(AnimatePresence, { children: isVariantSelectorOpen && (_jsxs(_Fragment, { children: [_jsx(motion.div, { className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setVariantSelectorOpen(false) }), _jsxs(motion.div, { className: "fixed right-6 top-1/2 z-50 max-h-[85vh] w-[420px] -translate-y-1/2 overflow-hidden rounded-2xl border border-pink-500/30 bg-gray-900/95 shadow-2xl backdrop-blur-xl", initial: { x: 450, opacity: 0, scale: 0.95 }, animate: { x: 0, opacity: 1, scale: 1 }, exit: { x: 450, opacity: 0, scale: 0.95 }, transition: { type: "spring", damping: 25, stiffness: 300 }, children: [_jsxs("div", { className: "border-b border-pink-500/20 bg-gradient-to-r from-pink-900/20 to-red-900/20 p-6", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h3", { className: "flex items-center gap-2 text-xl font-bold text-white", children: [_jsx(Layers, { className: "size-5 text-pink-400" }), "Design Variants"] }), _jsx("p", { className: "text-sm text-gray-300", children: "Real-time design preview system" })] }), _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setVariantSelectorOpen(false), className: "text-gray-400 hover:bg-white/10 hover:text-white", children: _jsx(X, { className: "size-4" }) })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: resetVariants, className: "border-pink-500/30 text-pink-400 hover:bg-pink-500/20 hover:text-pink-300", children: [_jsx(RotateCcw, { className: "mr-1 size-3" }), "Reset All"] }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleShare, className: "border-pink-500/30 text-pink-400 hover:bg-pink-500/20 hover:text-pink-300", children: copiedUrl ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "mr-1 size-3" }), "Copied!"] })) : (_jsxs(_Fragment, { children: [_jsx(Share2, { className: "mr-1 size-3" }), "Share URL"] })) })] })] }), _jsx("div", { className: "flex overflow-x-auto border-b border-pink-500/20 bg-gray-800/50", children: Object.entries(variantDefinitions).map(([key, definition]) => (_jsxs("button", { onClick: () => setActiveSection(key), className: `flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium transition-all duration-200 ${activeSection === key
                                            ? "border-b-2 border-pink-400 bg-pink-500/10 text-pink-400"
                                            : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-300"}`, children: [definition.icon, definition.label] }, key))) }), _jsx("div", { className: "max-h-96 overflow-y-auto p-6", children: Object.entries(variantDefinitions).map(([key, definition]) => (_jsxs(motion.div, { className: activeSection === key ? "block" : "hidden", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, children: [_jsxs("div", { className: "mb-4", children: [_jsx("h4", { className: "mb-1 text-lg font-semibold text-white", children: definition.label }), _jsx("p", { className: "mb-1 text-sm text-gray-400", children: definition.description }), _jsxs(Badge, { variant: "outline", className: "border-pink-500/40 bg-pink-500/10 text-xs text-pink-400", children: ["Current: ", variants[key]] })] }), _jsx("div", { className: "space-y-3", children: definition.options.map(option => (_jsx(motion.div, { whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 }, children: _jsxs(Card, { className: `cursor-pointer border p-4 transition-all duration-200 ${variants[key] ===
                                                            option.id
                                                            ? "border-pink-500 bg-pink-500/20 shadow-lg shadow-pink-500/20"
                                                            : "border-gray-700 hover:border-pink-500/50 hover:bg-pink-500/5"}`, onClick: () => setVariant(key, option.id), children: [_jsxs("div", { className: "mb-3 flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "mb-1 flex items-center gap-2", children: [_jsx("h5", { className: "font-medium text-white", children: option.name }), variants[key] ===
                                                                                        option.id && (_jsx(Badge, { className: "bg-pink-500 text-xs text-white", children: "Active" }))] }), _jsx("p", { className: "mb-2 text-xs text-gray-400", children: option.description })] }), _jsx("div", { className: `h-8 w-12 shrink-0 rounded border border-white/20 ${option.preview}` })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [_jsxs("div", { children: [_jsx("h6", { className: "mb-1 font-medium text-green-400", children: "Pros:" }), _jsx("ul", { className: "space-y-0.5 text-gray-400", children: option.pros.map((pro, index) => (_jsxs("li", { className: "flex items-center gap-1", children: [_jsx("div", { className: "size-1 rounded-full bg-green-400" }), pro] }, index))) })] }), _jsxs("div", { children: [_jsx("h6", { className: "mb-1 font-medium text-red-400", children: "Cons:" }), _jsx("ul", { className: "space-y-0.5 text-gray-400", children: option.cons.map((con, index) => (_jsxs("li", { className: "flex items-center gap-1", children: [_jsx("div", { className: "size-1 rounded-full bg-red-400" }), con] }, index))) })] })] })] }) }, option.id))) })] }, key))) }), _jsx("div", { className: "border-t border-pink-500/20 bg-gray-800/50 p-4", children: _jsxs("div", { className: "flex items-center gap-2 text-xs text-gray-400", children: [_jsx(ExternalLink, { className: "size-3" }), _jsx("span", { className: "flex-1 truncate", children: "Share this exact combination with clients" }), _jsx(Badge, { variant: "outline", className: "border-pink-500/30 text-xs text-pink-400", children: "Dev Mode" })] }) })] })] })) })] }));
}
//# sourceMappingURL=component.js.map