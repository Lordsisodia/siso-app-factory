"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { ExternalLink, Check, AlertCircle } from "lucide-react";
import { useAtom } from "jotai";
import { userStateAtom } from "@/lib/store/user-store";
import { partnerModalOpenAtom } from "@/app/studio/[username]/analytics/page.client";
import { useQuery } from "@tanstack/react-query";
import { useClerkSupabaseClient } from "@/lib/clerk";
export function PartnerProgramModal() {
    const [open, setOpen] = useAtom(partnerModalOpenAtom);
    const [userState] = useAtom(userStateAtom);
    const isPartner = userState?.profile?.is_partner || false;
    const userId = userState?.profile?.id;
    const supabase = useClerkSupabaseClient();
    // Fetch published components count
    const { data: userComponentsCounts } = useQuery({
        queryKey: ["user-components-counts", userId],
        queryFn: async () => {
            if (!userId)
                return null;
            const { data, error } = await supabase.rpc("get_user_components_counts", {
                p_user_id: userId,
            });
            if (error)
                throw error;
            return data;
        },
        enabled: !!userId && !isPartner,
        staleTime: 30 * 1000,
        retry: false,
    });
    const publishedCount = userComponentsCounts?.published_count || 0;
    const hasEnoughComponents = publishedCount >= 5;
    return (_jsx(Dialog, { open: open, onOpenChange: setOpen, children: _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: isPartner ? "Partner Program Status" : "Join Partner Program" }) }), isPartner ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2 text-green-500", children: [_jsx(Check, { className: "h-5 w-5" }), _jsx("p", { children: "Active Partner Status" })] }), _jsx("p", { children: "Your components are eligible to earn revenue when viewed and used by others." })] })) : (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { children: "Earn revenue when users view and use your components, or when Magic MCP draws inspiration from your designs." }), !hasEnoughComponents && (_jsxs("div", { className: "flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-md", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" }), _jsx("div", { children: _jsxs("p", { className: "text-amber-700 dark:text-amber-400", children: ["You need at least 5 published components to join the partner program. You currently have ", publishedCount, " ", publishedCount === 1 ? "component" : "components", "."] }) })] }))] })), _jsx(DialogFooter, { children: _jsxs("div", { className: "flex gap-2 w-full justify-end", children: [_jsx(Button, { variant: "outline", onClick: () => setOpen(false), children: isPartner ? "Close" : "Cancel" }), !isPartner && (_jsxs(Button, { onClick: () => {
                                    window.open("https://cal.com/serafimcloud/21st.dev", "_blank");
                                }, className: "gap-2", disabled: !hasEnoughComponents, children: ["Book an onboarding call", _jsx(ExternalLink, { className: "h-4 w-4" })] }))] }) })] }) }));
}
//# sourceMappingURL=component.js.map