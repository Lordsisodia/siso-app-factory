import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
const AdminHeader = ({ title, subtitle }) => {
    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "border-b pb-4 mb-8", children: _jsx("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold", children: title }), subtitle && _jsx("p", { className: "text-gray-500 mt-1", children: subtitle })] }) }) }));
};
export default AdminHeader;
//# sourceMappingURL=component.js.map