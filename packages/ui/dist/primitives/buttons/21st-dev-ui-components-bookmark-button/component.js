"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Bookmark } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip";
import { AMPLITUDE_EVENTS, trackEvent } from "@/lib/amplitude";
import { useClerkSupabaseClient } from "@/lib/clerk";
import { useBookmarkMutation } from "@/lib/queries";
import { cn } from "@/lib/utils";
export function BookmarkButton({ demoId, bookmarksCount = 0, size = 18, showTooltip = false, bookmarked, onClick, }) {
    const { user } = useUser();
    const supabase = useClerkSupabaseClient();
    const bookmarkMutation = useBookmarkMutation(supabase, user?.id);
    const [isHovered, setIsHovered] = useState(false);
    const [localBookmarksCount, setLocalBookmarksCount] = useState(bookmarksCount);
    const handleBookmark = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (!user) {
            trackEvent(AMPLITUDE_EVENTS.LIKE_COMPONENT, {
                demoId,
                status: "unauthorized",
                source: e ? "click" : "hotkey",
            });
            return;
        }
        bookmarkMutation.mutate({ demoId, bookmarked });
        setLocalBookmarksCount(bookmarked ? localBookmarksCount - 1 : localBookmarksCount + 1);
        toast.success(bookmarked ? "Removed from bookmarks" : "Added to bookmarks");
        trackEvent(bookmarked
            ? AMPLITUDE_EVENTS.UNLIKE_COMPONENT
            : AMPLITUDE_EVENTS.LIKE_COMPONENT, {
            demoId,
            userId: user.id,
            source: e ? "click" : "hotkey",
        });
    };
    useEffect(() => {
        const keyDownHandler = (e) => {
            if (e.code === "KeyB" &&
                !e.metaKey &&
                !e.ctrlKey &&
                !e.altKey &&
                !e.shiftKey &&
                e.target instanceof Element &&
                !e.target.matches("input, textarea")) {
                e.preventDefault();
                handleBookmark();
            }
        };
        window.addEventListener("keydown", keyDownHandler);
        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        };
    }, [bookmarked]);
    useEffect(() => {
        setLocalBookmarksCount(bookmarksCount);
    }, [bookmarksCount]);
    const button = (_jsxs(Button, { onClick: onClick ?? handleBookmark, disabled: bookmarkMutation.isPending, variant: "ghost", className: "h-8 px-1.5", onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsx(Bookmark, { size: size, fill: bookmarked || isHovered ? "currentColor" : "none", className: cn("h-[18px] w-[18px]", bookmarked || isHovered
                    ? "stroke-none scale-110 transition-transform"
                    : "") }), localBookmarksCount !== undefined && (_jsx("span", { className: "ms-1.5 text-xs font-medium text-muted-foreground", children: localBookmarksCount }))] }));
    if (showTooltip) {
        return (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: button }), _jsx(TooltipContent, { className: "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", children: _jsxs("p", { className: "flex items-center gap-1.5", children: [bookmarked ? "Remove from bookmarks" : "Add to bookmarks", _jsx("kbd", { className: "pointer-events-none h-5 text-muted-foreground select-none items-center gap-1 rounded border bg-muted px-1.5 opacity-100 flex text-[11px] leading-none font-sans", children: "B" })] }) })] }));
    }
    return button;
}
//# sourceMappingURL=component.js.map