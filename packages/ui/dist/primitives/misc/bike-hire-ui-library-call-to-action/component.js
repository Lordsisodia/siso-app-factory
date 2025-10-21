import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
export const CallToAction = ({ heading, description, buttonLabel, buttonHref, backgroundPattern = 'grid', backgroundColor = 'bg-primary text-primary-foreground', className }) => {
    const renderPattern = () => {
        if (backgroundPattern === 'grid') {
            return (_jsx("div", { className: "absolute inset-0 opacity-10", children: _jsxs("svg", { width: "100%", height: "100%", viewBox: "0 0 100 100", preserveAspectRatio: "none", children: [_jsx("defs", { children: _jsx("pattern", { id: "cta-grid", width: "10", height: "10", patternUnits: "userSpaceOnUse", children: _jsx("rect", { width: "9.5", height: "9.5", fill: "none", stroke: "currentColor", strokeWidth: "0.5" }) }) }), _jsx("rect", { width: "100%", height: "100%", fill: "url(#cta-grid)" })] }) }));
        }
        if (backgroundPattern === 'dots') {
            return (_jsx("div", { className: "absolute inset-0 opacity-10", children: _jsxs("svg", { width: "100%", height: "100%", children: [_jsx("pattern", { id: "cta-dots", x: "0", y: "0", width: "20", height: "20", patternUnits: "userSpaceOnUse", children: _jsx("circle", { cx: "2", cy: "2", r: "1", fill: "currentColor" }) }), _jsx("rect", { width: "100%", height: "100%", fill: "url(#cta-dots)" })] }) }));
        }
        return null;
    };
    return (_jsxs("section", { className: `py-24 ${backgroundColor} relative overflow-hidden ${className}`, children: [renderPattern(), _jsx("div", { className: "container mx-auto px-6 relative z-10", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "max-w-4xl mx-auto text-center", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: heading }), description && (_jsx("p", { className: "text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto", children: description })), _jsx(Link, { to: buttonHref, className: "bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-md text-base font-medium transition-all inline-block", children: buttonLabel })] }) })] }));
};
export default CallToAction;
//# sourceMappingURL=component.js.map