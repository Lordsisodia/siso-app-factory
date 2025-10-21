"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
export default function CategoryCardSkeleton({ index }) {
    return (_jsx(motion.div, { initial: { opacity: 0, y: 60, scale: 0.9 }, animate: { opacity: 1, y: 0, scale: 1 }, transition: {
            duration: 0.7,
            delay: index * 0.15,
            ease: [0.23, 1, 0.32, 1]
        }, className: "group cursor-pointer", children: _jsxs("div", { className: "relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black/40 via-black/20 to-transparent shadow-2xl shadow-black/20 backdrop-blur-xl", style: {
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)"
            }, children: [_jsxs("div", { className: "relative h-72 overflow-hidden", children: [_jsx("div", { className: "size-full animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" }), _jsx("div", { className: "absolute left-6 top-6 size-12 animate-pulse rounded-full bg-white/20" }), _jsx("div", { className: "absolute right-6 top-6 h-6 w-20 animate-pulse rounded-full bg-orange-500/30" }), _jsxs("div", { className: "absolute inset-x-6 bottom-6", children: [_jsx("div", { className: "mb-2 h-6 w-3/4 animate-pulse rounded bg-white/20" }), _jsx("div", { className: "h-4 w-1/2 animate-pulse rounded bg-white/10" })] })] }), _jsx("div", { className: "relative p-6", children: _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "mb-4 space-y-2", children: [_jsx("div", { className: "h-4 w-full animate-pulse rounded bg-gray-600/30" }), _jsx("div", { className: "h-4 w-4/5 animate-pulse rounded bg-gray-600/30" }), _jsx("div", { className: "h-4 w-3/5 animate-pulse rounded bg-gray-600/30" })] }), _jsx("div", { className: "mb-6 space-y-2", children: [1, 2, 3].map(item => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "size-1.5 animate-pulse rounded-full bg-orange-400/50" }), _jsx("div", { className: "h-3 w-32 animate-pulse rounded bg-gray-600/20" })] }, item))) }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "text-left", children: [_jsx("div", { className: "mb-1 h-3 w-8 animate-pulse rounded bg-gray-600/30" }), _jsx("div", { className: "h-5 w-12 animate-pulse rounded bg-orange-400/30" })] }), _jsx("div", { className: "h-8 w-20 animate-pulse rounded bg-white/10" })] })] }) })] }) }));
}
//# sourceMappingURL=component.js.map