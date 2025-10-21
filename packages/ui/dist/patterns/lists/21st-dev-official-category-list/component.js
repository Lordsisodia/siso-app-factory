"use client";
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { CategoryCard } from "./category-card";
import { CategoryCardSkeleton } from "@/components/ui/skeletons";
import { categories } from "@/lib/navigation";
import { useClerkSupabaseClient } from "@/lib/clerk";
export function CategoriesList({ className, filter = "all", skeletonCount = 40, }) {
    const supabase = useClerkSupabaseClient();
    const allDemoIds = useMemo(() => {
        return categories
            .flatMap((category) => category.items.map((item) => item.demoId))
            .filter((id) => id !== undefined);
    }, []);
    const { data: categoriesData, isLoading } = useQuery({
        queryKey: ["categories-previews"],
        queryFn: async () => {
            const { data: categoryPreviews, error } = await supabase.rpc("get_section_previews", {
                p_demo_ids: allDemoIds,
            });
            if (error)
                throw error;
            const categoriesWithPreviews = categories
                .flatMap((category) => category.items.map((item) => {
                if (!item.demoId)
                    return null;
                const preview = categoryPreviews?.find((s) => s.demo_id === item.demoId);
                if (!preview)
                    return null;
                return {
                    tag_id: item.demoId,
                    tag_name: item.title,
                    tag_slug: item.href.replace("/s/", ""),
                    component_id: item.demoId,
                    component_name: item.title,
                    component_slug: item.href.replace("/s/", ""),
                    preview_url: preview.preview_url,
                    video_url: preview.video_url || "",
                    category_type: category.title === "UI Components" ? "ui" : "marketing",
                    user_data: {},
                    downloads_count: 0,
                    view_count: 0,
                };
            }))
                .filter((item) => item !== null);
            return categoriesWithPreviews;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
    const { uiCategories, marketingCategories } = useMemo(() => {
        if (!categoriesData)
            return { uiCategories: [], marketingCategories: [] };
        return {
            uiCategories: categoriesData.filter((category) => category.category_type === "ui"),
            marketingCategories: categoriesData.filter((category) => category.category_type === "marketing"),
        };
    }, [categoriesData]);
    const categoriesToShow = useMemo(() => {
        let result;
        switch (filter) {
            case "ui":
                result = uiCategories;
                break;
            case "marketing":
                result = marketingCategories;
                break;
            default:
                result = categoriesData || [];
        }
        return result.sort((a, b) => a.tag_name.localeCompare(b.tag_name));
    }, [filter, uiCategories, marketingCategories, categoriesData]);
    return (_jsx("div", { className: cn("grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className), children: isLoading ? (_jsx(_Fragment, { children: Array.from({ length: skeletonCount }).map((_, i) => (_jsx(CategoryCardSkeleton, {}, i))) })) : (categoriesToShow.map((category) => (_jsx(CategoryCard, { category: category }, `${category.tag_id}`)))) }));
}
export default CategoriesList;
//# sourceMappingURL=component.js.map