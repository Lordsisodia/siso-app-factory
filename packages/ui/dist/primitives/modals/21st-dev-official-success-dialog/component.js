import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSuccessDialogHotkeys } from "../hooks/use-hooks";
import { Icons } from "../../../icons";
export function SuccessDialog({ isOpen, onOpenChange, onAddAnother, onGoToComponent, mode = "component", }) {
    useSuccessDialogHotkeys({ isOpen, onAddAnother, onGoToComponent });
    const title = mode === "component"
        ? "Component Submited for Review"
        : "Demo Added Successfully";
    const description = mode === "component"
        ? "You can preview your component, it will be public after approval. Review usually takes 24 hours."
        : "Your new demo has been successfully added. What would you like to do next?";
    const addAnotherText = mode === "component" ? "Add another" : "Add another";
    const viewText = mode === "component" ? "View Component" : "View Demo";
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: title }), _jsx(DialogDescription, { className: "break-words", children: description })] }), _jsxs(DialogFooter, { children: [_jsxs(Button, { onClick: onAddAnother, variant: "outline", children: [addAnotherText, _jsx("kbd", { className: "hidden md:inline-flex h-5 items-center rounded border border-border px-1.5 ml-1.5 font-mono text-[11px] font-medium text-muted-foreground", children: "N" })] }), _jsxs(Button, { onClick: onGoToComponent, variant: "default", children: [viewText, _jsxs("kbd", { className: "pointer-events-none h-5 select-none items-center gap-1 rounded border-muted-foreground/40 bg-muted-foreground/20 px-1.5 ml-1.5 font-sans  text-[11px] text-kbd leading-none  opacity-100 flex", children: [_jsx("span", { className: "text-[11px] leading-none font-sans", children: navigator?.platform?.toLowerCase()?.includes("mac")
                                                ? "⌘"
                                                : "Ctrl" }), _jsx(Icons.enter, { className: "h-2.5 w-2.5" })] })] })] })] }) }));
}
//# sourceMappingURL=component.js.map