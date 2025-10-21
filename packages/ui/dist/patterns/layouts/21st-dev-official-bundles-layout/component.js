"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { getBundlesAction } from "@/lib/api/bundles";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "sonner";
import { BundleItem } from "./bundle-item";
const PAGE_SIZE = 10;
// BundlesLayout renders a list of BundleSlider components
export function BundlesLayout({ authorId, onlyOwned, bundles, searchQuery, hideStatus, }) {
    const loadMoreRef = useRef(null);
    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, error, } = useInfiniteQuery({
        // TODO: Add searchQuery to queryKey with debounce
        queryKey: ["bundles-with-plans-and-demos"],
        queryFn: async ({ pageParam }) => {
            return getBundlesAction({
                authorId,
                onlyOwned,
                offset: pageParam * PAGE_SIZE,
                limit: PAGE_SIZE,
            });
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage || lastPage.length < PAGE_SIZE)
                return undefined;
            return allPages.length;
        },
        enabled: bundles === undefined,
        initialPageParam: 0,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
    // Infinite scroll: fetch next page when loadMoreRef is visible
    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage)
            return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0]?.isIntersecting) {
                fetchNextPage();
            }
        }, { threshold: 0.1 });
        const current = loadMoreRef.current;
        if (current)
            observer.observe(current);
        return () => {
            if (current)
                observer.unobserve(current);
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
    // Add useMemo hook for allBundles before any returns
    const allBundles = useMemo(() => {
        if (bundles) {
            return bundles;
        }
        if (!data) {
            return [];
        }
        return data.pages.flatMap((page) => page);
    }, [data, bundles]);
    if (isLoading) {
        return (_jsx("div", { className: "space-y-4", children: Array.from({ length: 3 }).map((_, i) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Skeleton, { className: "h-9 w-9 rounded-full" }), _jsxs("div", { className: "space-y-0.5", children: [_jsx(Skeleton, { className: "h-5 w-32" }), _jsx(Skeleton, { className: "h-4 w-24" })] })] }), _jsx(Skeleton, { className: "h-[242.5px] w-full rounded-xl" })] }, i))) }));
    }
    if (error) {
        toast.error("Error loading bundles", {
            description: error.message,
        });
    }
    if (allBundles.length === 0)
        return (_jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center text-muted-foreground rounded-lg bg-muted", children: [_jsx("p", { className: "text-sm", children: "No bundles found" }), _jsx("p", { className: "text-xs mt-1", children: "Try again later" })] }));
    return (_jsxs("div", { className: "space-y-8", children: [allBundles.map((bundle) => (_jsx(BundleItem, { user: bundle.users, bundle: bundle, hideStatus: hideStatus }, bundle.id))), hasNextPage && (_jsx("div", { ref: loadMoreRef, className: "flex justify-center py-8", children: isFetchingNextPage && (_jsx("div", { className: "flex justify-center", children: _jsx(LoadingSpinner, { size: "sm" }) })) }))] }));
}
//# sourceMappingURL=component.js.map