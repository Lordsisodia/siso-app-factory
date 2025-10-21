"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
export function ProgressiveBlur({ className, height = "30%", position = "bottom", blurLevels = [0.5, 1, 2, 4, 8, 16, 32, 64], }) {
    // Create array with length equal to blurLevels.length - 2 (for before/after pseudo elements)
    const divElements = Array(blurLevels.length - 2).fill(null);
    return (_jsxs("div", { className: cn("gradient-blur pointer-events-none absolute inset-x-0 z-10", className, position === "top"
            ? "top-0"
            : position === "bottom"
                ? "bottom-0"
                : "inset-y-0"), style: {
            height: position === "both" ? "100%" : height,
        }, children: [_jsx("div", { className: "absolute inset-0", style: {
                    zIndex: 1,
                    backdropFilter: `blur(${blurLevels[0]}px)`,
                    WebkitBackdropFilter: `blur(${blurLevels[0]}px)`,
                    maskImage: position === "bottom"
                        ? `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
                        : position === "top"
                            ? `linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
                            : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
                    WebkitMaskImage: position === "bottom"
                        ? `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
                        : position === "top"
                            ? `linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 12.5%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 37.5%)`
                            : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
                } }), divElements.map((_, index) => {
                const blurIndex = index + 1;
                const startPercent = blurIndex * 12.5;
                const midPercent = (blurIndex + 1) * 12.5;
                const endPercent = (blurIndex + 2) * 12.5;
                const maskGradient = position === "bottom"
                    ? `linear-gradient(to bottom, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + 12.5}%)`
                    : position === "top"
                        ? `linear-gradient(to top, rgba(0,0,0,0) ${startPercent}%, rgba(0,0,0,1) ${midPercent}%, rgba(0,0,0,1) ${endPercent}%, rgba(0,0,0,0) ${endPercent + 12.5}%)`
                        : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`;
                return (_jsx("div", { className: "absolute inset-0", style: {
                        zIndex: index + 2,
                        backdropFilter: `blur(${blurLevels[blurIndex]}px)`,
                        WebkitBackdropFilter: `blur(${blurLevels[blurIndex]}px)`,
                        maskImage: maskGradient,
                        WebkitMaskImage: maskGradient,
                    } }, `blur-${index}`));
            }), _jsx("div", { className: "absolute inset-0", style: {
                    zIndex: blurLevels.length,
                    backdropFilter: `blur(${blurLevels[blurLevels.length - 1]}px)`,
                    WebkitBackdropFilter: `blur(${blurLevels[blurLevels.length - 1]}px)`,
                    maskImage: position === "bottom"
                        ? `linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
                        : position === "top"
                            ? `linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
                            : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
                    WebkitMaskImage: position === "bottom"
                        ? `linear-gradient(to bottom, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
                        : position === "top"
                            ? `linear-gradient(to top, rgba(0,0,0,0) 87.5%, rgba(0,0,0,1) 100%)`
                            : `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)`,
                } })] }));
}
//# sourceMappingURL=component.js.map