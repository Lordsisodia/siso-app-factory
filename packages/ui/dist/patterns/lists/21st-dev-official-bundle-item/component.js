"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import PlansDialog from "@/components/features/bundles/plans-dialog";
import { HorizontalSlider } from "@/components/features/home/horizontal-slider";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip";
import { formatPrice } from "@/lib/utils";
import { transformDemoResult } from "@/lib/utils/transformData";
import { useUser } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";
export function BundleItem({ user, bundle, hideStatus = false, }) {
    const { user: clerkUser } = useUser();
    const sortedPlans = useMemo(() => bundle.bundle_plans.toSorted((a, b) => {
        const typeOrder = {
            individual: 0,
            team: 1,
            enterprise: 2,
        };
        const aOrder = typeOrder[a.type] ?? 3;
        const bOrder = typeOrder[b.type] ?? 3;
        return aOrder - bOrder;
    }), [bundle.bundle_plans]);
    // Sort purchases in reversed chronological order (most recent first)
    const purchases = useMemo(() => {
        return bundle.bundle_purchases.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }, [bundle.bundle_purchases]);
    const lastPurchase = useMemo(() => purchases[0], [purchases]);
    const isAuthor = useMemo(() => clerkUser?.id === bundle.user_id, [clerkUser?.id, bundle.user_id]);
    const [showBuyDialog, setShowBuyDialog] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(lastPurchase?.plan_id
        ? (sortedPlans.find((p) => p.id === lastPurchase.plan_id) ?? null)
        : (sortedPlans[0] ?? null));
    useEffect(() => {
        if (isAuthor) {
            setSelectedPlan(null);
        }
    }, [isAuthor]);
    const compIdToDemoMap = new Map();
    const allDemos = bundle.bundle_items.flatMap((item) => item.components.demos);
    for (const demo of allDemos) {
        if (!demo.component_id)
            continue;
        const existing = compIdToDemoMap.get(demo.component_id);
        if (!existing ||
            (demo.created_at &&
                existing.created_at &&
                demo.created_at < existing.created_at)) {
            compIdToDemoMap.set(demo.component_id, demo);
        }
    }
    const demosTransformed = Array.from(compIdToDemoMap.values()).map((demo) => {
        return transformDemoResult({
            ...demo,
            user_data: user,
            component_data: bundle.bundle_items.find((item) => item.components.id === demo.component_id)?.components,
            bundle_url: {
                html: demo.bundle_html_url,
            },
        });
    });
    const handlePlanButtonClick = (plan) => {
        if (plan) {
            setSelectedPlan(plan);
        }
        setShowBuyDialog(true);
    };
    // Status badge color class helper
    const mapStatusToClasses = {
        pending: "!bg-muted text-muted-foreground",
        paid: "!bg-green-600 text-white",
        rejected: "!bg-destructive text-destructive-foreground",
        refunded: "!bg-gray-200 text-gray-700",
    };
    const mapStatusToLabel = {
        pending: "Payment pending",
        paid: "Purchased",
        rejected: "Payment rejected",
        refunded: "Bundle refunded",
    };
    const readyToBuy = !isAuthor &&
        (!lastPurchase || !["pending", "paid"].includes(lastPurchase.status));
    return (_jsxs(_Fragment, { children: [_jsx(HorizontalSlider, { title: bundle.name, items: demosTransformed, hideUser: true, isLoading: false, totalCount: bundle.bundle_items.length, isLeaderboard: false, leftSide: _jsxs("div", { className: "flex items-center gap-2", children: [user.image_url && (_jsx(Avatar, { className: "h-9 w-9", children: _jsx(AvatarImage, { src: user.image_url, alt: "Avatar" }) })), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h2", { className: "font-semibold leading-tight", children: bundle.name }), !hideStatus && (_jsxs(_Fragment, { children: [isAuthor && (_jsx(Badge, { variant: "outline", className: "text-xs capitalize", children: "Your bundle" })), lastPurchase && (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, className: "h-fit", children: _jsx(Badge, { className: `text-xs capitalize cursor-pointer ${mapStatusToClasses[lastPurchase.status]}`, children: mapStatusToLabel[lastPurchase.status] }) }), _jsx(TooltipContent, { side: "bottom", showArrow: true, children: _jsxs("div", { className: "flex flex-col text-sm gap-1 min-w-[180px]", children: [_jsx("div", { className: "font-semibold capitalize", children: "Purchase Info" }), lastPurchase.price !== undefined && (_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Price:" }), " ", formatPrice(lastPurchase.price / 100)] })), lastPurchase.plan_id && sortedPlans.length > 0 && (_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Plan:" }), " ", sortedPlans.find((p) => p.id === lastPurchase.plan_id)?.type ?? "-"] })), lastPurchase.created_at && (_jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Date:" }), " ", new Date(lastPurchase.created_at).toLocaleString()] }))] }) })] }, lastPurchase.id))] }))] }), user.name && (_jsx("div", { className: "text-xs text-muted-foreground", children: `By ${user.name}` }))] })] }), rightSide: _jsx("div", { className: "flex gap-2 items-center", children: readyToBuy ? (sortedPlans.map((plan) => (_jsxs(Button, { className: "capitalize", onClick: () => handlePlanButtonClick(plan), children: [plan.type, " ", formatPrice(plan.price / 100)] }, plan.id)))) : (_jsx(Button, { variant: "outline", onClick: () => handlePlanButtonClick(), children: "View plans" })) }) }, bundle.id), _jsx(PlansDialog, { plans: sortedPlans, initialOpen: showBuyDialog, onClose: () => setShowBuyDialog(false), initialSelectedPlan: selectedPlan, readonly: !readyToBuy })] }));
}
//# sourceMappingURL=component.js.map