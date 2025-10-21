/*
<ai_context>
This client component provides the providers for the app.
</ai_context>
*/
"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { CSPostHogProvider } from "./posthog/posthog-provider";
export const Providers = ({ children, ...props }) => {
    return (_jsx(NextThemesProvider, { ...props, children: _jsx(TooltipProvider, { children: _jsx(CSPostHogProvider, { children: children }) }) }));
};
//# sourceMappingURL=component.js.map