"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { formatPrice } from "@/lib/utils";
export function TemplatePreviewModal({ template, isOpen, onClose, }) {
    if (!template)
        return null;
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "w-[80vw] max-w-[80vw] !max-w-none h-[80vh] p-0 gap-0 overflow-hidden", hideCloseButton: true, children: [_jsxs(DialogHeader, { className: "h-14 px-6 flex flex-row items-center justify-between border-b text-sm", children: [_jsx(DialogTitle, { className: "text-md font-medium", children: template.name }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "gap-2", onClick: () => window.open(template.website_preview_url, "_blank"), children: [_jsx("span", { children: "Open Preview" }), _jsx(ExternalLink, { size: 16 })] }), _jsx(Button, { variant: "outline", size: "sm", className: "gap-2", asChild: true, children: _jsx("a", { href: template.payment_url || "#", target: "_blank", rel: "noopener noreferrer", children: template.price > 0 ? (_jsxs("span", { children: ["Buy for ", formatPrice(template.price)] })) : (_jsxs(_Fragment, { children: [_jsx(Download, { size: 16 }), _jsx("span", { children: "Download" })] })) }) })] })] }), _jsx("div", { className: "flex-1 h-[calc(80vh-3.5rem)] overflow-hidden", children: _jsx("div", { className: "w-[125%] h-[125%] origin-top-left scale-[0.8]", children: _jsx("iframe", { src: template.website_preview_url, className: "w-full h-full border-0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }) }) })] }) }));
}
//# sourceMappingURL=component.js.map