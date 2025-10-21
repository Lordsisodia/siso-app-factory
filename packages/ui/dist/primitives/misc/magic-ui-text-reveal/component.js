"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
export const TextReveal = ({ children, className }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });
    if (typeof children !== "string") {
        throw new Error("TextReveal: children must be a string");
    }
    const words = children.split(" ");
    return (_jsx("div", { ref: targetRef, className: cn("relative z-0 h-[200vh]", className), children: _jsx("div", { className: "sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]", children: _jsx("span", { ref: targetRef, className: "flex flex-wrap p-5 text-2xl font-bold text-black/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl dark:text-white/20", children: words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + 1 / words.length;
                    return (_jsx(Word, { progress: scrollYProgress, range: [start, end], children: word }, i));
                }) }) }) }));
};
const Word = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (_jsxs("span", { className: "xl:lg-3 relative mx-1 lg:mx-1.5", children: [_jsx("span", { className: "absolute opacity-30", children: children }), _jsx(motion.span, { style: { opacity: opacity }, className: "text-black dark:text-white", children: children })] }));
};
//# sourceMappingURL=component.js.map