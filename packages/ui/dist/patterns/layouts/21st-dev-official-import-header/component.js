import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFormContext } from "react-hook-form";
export function ImportHeader({ showUrlInput, isLoading, onSubmit, formStep, isSubmitting, onEditDemoCode, onSaveDemoCode, isEditingFromCard, }) {
    const form = useFormContext();
    const currentDemo = form.watch("demos.0");
    const isValid = currentDemo?.tags?.length > 0 && currentDemo?.preview_image_data_url;
    return (_jsxs("div", { className: "flex items-center justify-between min-h-12 border-b bg-background z-50 pointer-events-auto px-4 sticky top-0", children: [_jsx(Link, { href: "/", className: "flex items-center justify-center w-7 h-7 rounded-full cursor-pointer bg-foreground" }), _jsx("div", { className: "flex-1" }), _jsxs("div", { className: "text-center font-medium mr-8", children: ["Import component", _jsx(Badge, { variant: "secondary", className: "h-5 text-[11px] tracking-wide font-medium uppercase px-1.5 py-0 leading-none ml-2", children: "beta" })] }), _jsx("div", { className: "flex items-center gap-2 flex-1 justify-end", children: !showUrlInput && (_jsx(_Fragment, { children: formStep === "demoCode" ? (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "outline", onClick: onSaveDemoCode, disabled: isLoading, children: "Back" }), _jsx(Button, { onClick: onSaveDemoCode, disabled: isLoading, children: "Save demo" })] })) : (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "outline", onClick: onEditDemoCode, disabled: isLoading, children: "Edit demo" }), _jsx(Button, { onClick: onSubmit, disabled: isSubmitting || !isValid, className: "relative min-w-24", children: isSubmitting ? (_jsx(LoaderCircle, { className: "animate-spin", size: 16, strokeWidth: 2, "aria-hidden": "true" })) : ("Publish") })] })) })) })] }));
}
//# sourceMappingURL=component.js.map