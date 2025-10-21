"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CommandMenu } from "@/components/ui/command-menu";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MainSidebar } from "@/components/features/main-page/sidebar-layout";
import { MainLayout } from "@/components/features/main-page/main-layout";
import { useSidebarVisibility } from "@/hooks/use-sidebar-visibility";
import { initAmplitude } from "@/lib/amplitude";
import { useAtom } from "jotai";
import { sidebarOpenAtom } from "@/components/features/main-page/main-layout";
const queryClient = new QueryClient();
export function AppProviders({ children, }) {
    const [open, setOpen] = useAtom(sidebarOpenAtom);
    const shouldShowSidebar = useSidebarVisibility();
    useEffect(() => {
        initAmplitude();
    }, []);
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(ClerkProvider, { children: _jsxs(SidebarProvider, { defaultOpen: open, open: open, onOpenChange: setOpen, children: [_jsx(Suspense, { fallback: null, children: shouldShowSidebar && _jsx(MainSidebar, {}) }), _jsxs(MainLayout, { children: [_jsx(CommandMenu, {}), children] })] }) }) }));
}
//# sourceMappingURL=component.js.map