"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
const tileSizes = {
    sm: "w-8 h-8",
    md: "w-9 h-9 md:w-12 md:h-12",
    lg: "w-12 h-12 md:w-16 md:h-16",
};
export function Tiles({ className, rows = 100, cols = 10, tileClassName, tileSize = "md", }) {
    const rowsArray = React.useMemo(() => new Array(rows).fill(0), [rows]);
    const colsArray = React.useMemo(() => new Array(cols).fill(0), [cols]);
    return (_jsx("div", { className: cn("relative z-0 flex h-full w-full justify-center", className), children: rowsArray.map((_, i) => (_jsx(motion.div, { className: cn(tileSizes[tileSize], "relative border-l border-neutral-200 dark:border-neutral-900", tileClassName), children: colsArray.map((_, j) => (_jsx(motion.div, { whileHover: {
                    backgroundColor: `var(--tile)` ?? undefined,
                    transition: { duration: 0 },
                }, animate: {
                    transition: { duration: 2 },
                }, className: cn(tileSizes[tileSize], "relative border-r border-t border-neutral-200 dark:border-neutral-900", tileClassName) }, `col-${i}-${j}`))) }, `row-${i}`))) }));
}
//# sourceMappingURL=component.js.map