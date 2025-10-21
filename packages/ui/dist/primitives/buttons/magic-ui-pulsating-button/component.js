import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { cn } from "@/lib/utils";
export const PulsatingButton = React.forwardRef(({ className, children, pulseColor = "#808080", duration = "1.5s", ...props }, ref) => {
    return (_jsxs("button", { ref: ref, className: cn("bg-primary text-primary-foreground relative flex cursor-pointer items-center justify-center rounded-lg px-4 py-2 text-center", className), style: {
            "--pulse-color": pulseColor,
            "--duration": duration,
        }, ...props, children: [_jsx("div", { className: "relative z-10", children: children }), _jsx("div", { className: "absolute top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-lg bg-inherit" })] }));
});
PulsatingButton.displayName = "PulsatingButton";
//# sourceMappingURL=component.js.map