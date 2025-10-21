"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
const BASE_TRANSITION = {
    repeat: Infinity,
    ease: "linear",
};
const BASE_ITEM_VARIANTS = {
    hidden: {
        opacity: 1,
    },
    visible: {
        opacity: 1,
    },
};
export function SpinningText({ children, duration = 10, reverse = false, radius = 5, transition, variants, className, style, }) {
    if (typeof children !== "string" && !Array.isArray(children)) {
        throw new Error("children must be a string or an array of strings");
    }
    if (Array.isArray(children)) {
        // Validate all elements are strings
        if (!children.every((child) => typeof child === "string")) {
            throw new Error("all elements in children array must be strings");
        }
        children = children.join("");
    }
    const letters = children.split("");
    letters.push(" ");
    const finalTransition = {
        ...BASE_TRANSITION,
        ...transition,
        duration: transition?.duration ?? duration,
    };
    const containerVariants = {
        visible: { rotate: reverse ? -360 : 360 },
        ...variants?.container,
    };
    const itemVariants = {
        ...BASE_ITEM_VARIANTS,
        ...variants?.item,
    };
    return (_jsxs(motion.div, { className: cn("relative", className), style: {
            ...style,
        }, initial: "hidden", animate: "visible", variants: containerVariants, transition: finalTransition, children: [letters.map((letter, index) => (_jsx(motion.span, { "aria-hidden": "true", variants: itemVariants, className: "absolute top-1/2 left-1/2 inline-block", style: {
                    "--index": index,
                    "--total": letters.length,
                    "--radius": radius,
                    transform: `
                  translate(-50%, -50%)
                  rotate(calc(360deg / var(--total) * var(--index)))
                  translateY(calc(var(--radius, 5) * -1ch))
                `,
                    transformOrigin: "center",
                }, children: letter }, `${index}-${letter}`))), _jsx("span", { className: "sr-only", children: children })] }));
}
//# sourceMappingURL=component.js.map