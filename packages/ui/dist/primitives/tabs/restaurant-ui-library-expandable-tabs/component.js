"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
const buttonVariants = {
    initial: {
        gap: 0,
        paddingLeft: ".5rem",
        paddingRight: ".5rem",
    },
    animate: (isSelected) => ({
        gap: isSelected ? ".5rem" : 0,
        paddingLeft: isSelected ? "1rem" : ".5rem",
        paddingRight: isSelected ? "1rem" : ".5rem",
    }),
};
const spanVariants = {
    initial: { width: 0, opacity: 0 },
    animate: { width: "auto", opacity: 1 },
    exit: { width: 0, opacity: 0 },
};
const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };
export function ExpandableTabs({ tabs, className, activeColor = "text-primary", onChange, }) {
    const [selected, setSelected] = React.useState(null);
    const outsideClickRef = React.useRef(null);
    useOnClickOutside(outsideClickRef, () => {
        setSelected(null);
        onChange?.(null);
    });
    const handleSelect = (index) => {
        setSelected(index);
        onChange?.(index);
    };
    const Separator = () => (_jsx("div", { className: "mx-1 h-[24px] w-[1.2px] bg-border", "aria-hidden": "true" }));
    return (_jsx("div", { ref: outsideClickRef, className: cn("flex flex-wrap items-center gap-2 rounded-2xl border bg-background p-1 shadow-sm", className), children: tabs.map((tab, index) => {
            if (tab.type === "separator") {
                return _jsx(Separator, {}, `separator-${index}`);
            }
            const Icon = tab.icon;
            return (_jsxs(motion.button, { variants: buttonVariants, initial: false, animate: "animate", custom: selected === index, onClick: () => handleSelect(index), transition: transition, className: cn("relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300", selected === index
                    ? cn("bg-muted", activeColor)
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"), children: [_jsx(Icon, { size: 20 }), _jsx(AnimatePresence, { initial: false, children: selected === index && (_jsx(motion.span, { variants: spanVariants, initial: "initial", animate: "animate", exit: "exit", transition: transition, className: "overflow-hidden", children: tab.title })) })] }, tab.title));
        }) }));
}
//# sourceMappingURL=component.js.map