import { PlanType } from "@/lib/config/subscription-plans";
interface UpgradeConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentPlanId: PlanType;
    upgradePlanId: PlanType;
    onConfirm: () => void;
    isLoading: boolean;
}
export declare function UpgradeConfirmationDialog({ open, onOpenChange, currentPlanId, upgradePlanId, onConfirm, isLoading, }: UpgradeConfirmationDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map