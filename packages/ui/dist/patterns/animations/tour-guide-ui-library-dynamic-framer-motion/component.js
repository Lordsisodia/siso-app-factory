"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import dynamic from "next/dynamic";
import { Suspense } from "react";
// Dynamically import Framer Motion components to reduce initial bundle
const MotionDiv = dynamic(() => import("framer-motion").then(mod => ({ default: mod.motion.div })), {
    ssr: false,
    loading: () => _jsx("div", { className: "opacity-0", children: "Loading..." })
});
const MotionSection = dynamic(() => import("framer-motion").then(mod => ({ default: mod.motion.section })), {
    ssr: false,
    loading: () => _jsx("section", { className: "opacity-0", children: "Loading..." })
});
// Dynamic useInView hook
const useInViewDynamic = dynamic(() => import("framer-motion").then(mod => ({ default: mod.useInView })), { ssr: false });
export function DynamicAnimatedSection({ children, className = "", delay = 0 }) {
    return (_jsx(Suspense, { fallback: _jsx("div", { className: `transition-opacity duration-700 ${className}`, children: children }), children: _jsx(DynamicMotionContent, { className: className, delay: delay, children: children }) }));
}
// The actual motion component that only loads when needed
function DynamicMotionContent({ children, className, delay }) {
    // This will only be used client-side after dynamic import
    return (_jsx(MotionDiv, { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: "easeOut" }, viewport: { once: true, margin: "-100px" }, className: className, children: children }));
}
export function DynamicActivityCard({ children, className = "" }) {
    return (_jsx(Suspense, { fallback: _jsx("div", { className: `group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-105 ${className}`, children: children }), children: _jsx(DynamicActivityMotion, { className: className, children: children }) }));
}
function DynamicActivityMotion({ children, className }) {
    return (_jsx(MotionDiv, { initial: { opacity: 0, y: 50, scale: 0.9 }, whileInView: { opacity: 1, y: 0, scale: 1 }, transition: { duration: 0.6 }, whileHover: { y: -10, scale: 1.02 }, viewport: { once: true }, className: `group cursor-pointer ${className}`, children: children }));
}
//# sourceMappingURL=component.js.map