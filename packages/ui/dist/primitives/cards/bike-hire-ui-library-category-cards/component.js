import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
export const CategoryCards = ({ categories, columns = { sm: 1, md: 2, lg: 3 }, cardHeight = 'h-64', showCTA = true, ctaText = 'Browse Category', className }) => {
    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };
    const gridClasses = cn('grid gap-6', `grid-cols-${columns.sm || 1}`, `md:grid-cols-${columns.md || 2}`, `lg:grid-cols-${columns.lg || 3}`, className);
    return (_jsx(motion.div, { className: gridClasses, variants: container, initial: "hidden", whileInView: "show", viewport: { once: true }, children: categories.map((category, index) => (_jsx(motion.div, { variants: item, children: _jsxs(Link, { to: category.href, className: `block group relative ${cardHeight} rounded-2xl overflow-hidden`, children: [_jsx("div", { className: cn("absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/90 z-10", "group-hover:from-transparent group-hover:via-primary/40 group-hover:to-primary/80 transition-all duration-500") }), _jsx("img", { src: category.image, alt: category.name, className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" }), _jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-6 z-20", children: [_jsx("h3", { className: "text-2xl font-bold text-white mb-2", children: category.name }), category.description && (_jsx("p", { className: "text-white/90 text-sm mb-4 max-w-[80%]", children: category.description })), category.count !== undefined && (_jsxs("p", { className: "text-white/80 text-xs mb-3", children: [category.count, " ", category.count === 1 ? 'item' : 'items', " available"] })), showCTA && (_jsxs("span", { className: "inline-flex items-center text-xs font-medium text-white px-3 py-1.5 bg-accent/90 rounded-full group-hover:bg-accent transition-colors duration-300 group-hover:pr-4", children: [ctaText, _jsx(ArrowRight, { className: "h-3 w-0 ml-0 opacity-0 group-hover:w-3 group-hover:ml-1 group-hover:opacity-100 transition-all duration-300" })] }))] })] }) }, index))) }));
};
export default CategoryCards;
//# sourceMappingURL=component.js.map