"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { usePromptRules } from "@/hooks/use-prompt-rules";
export function PromptRuleSelector({ value, onChange, }) {
    const { data: promptRules, isLoading } = usePromptRules();
    const selectedRule = promptRules?.find((rule) => rule.id === value);
    if (isLoading) {
        return (_jsx(SelectTrigger, { className: "w-full", disabled: true, children: _jsx(SelectValue, { placeholder: "Loading..." }) }));
    }
    return (_jsxs(Select, { value: value?.toString(), onValueChange: (value) => onChange(value ? parseInt(value) : undefined), children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: "Select prompt rule...", children: selectedRule?.name }) }), _jsx(SelectContent, { children: promptRules?.map((rule) => (_jsx(SelectItem, { value: rule.id.toString(), children: _jsx("div", { className: "flex items-center gap-2", children: _jsx("span", { children: rule.name }) }) }, rule.id))) })] }));
}
//# sourceMappingURL=component.js.map