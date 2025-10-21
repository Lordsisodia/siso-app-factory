"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { atomWithStorage } from "jotai/utils";
import { useSidebarHotkey } from "@/hooks/use-sidebar-hotkey";
export const sidebarOpenAtom = atomWithStorage("sidebar:state", true);
export const sidebarHintDismissedAtom = atomWithStorage("sidebar:hint-dismissed", false);
export function MainLayout({ children, className, }) {
    useSidebarHotkey();
    return (_jsx("main", { className: cn("min-h-screen w-full", className), children: _jsx(Container, { children: children }) }));
}
//# sourceMappingURL=component.js.map