"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { cn } from "@/lib/utils";
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, showArrow = false, ...props }, ref) => (_jsx(TooltipPrimitive.Portal, { children: _jsxs(TooltipPrimitive.Content, { ref: ref, sideOffset: sideOffset, className: cn("relative z-50 max-w-[280px] rounded-lg border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className), ...props, children: [props.children, showArrow && (_jsx(TooltipPrimitive.Arrow, { className: "-my-px fill-popover drop-shadow-[0_1px_0_hsl(var(--border))]" }))] }) })));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
//# sourceMappingURL=component.js.map