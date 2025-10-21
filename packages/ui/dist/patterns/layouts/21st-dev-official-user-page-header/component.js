"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { CircleX } from "lucide-react";
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useClerkSupabaseClient } from "@/lib/clerk";
export const userPageSearchAtom = atom("");
export const USER_COMPONENTS_TABS = [
    "components",
    "demos",
    "bookmarks",
    "purchased_bundles",
];
export const userTabAtom = atomWithStorage("user-components-tab", "components");
function useUserComponentsCounts(userId) {
    const supabase = useClerkSupabaseClient();
    return useQuery({
        queryKey: ["user-components-counts", userId],
        queryFn: async () => {
            const { data, error } = await supabase.rpc("get_user_components_counts", {
                p_user_id: userId,
            });
            if (error)
                throw error;
            return data;
        },
        staleTime: 30 * 1000,
        retry: false,
    });
}
const useTrackSearchQueries = () => {
    const lastTrackedQuery = useRef(null);
    const [searchQuery] = useAtom(userPageSearchAtom);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchQuery && searchQuery !== lastTrackedQuery.current) {
                lastTrackedQuery.current = searchQuery;
            }
        }, 1000);
        return () => clearTimeout(timeoutId);
    }, [searchQuery]);
};
const useSearchHotkeys = (inputRef) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "/" &&
                !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName || "")) {
                event.preventDefault();
                inputRef.current?.focus();
            }
            else if (event.key === "Escape") {
                inputRef.current?.blur();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);
};
export function UserComponentsHeader({ username, userId, isOwnProfile, }) {
    const [activeTab, setActiveTab] = useAtom(userTabAtom);
    const [searchQuery, setSearchQuery] = useAtom(userPageSearchAtom);
    const inputRef = useRef(null);
    const { data: counts, isLoading } = useUserComponentsCounts(userId);
    useTrackSearchQueries();
    useSearchHotkeys(inputRef);
    const handleClearInput = () => {
        setSearchQuery("");
        inputRef.current?.focus();
    };
    const getSearchPlaceholder = () => {
        const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
        if (isTablet)
            return "Search...";
        const tabLabels = {
            components: "components",
            demos: "use cases",
            bookmarks: "bookmarks",
            purchased_bundles: "purchased bundles",
        };
        return `${username}'s ${tabLabels[activeTab]}...`;
    };
    const tabs = [
        {
            value: "components",
            label: "Components",
            count: counts?.published_count ?? 0,
        },
        {
            value: "demos",
            label: "Use Cases",
            count: counts?.demos_count ?? 0,
        },
        {
            value: "bookmarks",
            label: "Bookmarks",
            count: counts?.liked_count ?? 0,
        },
    ];
    if (isOwnProfile) {
        tabs.push({
            value: "purchased_bundles",
            label: "Purchased Bundles",
            count: undefined,
        });
    }
    useEffect(() => {
        if (!isLoading && counts) {
            const currentTabCount = counts[`${activeTab.replace("components", "published").replace("bookmarks", "liked")}_count`] ?? 0;
            if (currentTabCount === 0 &&
                activeTab !== "components" &&
                activeTab !== "purchased_bundles") {
                const firstAvailableTab = tabs.find((tab) => {
                    if (tab.value === "components")
                        return counts.published_count > 0;
                    if (tab.value === "bookmarks")
                        return isOwnProfile;
                    return (counts[`${tab.value.replace("bookmarks", "liked")}_count`] > 0);
                });
                if (firstAvailableTab) {
                    setActiveTab(firstAvailableTab.value);
                }
            }
        }
    }, [counts, isLoading, activeTab, setActiveTab, isOwnProfile]);
    const handleTabChange = (value) => {
        console.log("Changing tab to:", value);
        setActiveTab(value);
    };
    return (_jsx("div", { className: "flex flex-col gap-4 mb-6", children: _jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [_jsx("div", { className: "flex items-center gap-4", children: _jsx(Tabs, { value: activeTab, onValueChange: handleTabChange, className: "w-full md:w-auto", children: _jsx(TabsList, { className: "w-full md:w-auto h-8 -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse", children: tabs.map(({ value, label, count }) => (_jsx(TabsTrigger, { value: value, disabled: !isLoading &&
                                    count === 0 &&
                                    value !== "components" &&
                                    !(value === "bookmarks" && isOwnProfile), className: "flex-1 md:flex-initial relative overflow-hidden rounded-none border border-border h-8 px-4 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e data-[state=active]:bg-muted data-[state=active]:after:bg-foreground disabled:opacity-50 disabled:cursor-not-allowed", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "truncate", children: label }), count !== undefined && (_jsx("span", { className: "text-xs text-muted-foreground tabular-nums", children: isLoading ? "-" : count }))] }) }, value))) }) }) }), _jsx("div", { className: "flex items-center gap-2 md:w-auto min-w-0", children: _jsxs("div", { className: "relative flex-1 min-w-0 lg:min-w-[250px] md:min-w-[100px]", children: [_jsx(Input, { ref: inputRef, type: "text", placeholder: getSearchPlaceholder(), value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full h-8 min-w-[100px] [&::placeholder]:pe-8 lg:[&::placeholder]:pe-16" }), searchQuery ? (_jsx("button", { className: "absolute inset-y-0 end-0 flex h-full w-8 md:w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70", onClick: handleClearInput, "aria-label": "Clear search", children: _jsx(CircleX, { size: 16, strokeWidth: 2, "aria-hidden": "true" }) })) : (_jsx("div", { className: "pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2 text-muted-foreground", children: _jsx("kbd", { className: "hidden lg:inline-flex size-5 items-center justify-center rounded border bg-muted px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70", children: _jsx("span", { className: "text-[11px] font-sans", children: "/" }) }) }))] }) })] }) }));
}
//# sourceMappingURL=component.js.map