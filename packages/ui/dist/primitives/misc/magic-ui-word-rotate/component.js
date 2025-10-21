"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
export function WordRotate({ words, duration = 2500, motionProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
}, className, }) {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, duration);
        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, [words, duration]);
    return (_jsx("div", { className: "overflow-hidden py-2", children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.h1, { className: cn(className), ...motionProps, children: words[index] }, words[index]) }) }));
}
//# sourceMappingURL=component.js.map