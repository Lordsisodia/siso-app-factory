"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useMemo, useState, } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
export function AnimatedListItem({ children }) {
    const animations = {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1, originY: 0 },
        exit: { scale: 0, opacity: 0 },
        transition: { type: "spring", stiffness: 350, damping: 40 },
    };
    return (_jsx(motion.div, { ...animations, layout: true, className: "mx-auto w-full", children: children }));
}
export const AnimatedList = React.memo(({ children, className, delay = 1000, ...props }) => {
    const [index, setIndex] = useState(0);
    const childrenArray = useMemo(() => React.Children.toArray(children), [children]);
    useEffect(() => {
        if (index < childrenArray.length - 1) {
            const timeout = setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [index, delay, childrenArray.length]);
    const itemsToShow = useMemo(() => {
        const result = childrenArray.slice(0, index + 1).reverse();
        return result;
    }, [index, childrenArray]);
    return (_jsx("div", { className: cn(`flex flex-col items-center gap-4`, className), ...props, children: _jsx(AnimatePresence, { children: itemsToShow.map((item) => (_jsx(AnimatedListItem, { children: item }, item.key))) }) }));
});
AnimatedList.displayName = "AnimatedList";
//# sourceMappingURL=component.js.map