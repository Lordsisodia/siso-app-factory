"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
export default function ConfirmDialog({ show, title, message, confirmText = "Confirm", cancelText = "Cancel", onConfirm, onCancel, variant = "danger" }) {
    const variants = {
        danger: {
            icon: _jsx(AlertTriangle, { className: "size-6 text-red-500" }),
            confirmButton: "bg-red-600 hover:bg-red-700 text-white",
            titleColor: "text-red-500"
        },
        warning: {
            icon: _jsx(AlertTriangle, { className: "size-6 text-yellow-500" }),
            confirmButton: "bg-yellow-600 hover:bg-yellow-700 text-white",
            titleColor: "text-yellow-500"
        },
        info: {
            icon: _jsx(AlertTriangle, { className: "size-6 text-blue-500" }),
            confirmButton: "bg-blue-600 hover:bg-blue-700 text-white",
            titleColor: "text-blue-500"
        }
    };
    const currentVariant = variants[variant];
    if (!show)
        return null;
    return (_jsx(Dialog, { open: show, onOpenChange: onCancel, children: _jsxs(DialogContent, { className: "max-w-md border-gray-700 bg-gray-900 text-white", children: [_jsx(DialogHeader, { children: _jsxs("div", { className: "flex items-center space-x-3", children: [currentVariant.icon, _jsx(DialogTitle, { className: `text-lg font-semibold ${currentVariant.titleColor}`, children: title })] }) }), _jsx("div", { className: "py-4", children: _jsx("p", { className: "text-gray-300", children: message }) }), _jsxs("div", { className: "flex justify-end space-x-3", children: [_jsx(Button, { variant: "outline", onClick: onCancel, className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: cancelText }), _jsx(Button, { onClick: onConfirm, className: currentVariant.confirmButton, children: confirmText })] })] }) }));
}
//# sourceMappingURL=component.js.map