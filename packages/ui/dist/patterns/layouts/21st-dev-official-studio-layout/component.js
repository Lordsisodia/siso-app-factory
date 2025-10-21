"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { VersionSelectorDialog } from "@/components/features/publish/version-selector-dialog";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useSearchParams } from "next/navigation";
import { StudioHeader } from "./ui/studio-header";
import { StudioSidebar } from "./ui/studio-sidebar";
export function StudioLayout({ user, children, onCreateSandbox, isCreating = false, showCreateDialog = false, setShowCreateDialog, }) {
    const searchParams = useSearchParams();
    const username = user?.display_username || user?.username || undefined;
    return (_jsxs("div", { className: "flex flex-col relative", children: [_jsxs(SidebarProvider, { defaultOpen: true, children: [_jsx(StudioHeader, { user: user }), _jsxs("div", { className: "flex w-full", children: [_jsx(StudioSidebar, { user: user }), _jsx(SidebarInset, { className: "overflow-hidden p-4 md:p-8 !pt-20 w-full max-w-full", children: children })] })] }), setShowCreateDialog && (_jsx(VersionSelectorDialog, { isOpen: showCreateDialog, onOpenChange: setShowCreateDialog, username: username, onCreateSandbox: onCreateSandbox, isCreating: isCreating }))] }));
}
//# sourceMappingURL=component.js.map