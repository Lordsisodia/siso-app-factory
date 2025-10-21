import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
export function ProductGrid({ products, renderCard, columns = { sm: 1, md: 2, lg: 3 }, gap = 6, animated = true, className }) {
    // Animation variants for staggered children
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
    const gridClasses = cn('grid', `grid-cols-${columns.sm || 1}`, `md:grid-cols-${columns.md || 2}`, `lg:grid-cols-${columns.lg || 3}`, `gap-${gap}`, className);
    if (!animated) {
        return (_jsx("div", { className: gridClasses, children: products.map((product, index) => (_jsx("div", { children: renderCard(product, index) }, index))) }));
    }
    return (_jsx(motion.div, { className: gridClasses, variants: container, initial: "hidden", animate: "show", children: products.map((product, index) => (_jsx(motion.div, { variants: item, children: renderCard(product, index) }, index))) }));
}
export default ProductGrid;
//# sourceMappingURL=component.js.map