"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
export const HeroHighlight = ({ children, className, containerClassName, }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    function handleMouseMove({ currentTarget, clientX, clientY, }) {
        if (!currentTarget)
            return;
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    const dotPattern = (color) => ({
        backgroundImage: `radial-gradient(circle, ${color} 1px, transparent 1px)`,
        backgroundSize: "16px 16px",
    });
    return (_jsxs("div", { className: cn("group relative flex h-[40rem] w-full items-center justify-center bg-white dark:bg-black", containerClassName), onMouseMove: handleMouseMove, children: [_jsx("div", { className: "pointer-events-none absolute inset-0 opacity-70", style: dotPattern("rgb(212 212 212)") }), _jsx("div", { className: "pointer-events-none absolute inset-0 opacity-0 dark:opacity-70", style: dotPattern("rgb(38 38 38)") }), _jsx(motion.div, { className: "pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100", style: {
                    ...dotPattern("rgb(99 102 241)"),
                    WebkitMaskImage: useMotionTemplate `
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
                    maskImage: useMotionTemplate `
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
                } }), _jsx("div", { className: cn("relative z-20", className), children: children })] }));
};
export const Highlight = ({ children, className, }) => {
    return (_jsx(motion.span, { initial: {
            backgroundSize: "0% 100%",
        }, animate: {
            backgroundSize: "100% 100%",
        }, transition: {
            duration: 2,
            ease: "linear",
            delay: 0.5,
        }, style: {
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
            display: "inline",
        }, className: cn("relative inline-block rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 px-1 pb-1 dark:from-indigo-500 dark:to-purple-500", className), children: children }));
};
//# sourceMappingURL=component.js.map