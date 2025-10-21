"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export function TestimonialsColumn({ className, testimonials, duration = 12 }) {
    const items = React.useMemo(() => [...testimonials, ...testimonials], [testimonials]);
    return (_jsx("div", { className: cn("bg-background", className), children: _jsx(motion.div, { animate: { translateY: "-50%" }, transition: { duration, repeat: Infinity, ease: "linear" }, className: "flex flex-col gap-6 pb-6", children: items.map((testimonial, index) => (_jsxs("div", { className: "w-full max-w-xs rounded-3xl border p-6 shadow-lg shadow-primary/10", children: [_jsx("p", { className: "text-left text-sm text-foreground/80", children: testimonial.text }), _jsxs("div", { className: "mt-5 flex items-center gap-3", children: [_jsx("img", { src: testimonial.image, alt: testimonial.name, width: 40, height: 40, className: "h-10 w-10 rounded-full object-cover", loading: "lazy" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium tracking-tight text-foreground", children: testimonial.name }), _jsx("span", { className: "text-xs tracking-tight text-foreground/60", children: testimonial.role })] })] })] }, `${testimonial.name}-${index}`))) }) }));
}
export function TestimonialsColumnsShowcase({ testimonials }) {
    const firstColumn = testimonials.slice(0, 3);
    const secondColumn = testimonials.slice(3, 6);
    const thirdColumn = testimonials.slice(6, 9);
    return (_jsx("section", { className: "relative my-20 bg-background", children: _jsxs("div", { className: "container mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }, className: "mx-auto flex max-w-[540px] flex-col items-center text-center", children: [_jsx("div", { className: "rounded-lg border px-4 py-1 text-sm font-medium", children: "Testimonials" }), _jsx("h2", { className: "mt-5 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl", children: "What our users say" }), _jsx("p", { className: "mt-4 text-base text-muted-foreground", children: "See how teams are shipping faster with our component library." })] }), _jsxs("div", { className: "mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]", children: [_jsx(TestimonialsColumn, { testimonials: firstColumn, duration: 15 }), _jsx(TestimonialsColumn, { className: "hidden md:block", testimonials: secondColumn, duration: 19 }), _jsx(TestimonialsColumn, { className: "hidden lg:block", testimonials: thirdColumn, duration: 17 })] })] }) }));
}
//# sourceMappingURL=component.js.map