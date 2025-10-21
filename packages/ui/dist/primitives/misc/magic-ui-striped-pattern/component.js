import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useId } from "react";
import { cn } from "@/lib/utils";
export function StripedPattern({ direction = "left", className, width = 10, height = 10, ...props }) {
    const id = useId();
    const w = Number(width);
    const h = Number(height);
    return (_jsxs("svg", { "aria-hidden": "true", className: cn("pointer-events-none absolute inset-0 z-10 h-full w-full stroke-[0.5]", className), xmlns: "http://www.w3.org/2000/svg", ...props, children: [_jsx("defs", { children: _jsx("pattern", { id: id, width: w, height: h, patternUnits: "userSpaceOnUse", children: direction === "left" ? (_jsxs(_Fragment, { children: [_jsx("line", { x1: "0", y1: h, x2: w, y2: "0", stroke: "currentColor" }), _jsx("line", { x1: -w, y1: h, x2: "0", y2: "0", stroke: "currentColor" }), _jsx("line", { x1: w, y1: h, x2: w * 2, y2: "0", stroke: "currentColor" })] })) : (_jsxs(_Fragment, { children: [_jsx("line", { x1: "0", y1: "0", x2: w, y2: h, stroke: "currentColor" }), _jsx("line", { x1: -w, y1: "0", x2: "0", y2: h, stroke: "currentColor" }), _jsx("line", { x1: w, y1: "0", x2: w * 2, y2: h, stroke: "currentColor" })] })) }) }), _jsx("rect", { width: "100%", height: "100%", fill: `url(#${id})` })] }));
}
//# sourceMappingURL=component.js.map