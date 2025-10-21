import { PricingCardPlan } from "@/lib/config/subscription-plans";
export interface PricingTier {
    name: string;
    price: Record<string, number | string>;
    description: string;
    features: string[];
    cta: string;
    href?: string;
    highlighted?: boolean;
    popular?: boolean;
}
interface PricingCardProps {
    tier?: PricingTier;
    paymentFrequency?: string;
    plan?: PricingCardPlan;
    isYearly?: boolean;
    isLoading?: boolean;
    onClick?: () => void;
    isFeatured?: boolean;
    isActive?: boolean;
}
export declare function PricingCard({ tier, paymentFrequency, plan, isYearly, isLoading, onClick, isFeatured, isActive, }: PricingCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map