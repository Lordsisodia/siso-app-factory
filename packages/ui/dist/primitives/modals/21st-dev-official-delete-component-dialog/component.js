import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
const DeleteComponentDialog = ({ isOpen, onClose, onDelete, componentName, isDeleting, }) => {
    const [deleteMode, setDeleteMode] = useState(null);
    const [error, setError] = useState(null);
    const handleDelete = async () => {
        if (!deleteMode) {
            setError("Please select a deletion mode");
            return;
        }
        try {
            setError(null);
            await onDelete(deleteMode);
        }
        catch (err) {
            setError("Failed to delete component. Please try again.");
        }
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "sm:max-w-md", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "text-destructive flex items-center gap-2", children: [_jsx(Trash, { size: 18 }), "Delete Component"] }), _jsxs(DialogDescription, { children: ["You are about to delete \"", componentName, "\". This action cannot be undone."] })] }), _jsxs("div", { className: "space-y-4 py-4", children: [error && (_jsxs("div", { className: "flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-2 rounded-md", children: [_jsx(AlertCircle, { size: 16 }), _jsx("span", { children: error })] })), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "delete-mode", children: "Delete mode" }), _jsxs(Select, { onValueChange: (value) => setDeleteMode(value), children: [_jsx(SelectTrigger, { id: "delete-mode", children: _jsx(SelectValue, { placeholder: "Select deletion mode" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "submission", children: "Remove from submissions only" }), _jsx(SelectItem, { value: "component", children: "Delete component completely" })] })] }), _jsx("p", { className: "text-xs text-muted-foreground", children: deleteMode === "submission"
                                        ? "This will only remove the component from the submissions list, but keep the component itself."
                                        : deleteMode === "component"
                                            ? "This will permanently delete the component, all its demos, and code from the database."
                                            : "Please select a deletion mode" })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: onClose, disabled: isDeleting, children: "Cancel" }), _jsx(Button, { variant: "destructive", onClick: handleDelete, disabled: !deleteMode || isDeleting, children: isDeleting ? "Deleting..." : "Delete" })] })] }) }));
};
export default DeleteComponentDialog;
//# sourceMappingURL=component.js.map