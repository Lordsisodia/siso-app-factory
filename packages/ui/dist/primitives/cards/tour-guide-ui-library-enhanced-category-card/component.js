"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
export default function EnhancedCategoryCard({ category, index }) {
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const fallbackImageUrl = `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop`;
    const Icon = category.icon;
    return (_jsx(motion.div, { initial: { opacity: 0, y: 60, scale: 0.9 }, whileInView: { opacity: 1, y: 0, scale: 1 }, transition: {
            duration: 0.7,
            delay: index * 0.15,
            ease: [0.23, 1, 0.32, 1]
        }, whileHover: {
            y: -12,
            scale: 1.03,
            transition: {
                duration: 0.4,
                ease: [0.23, 1, 0.32, 1]
            }
        }, className: "group cursor-pointer", onHoverStart: () => setIsHovered(true), onHoverEnd: () => setIsHovered(false), children: _jsx(Link, { href: category.href, children: _jsxs("div", { className: "relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/40 via-black/20 to-transparent shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-500 hover:border-orange-400/30 hover:shadow-orange-500/20", style: {
                    backdropFilter: "blur(24px) saturate(180%)",
                    WebkitBackdropFilter: "blur(24px) saturate(180%)"
                }, children: [_jsxs("div", { className: "relative h-72 overflow-hidden", children: [_jsx(Image, { src: imageError ? fallbackImageUrl : category.imageUrl, alt: category.title, fill: true, className: "object-cover transition-transform duration-700 group-hover:scale-110", sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw", onError: () => setImageError(true), priority: index < 2 }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" }), _jsx("div", { className: `absolute inset-0 bg-gradient-to-br opacity-40 transition-opacity duration-500 ${isHovered ? "opacity-60" : "opacity-40"}`, style: {
                                    background: `linear-gradient(135deg, ${category.gradient.from}20, ${category.gradient.to}20)`
                                } }), _jsx(motion.div, { initial: { scale: 1, rotate: 0 }, whileHover: {
                                    scale: 1.2,
                                    rotate: 10,
                                    transition: { duration: 0.3 }
                                }, className: "absolute left-6 top-6 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-sm", children: _jsx(Icon, { className: "size-6 text-white drop-shadow-lg" }) }), category.activityCount && (_jsx(motion.div, { initial: { opacity: 0, x: 20 }, whileInView: { opacity: 1, x: 0 }, transition: { delay: index * 0.15 + 0.3 }, className: "absolute right-6 top-6", children: _jsxs(Badge, { className: "bg-gradient-to-r from-orange-500 to-yellow-500 font-bold text-black shadow-xl", children: [category.activityCount, " activities"] }) })), _jsx("div", { className: "absolute inset-x-6 bottom-6", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: index * 0.15 + 0.4 }, children: [_jsx("h3", { className: "mb-2 text-2xl font-bold text-white drop-shadow-lg transition-colors duration-300 group-hover:text-yellow-400", children: category.title }), _jsx("p", { className: "text-sm text-white/90 drop-shadow-sm", children: category.shortDescription })] }) })] }), _jsxs("div", { className: "relative p-6", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" }), _jsxs("div", { className: "relative z-10", children: [_jsx("p", { className: "mb-4 leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-200", children: category.description }), _jsx("div", { className: "mb-6 space-y-2", children: category.features.slice(0, 3).map((feature, featureIndex) => (_jsxs(motion.div, { initial: { opacity: 0, x: -10 }, whileInView: { opacity: 1, x: 0 }, transition: {
                                                delay: index * 0.15 + 0.5 + featureIndex * 0.1
                                            }, className: "flex items-center gap-2 text-sm text-gray-400", children: [_jsx("div", { className: "size-1.5 rounded-full bg-orange-400" }), _jsx("span", { children: feature })] }, feature))) }), _jsxs("div", { className: "flex items-center justify-between", children: [category.averagePrice && (_jsxs("div", { className: "text-left", children: [_jsx("div", { className: "text-sm text-gray-500", children: "From" }), _jsxs("div", { className: "text-xl font-bold text-orange-400", children: ["\u20AC", category.averagePrice] })] })), _jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsxs(Button, { variant: "ghost", size: "sm", className: "group/btn border border-white/20 bg-white/5 text-white transition-all duration-300 hover:border-orange-400/50 hover:bg-orange-500/20 hover:text-white", children: ["Explore", _jsx(ArrowRight, { className: "ml-2 size-4 transition-transform duration-300 group-hover/btn:translate-x-1" })] }) })] })] })] }), _jsx(motion.div, { initial: { x: "-100%", opacity: 0 }, whileHover: { x: "100%", opacity: 1 }, transition: { duration: 0.6, ease: "easeInOut" }, className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent", style: { pointerEvents: "none" } })] }) }) }));
}
//# sourceMappingURL=component.js.map