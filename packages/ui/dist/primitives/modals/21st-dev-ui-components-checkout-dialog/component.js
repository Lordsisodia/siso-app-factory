"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useId } from "react";
import { CreditCard, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export function CheckoutDialog({ selectedPlan, isYearly, onCheckout, }) {
    const id = useId();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const handleCheckout = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onCheckout();
        }
        catch (error) {
            console.error("Checkout error:", error);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsxs("div", { className: "mb-5 flex flex-col items-start gap-2", children: [_jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-full border", "aria-hidden": "true", children: _jsx(Store, { className: "h-5 w-5" }) }), _jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Complete your purchase" }), _jsxs(DialogDescription, { children: [selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1), " ", "Plan - ", isYearly ? "Yearly" : "Monthly"] })] })] }), _jsxs("form", { onSubmit: handleCheckout, className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: `${id}-name`, children: "Name on card" }), _jsx(Input, { id: `${id}-name`, placeholder: "John Smith", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Card details" }), _jsxs("div", { className: "rounded-md border", children: [_jsxs("div", { className: "relative", children: [_jsx(Input, { placeholder: "Card number", className: "border-0 rounded-b-none", required: true }), _jsx("div", { className: "absolute right-3 top-2.5 text-muted-foreground", children: _jsx(CreditCard, { className: "h-4 w-4" }) })] }), _jsxs("div", { className: "flex", children: [_jsx(Input, { placeholder: "MM/YY", className: "border-0 rounded-none border-t", required: true }), _jsx(Input, { placeholder: "CVC", className: "border-0 rounded-none border-t border-l", required: true })] })] })] })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? "Processing..." : "Complete Purchase" })] }), _jsxs("p", { className: "text-center text-xs text-muted-foreground", children: ["By continuing, you agree to our", " ", _jsx("a", { href: "#", className: "underline hover:no-underline", children: "terms" }), " ", "and", " ", _jsx("a", { href: "#", className: "underline hover:no-underline", children: "conditions" }), "."] })] }) }));
}
//# sourceMappingURL=component.js.map