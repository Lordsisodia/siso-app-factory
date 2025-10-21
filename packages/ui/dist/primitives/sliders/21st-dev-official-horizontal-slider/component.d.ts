import { DemoWithComponent } from "@/types/global";
import React from "react";
interface HorizontalSliderProps {
    title: string;
    items: DemoWithComponent[] | undefined;
    isLoading?: boolean;
    viewAllLink?: string;
    viewAllUrl?: string;
    onViewAll?: () => void;
    className?: string;
    totalCount?: number;
    isLeaderboard?: boolean;
    onVote?: (demoId: number) => Promise<void>;
    hideUser?: boolean;
    leftSide?: React.ReactNode;
    rightSide?: React.ReactNode;
}
export declare function HorizontalSlider({ title, items, isLoading, viewAllLink, viewAllUrl, onViewAll, className, totalCount, isLeaderboard, onVote, hideUser, rightSide, leftSide, }: HorizontalSliderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map