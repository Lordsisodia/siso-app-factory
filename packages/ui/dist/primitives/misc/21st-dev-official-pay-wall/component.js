import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { FeatureCards } from "@/components/features/component-page/feature-cards";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { getComponentBundlesAction } from "@/lib/api/components";
import { ATTRIBUTION_SOURCE, SOURCE_DETAIL, trackAttribution, } from "@/lib/attribution-tracking";
import { usePurchaseComponent } from "@/lib/queries";
import { componentAccessAtom, userStateAtom } from "@/lib/store/user-store";
import { cn, formatPrice } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { toast } from "sonner";
import PlansDialog from "../bundles/plans-dialog";
export function PayWall({ accessState, component }) {
    const [userState] = useAtom(userStateAtom);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showUnlockDialog, setShowUnlockDialog] = useState(false);
    const { isSignedIn } = useUser();
    const handleUpgradePlan = async (planId, period = "monthly") => {
        if (isProcessing)
            return;
        // Track attribution before redirecting to pricing page
        trackAttribution(ATTRIBUTION_SOURCE.COMPONENT_LIBRARY, SOURCE_DETAIL.PREMIUM_COMPONENT_CTA);
        if (!isSignedIn) {
            window.location.href = "/pricing";
            return;
        }
        setIsProcessing(true);
        try {
            const pathname = window.location.pathname;
            const response = await fetch("/api/stripe/create-checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "csrf-token": window.__NEXT_DATA__?.props?.csrfToken || "",
                },
                credentials: "include",
                body: JSON.stringify({
                    planId,
                    period,
                    successUrl: `${window.location.origin}${pathname}?success=true`,
                    cancelUrl: `${window.location.origin}${pathname}?canceled=true`,
                    attributionSource: ATTRIBUTION_SOURCE.COMPONENT_LIBRARY,
                    sourceDetail: SOURCE_DETAIL.PREMIUM_COMPONENT_CTA,
                }),
            });
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Failed to create checkout session: ${errorData}`);
            }
            const data = await response.json();
            if (!data.url) {
                throw new Error("No checkout URL received from server");
            }
            window.location.href = data.url;
        }
        catch (error) {
            console.error("Upgrade plan error:", error);
            toast.error("Failed to initiate upgrade. Please try again later.");
            setIsProcessing(false);
        }
    };
    const handleUnlockComponent = async () => {
        setIsProcessing(true);
        // Mock unlock API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Component unlocked successfully!");
        setIsProcessing(false);
        setShowUnlockDialog(false);
        // Here you would typically update the component access state
    };
    useHotkeys(["enter"], () => {
        // Only trigger if we're not in any dialog
        const isInAnyDialog = document.querySelector('[role="dialog"]') !== null;
        if (accessState === "REQUIRES_UNLOCK" && !isInAnyDialog) {
            setShowUnlockDialog(true);
        }
    }, { preventDefault: true });
    useHotkeys(["meta+enter", "ctrl+enter"], () => {
        // Check if we're in the unlock dialog
        const isInUnlockDialog = document.querySelector('[data-dialog-type="unlock-component"]') !== null;
        if (accessState === "REQUIRES_SUBSCRIPTION") {
            handleUpgradePlan("pro");
        }
        else if (accessState === "REQUIRES_UNLOCK") {
            if (isInUnlockDialog) {
                handleUnlockComponent();
            }
            else if (!showUnlockDialog) {
                setShowUnlockDialog(true);
            }
        }
    }, { preventDefault: true });
    let paywall = (_jsx("div", { className: "my-auto", children: _jsx(LoadingSpinner, {}) }));
    if (accessState === "REQUIRES_SUBSCRIPTION") {
        paywall = (_jsx(SubscriptionPaywall, { isProcessing: isProcessing, onUpgrade: () => handleUpgradePlan("pro") }));
    }
    else if (accessState === "REQUIRES_UNLOCK") {
        paywall = (_jsx(UnlockPaywall, { component: component, balance: userState.balance || 0, isProcessing: isProcessing, onUnlock: () => setShowUnlockDialog(true), subscription: userState.subscription ?? undefined }));
    }
    else if (accessState === "REQUIRES_BUNDLE") {
        paywall = _jsx(BundlePaywall, { accessState: accessState, component: component });
    }
    else if (accessState === "LOCKED") {
        paywall = _jsx("div", { className: "my-auto", children: "Component is unavailable" });
    }
    return (_jsxs("div", { className: "relative h-full w-full", children: [_jsx("div", { className: "absolute inset-0 pointer-events-none bg-grid-purple" }), _jsx("div", { className: "relative z-10 h-full w-full overflow-hidden rounded-sm flex flex-col items-center justify-between p-4 text-center", children: paywall }), _jsx(Dialog, { open: showUnlockDialog, onOpenChange: setShowUnlockDialog, children: _jsxs(DialogContent, { className: "p-4", "data-dialog-type": "unlock-component", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-lg font-semibold tracking-tight", children: "Unlock Component" }), _jsx(DialogDescription, { className: "text-sm text-muted-foreground", children: "You're about to unlock this component using your tokens." })] }), _jsxs("div", { className: "space-y-4 py-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "Current Balance" }), _jsxs("span", { className: "text-sm font-medium", children: [userState.balance ?? 0, " tokens"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "Component Price" }), _jsxs("span", { className: "text-sm font-medium text-destructive", children: ["-", 0, " tokens"] })] }), _jsx("div", { className: "border-t pt-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm font-medium text-foreground", children: "Remaining Balance" }), _jsxs("span", { className: "text-sm font-medium text-foreground", children: [(userState.balance || 0) - 0, " tokens"] })] }) })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setShowUnlockDialog(false), className: "text-sm", children: "Cancel" }), _jsx(Button, { onClick: handleUnlockComponent, disabled: isProcessing, className: cn("text-sm gap-1.5", isProcessing ? "" : "pr-1.5"), children: isProcessing ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Processing..."] })) : (_jsxs(_Fragment, { children: ["Unlock", _jsxs("kbd", { className: "pointer-events-none h-5 select-none items-center gap-1 rounded border-muted-foreground/40 bg-muted-foreground/20 px-1.5 ml-1.5 font-sans text-[11px] text-kbd leading-none opacity-100 flex", children: [_jsx("span", { className: "text-[10px]", children: navigator?.platform?.toLowerCase()?.includes("mac")
                                                            ? "⌘"
                                                            : "Ctrl" }), _jsx(Icons.enter, { className: "h-2.5 w-2.5" })] })] })) })] })] }) })] }));
}
function getTokenPrice(planType, period = "monthly") {
    switch (planType) {
        case "pro_plus":
            return 30 / 200; // $0.15 per token
        case "pro":
            return 10 / 50; // $0.2 per token
        default:
            return 10 / 50; // Default to Pro plan price
    }
}
function UnlockPaywall({ component, balance, subscription, }) {
    const purchaseMutation = usePurchaseComponent();
    const [showUnlockDialog, setShowUnlockDialog] = useState(false);
    const [, setComponentAccess] = useAtom(componentAccessAtom);
    const [userState, setUserState] = useAtom(userStateAtom);
    const tokenPrice = getTokenPrice(subscription?.type, "monthly");
    const handleUnlockComponent = async () => {
        try {
            const result = await purchaseMutation.mutateAsync({
                componentId: component.id,
            });
            if (result.success) {
                // Update component access state
                setComponentAccess({
                    componentId: component.id,
                    accessState: "UNLOCKED",
                });
                // Update user balance
                if (userState.balance !== null) {
                    setUserState((prev) => ({
                        ...prev,
                        balance: prev.balance !== null ? prev.balance - 0 : null,
                    }));
                }
                toast.success("Component unlocked successfully!");
                setShowUnlockDialog(false);
            }
            else {
                switch (result.error.type) {
                    case "INSUFFICIENT_TOKENS":
                        toast.error("Not enough tokens available");
                        break;
                    case "ALREADY_PURCHASED":
                        toast.error("You have already purchased this component");
                        break;
                    case "UNAUTHORIZED":
                        toast.error("Please log in to unlock components");
                        break;
                    default:
                        toast.error(result.error.message);
                }
            }
        }
        catch (error) {
            toast.error("Failed to unlock component. Please try again.");
        }
    };
    useHotkeys(["enter"], () => {
        // Only trigger if we're not in any dialog
        const isInAnyDialog = document.querySelector('[role="dialog"]') !== null;
        if (!isInAnyDialog) {
            setShowUnlockDialog(true);
        }
    }, { preventDefault: true });
    useHotkeys(["meta+enter", "ctrl+enter"], () => {
        // Check if we're in the unlock dialog
        const isInUnlockDialog = document.querySelector('[data-dialog-type="unlock-component"]') !== null;
        if (isInUnlockDialog) {
            handleUnlockComponent();
        }
        else if (!showUnlockDialog) {
            setShowUnlockDialog(true);
        }
    }, { preventDefault: true });
    const features = [
        {
            title: "Full Source Code",
            description: "Access to the complete component code",
        },
        {
            title: "Lifetime Access",
            description: "Unlock once, use forever",
        },
        {
            title: "Updates Included",
            description: "Get all future improvements",
        },
    ];
    return (_jsxs("div", { className: "flex-1 w-full flex flex-col h-full gap-10", children: [_jsxs("div", { className: "flex flex-col items-center justify-center flex-1 pt-20", children: [_jsxs("div", { className: "space-y-2 mb-8", children: [_jsx("h3", { className: "text-xl font-semibold", children: "Premium Component" }), _jsxs("p", { className: "text-muted-foreground", children: ["Unlock for ", 0, " tokens ($", (0 * tokenPrice).toFixed(2), ") to get full access"] })] }), _jsx(Button, { onClick: () => setShowUnlockDialog(true), disabled: purchaseMutation.isPending, className: cn("flex items-center justify-center gap-1.5", purchaseMutation.isPending ? "" : "pr-1.5"), children: purchaseMutation.isPending ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Processing..."] })) : (_jsxs(_Fragment, { children: ["Unlock", _jsxs("kbd", { className: "pointer-events-none h-5 select-none items-center gap-1 rounded border-muted-foreground/40 bg-muted-foreground/20 px-1.5 ml-1.5 font-sans text-[11px] text-kbd leading-none opacity-100 flex", children: [_jsx("span", { className: "text-[10px]", children: navigator?.platform?.toLowerCase()?.includes("mac")
                                                ? "⌘"
                                                : "Ctrl" }), _jsx(Icons.enter, { className: "h-2.5 w-2.5" })] })] })) })] }), _jsx(Dialog, { open: showUnlockDialog, onOpenChange: setShowUnlockDialog, children: _jsxs(DialogContent, { className: "p-4", "data-dialog-type": "unlock-component", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-lg font-semibold tracking-tight", children: "Unlock Component" }), _jsx(DialogDescription, { className: "text-sm text-muted-foreground", children: "You're about to unlock this component using your tokens." })] }), _jsxs("div", { className: "space-y-4 py-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "Current Balance" }), _jsxs("span", { className: "text-sm font-medium", children: [balance, " tokens"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "Component Price" }), _jsxs("span", { className: "text-sm font-medium text-destructive", children: ["-", 0, " tokens"] })] }), _jsx("div", { className: "border-t pt-4", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-sm font-medium text-foreground", children: "Remaining Balance" }), _jsxs("span", { className: "text-sm font-medium text-foreground", children: [balance - 0, " tokens"] })] }) })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setShowUnlockDialog(false), className: "text-sm", children: "Cancel" }), _jsx(Button, { onClick: handleUnlockComponent, disabled: purchaseMutation.isPending, className: cn("text-sm gap-1.5", purchaseMutation.isPending ? "" : "pr-1.5"), children: purchaseMutation.isPending ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Processing..."] })) : (_jsxs(_Fragment, { children: ["Unlock", _jsxs("kbd", { className: "pointer-events-none h-5 select-none items-center gap-1 rounded border-muted-foreground/40 bg-muted-foreground/20 px-1.5 ml-1.5 font-sans text-[11px] text-kbd leading-none opacity-100 flex", children: [_jsx("span", { className: "text-[10px]", children: navigator?.platform?.toLowerCase()?.includes("mac")
                                                            ? "⌘"
                                                            : "Ctrl" }), _jsx(Icons.enter, { className: "h-2.5 w-2.5" })] })] })) })] })] }) }), _jsx(FeatureCards, { title: "What's included", features: features })] }));
}
const features = [
    {
        title: "Premium Components",
        description: "Access to premium components",
    },
    {
        title: "AI Component Generation",
        description: "Generate components with AI",
    },
    {
        title: "Priority Support",
        description: "Get help when you need it",
    },
];
function SubscriptionPaywall({ isProcessing, onUpgrade, }) {
    const { isSignedIn } = useUser();
    const router = useRouter();
    const handleAction = () => {
        // Track attribution before upgrade
        trackAttribution(ATTRIBUTION_SOURCE.COMPONENT_LIBRARY, SOURCE_DETAIL.PREMIUM_COMPONENT_CTA);
        if (!isSignedIn) {
            router.push("/pricing");
            return;
        }
        onUpgrade();
    };
    return (_jsxs("div", { className: "flex-1 w-full flex flex-col h-full gap-10", children: [_jsxs("div", { className: "flex flex-col items-center justify-center flex-1 pt-20", children: [_jsxs("div", { className: "space-y-2 mb-8", children: [_jsx("h3", { className: "text-xl font-semibold", children: "Premium Component" }), _jsx("p", { className: "text-muted-foreground", children: isSignedIn
                                    ? "Subscribe to access this premium component and many others. Get 50 tokens for $10/mo."
                                    : "Select a plan to access premium components. Starting at 50 tokens for $10/mo." })] }), _jsx(Button, { onClick: handleAction, disabled: isProcessing, className: cn("flex items-center justify-center gap-1.5", isProcessing || !isSignedIn ? "" : "pr-1.5"), children: isProcessing ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Processing..."] })) : (_jsxs(_Fragment, { children: [isSignedIn ? "Subscribe Now" : "Select Plan", isSignedIn && (_jsxs("kbd", { className: "pointer-events-none h-5 select-none items-center gap-1 rounded border-muted-foreground/40 bg-muted-foreground/20 px-1.5 ml-1.5 font-sans text-[11px] text-kbd leading-none opacity-100 flex", children: [_jsx("span", { className: "text-[11px] leading-none font-sans", children: navigator?.platform?.toLowerCase()?.includes("mac")
                                                ? "⌘"
                                                : "Ctrl" }), _jsx(Icons.enter, { className: "h-2.5 w-2.5" })] }))] })) })] }), _jsx(FeatureCards, { title: "What's included", features: features })] }));
}
function BundlePaywall({ accessState, component }) {
    const [selectedBundleId, setSelectedBundleId] = useState(null);
    const { data: bundles, isLoading } = useQuery({
        queryKey: ["bundles"],
        queryFn: () => {
            return getComponentBundlesAction({ componentId: component.id });
        },
    });
    const handleBundleClick = (bundle) => {
        setSelectedBundleId(bundle.id);
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "flex flex-col gap-4 h-full w-full items-center justify-center p-8", children: [_jsxs("div", { className: "space-y-1 text-center", children: [_jsx("h3", { className: "text-xl font-semibold", children: "Bundle Component" }), _jsx("p", { className: "text-muted-foreground", children: "To access this component, you need to purchase one of the bundles" })] }), _jsx("div", { className: "flex flex-col gap-2 items-center", children: isLoading ? (_jsx(Skeleton, { className: "h-8 w-32 rounded-full bg-muted-foreground/20" })) : (bundles?.map((bundle) => {
                        const smallestPrice = bundle.bundle_plans.sort((a, b) => a.price - b.price)[0]?.price;
                        return (_jsxs(_Fragment, { children: [_jsxs(Button, { variant: "outline", onClick: () => handleBundleClick(bundle), className: "gap-2 rounded-full w-fit", children: [_jsxs(Avatar, { className: "w-4 h-4", children: [_jsx(AvatarImage, { src: bundle.users.image_url ??
                                                        bundle.users.display_image_url ??
                                                        "" }), _jsx(AvatarFallback, { children: bundle.users.name?.slice(0, 2) })] }), bundle.name, smallestPrice && (_jsxs("span", { className: "text-sm text-muted-foreground", children: ["from ", formatPrice(smallestPrice / 100)] }))] }, bundle.id), _jsx(PlansDialog, { plans: bundle.bundle_plans, onClose: () => setSelectedBundleId(null), initialOpen: selectedBundleId === bundle.id, initialSelectedPlan: null })] }));
                    })) }), _jsx(Link, { href: `${process.env.NEXT_PUBLIC_APP_URL}/?tab=bundles`, className: "underline", children: "View bundles" })] }) }));
}
//# sourceMappingURL=component.js.map