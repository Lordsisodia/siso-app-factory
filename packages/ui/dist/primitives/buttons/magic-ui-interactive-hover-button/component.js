import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
export function InteractiveHoverButton({ children, className, ...props }) {
    return (_jsxs("button", { className: cn("group bg-background relative w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold", className), ...props, children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "bg-primary h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]" }), _jsx("span", { className: "inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0", children: children })] }), _jsxs("div", { className: "text-primary-foreground absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100", children: [_jsx("span", { children: children }), _jsx(ArrowRight, {})] })] }));
}
//# sourceMappingURL=component.js.map