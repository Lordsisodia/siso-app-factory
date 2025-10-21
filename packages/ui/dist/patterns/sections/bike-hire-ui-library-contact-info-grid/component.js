import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from 'framer-motion';
export const ContactInfoGrid = ({ contacts, animated = true, className = '' }) => {
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
    if (!animated) {
        return (_jsx("div", { className: `space-y-8 ${className}`, children: contacts.map((contact, index) => (_jsxs("div", { className: "flex items-start", children: [_jsx("div", { className: "h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mr-6", children: contact.icon }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: contact.title }), Array.isArray(contact.details) ? (contact.details.map((detail, i) => (_jsx("p", { className: "text-muted-foreground", children: detail }, i)))) : (_jsx("p", { className: "text-muted-foreground", children: contact.details }))] })] }, index))) }));
    }
    return (_jsx(motion.div, { initial: "hidden", whileInView: "show", viewport: { once: true }, variants: staggerContainer, className: `space-y-8 ${className}`, children: contacts.map((contact, index) => (_jsxs(motion.div, { variants: fadeInUp, className: "flex items-start", children: [_jsx("div", { className: "h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mr-6", children: contact.icon }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: contact.title }), Array.isArray(contact.details) ? (contact.details.map((detail, i) => (_jsx("p", { className: "text-muted-foreground", children: detail }, i)))) : (_jsx("p", { className: "text-muted-foreground", children: contact.details }))] })] }, index))) }));
};
export default ContactInfoGrid;
//# sourceMappingURL=component.js.map