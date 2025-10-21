import { bundle_plans } from "@/prisma/client";
interface PlansDialogProps {
    plans: bundle_plans[];
    initialOpen: boolean;
    initialSelectedPlan: bundle_plans | null;
    onClose?: () => void;
    readonly?: boolean;
}
export default function PlansDialog({ plans, initialSelectedPlan, initialOpen, onClose, readonly, }: PlansDialogProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=component.d.ts.map