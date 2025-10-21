import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { CalendarDays, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
export function UserAvatar({ src, alt, size = 40, user, isClickable, className, skipLink = false, ...props }) {
    const avatarContent = (_jsxs(Avatar, { className: cn("group shadow-base", isClickable && "cursor-pointer", className), style: { width: size, height: size }, ...props, children: [_jsx(AvatarImage, { src: src || "/placeholder.svg", alt: alt || "User avatar" }), _jsx(AvatarFallback, { children: alt
                    ? alt
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "U" })] }));
    if (!user) {
        return avatarContent;
    }
    const wrappedAvatar = isClickable && !skipLink ? (_jsx(Link, { href: `/${user.display_username || user.username}`, className: "no-underline", children: avatarContent })) : (avatarContent);
    return (_jsxs(HoverCard, { children: [_jsx(HoverCardTrigger, { asChild: true, children: wrappedAvatar }), _jsx(HoverCardContent, { align: "start", className: "w-[320px]", side: "bottom", alignOffset: -10, children: _jsx(Link, { href: `/${user.display_username || user.username}`, className: "no-underline cursor-pointer", children: _jsxs("div", { className: "flex gap-4", children: [_jsxs(Avatar, { className: "h-12 w-12 shadow-base", children: [_jsx(AvatarImage, { src: user.display_image_url || user.image_url || "/placeholder.svg", alt: user.display_name || user.name || "User avatar" }), _jsx(AvatarFallback, { children: (user.display_name || user.name)?.[0]?.toUpperCase() })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("h4", { className: "text-sm font-semibold", children: user.display_name || user.name }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["@", user.display_username || user.username] }), user.bio && (_jsx("p", { className: "text-xs text-muted-foreground whitespace-pre-wrap", children: user.bio })), user.created_at && (_jsxs("div", { className: "flex items-center pt-1", children: [!user.manually_added ? (_jsx(CalendarDays, { className: "mr-2 h-4 w-4 opacity-70" })) : (_jsx(Info, { className: "mr-2 h-4 w-4 opacity-70" })), _jsx("span", { className: "text-xs text-muted-foreground", children: user.manually_added
                                                    ? `Created by 21st.dev`
                                                    : `Joined ${formatDate(new Date(user.created_at))}` })] }))] })] }) }) })] }));
}
//# sourceMappingURL=component.js.map