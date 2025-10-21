import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { Hash } from "lucide-react";
export const Tag = ({ slug, name }) => {
    return (_jsxs(Link, { href: `/s/${slug}`, className: "inline-flex px-[4px] py-[2px] gap-[2px] items-center border rounded-md transition-colors duration-200 hover:border-primary group", children: [_jsx("span", { className: "bg-muted p-[2px] text-foreground/90 rounded group-hover:bg-border", children: _jsx(Hash, { size: 12 }) }), _jsx("span", { children: name })] }));
};
//# sourceMappingURL=component.js.map