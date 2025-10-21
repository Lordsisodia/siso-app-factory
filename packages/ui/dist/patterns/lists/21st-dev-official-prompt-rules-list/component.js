"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Code, Palette } from "lucide-react";
import { useClerkSupabaseClient } from "@/lib/clerk";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { deletePromptRule } from "@/lib/queries";
import { toast } from "sonner";
export function PromptRulesList({ promptRules }) {
    const router = useRouter();
    const supabase = useClerkSupabaseClient();
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedRuleId, setSelectedRuleId] = useState(null);
    const handleDelete = async (id) => {
        setIsDeleting(true);
        try {
            await deletePromptRule(supabase, id);
            toast.success("Rule deleted successfully");
            router.refresh();
        }
        catch (error) {
            toast.error("Failed to delete rule");
            console.error(error);
        }
        finally {
            setIsDeleting(false);
            setSelectedRuleId(null);
        }
    };
    if (promptRules.length === 0) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: [_jsx("h3", { className: "text-lg font-medium", children: "No rules created yet" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-4", children: "Create your first AI rule to enhance your prompts" }), _jsx(Button, { asChild: true, children: _jsx(Link, { href: "/settings/rules/new", children: "Create New Rule" }) })] }));
    }
    return (_jsx("div", { className: "space-y-1 rounded-md border bg-card", children: promptRules.map((rule) => (_jsxs("div", { className: "flex items-center justify-between p-4 hover:bg-accent/50", children: [_jsx("div", { className: "flex items-center gap-4", children: _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-medium", children: rule.name }), _jsx("span", { className: "text-xs text-muted-foreground", children: new Date(rule.created_at).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        }) })] }), _jsxs("div", { className: "mt-1 flex items-center gap-2 text-sm text-muted-foreground", children: [_jsx(Code, { className: "h-4 w-4" }), _jsx("div", { className: "flex flex-wrap gap-1", children: rule.tech_stack.length > 0 ? (rule.tech_stack.map((tech, index) => (_jsxs(Badge, { variant: "secondary", className: "text-xs", children: [tech.name, " ", tech.version && `(${tech.version})`] }, index)))) : (_jsx("span", { className: "text-xs", children: "No tech stack specified" })) }), Object.keys(rule.theme).length > 0 && (_jsxs(_Fragment, { children: [_jsx(Palette, { className: "ml-2 h-4 w-4" }), _jsx("span", { className: "text-xs", children: "Custom theme" })] }))] })] }) }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuItem, { asChild: true, children: _jsx(Link, { href: `/settings/rules/${rule.id}`, children: "Edit" }) }), _jsx(DropdownMenuItem, { className: "text-destructive", onClick: () => rule.id && handleDelete(rule.id), children: "Remove" })] })] })] }, rule.id))) }));
}
//# sourceMappingURL=component.js.map