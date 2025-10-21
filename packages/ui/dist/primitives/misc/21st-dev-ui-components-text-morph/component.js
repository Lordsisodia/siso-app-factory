"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useId } from "react";
export function TextMorph({ children, as: Component = "p", className, style, }) {
    const uniqueId = useId();
    const characters = useMemo(() => {
        const charCounts = {};
        return children.split("").map((char, index) => {
            const lowerChar = char.toLowerCase();
            charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1;
            return {
                id: `${uniqueId}-${lowerChar}${charCounts[lowerChar]}`,
                label: char,
            };
        });
    }, [children, uniqueId]);
    return (_jsx(Component, { className: cn(className), "aria-label": children, style: style, children: _jsx(AnimatePresence, { mode: "popLayout", initial: false, children: characters.map((character) => (_jsx(motion.span, { layoutId: character.id, className: "inline-block", "aria-hidden": "true", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: {
                    type: "spring",
                    stiffness: 280,
                    damping: 18,
                    mass: 0.3,
                }, children: character.label }, character.id))) }) }));
}
//# sourceMappingURL=component.js.map