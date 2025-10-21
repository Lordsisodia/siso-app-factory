"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Check, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import { Spinner } from "@/components/icons/spinner";
import { toast } from "sonner";
import { PLAN_LIMITS } from "@/lib/config/subscription-plans";
import { CircleProgress } from "@/components/ui/circle-progress";
import { trackAttribution, ATTRIBUTION_SOURCE, SOURCE_DETAIL, } from "@/lib/attribution-tracking";
export function UpgradeProStep({ apiKey, onComplete }) {
    const currentPlan = (apiKey?.plan || "free");
    const [isUpgradeLoading, setIsUpgradeLoading] = useState(false);
    const [isCompletingOnboarding, setIsCompletingOnboarding] = useState(false);
    // Determine which plan to show as upgrade
    let upgradePlan = null;
    if (currentPlan === "free") {
        upgradePlan = "pro";
    }
    else if (currentPlan === "pro") {
        upgradePlan = "pro_plus";
    }
    // Add keyboard shortcut for Enter key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                handleCompleteOnboarding();
            }
            else if (e.key === "u" || e.key === "U") {
                e.preventDefault();
                // Navigate to billing page if there's an upgrade option
                if (upgradePlan) {
                    handleUpgradePlan(upgradePlan);
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onComplete, upgradePlan]);
    const handleCompleteOnboarding = () => {
        if (isCompletingOnboarding)
            return;
        setIsCompletingOnboarding(true);
        onComplete();
    };
    const handleUpgradePlan = async (planId) => {
        // Track attribution when upgrading from onboarding
        trackAttribution(ATTRIBUTION_SOURCE.MAGIC, SOURCE_DETAIL.MAGIC_ONBOARDING);
        setIsUpgradeLoading(true);
        try {
            const response = await fetch("/api/stripe/create-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    planId,
                    period: "monthly",
                    successUrl: `${window.location.origin}/settings/billing?success=true`,
                    cancelUrl: `${window.location.origin}/settings/billing?canceled=true`,
                    isUpgrade: true,
                    currentPlanId: currentPlan,
                    attributionSource: ATTRIBUTION_SOURCE.MAGIC,
                    sourceDetail: SOURCE_DETAIL.MAGIC_ONBOARDING,
                }),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to create checkout session");
            }
            const data = await response.json();
            if (data.directly_upgraded) {
                toast.success("Plan successfully upgraded", {
                    description: "Your subscription has been upgraded to the new plan",
                    duration: 5000,
                });
                // Redirect to billing page to see updated subscription
                window.location.href = "/settings/billing";
            }
            else {
                window.location.href = data.url;
            }
        }
        catch (error) {
            toast.error(error instanceof Error
                ? error.message
                : "Failed to initiate plan change process. Please try again later.");
        }
        finally {
            setIsUpgradeLoading(false);
        }
    };
    // Mock usage data - in a real app, this would come from the API
    const usageCount = 30;
    const usageLimit = PLAN_LIMITS[currentPlan].generationsPerMonth;
    const calculateProgressOffset = (used, limit) => {
        return 2 * Math.PI * 8 * (1 - used / limit);
    };
    return (_jsxs("div", { className: "flex flex-col space-y-8 px-4 max-w-[700px] mx-auto", children: [_jsxs("div", { className: "space-y-4 max-w-2xl", children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Upgrade to Pro" }), _jsx("p", { className: "text-lg text-muted-foreground", children: "Get unlimited access to Magic MCP and premium features" })] }), _jsxs("div", { className: "space-y-6 max-w-3xl", children: [_jsx("div", { className: "space-y-2", children: _jsx("div", { className: "bg-background rounded-lg border border-border overflow-hidden", children: _jsxs("div", { className: "p-4 flex flex-col md:flex-row md:justify-between gap-4 md:gap-0", children: [_jsx("div", { className: "flex flex-col justify-between", children: _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h3", { className: "text-sm font-medium", children: PLAN_LIMITS[currentPlan].displayName }), _jsx("span", { className: "bg-muted/80 text-accent-foreground px-2 py-0.5 rounded-sm text-xs border shadow-inner", children: "Current plan" })] }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: PLAN_LIMITS[currentPlan].description })] }) }), _jsxs("div", { className: "flex flex-col justify-between items-end space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between w-full gap-3", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-5 mr-2", children: _jsx(CircleProgress, { progress: usageCount / usageLimit }) }), _jsx("div", { className: "text-sm text-foreground", children: "New UI Generations" })] }), _jsxs("div", { className: "text-sm tabular-nums", children: [usageCount.toLocaleString(), " /", " ", usageLimit.toLocaleString()] })] }), _jsxs("div", { className: "flex items-center justify-between w-full gap-3", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-5 mr-2 flex justify-center items-center", children: _jsx("div", { className: "flex items-center justify-center h-6 w-6 p-1 pb-2", children: _jsx("span", { className: "text-[22px] leading-none", children: "\u221E" }) }) }), _jsx("div", { className: "text-sm text-foreground", children: "UI Inspirations" })] }), _jsx("span", { className: "bg-muted/80 text-accent-foreground px-2 py-0.5 rounded-sm text-xs border shadow-inner", children: "unlimited" })] }), _jsxs("div", { className: "flex items-center justify-between w-full gap-3", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "w-5 mr-2 flex justify-center items-center", children: _jsx("div", { className: "flex items-center justify-center h-6 w-6 p-1 pb-2", children: _jsx("span", { className: "text-[22px] leading-none", children: "\u221E" }) }) }), _jsx("div", { className: "text-sm text-foreground", children: "SVG Logo Searches" })] }), _jsx("span", { className: "bg-muted/80 text-accent-foreground px-2 py-0.5 rounded-sm text-xs border shadow-inner", children: "unlimited" })] })] })] }) }) }), upgradePlan && (_jsxs("div", { className: "space-y-2", children: [_jsxs("h3", { className: "text-sm font-medium", children: ["Upgrade to ", PLAN_LIMITS[upgradePlan].displayName] }), _jsxs("div", { className: "bg-background rounded-lg border border-border overflow-hidden", children: [_jsxs("div", { className: "p-4 grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("h4", { className: "text-sm font-medium", children: ["$", PLAN_LIMITS[upgradePlan].monthlyPrice, " per month"] }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: PLAN_LIMITS[upgradePlan].description })] }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Check, { className: "h-3 w-3 text-green-500 flex-shrink-0" }), _jsxs("span", { className: "text-xs", children: [_jsx("strong", { children: PLAN_LIMITS[upgradePlan].generationsPerMonth -
                                                                            PLAN_LIMITS[currentPlan].generationsPerMonth }), " ", "additional generations per month"] })] }), PLAN_LIMITS[upgradePlan].features
                                                        .filter((feature) => !PLAN_LIMITS[currentPlan].features.includes(feature))
                                                        .map((feature, index) => (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Check, { className: "h-3 w-3 text-green-500 flex-shrink-0" }), _jsx("span", { className: "text-xs", children: feature })] }, index)))] })] }), _jsx("div", { className: "bg-muted p-3 rounded-b-lg flex justify-end border-t", children: _jsx(Button, { onClick: () => handleUpgradePlan(upgradePlan), disabled: isUpgradeLoading, children: isUpgradeLoading ? (_jsxs(_Fragment, { children: [_jsx(LoaderCircle, { className: "mr-2 h-3 w-3 animate-spin" }), "Processing"] })) : (_jsxs(_Fragment, { children: ["Upgrade plan", _jsx("kbd", { className: "pointer-events-none h-5 select-none items-center gap-1 rounded border-muted-foreground/40 bg-muted-foreground/20 px-1.5 ml-1.5 font-sans text-[11px] text-kbd leading-none opacity-100 flex", children: "U" })] })) }) })] })] }))] }), _jsx("div", { className: "flex justify-center w-full mt-8", children: _jsx(Button, { onClick: handleCompleteOnboarding, disabled: isCompletingOnboarding, children: isCompletingOnboarding ? (_jsxs("div", { className: "flex items-center", children: [_jsx(Spinner, { size: 16, color: "#fff" }), _jsx("span", { className: "ml-2", children: "Complete Onboarding" })] })) : (_jsxs(_Fragment, { children: ["Complete Onboarding", _jsx("kbd", { className: "pointer-events-none h-5 select-none items-center gap-1 rounded border-muted-foreground/40 bg-muted-foreground/20 px-1.5 ml-1.5 font-sans text-[11px] text-kbd leading-none opacity-100 flex", children: _jsx(Icons.enter, { className: "h-2.5 w-2.5" }) })] })) }) })] }));
}
//# sourceMappingURL=component.js.map