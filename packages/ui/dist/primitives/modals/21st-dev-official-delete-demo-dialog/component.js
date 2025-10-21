import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
export function DeleteDemoDialog({ isOpen, onOpenChange, onConfirm, demoName, }) {
    return (_jsx(AlertDialog, { open: isOpen, onOpenChange: onOpenChange, children: _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsx(AlertDialogTitle, { children: "Delete demo?" }), _jsxs(AlertDialogDescription, { children: ["Are you sure you want to delete \"", demoName, "\" demo? This action cannot be undone."] })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { children: "Cancel" }), _jsx(AlertDialogAction, { onClick: onConfirm, children: "Delete" })] })] }) }));
}
//# sourceMappingURL=component.js.map