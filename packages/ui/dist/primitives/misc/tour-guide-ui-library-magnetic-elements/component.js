"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
<ai_context>
Advanced Magnetic Interactive Elements - 2024 Design Trends
Features magnetic buttons with cursor tracking, floating interactive helpers,
and sophisticated hover effects that create stunning user experiences.
</ai_context>
*/
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
export function MagneticButton({ children, className, variant = "primary", size = "md", onClick, href }) {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });
    const handleMouseMove = (e) => {
        if (!ref.current)
            return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        // Magnetic effect - stronger when closer
        const maxDistance = 100;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        if (distance < maxDistance) {
            const strength = (maxDistance - distance) / maxDistance;
            x.set(distanceX * strength * 0.3);
            y.set(distanceY * strength * 0.3);
        }
        else {
            x.set(0);
            y.set(0);
        }
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };
    const baseClasses = {
        primary: "bg-gradient-to-r from-rose-600 to-orange-500 text-white shadow-lg hover:shadow-xl",
        secondary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl",
        outline: "border-2 border-rose-500 text-rose-600 hover:bg-rose-50 hover:shadow-lg"
    };
    const sizeClasses = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };
    return (_jsxs(motion.button, { ref: ref, style: { x: mouseX, y: mouseY }, onMouseMove: handleMouseMove, onMouseEnter: () => setIsHovered(true), onMouseLeave: handleMouseLeave, onClick: onClick, whileTap: { scale: 0.95 }, className: cn("relative overflow-hidden rounded-xl font-semibold transition-all duration-300", "transform-gpu will-change-transform", baseClasses[variant], sizeClasses[size], className), children: [_jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent", animate: isHovered ? { x: [-100, 300] } : { x: -100 }, transition: { duration: 0.6, ease: "easeInOut" } }), _jsx(AnimatePresence, { children: isHovered && (_jsx(motion.div, { className: "pointer-events-none absolute inset-0", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: [...Array(6)].map((_, i) => (_jsx(motion.div, { className: "absolute", initial: {
                            scale: 0,
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%"
                        }, animate: {
                            scale: [0, 1, 0],
                            rotate: [0, 180, 360]
                        }, transition: {
                            duration: 1.5,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 2
                        }, children: _jsx(Sparkles, { className: "size-3 text-yellow-300" }) }, i))) })) }), _jsxs("span", { className: "relative z-10 flex items-center gap-2", children: [children, _jsx(motion.div, { animate: isHovered ? { x: 5 } : { x: 0 }, transition: { duration: 0.3 }, children: _jsx(ArrowRight, { className: "size-4" }) })] })] }));
}
export function FloatingActionBubble({ icon, tooltip, onClick, position, delay = 0 }) {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);
    return (_jsx(AnimatePresence, { children: isVisible && (_jsxs(motion.div, { className: "fixed z-50", style: { bottom: position.bottom, right: position.right }, initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0, opacity: 0 }, transition: { type: "spring", stiffness: 500, damping: 30 }, children: [_jsxs(motion.button, { onClick: onClick, onMouseEnter: () => setShowTooltip(true), onMouseLeave: () => setShowTooltip(false), whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, className: "relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-xl transition-all duration-300 hover:shadow-2xl", children: [_jsx(motion.div, { animate: {
                                rotate: 360,
                                scale: [1, 1.2, 1]
                            }, transition: {
                                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                                scale: { duration: 2, repeat: Infinity }
                            }, children: icon }), _jsx(motion.div, { className: "absolute inset-0 rounded-full bg-purple-400", animate: { scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }, transition: { duration: 2, repeat: Infinity } })] }), _jsx(AnimatePresence, { children: showTooltip && (_jsxs(motion.div, { initial: { opacity: 0, x: 20, scale: 0.8 }, animate: { opacity: 1, x: 0, scale: 1 }, exit: { opacity: 0, x: 20, scale: 0.8 }, className: "absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-black px-3 py-2 text-sm text-white", children: [tooltip, _jsx("div", { className: "absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-black" })] })) })] })) }));
}
export function ProgressCelebration({ progress, total, title, onComplete }) {
    const [showCelebration, setShowCelebration] = useState(false);
    const percentage = (progress / total) * 100;
    const isComplete = progress >= total;
    useEffect(() => {
        if (isComplete && !showCelebration) {
            setShowCelebration(true);
            onComplete?.();
            // Auto-hide celebration after 3 seconds
            const timer = setTimeout(() => setShowCelebration(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [isComplete, showCelebration, onComplete]);
    return (_jsxs("div", { className: "relative", children: [_jsxs("div", { className: "rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsx("h3", { className: "font-semibold text-white", children: title }), _jsxs(Badge, { className: "bg-yellow-400 text-black", children: [progress, "/", total] })] }), _jsxs("div", { className: "relative h-3 overflow-hidden rounded-full bg-white/20", children: [_jsx(motion.div, { className: "h-full rounded-full bg-gradient-to-r from-green-400 to-blue-500", initial: { width: 0 }, animate: { width: `${percentage}%` }, transition: { duration: 0.8, ease: "easeOut" } }), _jsx(motion.div, { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent", animate: { x: [-100, 300] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } })] })] }), _jsx(AnimatePresence, { children: showCelebration && (_jsxs(motion.div, { className: "absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400/90 to-orange-500/90", initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0, opacity: 0 }, transition: { type: "spring", stiffness: 500, damping: 30 }, children: [_jsxs("div", { className: "text-center text-white", children: [_jsx(motion.div, { animate: { rotate: 360, scale: [1, 1.2, 1] }, transition: { duration: 1, repeat: 2 }, children: _jsx(Trophy, { className: "mx-auto mb-2 size-12" }) }), _jsx("h4", { className: "text-lg font-bold", children: "Congratulations!" }), _jsxs("p", { className: "text-sm opacity-90", children: ["You've completed ", title, "!"] })] }), [...Array(20)].map((_, i) => (_jsx(motion.div, { className: "absolute size-3 rounded-full bg-yellow-300", initial: {
                                x: "50%",
                                y: "50%",
                                scale: 0
                            }, animate: {
                                x: Math.random() * 300 - 150,
                                y: Math.random() * 300 - 150,
                                scale: [0, 1, 0],
                                rotate: 360
                            }, transition: {
                                duration: 2,
                                delay: i * 0.1,
                                ease: "easeOut"
                            } }, i)))] })) })] }));
}
export function SmartHoverCard({ children, previewContent, className }) {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };
    return (_jsxs(motion.div, { className: cn("relative cursor-pointer", className), onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), onMouseMove: handleMouseMove, whileHover: { scale: 1.02 }, transition: { duration: 0.3 }, children: [children, _jsx(AnimatePresence, { children: isHovered && (_jsxs(motion.div, { className: "absolute z-50 min-w-64 rounded-xl border border-white/50 bg-white/95 p-4 shadow-2xl backdrop-blur-md", style: {
                        left: mousePosition.x + 10,
                        top: mousePosition.y - 50
                    }, initial: { opacity: 0, scale: 0.8, y: 10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.8, y: 10 }, transition: { duration: 0.2 }, children: [previewContent, _jsx("div", { className: "absolute -left-2 top-8 size-4 rotate-45 border-l border-t border-white/50 bg-white/95" })] })) })] }));
}
//# sourceMappingURL=component.js.map