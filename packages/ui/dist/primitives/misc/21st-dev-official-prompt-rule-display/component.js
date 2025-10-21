"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BookText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { usePromptRules } from "@/hooks/use-prompt-rules";
export function PromptRuleDisplay() {
    const [selectedRuleId, setSelectedRuleId] = useState(() => {
        // Initialize from localStorage if available
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("selectedPromptRuleId");
            return saved ? parseInt(saved, 10) : undefined;
        }
        return undefined;
    });
    const { data: promptRules, isLoading } = usePromptRules();
    const selectedRule = promptRules?.find((rule) => rule.id === selectedRuleId);
    // Save to localStorage when selectedRuleId changes
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (selectedRuleId) {
                localStorage.setItem("selectedPromptRuleId", selectedRuleId.toString());
            }
            else {
                localStorage.removeItem("selectedPromptRuleId");
            }
        }
    }, [selectedRuleId]);
    const handleRuleChange = (ruleId) => {
        setSelectedRuleId(ruleId);
    };
    return (_jsxs("div", { className: "flex flex-col space-y-2 p-4 border rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(BookText, { className: "h-5 w-5 text-primary" }), _jsx("h3", { className: "text-sm font-medium", children: "Prompt Rules" })] }), _jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: _jsxs(Link, { href: "/settings/rules", children: [_jsx(Settings, { className: "h-4 w-4 mr-1" }), "Manage"] }) })] }), _jsx("div", { className: "mt-2", children: _jsxs("select", { className: "w-full p-2 border rounded-md", value: selectedRuleId || "", onChange: (e) => handleRuleChange(e.target.value ? parseInt(e.target.value, 10) : undefined), children: [_jsx("option", { value: "", children: "Select a rule..." }), promptRules?.map((rule) => (_jsx("option", { value: rule.id, children: rule.name }, rule.id)))] }) }), isLoading ? (_jsxs("div", { className: "space-y-2 mt-2", children: [_jsx(Skeleton, { className: "h-4 w-full" }), _jsx(Skeleton, { className: "h-4 w-3/4" })] })) : selectedRule ? (_jsxs("div", { className: "space-y-2 mt-2", children: [selectedRule.tech_stack.length > 0 && (_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Tech Stack:" }), _jsx("div", { className: "flex flex-wrap gap-1", children: selectedRule.tech_stack.map((tech, index) => (_jsxs(Badge, { variant: "outline", className: "text-xs", children: [tech.name, " ", tech.version && `(${tech.version})`] }, index))) })] })), Object.keys(selectedRule.theme).length > 0 && (_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Theme:" }), _jsx(Badge, { variant: "outline", className: "text-xs", children: "Custom theme configured" })] })), selectedRule.additional_context && (_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-muted-foreground mb-1", children: "Additional Context:" }), _jsx("p", { className: "text-xs text-muted-foreground", children: selectedRule.additional_context.length > 100
                                    ? `${selectedRule.additional_context.substring(0, 100)}...`
                                    : selectedRule.additional_context })] }))] })) : (_jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "No rule selected. Select a rule to enhance AI code generation with your project context." }))] }));
}
//# sourceMappingURL=component.js.map