import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { cn } from "@/lib/utils";
export function OrbitingCircles({ className, children, reverse, duration = 20, radius = 160, path = true, iconSize = 30, speed = 1, ...props }) {
    const calculatedDuration = duration / speed;
    return (_jsxs(_Fragment, { children: [path && (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", className: "pointer-events-none absolute inset-0 size-full", children: _jsx("circle", { className: "stroke-black/10 stroke-1 dark:stroke-white/10", cx: "50%", cy: "50%", r: radius, fill: "none" }) })), React.Children.map(children, (child, index) => {
                const angle = (360 / React.Children.count(children)) * index;
                return (_jsx("div", { style: {
                        "--duration": calculatedDuration,
                        "--radius": radius,
                        "--angle": angle,
                        "--icon-size": `${iconSize}px`,
                    }, className: cn(`animate-orbit absolute flex size-[var(--icon-size)] transform-gpu items-center justify-center rounded-full`, { "[animation-direction:reverse]": reverse }, className), ...props, children: child }));
            })] }));
}
//# sourceMappingURL=component.js.map