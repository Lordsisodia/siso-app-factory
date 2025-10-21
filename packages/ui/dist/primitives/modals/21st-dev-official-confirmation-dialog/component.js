import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
export function ConfirmationDialog({ open, onOpenChange, title, description, onConfirm, isLoading, }) {
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: title }), _jsx(DialogDescription, { children: description })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }), _jsx(Button, { variant: "destructive", onClick: onConfirm, disabled: isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(LoaderCircle, { className: "mr-2 h-3 w-3 animate-spin" }), "Processing"] })) : ("Confirm") })] })] }) }));
}
//# sourceMappingURL=component.js.map