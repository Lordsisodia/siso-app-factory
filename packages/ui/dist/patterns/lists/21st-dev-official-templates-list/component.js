// apps/web/components/features/templates/templates-list.tsx
"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useClerkSupabaseClient } from "@/lib/clerk";
import { TemplateCard } from "./template-card";
import { TemplateCardSkeleton } from "@/components/ui/skeletons";
import { TemplatePreviewModal } from "./template-preview-modal";
const TemplatesList = React.memo(function TemplatesList({ templates, }) {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: templates?.map((template) => (_jsx(TemplateCard, { template: template, onPreviewClick: setSelectedTemplate }, template.id))) }), _jsx(TemplatePreviewModal, { template: selectedTemplate, isOpen: !!selectedTemplate, onClose: () => setSelectedTemplate(null) })] }));
});
export function TemplatesContainer({ tagSlug }) {
    const supabase = useClerkSupabaseClient();
    const { data: templates, isLoading } = useQuery({
        queryKey: ["templates", tagSlug],
        queryFn: async () => {
            const { data, error } = await supabase.rpc("get_templates_v3", {
                p_offset: 0,
                p_limit: 50,
                p_include_private: false,
                p_tag_slug: tagSlug === "all" ? undefined : tagSlug,
            });
            if (error)
                throw error;
            return data;
        },
    });
    if (isLoading) {
        return (_jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: Array.from({ length: 8 }).map((_, i) => (_jsx(TemplateCardSkeleton, {}, i))) }));
    }
    return _jsx(TemplatesList, { templates: templates || [] });
}
//# sourceMappingURL=component.js.map