"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useClerkSupabaseClient } from "@/lib/clerk";
import { Skeleton } from "@/components/ui/skeleton";
import { useAtom } from "jotai";
import { sidebarHintDismissedAtom, sidebarOpenAtom } from "./main-layout";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
const skeletonWidths = [
    "w-[115px]",
    "w-[55px]",
    "w-[40px]",
    "w-[140px]",
    "w-[98px]",
    "w-[84px]",
    "w-[76px]",
    "w-[92px]",
    "w-[68px]",
    "w-[120px]",
    "w-[88px]",
    "w-[104px]",
];
export function FilterChips({ activeTab, selectedFilter, onFilterChange, }) {
    const [showLeftGradient, setShowLeftGradient] = useState(false);
    const [showRightGradient, setShowRightGradient] = useState(true);
    const scrollAreaRef = useRef(null);
    const supabase = useClerkSupabaseClient();
    const { data: templateTags } = useQuery({
        queryKey: ["template-tags"],
        queryFn: async () => {
            const { data, error } = await supabase.rpc("get_template_tags");
            if (error)
                throw error;
            return data;
        },
        enabled: activeTab === "templates",
    });
    const { data: logoCategories, isLoading: isLogoCategoriesLoading } = useQuery({
        queryKey: ["logo-categories"],
        queryFn: async () => {
            const response = await fetch("/api/svgl?type=categories");
            if (!response.ok) {
                throw new Error("Failed to fetch logo categories");
            }
            const data = await response.json();
            return data;
        },
        enabled: activeTab === "logos",
        staleTime: 1000 * 60 * 5,
    });
    useEffect(() => {
        const scrollArea = scrollAreaRef.current;
        if (!scrollArea)
            return;
        const viewport = scrollArea.querySelector("[data-radix-scroll-area-viewport]");
        if (!viewport)
            return;
        const checkScroll = () => {
            const { scrollLeft, scrollWidth, clientWidth } = viewport;
            setShowLeftGradient(scrollLeft > 20);
            setShowRightGradient(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 20);
        };
        viewport.addEventListener("scroll", checkScroll);
        // Initial check
        checkScroll();
        return () => viewport.removeEventListener("scroll", checkScroll);
    }, []);
    const renderContent = () => {
        if (activeTab === "categories") {
            return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => onFilterChange("all"), variant: selectedFilter === "all" || !selectedFilter
                            ? "default"
                            : "outline", className: "rounded-full", size: "sm", children: "All" }), _jsx(Button, { onClick: () => onFilterChange("ui"), variant: selectedFilter === "ui" ? "default" : "outline", className: "rounded-full", size: "sm", children: "UI Components" }), _jsx(Button, { onClick: () => onFilterChange("marketing"), variant: selectedFilter === "marketing" ? "default" : "outline", className: "rounded-full", size: "sm", children: "Marketing Blocks" })] }));
        }
        if (activeTab === "components") {
            const allTags = categories
                .reduce((acc, category) => {
                category.items.forEach((item) => {
                    if (!acc.some((tag) => tag.href === item.href)) {
                        acc.push(item);
                    }
                });
                return acc;
            }, [])
                .sort((a, b) => a.title.localeCompare(b.title));
            const [hintDismissed, setHintDismissed] = useAtom(sidebarHintDismissedAtom);
            const [, setSidebarOpen] = useAtom(sidebarOpenAtom);
            const [showHint, setShowHint] = useState(false);
            useEffect(() => {
                const timer = setTimeout(() => {
                    setShowHint(true);
                }, 500);
                return () => clearTimeout(timer);
            }, []);
            return (_jsx(_Fragment, { children: _jsx(AnimatePresence, { mode: "popLayout", children: _jsxs("div", { className: "flex items-center gap-2", children: [!hintDismissed && showHint && (_jsx(motion.div, { className: "relative items-center hidden md:flex", initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: 0.3 }, layout: true, children: _jsxs(Button, { variant: "outline", className: "rounded-full pr-8 cursor-pointer hover:bg-transparent", size: "sm", onClick: () => {
                                        setHintDismissed(true);
                                        setSidebarOpen(true);
                                    }, children: [_jsxs("p", { className: "flex items-center gap-1.5", children: ["Reopen sidebar? Press", _jsx("kbd", { className: "pointer-events-none h-5 text-foreground/80 select-none items-center gap-1 rounded border bg-muted px-1.5 opacity-100 flex text-[11px] leading-none font-sans", children: "S" })] }), _jsx("div", { className: "absolute right-1 p-1 rounded-full hover:bg-muted", onClick: (e) => {
                                                e.stopPropagation();
                                                setHintDismissed(true);
                                            }, children: _jsx(X, { className: "h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground" }) })] }) })), _jsxs(motion.div, { layout: true, className: "flex items-center gap-2", transition: {
                                    duration: 0.3,
                                    layout: {
                                        duration: 0.4,
                                        ease: "easeOut",
                                    },
                                }, children: [_jsx(Button, { onClick: () => onFilterChange("all"), variant: selectedFilter === "all" || !selectedFilter
                                            ? "default"
                                            : "outline", className: "rounded-full", size: "sm", children: "All" }), allTags.map((tag) => {
                                        const tagSlug = tag.href.split("/")[2] || "";
                                        return (_jsx(Button, { onClick: () => onFilterChange(tagSlug), variant: selectedFilter === tagSlug ? "default" : "outline", className: "rounded-full", size: "sm", children: tag.title }, tag.href));
                                    })] })] }) }) }));
        }
        if (activeTab === "templates") {
            return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => onFilterChange("all"), variant: selectedFilter === "all" || !selectedFilter
                            ? "default"
                            : "outline", className: "rounded-full", size: "sm", children: "All" }), templateTags === undefined
                        ? Array.from({ length: 20 }).map((_, i) => (_jsx(Skeleton, { className: `h-8 rounded-full border border-input ${skeletonWidths[i % skeletonWidths.length]}` }, i)))
                        : templateTags?.map((tag) => (_jsx(Button, { onClick: () => onFilterChange(tag.tag_slug), variant: selectedFilter === tag.tag_slug ? "default" : "outline", className: "rounded-full", size: "sm", children: tag.tag_name }, tag.tag_id)))] }));
        }
        if (activeTab === "logos") {
            return (_jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => onFilterChange("all"), variant: selectedFilter === "all" || !selectedFilter
                            ? "default"
                            : "outline", className: "rounded-full", size: "sm", children: "All" }), isLogoCategoriesLoading
                        ? Array.from({ length: 12 }).map((_, i) => (_jsx(Skeleton, { className: `h-8 rounded-full border border-input ${skeletonWidths[i % skeletonWidths.length]}` }, i)))
                        : logoCategories?.map((category) => (_jsx(Button, { onClick: () => onFilterChange(category.category.toLowerCase()), variant: selectedFilter === category.category.toLowerCase()
                                ? "default"
                                : "outline", className: "rounded-full", size: "sm", children: category.category }, category.category)))] }));
        }
        return null;
    };
    if (!activeTab)
        return null;
    return (_jsxs("div", { className: "relative mb-3", children: [_jsxs(ScrollArea, { ref: scrollAreaRef, className: "w-full whitespace-nowrap rounded-md", children: [_jsx("div", { className: "flex w-max space-x-2 p-1", children: renderContent() }), _jsx(ScrollBar, { orientation: "horizontal", className: "invisible" })] }), _jsx("div", { className: cn("pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent transition-opacity duration-200", showLeftGradient ? "opacity-100" : "opacity-0") }), _jsx("div", { className: cn("pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent transition-opacity duration-200", showRightGradient ? "opacity-100" : "opacity-0") })] }));
}
//# sourceMappingURL=component.js.map