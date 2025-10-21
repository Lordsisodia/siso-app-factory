"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
export function Tab({ text, selected, setSelected, discount = false, }) {
    return (_jsxs("button", { onClick: () => setSelected(text), className: cn("relative w-fit px-4 py-2 text-sm font-semibold capitalize", "text-white/60 transition-colors", discount && "flex items-center justify-center gap-2.5"), children: [_jsx("span", { className: "relative z-10", children: text }), selected && (_jsx(motion.span, { layoutId: "tab", transition: { type: "spring", duration: 0.4 }, className: "absolute inset-0 z-0 rounded-full bg-white/10" })), discount && (_jsx(Badge, { variant: "secondary", className: cn("relative z-10 whitespace-nowrap shadow-none bg-white/10 text-white/60 hover:bg-white/10", selected && "bg-white/20"), children: "Save 20%" }))] }));
}
//# sourceMappingURL=component.js.map