"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
export const AnimatedTestimonials = ({ testimonials, autoplay = false, className, }) => {
    const [active, setActive] = useState(0);
    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };
    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };
    const isActive = (index) => {
        return index === active;
    };
    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay, testimonials.length]);
    const randomRotateY = () => {
        return Math.floor(Math.random() * 21) - 10;
    };
    return (_jsx("div", { className: cn("max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20", className), children: _jsxs("div", { className: "relative grid grid-cols-1 md:grid-cols-2 gap-20", children: [_jsx("div", { children: _jsx("div", { className: "relative h-80 w-full", children: _jsx(AnimatePresence, { children: testimonials.map((testimonial, index) => (_jsx(motion.div, { initial: {
                                    opacity: 0,
                                    scale: 0.9,
                                    z: -100,
                                    rotate: randomRotateY(),
                                }, animate: {
                                    opacity: isActive(index) ? 1 : 0.7,
                                    scale: isActive(index) ? 1 : 0.95,
                                    z: isActive(index) ? 0 : -100,
                                    rotate: isActive(index) ? 0 : randomRotateY(),
                                    zIndex: isActive(index)
                                        ? 999
                                        : testimonials.length + 2 - index,
                                    y: isActive(index) ? [0, -80, 0] : 0,
                                }, exit: {
                                    opacity: 0,
                                    scale: 0.9,
                                    z: 100,
                                    rotate: randomRotateY(),
                                }, transition: {
                                    duration: 0.4,
                                    ease: "easeInOut",
                                }, className: "absolute inset-0 origin-bottom", children: _jsx(Image, { src: testimonial.src, alt: testimonial.name, width: 500, height: 500, draggable: false, className: "h-full w-full rounded-3xl object-cover object-center" }) }, testimonial.src))) }) }) }), _jsxs("div", { className: "flex justify-between flex-col py-4", children: [_jsxs(motion.div, { initial: {
                                y: 20,
                                opacity: 0,
                            }, animate: {
                                y: 0,
                                opacity: 1,
                            }, exit: {
                                y: -20,
                                opacity: 0,
                            }, transition: {
                                duration: 0.2,
                                ease: "easeInOut",
                            }, children: [_jsx("h3", { className: "text-2xl font-bold text-foreground", children: testimonials[active].name }), _jsx("p", { className: "text-sm text-muted-foreground", children: testimonials[active].designation }), _jsx(motion.p, { className: "text-lg text-muted-foreground mt-8", children: testimonials[active].quote.split(" ").map((word, index) => (_jsxs(motion.span, { initial: {
                                            filter: "blur(10px)",
                                            opacity: 0,
                                            y: 5,
                                        }, animate: {
                                            filter: "blur(0px)",
                                            opacity: 1,
                                            y: 0,
                                        }, transition: {
                                            duration: 0.2,
                                            ease: "easeInOut",
                                            delay: 0.02 * index,
                                        }, className: "inline-block", children: [word, "\\u00a0"] }, index))) })] }, active), _jsxs("div", { className: "flex gap-4 pt-12 md:pt-0", children: [_jsx("button", { onClick: handlePrev, className: "h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button", children: _jsx(IconArrowLeft, { className: "h-5 w-5 text-foreground group-hover/button:rotate-12 transition-transform duration-300" }) }), _jsx("button", { onClick: handleNext, className: "h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button", children: _jsx(IconArrowRight, { className: "h-5 w-5 text-foreground group-hover/button:-rotate-12 transition-transform duration-300" }) })] })] })] }) }));
};
//# sourceMappingURL=component.js.map