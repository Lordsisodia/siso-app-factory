import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
const bannerVariants = cva("relative w-full", {
    variants: {
        variant: {
            default: "bg-background border border-border",
            muted: "bg-muted",
            border: "border-b border-border",
        },
        size: {
            sm: "px-4 py-2",
            default: "px-4 py-3",
            lg: "px-4 py-3 md:py-2",
        },
        rounded: {
            none: "",
            default: "rounded-lg",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
        rounded: "none",
    },
});
const Banner = React.forwardRef(({ className, variant, size, rounded, icon, action, onClose, isClosable, layout = "row", children, ...props }, ref) => {
    const innerContent = (_jsxs("div", { className: cn("flex gap-2", layout === "center" && "justify-center", layout === "complex" && "md:items-center"), children: [layout === "complex" ? (_jsxs("div", { className: "flex grow gap-3 md:items-center", children: [icon && (_jsx("div", { className: "flex shrink-0 items-center gap-3 max-md:mt-0.5", children: icon })), _jsx("div", { className: cn("flex grow", layout === "complex" &&
                            "flex-col justify-between gap-3 md:flex-row md:items-center"), children: children })] })) : (_jsxs(_Fragment, { children: [icon && (_jsx("div", { className: "flex shrink-0 items-center gap-3", children: icon })), _jsx("div", { className: "flex grow items-center justify-between gap-3", children: children })] })), (action || isClosable) && (_jsxs("div", { className: "flex items-center gap-3", children: [action, isClosable && (_jsx(Button, { variant: "ghost", className: "group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent", onClick: onClose, "aria-label": "Close banner", children: _jsx(X, { size: 16, strokeWidth: 2, className: "opacity-60 transition-opacity group-hover:opacity-100", "aria-hidden": "true" }) }))] }))] }));
    return (_jsx("div", { ref: ref, className: cn(bannerVariants({ variant, size, rounded }), className), ...props, children: innerContent }));
});
Banner.displayName = "Banner";
export { Banner };
//# sourceMappingURL=component.js.map