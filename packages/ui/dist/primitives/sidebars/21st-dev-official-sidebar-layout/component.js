"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icons } from "@/components/icons";
import { SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip";
import { useNavigation } from "@/hooks/use-navigation";
import { categories as defaultCategories, magicNavItem, mainNavigationItems, } from "@/lib/navigation";
import { useFilteredNavigation } from "@/lib/navigation-with-magic";
import { userStateAtom } from "@/lib/store/user-store";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { ArrowUpRight, Bookmark, Box, ChevronRight, Component, Crown, FolderKanban, FolderOpen, Group, Home, LayoutTemplate, Package, Presentation, Sparkles, Swords, Trophy, Users, } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { Help } from "./help";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@/components/ui/sidebar";
// Import types from navigation-with-magic.tsx
import { Button } from "@/components/ui/button";
export function MainSidebar() {
    const { toggleSidebar } = useSidebar();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { user: clerkUser } = useUser();
    const [userState] = useAtom(userStateAtom);
    const [showTrigger, setShowTrigger] = React.useState(true);
    const [hoveredItem, setHoveredItem] = React.useState(null);
    const [expandedCategories, setExpandedCategories] = React.useState([]);
    const [expandedItems, setExpandedItems] = React.useState([]); // Start with Magic menu closed
    // Use our custom tabs navigation hook
    const { activeTab, currentSection, navigateToTab, sortBy } = useNavigation();
    // Use the filtered navigation that checks if Magic onboarding is completed
    const filteredCategories = useFilteredNavigation();
    // Fall back to default categories if filteredCategories is not available (SSR)
    const categories = filteredCategories || defaultCategories;
    // Get the current tab from URL when available
    const urlTab = searchParams.get("tab");
    // Toggle category expansion
    const toggleCategory = (categoryId) => {
        setExpandedCategories((prev) => prev.includes(categoryId)
            ? prev.filter((id) => id !== categoryId)
            : [...prev, categoryId]);
    };
    // Toggle item expansion (like AI Component Builder)
    const toggleExpandItem = (id) => {
        setExpandedItems((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]);
    };
    // Map navigation value to icon component
    const getIconForNavItem = (value) => {
        const item = mainNavigationItems.find((item) => item.value === value);
        if (item) {
            const Icon = item.icon;
            return _jsx(Icon, { className: "mr-2 h-4 w-4" });
        }
        // Fallbacks
        switch (value) {
            case "home":
                return _jsx(Home, { className: "mr-2 h-4 w-4" });
            case "components":
                return _jsx(Component, { className: "mr-2 h-4 w-4" });
            case "templates":
                return _jsx(LayoutTemplate, { className: "mr-2 h-4 w-4" });
            case "categories":
                return _jsx(FolderKanban, { className: "mr-2 h-4 w-4" });
            case "authors":
                return _jsx(Users, { className: "mr-2 h-4 w-4" });
            case "pro":
                return _jsx(Crown, { className: "mr-2 h-4 w-4" });
            case "collections":
                return _jsx(FolderOpen, { className: "mr-2 h-4 w-4" });
            default:
                return _jsx(Box, { className: "mr-2 h-4 w-4" });
        }
    };
    const [helpOpen, setHelpOpen] = React.useState(false);
    // Add keyboard event handler
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            // Add handler for slash key using code
            if (e.code === "Slash" || e.code === "IntlRo") {
                e.preventDefault();
                setHelpOpen((prev) => !prev);
                return;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);
    // Add a useEffect to automatically open Magic menu after 1 second
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setExpandedItems((prev) => prev.includes("magic") ? prev : [...prev, "magic"]);
        }, 1000);
        return () => clearTimeout(timer);
    }, []); // Empty dependency array ensures this only runs once on mount
    return (_jsxs(Sidebar, { className: "hidden md:block", children: [_jsx(SidebarHeader, { className: "h-14" }), _jsxs(SidebarContent, { className: "pb-14", children: [_jsx(SidebarGroup, { children: _jsx(SidebarGroupContent, { children: _jsxs(SidebarMenu, { children: [mainNavigationItems
                                        .filter((item) => ["home", "components"].includes(item.value))
                                        .map((item) => (_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { isActive: currentSection !== "magic" &&
                                                !pathname.startsWith("/s/") &&
                                                ((item.value === "home" &&
                                                    (urlTab === "home" ||
                                                        (!urlTab && pathname === "/"))) ||
                                                    (item.value === "components" &&
                                                        urlTab === "components") ||
                                                    (item.value !== "home" &&
                                                        item.value !== "components" &&
                                                        activeTab === item.value)), onClick: () => navigateToTab(item.value), children: _jsxs("div", { className: "flex items-center w-full", children: [getIconForNavItem(item.value), item.title, item.isNew && (_jsx("span", { className: "ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000]", children: "New" }))] }) }) }, item.value))), _jsxs(SidebarMenuItem, { className: "group/menu-item relative", children: [_jsx(SidebarMenuButton, { isActive: false, onClick: () => toggleExpandItem("magic"), children: _jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsxs("div", { className: "flex items-center", children: [_jsx(Sparkles, { className: "mr-2 h-4 w-4" }), magicNavItem.title] }), _jsx(ChevronRight, { className: cn("h-4 w-4 transition-transform", expandedItems.includes("magic") &&
                                                                "transform rotate-90") })] }) }), _jsx(AnimatePresence, { mode: "wait", children: expandedItems.includes("magic") && (_jsx(motion.div, { initial: {
                                                        height: 0,
                                                        opacity: 0,
                                                        marginTop: 0,
                                                        marginBottom: 0,
                                                    }, animate: {
                                                        height: "auto",
                                                        opacity: 1,
                                                        marginTop: 4,
                                                        marginBottom: 4,
                                                    }, exit: {
                                                        height: 0,
                                                        opacity: 0,
                                                        marginTop: 0,
                                                        marginBottom: 0,
                                                    }, transition: { duration: 0.15, ease: "easeOut" }, className: "overflow-hidden ml-6 w-auto", style: { paddingBottom: 0 }, children: _jsx("div", { className: "flex flex-col gap-0.5", children: magicNavItem.subitems.map((subitem, itemIndex) => {
                                                            const isActive = pathname === subitem.href ||
                                                                (currentSection === "magic" &&
                                                                    pathname === subitem.href);
                                                            // Calculate staggered delay
                                                            const staggerDelay = Math.min(itemIndex * 0.02, 0.15);
                                                            return (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -5 }, transition: {
                                                                    duration: 0.15,
                                                                    delay: staggerDelay,
                                                                    ease: "easeOut",
                                                                }, children: _jsx("div", { className: "mb-0", children: _jsx(SidebarMenuButton, { asChild: true, isActive: isActive, children: _jsxs(Link, { href: subitem.href, className: cn("flex items-center justify-between w-full", isActive
                                                                                ? "bg-accent text-accent-foreground font-medium"
                                                                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"), target: subitem.externalLink
                                                                                ? "_blank"
                                                                                : undefined, rel: subitem.externalLink
                                                                                ? "noopener noreferrer"
                                                                                : undefined, children: [_jsxs("span", { className: "flex items-center", children: [subitem.title, subitem.isNew && (_jsx("span", { className: "ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000]", children: "New" }))] }), subitem.externalLink && (_jsx(ArrowUpRight, { className: "ml-1 h-3.5 w-3.5" }))] }) }) }) }, subitem.title));
                                                        }) }) }, "magic-menu")) })] }), mainNavigationItems
                                        .filter((item) => !["home", "components"].includes(item.value))
                                        .map((item) => (_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { isActive: currentSection !== "magic" &&
                                                !pathname.startsWith("/s/") &&
                                                activeTab === item.value, onClick: () => navigateToTab(item.value), children: _jsxs("div", { className: "flex items-center w-full", children: [getIconForNavItem(item.value), item.title, item.isNew && (_jsx("span", { className: "ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000]", children: "New" }))] }) }) }, item.value)))] }) }) }), _jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { className: "text-sm font-semibold text-foreground", children: "Contest" }), _jsx(SidebarGroupContent, { children: _jsxs(SidebarMenu, { children: [_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { isActive: pathname === "/contest", onClick: () => {
                                                    router.push("/contest");
                                                }, children: _jsxs("div", { className: "flex items-center w-full", children: [_jsx(Swords, { className: "mr-2 h-4 w-4" }), "Overview"] }) }) }), _jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { isActive: pathname === "/contest/leaderboard", onClick: () => {
                                                    router.push("/contest/leaderboard");
                                                }, children: _jsxs("div", { className: "flex items-center w-full", children: [_jsx(Trophy, { className: "mr-2 h-4 w-4" }), "Leaderboard"] }) }) })] }) })] }), _jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { className: "text-sm font-semibold text-foreground", children: "You" }), _jsx(SidebarGroupContent, { children: _jsxs(SidebarMenu, { children: [_jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { onClick: () => {
                                                    if (userState.profile?.display_username) {
                                                        router.push(`/${userState.profile.display_username}?tab=bookmarks`);
                                                    }
                                                    else if (clerkUser?.externalAccounts?.[0]?.username) {
                                                        router.push(`/${clerkUser.externalAccounts[0].username}?tab=bookmarks`);
                                                    }
                                                }, children: _jsxs("div", { className: "flex items-center w-full", children: [_jsx(Bookmark, { className: "mr-2 h-4 w-4" }), "Bookmarks"] }) }) }), _jsx(SidebarMenuItem, { children: _jsx(SidebarMenuButton, { onClick: () => {
                                                    if (userState.profile?.display_username) {
                                                        router.push(`/${userState.profile.display_username}?tab=purchased_bundles`);
                                                    }
                                                    else if (clerkUser?.externalAccounts?.[0]?.username) {
                                                        router.push(`/${clerkUser.externalAccounts[0].username}?tab=purchased_bundles`);
                                                    }
                                                }, children: _jsxs("div", { className: "flex items-center w-full", children: [_jsx(Package, { className: "mr-2 h-4 w-4" }), "Purchased Bundles"] }) }) })] }) })] }), _jsxs(SidebarGroup, { children: [_jsx(SidebarGroupLabel, { className: "text-sm font-semibold text-foreground", children: "Explore" }), _jsx(SidebarGroupContent, { children: _jsx(SidebarMenu, { children: categories.map((category, index) => {
                                        const categoryId = `category-${index}`;
                                        const isExpanded = expandedCategories.includes(categoryId);
                                        const getCategoryIcon = () => {
                                            if (category.title === "Marketing Blocks") {
                                                return _jsx(Presentation, { className: "mr-2 h-4 w-4" });
                                            }
                                            if (category.title === "Collections") {
                                                return _jsx(FolderKanban, { className: "mr-2 h-4 w-4" });
                                            }
                                            return _jsx(Group, { className: "mr-2 h-4 w-4" });
                                        };
                                        return (_jsxs(SidebarMenuItem, { className: "group/menu-item relative", children: [_jsx(SidebarMenuButton, { onClick: () => toggleCategory(categoryId), children: _jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsxs("div", { className: "flex items-center", children: [getCategoryIcon(), category.title, category.isNew && (_jsx("span", { className: "ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000]", children: "New" }))] }), _jsx(ChevronRight, { className: cn("h-4 w-4 transition-transform", isExpanded && "transform rotate-90") })] }) }), _jsx(AnimatePresence, { mode: "wait", children: isExpanded && (_jsx(motion.div, { initial: {
                                                            height: 0,
                                                            opacity: 0,
                                                            marginTop: 0,
                                                            marginBottom: 0,
                                                        }, animate: {
                                                            height: "auto",
                                                            opacity: 1,
                                                            marginTop: 4,
                                                            marginBottom: 4,
                                                        }, exit: {
                                                            height: 0,
                                                            opacity: 0,
                                                            marginTop: 0,
                                                            marginBottom: 0,
                                                        }, transition: { duration: 0.15, ease: "easeOut" }, className: "overflow-hidden ml-6 w-auto", style: { paddingBottom: 0 }, children: _jsx("div", { className: "flex flex-col gap-0.5", children: category.items.map((item, itemIndex) => {
                                                                const isActive = pathname === item.href ||
                                                                    pathname.endsWith(item.title.toLowerCase());
                                                                // Calculate staggered delay but ensure total animation stays under 300ms
                                                                const staggerDelay = Math.min(itemIndex * 0.02, 0.15);
                                                                return (_jsx(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: {
                                                                        opacity: 0,
                                                                        y: -5,
                                                                    }, transition: {
                                                                        duration: 0.15,
                                                                        delay: staggerDelay,
                                                                        ease: "easeOut",
                                                                    }, children: _jsx("div", { className: "mb-0", children: _jsx(SidebarMenuButton, { asChild: true, isActive: isActive, children: _jsxs(Link, { href: item.href, className: cn("flex items-center justify-between w-full", isActive
                                                                                    ? "bg-accent text-accent-foreground font-medium"
                                                                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"), target: item.externalLink
                                                                                    ? "_blank"
                                                                                    : undefined, rel: item.externalLink
                                                                                    ? "noopener noreferrer"
                                                                                    : undefined, onMouseEnter: () => setHoveredItem(item.title), onMouseLeave: () => setHoveredItem(null), children: [_jsxs("span", { className: "flex items-center", children: [item.title, item.isNew && (_jsx("span", { className: "ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000]", children: "New" }))] }), _jsxs("span", { className: cn("text-muted-foreground text-sm flex items-center", hoveredItem === item.title &&
                                                                                            "text-accent-foreground"), children: [item.externalLink &&
                                                                                                hoveredItem === item.title && (_jsx(ArrowUpRight, { className: "ml-1 h-3.5 w-3.5 transition-opacity" })), item.demosCount] })] }) }) }) }, item.title));
                                                            }) }) }, `category-${categoryId}`)) })] }, category.title));
                                    }) }) })] })] }), _jsx(SidebarFooter, { className: "flex justify-end pr-4 border-t", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Help, { open: helpOpen, onOpenChange: setHelpOpen }), _jsx("div", { className: "relative h-8 w-8", children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8 hover:bg-accent", "aria-label": "Toggle Sidebar", onClick: (e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleSidebar();
                                            }, children: _jsx(Icons.sidebar, { className: "h-4 w-4" }) }) }), _jsxs(TooltipContent, { className: "flex items-center gap-1.5 z-50", side: "right", children: [_jsx("span", { children: "Toggle Sidebar" }), _jsx("kbd", { className: "pointer-events-none h-5 text-muted-foreground select-none items-center gap-1 rounded border bg-muted px-1.5 opacity-100 flex text-[11px] leading-none font-sans", children: "S" })] })] }) })] }) })] }));
}
//# sourceMappingURL=component.js.map