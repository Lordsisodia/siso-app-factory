import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { motion } from "motion/react";
export function BaseComponent() {
    return (_jsxs("div", { className: "w-full h-full p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center", children: [_jsx("h2", { className: "text-xl font-bold text-gray-800", children: "Base Component" }), _jsx("p", { className: "text-gray-600", children: "This is the base content." })] }));
}
export function AnimatedOverlay({ hovered }) {
    return (_jsx(motion.div, { className: "absolute inset-0 rounded-lg", initial: { filter: "blur(0px)" }, animate: { filter: hovered ? "blur(5px)" : "blur(0px)" }, transition: { duration: 0.3, ease: "easeInOut" }, children: _jsx("div", { className: "w-full h-full bg-black bg-opacity-20 flex items-center justify-center rounded-lg", children: _jsx("h2", { className: "text-xl font-bold text-white", children: "Overlay Content" }) }) }));
}
export function CombinedComponent() {
    const [hovered, setHovered] = useState(false);
    return (_jsxs("div", { className: "relative w-96 h-64", onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), children: [_jsx(BaseComponent, {}), _jsx(AnimatedOverlay, { hovered: hovered })] }));
}
//# sourceMappingURL=component.js.map