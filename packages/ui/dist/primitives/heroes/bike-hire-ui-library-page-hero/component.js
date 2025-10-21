import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export const PageHero = ({ heading, description, badge, backgroundPattern = 'grid', backgroundColor = 'bg-primary text-primary-foreground', className = '' }) => {
    const renderPattern = () => {
        if (backgroundPattern === 'grid') {
            return (_jsx("div", { className: "absolute inset-0 opacity-10", children: _jsxs("svg", { width: "100%", height: "100%", viewBox: "0 0 100 100", preserveAspectRatio: "none", children: [_jsx("defs", { children: _jsx("pattern", { id: "page-hero-grid", width: "10", height: "10", patternUnits: "userSpaceOnUse", children: _jsx("rect", { width: "9.5", height: "9.5", fill: "none", stroke: "currentColor", strokeWidth: "0.5" }) }) }), _jsx("rect", { width: "100%", height: "100%", fill: "url(#page-hero-grid)" })] }) }));
        }
        if (backgroundPattern === 'dots') {
            return (_jsx("div", { className: "absolute inset-0 opacity-10", children: _jsxs("svg", { width: "100%", height: "100%", children: [_jsx("pattern", { id: "page-hero-dots", x: "0", y: "0", width: "20", height: "20", patternUnits: "userSpaceOnUse", children: _jsx("circle", { cx: "2", cy: "2", r: "1", fill: "currentColor" }) }), _jsx("rect", { width: "100%", height: "100%", fill: "url(#page-hero-dots)" })] }) }));
        }
        return null;
    };
    return (_jsxs("section", { className: `pt-32 pb-20 ${backgroundColor} relative ${className}`, children: [renderPattern(), _jsx("div", { className: "container mx-auto px-6 relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "max-w-3xl", children: [badge && (_jsx("span", { className: "inline-block bg-accent/90 text-white text-xs font-medium px-3 py-1 rounded-full mb-4", children: badge })), _jsx("h1", { className: "text-4xl md:text-5xl font-bold mb-4", children: heading }), description && (_jsx("p", { className: "text-primary-foreground/80 text-lg", children: description }))] }) })] }));
};
export default PageHero;
//# sourceMappingURL=component.js.map