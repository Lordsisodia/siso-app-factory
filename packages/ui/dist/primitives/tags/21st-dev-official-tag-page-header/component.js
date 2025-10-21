import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ArrowUpDown, CircleX } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { sortByAtom } from "@/components/features/main-page/main-page-header";
import { SORT_OPTIONS } from "@/types/global";
import { setCookie } from "@/lib/cookies";
export const tagPageSearchAtom = atom("");
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
export function TagComponentsHeader({ tagName, currentSection, }) {
    const [sortBy, setSortBy] = useAtom(sortByAtom);
    const [searchQuery, setSearchQuery] = useAtom(tagPageSearchAtom);
    const inputRef = useRef(null);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    React.useEffect(() => {
        return () => {
            setSearchQuery("");
        };
    }, [setSearchQuery]);
    useSearchHotkeys(inputRef);
    const getSearchPlaceholder = () => {
        const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1200px)");
        if (isTablet) {
            return "Search...";
        }
        if (currentSection) {
            return `Search ${currentSection.toLowerCase()}...`;
        }
        return "Search components...";
    };
    return (_jsx("div", { className: "flex flex-col gap-4 mb-6", children: _jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between", children: [_jsx("div", { className: "text-lg font-semibold", children: tagName }), _jsxs("div", { className: "flex items-center gap-2 md:w-auto min-w-0", children: [_jsxs("div", { className: "relative flex-1 min-w-0 lg:min-w-[250px] md:min-w-[100px]", children: [_jsx(Input, { ref: inputRef, type: "text", placeholder: getSearchPlaceholder(), value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full h-8 min-w-[100px] [&::placeholder]:pe-8 lg:[&::placeholder]:pe-16" }), searchQuery ? (_jsx("button", { className: "absolute inset-y-0 end-0 flex h-full w-8 md:w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70", onClick: () => {
                                        setSearchQuery("");
                                        inputRef.current?.focus();
                                    }, "aria-label": "Clear search", children: _jsx(CircleX, { size: 16, strokeWidth: 2, "aria-hidden": "true" }) })) : (_jsx("div", { className: "pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-2 text-muted-foreground", children: _jsx("kbd", { className: "hidden lg:inline-flex size-5 items-center justify-center rounded border bg-muted px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70", children: _jsx("span", { className: "text-[11px] font-sans", children: "/" }) }) }))] }), _jsxs(Select, { value: sortBy, onValueChange: (value) => {
                                setSortBy(value);
                                setCookie({
                                    name: "saved_sort_by",
                                    value: value,
                                    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
                                    httpOnly: true,
                                    sameSite: "lax",
                                });
                            }, children: [_jsx(SelectTrigger, { className: `h-8 ${isDesktop ? "w-[180px]" : "w-auto min-w-[40px] px-2"}`, children: isDesktop ? (_jsx(SelectValue, { placeholder: "Sort by" })) : (_jsx(ArrowUpDown, { className: "h-4 w-4" })) }), _jsx(SelectContent, { children: Object.entries(SORT_OPTIONS).map(([value, label]) => (_jsx(SelectItem, { value: value, children: label }, value))) })] })] })] }) }));
}
//# sourceMappingURL=component.js.map