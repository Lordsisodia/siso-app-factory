import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export const FeatureGrid = ({ badge, heading, description, features, columns = 3, backgroundColor = 'secondary', className }) => {
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
    const bgColorClass = {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary',
        background: 'bg-background'
    }[backgroundColor];
    const gridCols = {
        2: 'md:grid-cols-2 lg:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'md:grid-cols-2 lg:grid-cols-4'
    }[columns];
    return (_jsx("section", { className: `py-20 ${bgColorClass} ${className}`, children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs(motion.div, { initial: "hidden", whileInView: "show", viewport: { once: true }, variants: staggerContainer, className: "flex flex-col items-center text-center mb-12", children: [badge && (_jsx(motion.span, { variants: fadeInUp, className: "text-accent font-medium mb-2", children: badge })), _jsx(motion.h2, { variants: fadeInUp, className: "text-3xl md:text-4xl font-bold mb-4", children: heading }), description && (_jsx(motion.p, { variants: fadeInUp, className: "text-muted-foreground max-w-2xl", children: description }))] }), _jsx(motion.div, { initial: "hidden", whileInView: "show", viewport: { once: true }, variants: staggerContainer, className: `grid grid-cols-1 ${gridCols} gap-8`, children: features.map((feature, index) => (_jsxs(motion.div, { variants: fadeInUp, className: "bg-white p-8 rounded-xl shadow-sm", children: [_jsx("div", { className: "h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mb-6", children: feature.icon }), _jsx("h3", { className: "text-xl font-semibold mb-3", children: feature.title }), _jsx("p", { className: "text-muted-foreground", children: feature.description })] }, index))) })] }) }));
};
export default FeatureGrid;
//# sourceMappingURL=component.js.map