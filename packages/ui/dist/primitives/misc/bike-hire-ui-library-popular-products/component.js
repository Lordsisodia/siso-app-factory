import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export function PopularProducts({ products, badge = 'Customer Favorites', heading, description, renderCarousel, backgroundColor = 'bg-secondary/20', className = '' }) {
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
    return (_jsx("section", { className: `py-20 ${backgroundColor} ${className}`, children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs(motion.div, { initial: "hidden", whileInView: "show", viewport: { once: true }, variants: staggerContainer, className: "flex flex-col items-center text-center mb-12", children: [_jsx(motion.span, { variants: fadeInUp, className: "text-accent font-medium mb-2", children: badge }), _jsx(motion.h2, { variants: fadeInUp, className: "text-3xl md:text-4xl font-bold mb-4", children: heading }), description && (_jsx(motion.p, { variants: fadeInUp, className: "text-muted-foreground max-w-2xl", children: description }))] }), renderCarousel(products)] }) }));
}
export default PopularProducts;
//# sourceMappingURL=component.js.map