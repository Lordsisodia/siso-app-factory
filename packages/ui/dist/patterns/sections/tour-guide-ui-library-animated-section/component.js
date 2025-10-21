"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { m, useInView } from "framer-motion";
import { useRef } from "react";
export default function AnimatedSection({ children, className = "", delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    return (_jsx(m.div, { ref: ref, initial: { opacity: 0, y: 50 }, animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }, transition: { duration: 0.6, delay }, className: className, children: children }));
}
//# sourceMappingURL=component.js.map