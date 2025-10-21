"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useInfiniteQuery } from "@tanstack/react-query";
import { DesignEngineerCardSkeleton } from "@/components/ui/skeletons";
import { useClerkSupabaseClient } from "@/lib/clerk";
import { DesignEngineerCard } from "./design-engineer-card";
import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
export function DesignEngineersList({ className, initialData, }) {
    const supabaseWithAdminAccess = useClerkSupabaseClient();
    const loadMoreRef = useRef(null);
    const { data, isLoading, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ["active-authors"],
        queryFn: async ({ pageParam = 0 }) => {
            const { data, error } = await supabaseWithAdminAccess.rpc("get_active_authors_with_top_components", {
                p_offset: Number(pageParam) * 10,
                p_limit: 10,
            });
            if (error) {
                throw error;
            }
            return {
                data: data || [],
                total_count: data?.[0]?.total_count ?? 0,
            };
        },
        initialData: initialData
            ? {
                pages: [
                    {
                        data: initialData,
                        total_count: initialData.length,
                    },
                ],
                pageParams: [0],
            }
            : undefined,
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage?.data || lastPage.data.length === 0)
                return undefined;
            const loadedCount = allPages.reduce((sum, page) => sum + page.data.length, 0);
            return loadedCount < lastPage.total_count ? allPages.length : undefined;
        },
        initialPageParam: 0,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0]?.isIntersecting && hasNextPage && !isFetching) {
                fetchNextPage();
            }
        }, { threshold: 0.1 });
        const currentRef = loadMoreRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [hasNextPage, isFetching, fetchNextPage]);
    if (isLoading) {
        return (_jsx("div", { className: cn("grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 list-none pb-10", className), children: Array(10)
                .fill(0)
                .map((_, index) => (_jsx(DesignEngineerCardSkeleton, {}, index))) }));
    }
    const authors = data?.pages.flatMap((page) => page.data) || [];
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: cn("grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 list-none pb-10", className), children: [authors.map((author) => (_jsx(DesignEngineerCard, { author: author }, author.id))), hasNextPage && (_jsx("div", { ref: loadMoreRef, className: "col-span-full h-10 -z-10 -mt-5" }))] }), isFetching && (_jsx("div", { className: "col-span-full flex justify-center pt-2 pb-4", children: _jsx(Loader2, { className: "h-5 w-5 animate-spin text-foreground/20 -mt-6" }) }))] }));
}
//# sourceMappingURL=component.js.map