"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Banner } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { atomWithStorage } from "jotai/utils";
import { sidebarOpenAtom } from "../main-page/main-layout";
import { Logo } from "@/components/ui/logo";
export const magicBannerVisibleAtom = atomWithStorage("magic-banner-visible", true);
const MagicBannerContent = memo(function MagicBannerContent() {
    const [isVisible, setIsVisible] = useAtom(magicBannerVisibleAtom);
    const router = useRouter();
    const [isSidebarOpen] = useAtom(sidebarOpenAtom);
    if (!isVisible) {
        return null;
    }
    return (_jsx("div", { className: "fixed top-14 z-[90] border-b border-border bg-muted transition-[left] duration-200 ease-in-out", style: {
            left: isSidebarOpen ? "var(--sidebar-width, 0px)" : "0",
            right: "0",
        }, children: _jsx(Banner, { variant: "muted", className: "text-foreground", children: _jsxs("div", { className: "flex w-full gap-2 md:items-center", children: [_jsxs("div", { className: "flex grow gap-3 md:items-center", children: [_jsx("div", { className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 max-md:mt-0.5", "aria-hidden": "true", children: _jsx(Logo, { hasLink: false, position: "flex", className: "opacity-80 w-6 h-6" }) }), _jsxs("div", { className: "flex grow flex-col justify-between gap-3 md:flex-row md:items-center", children: [_jsxs("div", { className: "space-y-0.5", children: [_jsx("p", { className: "text-sm font-medium", children: "Introducing Magic - The AI Agent That Builds Beautiful UI Components" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Empower your IDE with an AI extension that creates stunning, production-ready components with AI precision." })] }), _jsx("div", { className: "flex gap-2 max-md:flex-wrap", children: _jsx(Button, { size: "sm", className: "text-sm", onClick: () => router.push("/magic"), children: "Try Magic Now" }) })] })] }), _jsx(Button, { variant: "ghost", className: "group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent", onClick: () => setIsVisible(false), "aria-label": "Close banner", children: _jsx(X, { size: 16, strokeWidth: 2, className: "opacity-60 transition-opacity group-hover:opacity-100", "aria-hidden": "true" }) })] }) }) }));
});
export function MagicBanner() {
    return _jsx(MagicBannerContent, {});
}
//# sourceMappingURL=component.js.map