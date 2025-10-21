"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Icons } from "@/components/icons";
import { usePromptRules } from "@/hooks/use-prompt-rules";
import { promptOptions } from "@/lib/prompts";
import { Loader2, Plus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useId } from "react";
import { toast } from "sonner";
import { Button } from "./button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";
import { Label } from "./label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectSeparator, SelectTrigger, SelectValue, } from "./select";
import { Textarea } from "./textarea";
const STORAGE_KEY = "lastSelectedPromptRule";
export function CopyPromptDialog({ isOpen, onClose, selectedPromptType, onPromptTypeChange, onCopyPrompt, demoId, }) {
    const promptTypeId = useId();
    const promptRuleId = useId();
    const [selectedRuleId, setSelectedRuleId] = React.useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? parseInt(saved) : undefined;
        }
        return undefined;
    });
    const [additionalContext, setAdditionalContext] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const { data: promptRules, isLoading: isLoadingRules } = usePromptRules();
    const textareaRef = React.useRef(null);
    useEffect(() => {
        if (selectedRuleId) {
            localStorage.setItem(STORAGE_KEY, selectedRuleId.toString());
        }
        else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, [selectedRuleId]);
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 0);
        }
    }, [isOpen]);
    const handleCopy = async () => {
        try {
            setIsLoading(true);
            await onCopyPrompt(selectedRuleId, additionalContext || undefined);
            onClose();
        }
        catch (error) {
            console.error("Error in handleCopy:", error);
            toast.error(error instanceof Error ? error.message : "Error generating prompt");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleClose = () => {
        setAdditionalContext("");
        onClose();
    };
    const promptTypeOptions = React.useMemo(() => promptOptions.filter((option) => option.type === "option"), []);
    const selectedOption = React.useMemo(() => promptTypeOptions.find((opt) => opt.id === selectedPromptType), [promptTypeOptions, selectedPromptType]);
    const selectedRule = React.useMemo(() => promptRules?.find((rule) => rule.id === selectedRuleId), [promptRules, selectedRuleId]);
    // Add useEffect for Enter key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen)
                return;
            // Check if any select element is focused
            const activeElement = document.activeElement;
            const isSelectFocused = activeElement?.closest('[role="combobox"]') !== null;
            // Check if the event target is within this specific dialog
            const isWithinCopyDialog = e.target?.closest('[data-dialog-type="copy-prompt"]') !== null;
            if (e.key === "Enter" && !isSelectFocused && isWithinCopyDialog) {
                e.preventDefault();
                handleCopy();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]); // Add isOpen to dependencies
    return (_jsx(Dialog, { open: isOpen, onOpenChange: handleClose, children: _jsxs(DialogContent, { className: "sm:max-w-[500px]", "data-dialog-type": "copy-prompt", children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Copy AI Prompt" }) }), _jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: promptTypeId, children: "Prompt Type" }), _jsxs(Select, { defaultValue: selectedPromptType, onValueChange: onPromptTypeChange, children: [_jsx(SelectTrigger, { id: promptTypeId, children: _jsx(SelectValue, { placeholder: "Select prompt type", children: selectedOption && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex items-center justify-center w-[22px] h-[22px]", children: selectedOption.icon }), _jsx("span", { children: selectedOption.label })] })) }) }), _jsx(SelectContent, { className: "[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2", children: promptTypeOptions.map((option) => (_jsx(SelectItem, { value: option.id, children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex items-center justify-center w-[22px] h-[22px]", children: option.icon }), _jsx("span", { children: option.label })] }) }, option.id))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: promptRuleId, children: "Prompt Rule" }), _jsxs(Select, { value: selectedRuleId?.toString() || "default", onValueChange: (value) => setSelectedRuleId(value && value !== "default" ? parseInt(value) : undefined), disabled: isLoadingRules, children: [_jsx(SelectTrigger, { id: promptRuleId, children: _jsx(SelectValue, { placeholder: "Select prompt rule (optional)" }) }), _jsxs(SelectContent, { className: "[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2", children: [_jsxs(SelectGroup, { children: [_jsx(SelectItem, { value: "default", children: _jsx("span", { children: "Default (no custom rules)" }) }), isLoadingRules ? (_jsx("div", { className: "flex items-center justify-center p-4", children: _jsx(Loader2, { className: "h-4 w-4 animate-spin" }) })) : (promptRules?.map((rule) => (_jsx(SelectItem, { value: rule.id.toString(), children: _jsx("span", { children: rule.name }) }, rule.id))))] }), _jsx(SelectSeparator, {}), _jsx(SelectGroup, { children: _jsxs(Link, { href: "/settings/rules/new", target: "_blank", className: "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Add new rule" })] }) })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "additional-context", children: "Additional Context" }), _jsx(Textarea, { id: "additional-context", ref: textareaRef, value: additionalContext, onChange: (e) => setAdditionalContext(e.target.value), placeholder: "Add any additional context for the AI...", className: "h-[100px]", autoFocus: true })] }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { onClick: handleCopy, variant: "default", className: "pr-1.5", disabled: isLoading || isLoadingRules, children: isLoading || isLoadingRules ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Loading..."] })) : (_jsxs(_Fragment, { children: ["Copy Prompt", _jsx("kbd", { className: "pointer-events-none h-5 w-5 justify-center select-none items-center gap-1 rounded border-muted-foreground/40 bg-muted-foreground/20 px-1.5 ml-1.5 font-sans text-[11px] text-kbd leading-none opacity-100 flex", children: _jsx(Icons.enter, { className: "h-2.5 w-2.5" }) })] })) }) })] })] }) }));
}
//# sourceMappingURL=component.js.map