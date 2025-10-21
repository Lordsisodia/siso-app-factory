"use client";
import { jsx as _jsx } from "react/jsx-runtime";
export default function GlassmorphismCard({ children, className = "" }) {
    return (_jsx("div", { className: `rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg ${className}`, style: {
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)"
        }, children: children }));
}
//# sourceMappingURL=component.js.map