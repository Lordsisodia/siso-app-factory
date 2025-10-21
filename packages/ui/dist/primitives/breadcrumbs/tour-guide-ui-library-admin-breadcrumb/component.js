"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
export default function AdminBreadcrumb({ items }) {
    return (_jsxs("nav", { className: "mb-6 flex items-center space-x-2 text-sm text-gray-400", children: [_jsxs(Link, { href: "/admin/dashboard", className: "flex items-center transition-colors hover:text-orange-400", children: [_jsx(Home, { className: "mr-1 size-4" }), "Dashboard"] }), items.map((item, index) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(ChevronRight, { className: "size-4 text-gray-600" }), item.href ? (_jsx(Link, { href: item.href, className: "transition-colors hover:text-orange-400", children: item.label })) : (_jsx("span", { className: "font-medium text-gray-300", children: item.label }))] }, index)))] }));
}
//# sourceMappingURL=component.js.map