"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { DIcons } from "dicons";
function ShineBorder({ borderRadius = 8, borderWidth = 1, duration = 14, color = "#000000", className, children, }) {
    const backgroundStops = Array.isArray(color) ? color.join(",") : color;
    return (_jsxs("div", { style: {
            "--border-radius": `${borderRadius}px`,
        }, className: cn("relative grid h-full w-full place-items-center rounded-3xl bg-white p-3 text-black dark:bg-black dark:text-white", className), children: [_jsx("div", { style: {
                    "--border-width": `${borderWidth}px`,
                    "--shine-pulse-duration": `${duration}s`,
                    "--mask-linear-gradient": "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    "--background-radial-gradient": `radial-gradient(transparent, transparent, ${backgroundStops}, transparent, transparent)`,
                }, className: "before:absolute before:inset-0 before:aspect-square before:size-full before:rounded-3xl before:p-[--border-width] before:content-[''] before:![-webkit-mask-composite:xor] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:[mask:--mask-linear-gradient] before:[mask-composite:exclude] motion-safe:before:animate-[shine-pulse_var(--shine-pulse-duration)_infinite_linear]" }), children] }));
}
export function TimelineContainer({ children }) {
    return _jsx("div", { className: "mx-auto flex max-w-md flex-col justify-center gap-3 md:order-2", children: children });
}
export function TimelineEvent({ label, message, icon, isLast = false }) {
    const Icon = DIcons[icon.name];
    return (_jsxs("div", { className: "group relative -m-2 flex gap-4 border border-transparent p-2", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: cn("rounded-full border bg-background p-2", icon.borderColor), children: _jsx(Icon, { className: cn("h-4 w-4", icon.textColor) }) }), !isLast && _jsx("div", { className: "absolute inset-x-0 mx-auto h-full w-px bg-muted" })] }), _jsxs("div", { className: "mt-1 flex flex-1 flex-col gap-1", children: [_jsx("div", { className: "flex items-center justify-between gap-4", children: _jsx("p", { className: "text-lg font-semibold", children: label }) }), _jsx("p", { className: "text-xs text-muted-foreground", children: message })] })] }));
}
const TIMELINE = [
    {
        label: "Choose Your Design",
        message: "Browse and select a design that fits your needs, then access your personalized dashboard.",
        icon: { name: "Shapes", textColor: "text-orange-500", borderColor: "border-orange-500/40" },
    },
    {
        label: "Provide Your Brief",
        message: "Share your design preferences and requirements with us.",
        icon: { name: "Send", textColor: "text-amber-500", borderColor: "border-amber-500/40" },
    },
    {
        label: "Receive Your Designs",
        message: "Get your initial designs within 48 hours.",
        icon: { name: "Check", textColor: "text-blue-500", borderColor: "border-blue-500/40" },
    },
    {
        label: "Request Revisions",
        message: "We’re committed to perfection—request as many revisions as needed until you’re satisfied.",
        icon: { name: "Repeat", textColor: "text-green-500", borderColor: "border-green-500/40" },
    },
    {
        label: "Get Final Files",
        message: "Once approved, we’ll deliver the final files to you.",
        icon: { name: "Download", textColor: "text-green-500", borderColor: "border-green-500/40" },
    },
];
export function Timeline() {
    return (_jsx("div", { className: "w-full", children: _jsx(TimelineContainer, { children: TIMELINE.map((event, index) => (_jsx(TimelineEvent, { isLast: index === TIMELINE.length - 1, ...event }, event.message))) }) }));
}
export { ShineBorder };
//# sourceMappingURL=component.js.map