"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { pricingFrequencyAtom } from "./pricing-tab";
import { SignInButton } from "@clerk/nextjs";
const planOrder = {
    free: 1,
    pro: 2,
    pro_plus: 3,
};
const getButtonText = (tierType, currentPlan, currentFrequency, frequency) => {
    const isDowngrade = (planOrder[tierType] ?? 0) < (planOrder[currentPlan || "free"] ?? 0);
    const isCurrentPlan = tierType === currentPlan;
    // Always show "Current Plan" for free plan regardless of frequency
    if (tierType === "free" && currentPlan === "free") {
        return "Current Plan";
    }
    if (isCurrentPlan && currentFrequency !== frequency) {
        return frequency === "yearly"
            ? "Switch to yearly billing"
            : "Switch to monthly billing";
    }
    if (isCurrentPlan)
        return "Current Plan";
    return isDowngrade ? "Downgrade" : "Upgrade";
};
const handlePlanSelect = (planType, currentPlan, currentFrequency, frequency, onUpgrade, onDowngrade) => {
    const isDowngrade = (planOrder[planType] ?? 0) < (planOrder[currentPlan || "free"] ?? 0);
    if (planType === currentPlan && currentFrequency !== frequency) {
        onUpgrade(planType, frequency);
    }
    else if (isDowngrade) {
        onDowngrade();
    }
    else {
        onUpgrade(planType, frequency);
    }
};
// Add helper function at the top of the file
function formatPriceFeature(feature, frequency) {
    if (!feature.includes("monthly / $")) {
        return feature;
    }
    try {
        const [prefix, pricesSection] = feature.split("($");
        if (!pricesSection)
            return feature;
        const prices = pricesSection.replace(")", "");
        const [monthlyPrice, restOfPrice] = prices.split(" / $");
        if (!monthlyPrice || !restOfPrice)
            return feature;
        const [yearlyPrice, suffix] = restOfPrice.split(" per ");
        if (!suffix)
            return feature;
        return `${prefix}($${frequency === "yearly" ? yearlyPrice : monthlyPrice} per ${suffix})`;
    }
    catch {
        return feature;
    }
}
export function PlanComparisonTable({ features, plans, className, currentPlan = "free", currentFrequency = "monthly", onUpgrade, onDowngrade, isAuthenticated = false, ...props }) {
    const [frequency] = useAtom(pricingFrequencyAtom);
    const isYearly = frequency === "yearly";
    // Group features by section
    const featureSections = features.reduce((acc, feature) => {
        const section = feature.section || "Features";
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(feature);
        return acc;
    }, {});
    const sectionNames = Object.keys(featureSections);
    // Function to render the feature value
    const renderFeatureValue = (value, planType, featureName) => {
        if (value === "check") {
            return _jsx(CheckValue, {});
        }
        // Show appropriate values for Premium Components and AI Generation in free plan
        if (planType === "free") {
            if (featureName === "Premium Components") {
                return "-";
            }
            if (featureName === "AI Component Generation") {
                return "5 free generation";
            }
        }
        if (typeof value === "string") {
            return value;
        }
        if (value &&
            typeof value === "object" &&
            "monthly" in value &&
            "yearly" in value) {
            return value[frequency];
        }
        return value;
    };
    const renderUpgradeButton = (plan) => {
        const buttonText = getButtonText(plan.type, currentPlan, currentFrequency, frequency);
        const buttonContent = (_jsx(Button, { variant: plan.type === "pro_plus" ? "default" : "outline", className: cn("justify-center", plan.type === "pro_plus" && "bg-black text-white hover:bg-black/90"), onClick: () => handlePlanSelect(plan.type, currentPlan, currentFrequency, frequency, onUpgrade, onDowngrade), disabled: buttonText === "Current Plan", children: buttonText }));
        if (!isAuthenticated && plan.type !== "free") {
            return _jsx(SignInButton, { mode: "modal", children: buttonContent });
        }
        return buttonContent;
    };
    return (_jsxs("div", { className: cn("w-full", className), ...props, children: [_jsxs("div", { className: "grid grid-cols-4 mb-8 gap-8 items-baseline", children: [_jsx("div", { className: "col-span-1 pt-10", children: _jsx("h2", { className: "text-2xl font-bold tracking-tight", children: "Compare plans & features" }) }), plans.map((plan) => {
                        const rawPrice = isYearly ? plan.price.yearly : plan.price.monthly;
                        const price = isYearly
                            ? typeof rawPrice === "number"
                                ? (rawPrice / 12).toFixed(0)
                                : (parseFloat(rawPrice) / 12).toFixed(0)
                            : rawPrice;
                        const period = isYearly
                            ? {
                                primary: "per month",
                                secondary: "billed yearly",
                            }
                            : "per mo";
                        const tokenPriceFormatted = plan.tokenPrice[frequency].toFixed(2);
                        return (_jsxs("div", { className: "col-span-1 flex flex-col", children: [_jsxs("div", { className: "mb-2 flex items-center gap-2", children: [_jsx("h3", { className: "text-xl font-semibold", children: plan.name }), plan.popular && (_jsx("span", { className: "inline-block text-xs font-medium bg-blue-100 text-blue-600 px-2 py-1 rounded-md", children: "Popular" }))] }), _jsxs("div", { className: "mb-6 flex flex-col gap-2", children: [_jsxs("div", { className: "flex gap-2 items-end", children: [_jsx("div", { className: "flex", children: _jsx("span", { className: "text-4xl font-bold", children: typeof price === "number" ? `$${price}` : `$${price}` }) }), _jsx("div", { className: "text-sm text-muted-foreground", children: typeof period === "string" ? (period) : (_jsxs(_Fragment, { children: [_jsx("div", { children: period.primary }), _jsx("div", { children: period.secondary })] })) })] }), plan.tokens && (_jsx("div", { className: "text-sm text-muted-foreground", children: plan.type === "free"
                                                ? `${plan.tokens} tokens included`
                                                : `${plan.tokens} tokens included ($${tokenPriceFormatted}/token)` }))] }), renderUpgradeButton(plan)] }, plan.type));
                    })] }), sectionNames.map((sectionName) => (_jsxs("div", { className: "mb-12", children: [_jsx("h3", { className: "text-xl font-semibold mb-4", children: sectionName }), _jsx("div", { className: "bg-background border rounded-lg overflow-hidden", children: featureSections[sectionName]?.map((feature, idx) => (_jsxs("div", { className: cn("grid grid-cols-4 py-4 gap-8", idx !== (featureSections[sectionName]?.length ?? 0) - 1 &&
                                "border-b"), children: [_jsx("div", { className: "col-span-1 flex items-center", children: _jsx("span", { className: "text-sm font-medium pl-6", children: feature.name }) }), plans.map((plan) => (_jsx("div", { className: "col-span-1 flex items-center justify-P", children: renderFeatureValue(feature.values[plan.type], plan.type, feature.name) }, `${feature.name}-${plan.type}`)))] }, feature.name))) })] }, sectionName)))] }));
}
// Helper function to render feature value check mark
export function CheckValue() {
    return _jsx(Check, { className: "h-5 w-5 text-green-500" });
}
//# sourceMappingURL=component.js.map