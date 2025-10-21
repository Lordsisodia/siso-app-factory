import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
function Skeleton({ className, ...props }) {
    return (_jsx("div", { className: cn("bg-muted animate-pulse rounded-md", className), ...props }));
}
export { Skeleton };
//# sourceMappingURL=component.js.map