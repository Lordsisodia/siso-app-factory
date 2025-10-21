"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, FlaskRound } from "lucide-react";
import { Spinner } from "@/components/icons/spinner";
import { cn } from "@/lib/utils";
export function VersionSelectorDialog({ isOpen, onOpenChange, username, onCreateSandbox, isCreating = false, }) {
    const router = useRouter();
    // const handleStableVersion = () => {
    //   router.push("/publish")
    //   onOpenChange(false)
    // }
    const handleBetaVersion = async () => {
        if (onCreateSandbox) {
            // Don't close the dialog - let the creation finish while showing loading state
            // The parent component will handle closing the dialog after creation
            await onCreateSandbox();
        }
        else {
            if (username) {
                router.push(`/studio/${username}?beta=true`);
            }
            else {
                router.push("/studio?beta=true");
            }
            onOpenChange(false);
        }
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: (open) => {
            if (!isCreating) {
                onOpenChange(open);
            }
        }, children: _jsx(DialogContent, { hideCloseButton: true, className: "sm:max-w-[400px] bg-background p-0 rounded-xl shadow-lg border-none", children: _jsx("div", { className: "grid grid-cols-1 gap-0", children: _jsx("div", { className: "group p-1 pb-4 bg-muted text-foreground rounded-xl", children: _jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex-grow rounded-lg p-4 mb-4 border border-muted-foreground/20", children: [_jsxs("div", { className: "flex flex-col items-start gap-2 mb-4 pl-2", children: [_jsx(FlaskRound, { className: "h-7 w-7 text-foreground" }), _jsx("h3", { className: "font-semibold", children: "Publish 2.0 (Beta)" })] }), _jsxs("ul", { className: "space-y-0 divide-y divide-muted-foreground/20", children: [_jsxs("li", { className: "flex items-center gap-2 py-2 px-2", children: [_jsx(Check, { className: "h-4 w-4 text-foreground/70 shrink-0" }), _jsx("span", { className: "text-sm", children: "Dedicated sandbox per project" })] }), _jsxs("li", { className: "flex items-center gap-2 py-2 px-2", children: [_jsx(Check, { className: "h-4 w-4 text-foreground/70 shrink-0" }), _jsx("span", { className: "text-sm", children: "Add components from 21st registry" })] }), _jsxs("li", { className: "flex items-center gap-2 py-2 px-2", children: [_jsx(Check, { className: "h-4 w-4 text-foreground/70 shrink-0" }), _jsx("span", { className: "text-sm", children: "Developer-friendly experience" })] }), _jsxs("li", { className: "flex items-center gap-2 py-2 px-2", children: [_jsx(Check, { className: "h-4 w-4 text-foreground/70 shrink-0" }), _jsx("span", { className: "text-sm", children: "Built-in code editor" })] }), _jsxs("li", { className: "flex items-center gap-2 py-2 px-2", children: [_jsx(Check, { className: "h-4 w-4 text-foreground/70 shrink-0" }), _jsx("span", { className: "text-sm", children: "Tailwind 4 support" })] }), _jsxs("li", { className: "flex items-center gap-2 py-2 px-2", children: [_jsx(Check, { className: "h-4 w-4 text-foreground/70 shrink-0" }), _jsx("span", { className: "text-sm", children: "Draft mode" })] }), _jsxs("li", { className: "flex items-start gap-2 py-2 px-2 text-amber-500", children: [_jsx("span", { className: "shrink-0 mt-[-3] mx-1", children: "\u2022" }), _jsx("span", { className: "text-sm", children: "May contain minor bugs" })] })] })] }), _jsx("div", { className: "mt-auto px-3", children: _jsx(Button, { onClick: handleBetaVersion, disabled: isCreating, className: cn("whitespace-nowrap w-full bg-primary/80 text-primary-foreground hover:bg-primary/90 backdrop-blur-sm border-none", isCreating ? "" : "pr-1.5"), children: isCreating ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Spinner, { size: 16, color: "white" }), _jsx("span", { children: "Creating..." })] })) : (_jsx(_Fragment, { children: "Create Component" })) }) })] }) }) }) }) }));
}
//# sourceMappingURL=component.js.map