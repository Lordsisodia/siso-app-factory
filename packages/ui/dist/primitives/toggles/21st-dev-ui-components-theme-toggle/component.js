"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Toggle } from "@/components/ui/toggle";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip";
export function ThemeToggle({ fillIcon = true }) {
    const { resolvedTheme, setTheme } = useTheme();
    return (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Toggle, { className: "group bg-transparent data-[state=on]:!bg-transparent hover:bg-accent hover:!text-foreground", pressed: resolvedTheme === "dark", onPressedChange: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"), "aria-label": `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`, size: "sm", children: resolvedTheme === "dark" ? (_jsx(Sun, { size: 18, strokeWidth: 2, className: `shrink-0 ${fillIcon ? "fill-current" : ""}`, "aria-hidden": "true" })) : (_jsx(Moon, { size: 18, strokeWidth: 2, className: `shrink-0 ${fillIcon ? "fill-current" : ""}`, "aria-hidden": "true" })) }) }), _jsx(TooltipContent, { className: "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", children: _jsxs("p", { className: "flex items-center gap-1.5", children: [resolvedTheme === "dark" ? "Light" : "Dark", " mode"] }) })] }));
}
//# sourceMappingURL=component.js.map