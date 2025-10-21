"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { useClerkSupabaseClient } from "@/lib/clerk";
import { TemplateCard } from "./template-card";
import { TemplateCardSkeleton } from "@/components/ui/skeletons";
export function TemplatesListSEO() {
    const supabase = useClerkSupabaseClient();
    const { data: templates, isLoading } = useQuery({
        queryKey: ["templates-seo"],
        queryFn: async () => {
            const { data, error } = await supabase.rpc("get_templates_v3", {
                p_offset: 0,
                p_limit: 100,
                p_include_private: false,
            });
            if (error)
                throw error;
            return data;
        },
    });
    if (isLoading) {
        return (_jsx("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3", children: Array.from({ length: 6 }).map((_, i) => (_jsx(TemplateCardSkeleton, {}, i))) }));
    }
    if (!templates?.length) {
        return (_jsx("div", { className: "text-center py-12", children: _jsx("p", { className: "text-lg text-muted-foreground", children: "No templates found" }) }));
    }
    return (_jsx("div", { children: _jsx("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3", children: templates.map((template) => (_jsxs("article", { className: "flex flex-col", children: [_jsx(TemplateCard, { template: template }), _jsxs("div", { className: "mt-4 prose prose-sm max-w-none", children: [_jsx("h2", { className: "text-xl font-semibold mb-2", children: template.name }), _jsx("p", { className: "text-muted-foreground", children: template.description })] })] }, template.id))) }) }));
}
//# sourceMappingURL=component.js.map