"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
export const RippleButton = React.forwardRef(({ className, children, rippleColor = "#ffffff", duration = "600ms", onClick, ...props }, ref) => {
    const [buttonRipples, setButtonRipples] = useState([]);
    const handleClick = (event) => {
        createRipple(event);
        onClick?.(event);
    };
    const createRipple = (event) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        const newRipple = { x, y, size, key: Date.now() };
        setButtonRipples((prevRipples) => [...prevRipples, newRipple]);
    };
    useEffect(() => {
        if (buttonRipples.length > 0) {
            const lastRipple = buttonRipples[buttonRipples.length - 1];
            const timeout = setTimeout(() => {
                setButtonRipples((prevRipples) => prevRipples.filter((ripple) => ripple.key !== lastRipple.key));
            }, parseInt(duration));
            return () => clearTimeout(timeout);
        }
    }, [buttonRipples, duration]);
    return (_jsxs("button", { className: cn("bg-background text-primary relative flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 px-4 py-2 text-center", className), onClick: handleClick, ref: ref, ...props, children: [_jsx("div", { className: "relative z-10", children: children }), _jsx("span", { className: "pointer-events-none absolute inset-0", children: buttonRipples.map((ripple) => (_jsx("span", { className: "animate-rippling bg-background absolute rounded-full opacity-30", style: {
                        width: `${ripple.size}px`,
                        height: `${ripple.size}px`,
                        top: `${ripple.y}px`,
                        left: `${ripple.x}px`,
                        backgroundColor: rippleColor,
                        transform: `scale(0)`,
                    } }, ripple.key))) })] }));
});
RippleButton.displayName = "RippleButton";
//# sourceMappingURL=component.js.map