import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
export const ProcessSteps = ({ badge, heading, description, steps, ctaButton, columns = 3, className }) => {
    // Animation variants
    const staggerContainer = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };
    const gridCols = columns === 2 ? 'md:grid-cols-2' : columns === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3';
    return (_jsx("section", { className: `py-20 bg-background ${className}`, children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs(motion.div, { initial: "hidden", whileInView: "show", viewport: { once: true }, variants: staggerContainer, className: "flex flex-col items-center text-center mb-12", children: [badge && (_jsx(motion.span, { variants: fadeInUp, className: "text-accent font-medium mb-2", children: badge })), _jsx(motion.h2, { variants: fadeInUp, className: "text-3xl md:text-4xl font-bold mb-4", children: heading }), description && (_jsx(motion.p, { variants: fadeInUp, className: "text-muted-foreground max-w-2xl", children: description }))] }), _jsx("div", { className: `grid grid-cols-1 ${gridCols} gap-10 mt-12`, children: steps.map((step, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.1 * (index + 1) }, className: "flex flex-col items-center text-center", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6", children: step.icon }), _jsx("h3", { className: "text-xl font-semibold mb-3", children: step.title }), _jsx("p", { className: "text-muted-foreground", children: step.description })] }, index))) }), ctaButton && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay: 0.4 }, className: "flex justify-center mt-12", children: _jsx(Button, { asChild: true, children: _jsxs(Link, { to: ctaButton.href, className: "flex items-center gap-2", children: [ctaButton.label, " ", _jsx(ArrowRight, { className: "h-4 w-4" })] }) }) }))] }) }));
};
export default ProcessSteps;
//# sourceMappingURL=component.js.map