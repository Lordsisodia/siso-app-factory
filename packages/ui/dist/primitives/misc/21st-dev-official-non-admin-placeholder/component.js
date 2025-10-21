import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const NonAdminPlaceholder = () => {
    return (_jsx("div", { className: "container py-20", children: _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "flex flex-col items-center justify-center text-center space-y-6 py-12", children: [_jsx("div", { className: "w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-10 w-10 text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m0 0v2m0-2h2m-2 0H9m3-12a3 3 0 00-3 3v12a3 3 0 003 3h6a3 3 0 003-3V6a3 3 0 00-3-3h-6z" }) }) }), _jsx("h1", { className: "text-2xl font-bold", children: "Admin Access Required" }), _jsx("p", { className: "text-gray-500 max-w-md", children: "You don't have access to this page. Please contact an administrator if you believe this is an error." }), _jsx(Button, { asChild: true, children: _jsx(Link, { href: "/", children: "Return to Homepage" }) })] }) }));
};
export default NonAdminPlaceholder;
//# sourceMappingURL=component.js.map