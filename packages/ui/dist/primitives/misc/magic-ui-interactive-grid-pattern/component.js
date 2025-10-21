"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { cn } from "@/lib/utils";
/**
 * The InteractiveGridPattern component.
 *
 * @see InteractiveGridPatternProps for the props interface.
 * @returns A React component.
 */
export function InteractiveGridPattern({ width = 40, height = 40, squares = [24, 24], className, squaresClassName, ...props }) {
    const [horizontal, vertical] = squares;
    const [hoveredSquare, setHoveredSquare] = useState(null);
    return (_jsx("svg", { width: width * horizontal, height: height * vertical, className: cn("absolute inset-0 h-full w-full border border-gray-400/30", className), ...props, children: Array.from({ length: horizontal * vertical }).map((_, index) => {
            const x = (index % horizontal) * width;
            const y = Math.floor(index / horizontal) * height;
            return (_jsx("rect", { x: x, y: y, width: width, height: height, className: cn("stroke-gray-400/30 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000", hoveredSquare === index ? "fill-gray-300/30" : "fill-transparent", squaresClassName), onMouseEnter: () => setHoveredSquare(index), onMouseLeave: () => setHoveredSquare(null) }, index));
        }) }));
}
//# sourceMappingURL=component.js.map