"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Image from "next/image";
const steps = [
    {
        title: "Describe Your Vision",
        description: "Simply tell the AI Agent what component you need by typing /ui and describing your idea - whether it's a pricing table, contact form, or navigation menu.",
        image: "/how-it-works-1.png",
    },
    {
        title: "Choose from Options",
        description: "Magic generates three unique variations of your component. Review them and select the one that best matches your needs and design preferences.",
        image: "/how-it-works-3.png",
    },
    {
        title: "Instant Integration",
        description: "Your IDE's AI Agent automatically integrates the chosen component into your project, handling all the necessary files and dependencies seamlessly.",
        image: "/how-it-works-2.png",
    },
];
export function HowItWorks() {
    return (_jsxs("section", { className: "pt-10 pb-10 lg:pb-24 overflow-hidden", children: [_jsxs("div", { className: "text-center", children: [_jsx("h2", { className: "text-5xl sm:text-[3.9rem]/16 pb-2 font-bold tracking-tighter text-pretty bg-clip-text text-transparent bg-gradient-to-t from-gray-300/70 to-white sm:text-balance", children: "How It Works" }), _jsx("p", { className: "mt-4 text-lg text-neutral-300", children: "Create beautiful UI components in three simple steps" })] }), _jsx("div", { className: "mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: steps.map((step, index) => (_jsxs("div", { className: "group relative rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg", children: [_jsx("div", { className: "relative w-full", children: _jsx("div", { className: "relative w-full aspect-[21/5]", children: _jsx(Image, { src: step.image, alt: step.title, fill: true, className: "object-cover object-left-top" }) }) }), _jsx("h3", { className: "mt-5 text-lg font-semibold text-neutral-200", children: step.title }), _jsx("p", { className: "mt-2 text-neutral-400 leading-relaxed", children: step.description })] }, index))) })] }));
}
//# sourceMappingURL=component.js.map