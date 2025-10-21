"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
const Slider = React.forwardRef(({ className, ...props }, ref) => (_jsxs(SliderPrimitive.Root, { ref: ref, className: cn("relative flex w-full touch-none select-none items-center", className), ...props, children: [_jsx(SliderPrimitive.Track, { className: "bg-secondary relative h-2 w-full grow overflow-hidden rounded-full", children: _jsx(SliderPrimitive.Range, { className: "bg-primary absolute h-full" }) }), _jsx(SliderPrimitive.Thumb, { className: "border-primary bg-background ring-offset-background focus-visible:ring-ring block size-5 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" })] })));
Slider.displayName = SliderPrimitive.Root.displayName;
export { Slider };
//# sourceMappingURL=component.js.map