import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
export function CircleProgress({ progress, size = 22, strokeWidth = 3, radius = 8, // Set default radius to match original
className, }) {
    const center = size / 2;
    const circumference = 2 * Math.PI * radius;
    return (_jsxs("svg", { height: size, width: size, className: cn("shrink-0", className), children: [_jsx("circle", { className: "text-border", cx: center, cy: center, fill: "transparent", r: radius, stroke: "currentColor", strokeWidth: strokeWidth }), _jsx("circle", { className: "text-primary", cx: center, cy: center, fill: "transparent", r: radius, stroke: "currentColor", strokeDasharray: `${circumference}`, strokeLinecap: "round", strokeWidth: strokeWidth, strokeDashoffset: `${circumference * (1 - progress)}` })] }));
}
//# sourceMappingURL=component.js.map