import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
export function TestimonialCard({ author, text, href, className, }) {
    const Card = href ? "a" : "div";
    return (_jsxs(Card, { ...(href ? { href } : {}), className: cn("flex flex-col rounded-lg border-t", "bg-gradient-to-b from-muted/50 to-muted/10", "p-4 text-start sm:p-6", "hover:from-muted/60 hover:to-muted/20", "max-w-[320px] sm:max-w-[320px]", "transition-colors duration-300", className), children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Avatar, { className: "h-12 w-12", children: _jsx(AvatarImage, { src: author.avatar, alt: author.name }) }), _jsxs("div", { className: "flex flex-col items-start", children: [_jsx("h3", { className: "text-md font-semibold leading-none", children: author.name }), _jsx("p", { className: "text-sm text-muted-foreground", children: author.handle })] })] }), _jsx("p", { className: "sm:text-md mt-4 text-sm text-muted-foreground", children: text })] }));
}
//# sourceMappingURL=component.js.map