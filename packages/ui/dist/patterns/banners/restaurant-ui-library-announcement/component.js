import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
const BadgeContext = createContext({
    themed: false,
});
const useBadgeContext = () => {
    const context = useContext(BadgeContext);
    if (!context) {
        throw new Error("useBadgeContext must be used within a Badge");
    }
    return context;
};
export const Announcement = ({ variant = "outline", themed = false, className, ...props }) => (_jsx(BadgeContext.Provider, { value: { themed }, children: _jsx(Badge, { variant: variant, className: cn("max-w-full gap-2 rounded-full bg-background px-3 py-0.5 font-medium shadow-sm transition-all", "hover:shadow-md", themed && "border-foreground/5", className), ...props }) }));
export const AnnouncementTag = ({ className, ...props }) => {
    const { themed } = useBadgeContext();
    return (_jsx("div", { className: cn("-ml-2.5 shrink-0 truncate rounded-full bg-foreground/5 px-2.5 py-1 text-xs", themed && "bg-background/60", className), ...props }));
};
export const AnnouncementTitle = ({ className, ...props }) => (_jsx("div", { className: cn("flex items-center gap-1 truncate py-1", className), ...props }));
//# sourceMappingURL=component.js.map