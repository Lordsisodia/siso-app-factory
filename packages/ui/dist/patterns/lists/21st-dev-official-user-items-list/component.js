import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ComponentCard } from "@/components/features/list-card/card";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ComponentCardSkeleton, ProfileCardSkeleton, } from "@/components/ui/skeletons";
import { useClerkSupabaseClient } from "@/lib/clerk";
import { cn, isMac } from "@/lib/utils";
import { transformDemoResult } from "@/lib/utils/transformData";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Bookmark, Code, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { userPageSearchAtom } from "./user-page-header";
function useUserPublishedDemos(userId) {
    const supabase = useClerkSupabaseClient();
    return useQuery({
        queryKey: ["user-published-demos", userId],
        queryFn: async () => {
            const { data, error } = await supabase.rpc("get_user_profile_demo_list", {
                p_user_id: userId,
                p_include_private: false,
            });
            if (error)
                throw error;
            return data.map(transformDemoResult);
        },
        staleTime: 30 * 1000,
    });
}
function useUserLikedComponents(userId) {
    const supabase = useClerkSupabaseClient();
    return useQuery({
        queryKey: ["user-liked-components", userId],
        queryFn: async () => {
            const { data, error } = await supabase.rpc("get_user_bookmarks_list", {
                p_user_id: userId,
                p_include_private: false,
            });
            if (error)
                throw error;
            return data.map(transformDemoResult);
        },
        staleTime: 30 * 1000,
    });
}
function useUserDemos(userId) {
    const supabase = useClerkSupabaseClient();
    return useQuery({
        queryKey: ["user-demos", userId],
        queryFn: async () => {
            const { data, error } = await supabase.rpc("get_user_profile_demo_list", {
                p_user_id: userId,
                p_include_private: false,
            });
            if (error)
                throw error;
            return data.map(transformDemoResult);
        },
        staleTime: 30 * 1000,
    });
}
function filterComponentsBySearch(components, searchQuery) {
    if (!components || !searchQuery)
        return components;
    const query = searchQuery.toLowerCase();
    return components.filter((component) => {
        if (component.name?.toLowerCase().includes(query))
            return true;
        if (component.component?.name?.toLowerCase().includes(query))
            return true;
        if (component.user?.name?.toLowerCase().includes(query))
            return true;
        if (component.preview_url?.toLowerCase().includes(query))
            return true;
        return false;
    });
}
function EmptyLikedState() {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [_jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4", children: _jsx(Bookmark, { className: "h-6 w-6 text-muted-foreground" }) }), _jsx("h3", { className: "text-lg font-medium", children: "No bookmarked components" }), _jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-[420px]", children: "When you bookmark a component, it will appear here for quick access" })] }));
}
function EmptyComponentsState({ isOwnProfile }) {
    const router = useRouter();
    return (_jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [_jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4", children: _jsx(Code, { className: "h-6 w-6 text-muted-foreground" }) }), _jsx("h3", { className: "text-lg font-medium", children: isOwnProfile
                    ? "No published components yet"
                    : "No components published yet" }), _jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-[420px]", children: isOwnProfile
                    ? "Start sharing your components with the community"
                    : "This user hasn't published any components yet" }), isOwnProfile && (_jsxs(Button, { onClick: () => router.push("/publish"), className: "mt-6 gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), "Publish Component"] }))] }));
}
export function UserItemsList({ className, skeletonCount = 12, userId, tab, isOwnProfile, }) {
    const [searchQuery, setSearchQuery] = useAtom(userPageSearchAtom);
    const router = useRouter();
    React.useEffect(() => {
        return () => {
            setSearchQuery("");
        };
    }, [setSearchQuery]);
    useHotkeys("mod+enter", (e) => {
        e.preventDefault();
        handleGlobalSearch();
    }, {
        enableOnFormTags: true,
        preventDefault: true,
    }, [searchQuery]);
    const publishedQuery = useUserPublishedDemos(tab === "components" ? userId : "");
    const likedQuery = useUserLikedComponents(tab === "bookmarks" ? userId : "");
    const demosQuery = useUserDemos(tab === "demos" ? userId : "");
    const components = React.useMemo(() => {
        const allDemos = (() => {
            switch (tab) {
                case "components":
                    return publishedQuery.data;
                case "demos":
                    return demosQuery.data;
                case "bookmarks":
                    return likedQuery.data;
                default:
                    return [];
            }
        })() || [];
        let filtered = filterComponentsBySearch(allDemos, searchQuery) || [];
        if (tab === "components") {
            filtered = filtered.filter((demo) => {
                const componentCreatorId = demo.component?.user?.id;
                return componentCreatorId === userId;
            });
        }
        else if (tab === "demos") {
            filtered = filtered.filter((demo) => {
                return demo.user?.id === userId && demo.component?.user?.id !== userId;
            });
        }
        return filtered;
    }, [
        tab,
        publishedQuery.data,
        demosQuery.data,
        likedQuery.data,
        userId,
        searchQuery,
    ]);
    const isLoading = React.useMemo(() => {
        switch (tab) {
            case "components":
                return publishedQuery.isLoading;
            case "demos":
                return demosQuery.isLoading;
            case "bookmarks":
                return likedQuery.isLoading;
            default:
                return false;
        }
    }, [
        tab,
        publishedQuery.isLoading,
        demosQuery.isLoading,
        likedQuery.isLoading,
    ]);
    const showSkeleton = isLoading || (!components?.length && !searchQuery);
    const showEmptyState = !isLoading && !components?.length && searchQuery;
    const handleGlobalSearch = () => {
        if (!searchQuery)
            return;
        router.push(`/q/${encodeURIComponent(searchQuery)}`);
    };
    if (tab === "bookmarks" &&
        !isLoading &&
        components.length === 0 &&
        !searchQuery) {
        return _jsx(EmptyLikedState, {});
    }
    if (tab === "components" &&
        !isLoading &&
        components.length === 0 &&
        !searchQuery) {
        return _jsx(EmptyComponentsState, { isOwnProfile: isOwnProfile });
    }
    return (_jsx("div", { className: cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 list-none pb-10 max-w-[3680px] mx-auto", className), children: showSkeleton ? (_jsx(_Fragment, { children: Array.from({ length: skeletonCount }).map((_, i) => tab === "components" ? (_jsx(ProfileCardSkeleton, {}, i)) : (_jsx(ComponentCardSkeleton, {}, i))) })) : showEmptyState ? (_jsxs("div", { className: "col-span-full flex flex-col items-center justify-center py-20 text-center", children: [_jsxs("div", { className: "text-lg font-semibold mb-2", children: ["No results found for \"", searchQuery, "\""] }), _jsx("p", { className: "text-muted-foreground mb-6", children: "Try adjusting your search or use global search" }), _jsxs(Button, { onClick: handleGlobalSearch, variant: "outline", className: "gap-2", children: [_jsx(Search, { className: "h-4 w-4" }), "Search Everywhere", _jsxs("kbd", { className: "pointer-events-none h-5 select-none items-center gap-1 rounded border border-muted-foreground/40 bg-muted px-1.5 ml-1.5 font-mono text-[11px] font-medium text-muted-foreground inline-flex", children: [_jsx("span", { className: "text-[11px] leading-none font-sans", children: isMac ? "⌘" : "Ctrl" }), _jsx(Icons.enter, { className: "h-2.5 w-2.5" })] })] })] })) : (components?.map((component) => (_jsx(ComponentCard, { demo: component, hideUser: tab === "components" }, `${component.id}-${component.updated_at}`)))) }));
}
//# sourceMappingURL=component.js.map