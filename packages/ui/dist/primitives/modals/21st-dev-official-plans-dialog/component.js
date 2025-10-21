"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Spinner } from "@/components/icons/spinner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatPrice } from "@/lib/utils";
import { useClerk, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function PlansDialog({ plans, initialSelectedPlan, initialOpen, onClose, readonly = false, }) {
    const { user } = useUser();
    const [selectedPlan, setSelectedPlan] = useState(initialSelectedPlan);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(initialOpen);
    const theme = useTheme();
    const { openSignUp } = useClerk();
    useEffect(() => {
        setOpen(initialOpen);
    }, [initialOpen]);
    useEffect(() => {
        setSelectedPlan(initialSelectedPlan);
    }, [initialSelectedPlan]);
    useEffect(() => {
        if (open === false) {
            onClose?.();
        }
    }, [open]);
    if (plans.length === 0) {
        return null;
    }
    const handlePlanSelected = (id) => {
        const plan = plans.find((p) => p.id === id);
        if (plan) {
            setSelectedPlan(plan);
        }
    };
    const redirectToCheckout = async (plan) => {
        if (!user) {
            openSignUp({
                appearance: {
                    baseTheme: theme.theme === "dark" ? dark : undefined,
                },
                redirectUrl: window.location.href,
            });
            return;
        }
        if (!plans.some((p) => p.id === plan.id)) {
            toast.error("Plan not found");
            return;
        }
        const returnUrl = `${window.location.origin}/${user.username}/?tab=${"purchased_bundles"}`;
        const response = await fetch("/api/stripe/create-checkout-bundle", {
            method: "POST",
            body: JSON.stringify({
                bundleId: plan.bundle_id,
                planId: plan.id,
                successUrl: returnUrl,
                cancelUrl: returnUrl,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            window.location.href = data.url;
        }
        else {
            toast.error("Failed to create checkout for bundle");
        }
    };
    const onPlanConfirmed = async (plan) => {
        setIsLoading(true);
        await redirectToCheckout(plan);
        setIsLoading(false);
    };
    const handleOpenChange = (open) => {
        if (isLoading) {
            return;
        }
        setOpen(open);
    };
    return (_jsx(Dialog, { open: open, onOpenChange: handleOpenChange, children: _jsx(DialogContent, { hideCloseButton: true, className: "w-full sm:w-fit", children: _jsxs("fieldset", { disabled: isLoading, className: "flex flex-col gap-4", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-left", children: "Choose your plan" }), _jsx(DialogDescription, { className: "text-left", children: "Select the perfect plan for your needs" })] }), _jsx(RadioGroup, { disabled: readonly, className: "flex flex-col gap-4 sm:flex-row overflow-auto", value: selectedPlan?.id?.toString() ?? undefined, onValueChange: (value) => handlePlanSelected(Number(value)), children: plans.map((plan) => {
                            return (_jsxs("label", { className: `relative w-full sm:w-72 flex flex-col rounded-lg gap-3 border border-input p-4 shadow-sm transition-colors duration-50 has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent flex-shrink-0`, children: [_jsx(RadioGroupItem, { value: plan.id.toString(), id: plan.id.toString(), className: "hidden" }), _jsx("div", { className: "flex items-center flex-col gap-2", children: _jsxs("div", { className: "flex items-center w-full justify-between", children: [_jsx("h1", { className: "font-semibold capitalize", children: plan.type }), _jsxs("div", { className: "flex items-baseline shrink-0", children: [_jsx("h1", { className: "font-semibold text-xl", children: formatPrice(plan.price / 100) }), _jsx("span", { className: "ml-1 text-xs text-muted-foreground", children: "for lifetime" })] })] }) }), _jsxs("div", { className: "overflow-y-scroll sm:max-h-[400px] flex flex-col gap-2", children: [plan.description && (_jsx("p", { className: "text-sm text-muted-foreground", children: plan.description })), plan.features.length > 0 && (_jsx("ul", { className: "space-y-2", children: plan.features.map((feature, index) => (_jsxs("li", { className: "flex gap-2 text-sm text-muted-foreground", children: [_jsx(Check, { size: 16, strokeWidth: 2, className: "mt-0.5 shrink-0 text-primary", "aria-hidden": "true" }), feature] }, index))) }))] })] }, plan.id));
                        }) }), _jsx(DialogFooter, { className: "flex flex-col gap-2 sm:flex-row", children: !readonly ? (_jsxs(_Fragment, { children: [_jsxs(Button, { type: "button", className: "gap-2", onClick: () => {
                                        if (selectedPlan) {
                                            onPlanConfirmed(selectedPlan);
                                        }
                                    }, children: [isLoading && _jsx(Spinner, { size: 16, color: "white" }), "Confirm Selection"] }), _jsx(DialogClose, { asChild: true, children: _jsx(Button, { type: "button", variant: "outline", children: "Cancel" }) })] })) : (_jsx(DialogClose, { asChild: true, children: _jsx(Button, { type: "button", variant: "outline", children: "Close" }) })) })] }) }) }));
}
//# sourceMappingURL=component.js.map