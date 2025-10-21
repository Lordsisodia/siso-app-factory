import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
export function RetroGrid({ className, angle = 65, cellSize = 60, opacity = 0.5, lightLineColor = "gray", darkLineColor = "gray", ...props }) {
    const gridStyles = {
        "--grid-angle": `${angle}deg`,
        "--cell-size": `${cellSize}px`,
        "--opacity": opacity,
        "--light-line": lightLineColor,
        "--dark-line": darkLineColor,
    };
    return (_jsxs("div", { className: cn("pointer-events-none absolute size-full overflow-hidden [perspective:200px]", `opacity-[var(--opacity)]`, className), style: gridStyles, ...props, children: [_jsx("div", { className: "absolute inset-0 [transform:rotateX(var(--grid-angle))]", children: _jsx("div", { className: "animate-grid [inset:0%_0px] [margin-left:-200%] [height:300vh] [width:600vw] [transform-origin:100%_0_0] [background-image:linear-gradient(to_right,var(--light-line)_1px,transparent_0),linear-gradient(to_bottom,var(--light-line)_1px,transparent_0)] [background-size:var(--cell-size)_var(--cell-size)] [background-repeat:repeat] dark:[background-image:linear-gradient(to_right,var(--dark-line)_1px,transparent_0),linear-gradient(to_bottom,var(--dark-line)_1px,transparent_0)]" }) }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" })] }));
}
//# sourceMappingURL=component.js.map