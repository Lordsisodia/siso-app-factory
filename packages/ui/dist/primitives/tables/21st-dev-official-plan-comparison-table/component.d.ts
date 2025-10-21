import * as React from "react";
import { PlanType } from "@/lib/config/subscription-plans";
export interface ComparisonFeature {
    name: string;
    section?: string;
    values: Record<PlanType, string | {
        monthly: string;
        yearly: string;
    }>;
}
export interface Plan {
    name: string;
    type: PlanType;
    price: {
        monthly: number | string;
        yearly: number | string;
    };
    tokenPrice: {
        monthly: number;
        yearly: number;
    };
    tokens: number;
    popular?: boolean;
    buttonText: string;
    buttonAction?: () => void;
    buttonHref?: string;
    disabled?: boolean;
}
export interface PlanComparisonTableProps extends React.HTMLAttributes<HTMLDivElement> {
    features: ComparisonFeature[];
    plans: Plan[];
    className?: string;
    currentPlan?: PlanType;
    currentFrequency?: "monthly" | "yearly";
    onUpgrade: (planId: PlanType, period?: "monthly" | "yearly") => void;
    onDowngrade: () => void;
    isAuthenticated?: boolean;
}
export declare function PlanComparisonTable({ features, plans, className, currentPlan, currentFrequency, onUpgrade, onDowngrade, isAuthenticated, ...props }: PlanComparisonTableProps): import("react/jsx-runtime").JSX.Element;
export declare function CheckValue(): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=component.d.ts.map