import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
export function UpvoteIcon({ className, size = 16, isVoted = false, }) {
    return (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: size, height: size, fill: "none", viewBox: "0 0 16 16", className: cn("transition-all duration-300", isVoted
            ? "fill-primary stroke-primary"
            : "fill-transparent stroke-foreground stroke-[1.5px]", className), children: _jsx("path", { d: "M6.579 3.467c.71-1.067 2.132-1.067 2.842 0L12.975 8.8c.878 1.318.043 3.2-1.422 3.2H4.447c-1.464 0-2.3-1.882-1.422-3.2z" }) }));
}
//# sourceMappingURL=component.js.map