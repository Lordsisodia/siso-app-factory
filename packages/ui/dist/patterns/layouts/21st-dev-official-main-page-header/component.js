import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigation } from "@/hooks/use-navigation";
import { cn } from "@/lib/utils";
import { atom } from "jotai";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { SORT_OPTIONS } from "@/types/global";
export const sortByAtom = atom("recommended");
const tabLabels = {
    home: "Home",
    components: "Components",
    templates: "Templates",
    categories: "Categories",
    authors: "Design Engineers",
    pro: "Premium Stores",
    collections: "Collections",
    bundles: "Bundles",
};
export function ComponentsHeader({ activeTab, onTabChange, }) {
    const [isClient, setIsClient] = useState(false);
    const inputRef = useRef(null);
    const [showLeftGradient, setShowLeftGradient] = useState(false);
    const [showRightGradient, setShowRightGradient] = useState(true);
    const scrollAreaRef = useRef(null);
    // Use the custom hook for tab navigation
    const { activeTab: currentTab, navigateToTab, isDesktop, sortBy, handleSortChange, } = useNavigation({
        onTabChange: (tab) => onTabChange(tab),
    });
    useEffect(() => {
        setIsClient(true);
    }, []);
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
    if (!isClient) {
        return (_jsx("div", { className: "flex flex-col gap-4 mb-3", children: _jsx("div", { className: "flex items-center justify-between gap-4", children: _jsx("div", { className: "flex items-center gap-4", children: _jsx(Tabs, { value: activeTab, onValueChange: (value) => navigateToTab(value), children: _jsxs(TabsList, { className: "h-auto gap-2 rounded-none bg-transparent px-0 py-1 text-foreground", children: [_jsx(TabsTrigger, { value: "home", className: "relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-foreground data-[state=active]:hover:bg-accent data-[state=inactive]:text-foreground/70", children: "Home" }), _jsx(TabsTrigger, { value: "components", className: "relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-foreground data-[state=active]:hover:bg-accent data-[state=inactive]:text-foreground/70", children: "Components" }), _jsx(TabsTrigger, { value: "templates", className: "relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-foreground data-[state=active]:hover:bg-accent data-[state=inactive]:text-foreground/70", children: "Templates" }), _jsx(TabsTrigger, { value: "categories", className: "relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-foreground data-[state=active]:hover:bg-accent data-[state=inactive]:text-foreground/70", children: "Categories" }), _jsx(TabsTrigger, { value: "authors", className: "relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-foreground data-[state=active]:hover:bg-accent data-[state=inactive]:text-foreground/70", children: "Design Engineers" }), _jsx(TabsTrigger, { value: "pro", className: "relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-foreground data-[state=active]:hover:bg-accent data-[state=inactive]:text-foreground/70", children: "Premium Stores" }), _jsx(TabsTrigger, { value: "collections", className: "relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-foreground data-[state=active]:hover:bg-accent data-[state=inactive]:text-foreground/70", children: "Collections" })] }) }) }) }) }));
    }
    return (_jsx("div", { className: "flex flex-col gap-4 mb-3", children: _jsxs("div", { className: "flex items-center justify-between gap-4", children: [!isDesktop && (_jsx("div", { className: "flex items-center gap-4", children: _jsxs(Select, { value: activeTab, onValueChange: (value) => navigateToTab(value), children: [_jsx(SelectTrigger, { className: "border-0 bg-transparent font-medium text-md shadow-none focus:ring-0 pl-0", children: _jsx(SelectValue, { placeholder: tabLabels[activeTab] }) }), _jsx(SelectContent, { side: "bottom", align: "start", alignOffset: -10, className: "[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2", children: Object.entries(tabLabels).map(([value, label]) => (_jsx(SelectItem, { value: value, children: label }, value))) })] }) })), _jsx("div", { className: "flex items-center gap-2 md:w-full min-w-0", children: activeTab === "components" && (_jsx(_Fragment, { children: isDesktop ? (_jsxs("div", { className: "relative w-full", children: [_jsxs(ScrollArea, { ref: scrollAreaRef, className: "w-full whitespace-nowrap rounded-md", children: [_jsx("div", { className: "flex w-max space-x-2 p-1", children: Object.entries(SORT_OPTIONS).map(([value, label]) => (_jsx(Button, { onClick: () => handleSortChange(value), variant: sortBy === value ? "default" : "outline", className: "rounded-full", size: "sm", children: label }, value))) }), _jsx(ScrollBar, { orientation: "horizontal", className: "invisible" })] }), _jsx("div", { className: cn("pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent transition-opacity duration-200", showLeftGradient ? "opacity-100" : "opacity-0") }), _jsx("div", { className: cn("pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent transition-opacity duration-200", showRightGradient ? "opacity-100" : "opacity-0") })] })) : (_jsxs(Select, { value: sortBy, onValueChange: handleSortChange, children: [_jsx(SelectTrigger, { className: "h-8 w-auto min-w-[40px] px-2", children: _jsx(ArrowUpDown, { className: "h-4 w-4" }) }), _jsx(SelectContent, { className: "[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2", children: Object.entries(SORT_OPTIONS).map(([value, label]) => (_jsx(SelectItem, { value: value, children: label }, value))) })] })) })) })] }) }));
}
//# sourceMappingURL=component.js.map