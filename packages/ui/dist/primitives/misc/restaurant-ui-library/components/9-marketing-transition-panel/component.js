'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { AnimatePresence, motion, } from 'framer-motion';
import { cn } from '@/lib/utils';
export function TransitionPanel({ children, className, transition, variants, activeIndex, ...motionProps }) {
    return (_jsx("div", { className: cn('relative', className), children: _jsx(AnimatePresence, { initial: false, mode: 'popLayout', custom: motionProps.custom, children: _jsx(motion.div, { variants: variants, transition: transition, initial: 'enter', animate: 'center', exit: 'exit', ...motionProps, children: children[activeIndex] }, activeIndex) }) }));
}
//# sourceMappingURL=component.js.map