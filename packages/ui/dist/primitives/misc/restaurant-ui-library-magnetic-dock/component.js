"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
const GithubIcon = () => (_jsx("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" }) }));
const LinkedinIcon = () => (_jsxs("svg", { width: "26", height: "26", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }), _jsx("rect", { x: "2", y: "9", width: "4", height: "12" }), _jsx("circle", { cx: "4", cy: "4", r: "2" })] }));
const TwitterIcon = () => (_jsx("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "currentColor", children: _jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) }));
const MailIcon = () => (_jsxs("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }), _jsx("polyline", { points: "22,6 12,13 2,6" })] }));
const MouseContext = React.createContext({ x: 0, y: 0 });
function DockIcon({ icon }) {
    const ref = React.useRef(null);
    const mouse = React.useContext(MouseContext);
    const distance = useMotionValue(Infinity);
    React.useEffect(() => {
        const node = ref.current;
        if (!node || mouse.x === 0) {
            distance.set(Infinity);
            return;
        }
        const iconRect = node.getBoundingClientRect();
        const parentRect = node.parentElement?.getBoundingClientRect();
        if (!parentRect)
            return;
        const iconCenterX = iconRect.left + iconRect.width / 2;
        const mouseXAbsolute = parentRect.left + mouse.x;
        distance.set(Math.abs(mouseXAbsolute - iconCenterX));
    }, [mouse, distance]);
    const width = useTransform(distance, [0, 120], [62, 46], { clamp: true });
    const animatedWidth = useSpring(width, { mass: 0.2, stiffness: 160, damping: 15 });
    return (_jsx(motion.div, { ref: ref, style: { width: animatedWidth }, className: "aspect-square grid place-items-center rounded-full bg-neutral-700 text-2xl text-neutral-100 shadow-inner shadow-neutral-900/40 transition-colors hover:bg-neutral-600", children: icon }));
}
export function MagneticDock({ className }) {
    const [pos, setPos] = React.useState({ x: 0, y: 0 });
    const handleMouseMove = React.useCallback((event) => {
        const { clientX, currentTarget } = event;
        const { left } = currentTarget.getBoundingClientRect();
        setPos({ x: clientX - left, y: 0 });
    }, []);
    const handleMouseLeave = React.useCallback(() => {
        setPos({ x: 0, y: 0 });
    }, []);
    return (_jsx(MouseContext.Provider, { value: pos, children: _jsx("div", { className: cn("flex min-h-screen items-center justify-center bg-neutral-900 text-neutral-200", className), children: _jsxs("div", { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave, className: "flex h-24 items-end gap-4 rounded-2xl bg-neutral-800/60 px-4 pb-4 backdrop-blur", children: [_jsx(DockIcon, { icon: _jsx(GithubIcon, {}) }), _jsx(DockIcon, { icon: _jsx(LinkedinIcon, {}) }), _jsx(DockIcon, { icon: _jsx(TwitterIcon, {}) }), _jsx(DockIcon, { icon: _jsx(MailIcon, {}) })] }) }) }));
}
export default MagneticDock;
//# sourceMappingURL=component.js.map