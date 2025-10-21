"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
const variants = {
    normal: {
        rotate: 0,
        originX: "4px",
        originY: "20px",
    },
    animate: {
        rotate: [-10, -10, 0],
        transition: {
            duration: 0.8,
            times: [0, 0.5, 1],
            ease: "easeInOut",
        },
    },
};
const clapVariants = {
    normal: {
        rotate: 0,
        originX: "3px",
        originY: "11px",
    },
    animate: {
        rotate: [0, -10, 16, 0],
        transition: {
            duration: 0.4,
            times: [0, 0.3, 0.6, 1],
            ease: "easeInOut",
        },
    },
};
const ClapIcon = ({ size = 28, controls, }) => {
    return (_jsx("div", { className: "select-none rounded-md transition-colors duration-200 flex items-center justify-center", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { overflow: "visible" }, children: _jsxs(motion.g, { animate: controls, variants: variants, children: [_jsxs(motion.g, { animate: controls, variants: clapVariants, children: [_jsx("path", { d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" }), _jsx("path", { d: "m6.2 5.3 3.1 3.9" }), _jsx("path", { d: "m12.4 3.4 3.1 4" })] }), _jsx("path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" })] }) }) }));
};
export { ClapIcon };
//# sourceMappingURL=component.js.map