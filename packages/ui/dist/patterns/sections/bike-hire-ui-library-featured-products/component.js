import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ProductGrid } from '../../grids/ProductGrid';
export function FeaturedProducts({ products, badge = 'Featured', heading, description, maxProducts = 6, viewAllLink, viewAllText = 'View All', renderCard, backgroundColor = 'bg-background', className }) {
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
    const displayProducts = products.slice(0, maxProducts);
    return (_jsx("section", { className: `py-20 ${backgroundColor} ${className}`, children: _jsxs("div", { className: "container mx-auto px-6", children: [_jsxs(motion.div, { initial: "hidden", whileInView: "show", viewport: { once: true }, variants: staggerContainer, className: "flex flex-col items-center text-center mb-12", children: [_jsx(motion.span, { variants: fadeInUp, className: "text-accent font-medium mb-2", children: badge }), _jsx(motion.h2, { variants: fadeInUp, className: "text-3xl md:text-4xl font-bold mb-4", children: heading }), description && (_jsx(motion.p, { variants: fadeInUp, className: "text-muted-foreground max-w-2xl", children: description }))] }), _jsx(ProductGrid, { products: displayProducts, renderCard: (product, index) => renderCard(product), columns: { sm: 1, md: 2, lg: 3 } }), viewAllLink && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 }, className: "flex justify-center mt-12", children: _jsx(Link, { to: viewAllLink, className: "bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md transition-all", children: viewAllText }) }))] }) }));
}
export default FeaturedProducts;
//# sourceMappingURL=component.js.map