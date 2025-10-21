import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
const Breadcrumb = React.forwardRef(({ ...props }, ref) => _jsx("nav", { ref: ref, "aria-label": "breadcrumb", ...props }));
Breadcrumb.displayName = "Breadcrumb";
const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => (_jsx("ol", { ref: ref, className: cn("text-muted-foreground flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5", className), ...props })));
BreadcrumbList.displayName = "BreadcrumbList";
const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => (_jsx("li", { ref: ref, className: cn("inline-flex items-center gap-1.5", className), ...props })));
BreadcrumbItem.displayName = "BreadcrumbItem";
const BreadcrumbLink = React.forwardRef(({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (_jsx(Comp, { ref: ref, className: cn("hover:text-foreground transition-colors", className), ...props }));
});
BreadcrumbLink.displayName = "BreadcrumbLink";
const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => (_jsx("span", { ref: ref, role: "link", "aria-disabled": "true", "aria-current": "page", className: cn("text-foreground font-normal", className), ...props })));
BreadcrumbPage.displayName = "BreadcrumbPage";
const BreadcrumbSeparator = ({ children, className, ...props }) => (_jsx("li", { role: "presentation", "aria-hidden": "true", className: cn("[&>svg]:size-3.5", className), ...props, children: children ?? _jsx(ChevronRight, {}) }));
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
const BreadcrumbEllipsis = ({ className, ...props }) => (_jsxs("span", { role: "presentation", "aria-hidden": "true", className: cn("flex size-9 items-center justify-center", className), ...props, children: [_jsx(MoreHorizontal, { className: "size-4" }), _jsx("span", { className: "sr-only", children: "More" })] }));
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";
export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis };
//# sourceMappingURL=component.js.map