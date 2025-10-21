"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { useClerkSupabaseClient } from "@/lib/clerk";
import { CollectionCard } from "./collection-card";
import { TemplateCardSkeleton } from "@/components/ui/skeletons";
function CollectionsList({ collections }) {
    return (_jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: collections.map((collection) => (_jsx(CollectionCard, { collection: collection }, collection.id))) }));
}
export function CollectionsContainer({ tagSlug }) {
    const supabase = useClerkSupabaseClient();
    const { data: collections, isLoading } = useQuery({
        queryKey: ["collections", tagSlug],
        queryFn: async () => {
            const { data, error } = await supabase.rpc("get_collections_v1", {
                p_offset: 0,
                p_limit: 50,
                p_include_private: false,
            });
            if (error)
                throw error;
            if (!data)
                return [];
            return data.map((collection) => ({
                ...collection,
                user_data: collection.user_data || {
                    id: "",
                    name: "",
                    display_name: "",
                    image_url: "",
                    display_image_url: "",
                },
            }));
        },
    });
    if (isLoading) {
        return (_jsx("div", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: Array.from({ length: 8 }).map((_, i) => (_jsx(TemplateCardSkeleton, {}, i))) }));
    }
    return _jsx(CollectionsList, { collections: collections || [] });
}
//# sourceMappingURL=component.js.map