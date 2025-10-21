"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useIsAdmin } from "@/components/features/publish/hooks/use-is-admin";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { ExternalLink } from "lucide-react";
export const DbLinks = ({ componentId, demoId, }) => {
    const isAdmin = useIsAdmin();
    if (!isAdmin) {
        return null;
    }
    const componentSupabaseUrl = componentId
        ? `https://supabase.com/dashboard/project/vucvdpamtrjkzmubwlts/editor/29179?sort=created_at%3Adesc&filter=id%3Aeq%3A${componentId}`
        : undefined;
    let demoSupabaseUrl = demoId
        ? `https://supabase.com/dashboard/project/vucvdpamtrjkzmubwlts/editor/229472?filter=id%3Aeq%3A${demoId}`
        : undefined;
    if (!demoSupabaseUrl && componentId) {
        demoSupabaseUrl = `https://supabase.com/dashboard/project/vucvdpamtrjkzmubwlts/editor/229472?sort=created_at:desc&filter=component_id:eq:${componentId}`;
    }
    // Prevent click event bubbling when used inside a clickable parent
    return (_jsx(TooltipProvider, { children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, className: "shrink-0", children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", disabled: !componentSupabaseUrl, children: _jsx("a", { href: componentSupabaseUrl, target: "_blank", children: _jsx(ExternalLink, { size: 16, className: "text-blue-600" }) }) }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Open Component in Supabase" }) })] }), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, className: "shrink-0", children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", disabled: !demoSupabaseUrl, children: _jsx("a", { href: demoSupabaseUrl, target: "_blank", children: _jsx(ExternalLink, { size: 16, className: "text-green-600" }) }) }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Open Demo in Supabase" }) })] })] }) }));
};
//# sourceMappingURL=component.js.map