"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
export function PricingCard({ tier, paymentFrequency = "monthly", plan, isYearly = false, isLoading = false, onClick, isFeatured, isActive, }) {
    const usingTier = !!tier;
    const name = usingTier ? tier.name : plan?.name || "";
    const description = usingTier ? tier.description : plan?.description || "";
    const features = usingTier ? tier.features : plan?.features || [];
    const buttonText = usingTier ? tier.cta : plan?.buttonText || "Get Started";
    const isPlanFeatured = usingTier
        ? tier.popular
        : isFeatured || plan?.isFeatured;
    const href = usingTier ? tier.href : undefined;
    let price = 0;
    let pricePeriod = "/month";
    if (usingTier && tier) {
        price = tier.price[paymentFrequency] || 0;
        pricePeriod = paymentFrequency === "yearly" ? "/year" : "/month";
    }
    else if (plan) {
        if (isYearly && plan.yearlyPrice !== undefined) {
            price = plan.yearlyPrice;
            pricePeriod = "/year";
        }
        else if (plan.monthlyPrice !== undefined) {
            price = plan.monthlyPrice;
            pricePeriod = "/month";
        }
    }
    const monthlyPrice = typeof price === "number" && pricePeriod === "/year"
        ? Math.round(price / 12)
        : null;
    return (_jsxs(Card, { className: cn("relative flex flex-col overflow-hidden p-8 border-white/10 bg-white/5 min-h-[33rem]", isPlanFeatured && "ring-2 ring-accent/50", isActive && "ring-2 ring-primary/50"), children: [_jsxs(motion.div, { layout: true, className: "flex-1 space-y-8", children: [_jsxs(motion.div, { layout: true, className: "text-center", children: [_jsx(motion.h3, { layout: true, className: "text-lg font-semibold text-neutral-200", children: name }), _jsx(motion.div, { layout: true, className: "mt-2 min-h-[54px] flex items-center justify-center ", children: typeof price === "number" ? (_jsxs("div", { className: "flex items-end justify-end", children: [_jsx(motion.span, { layout: true, className: "text-4xl font-bold text-neutral-200", children: _jsx(NumberFlow, { format: {
                                                    style: "currency",
                                                    currency: "USD",
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                }, value: price }) }), _jsx(motion.span, { layout: true, className: "text-neutral-400 mb-2", children: pricePeriod })] })) : (_jsxs(motion.span, { layout: true, className: "text-4xl font-bold text-neutral-200", children: ["$", price] })) }), monthlyPrice && (_jsxs(motion.p, { layout: true, initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "mt-1 text-sm text-neutral-400", children: ["$", monthlyPrice, "/month billed yearly"] })), _jsx(motion.p, { layout: true, className: "mt-2 text-sm text-neutral-400", children: description })] }), _jsx(motion.ul, { layout: true, className: "space-y-4", children: features.map((feature, featureIndex) => (_jsxs(motion.li, { layout: true, className: "flex items-start gap-x-2 ", children: [_jsx(Check, { className: "h-5 w-5 min-w-5 min-h-5 text-neutral-200 mt-1" }), _jsx("span", { className: "text-neutral-400", children: feature })] }, featureIndex))) })] }), _jsx(motion.div, { layout: true, className: "mt-8", children: _jsx(Button, { variant: "default", size: "lg", className: cn("w-full bg-neutral-200 text-black hover:bg-white/90", isActive &&
                        "bg-primary text-primary-foreground hover:bg-primary/90"), onClick: onClick, disabled: isLoading, asChild: !!href, children: href ? (_jsx("a", { href: href, children: isLoading ? "Loading..." : buttonText })) : isLoading ? ("Loading...") : (buttonText) }) })] }));
}
//# sourceMappingURL=component.js.map