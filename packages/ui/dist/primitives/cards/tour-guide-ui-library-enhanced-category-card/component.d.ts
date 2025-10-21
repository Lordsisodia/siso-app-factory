import { LucideIcon } from "lucide-react";
export interface CategoryData {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    slug: string;
    icon: LucideIcon;
    imageUrl: string;
    gradient: {
        from: string;
        to: string;
    };
    activityCount?: number;
    averagePrice?: number;
    features: string[];
    href: string;
}
interface EnhancedCategoryCardProps {
    category: CategoryData;
    index: number;
}
export default function EnhancedCategoryCard({ category, index }: EnhancedCategoryCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map