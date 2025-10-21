import { UseMutationResult } from "@tanstack/react-query";
export type Category = "global" | "marketing" | "ui" | "seasonal";
interface LeaderboardListProps {
    submissions: any[];
    roundId: number;
    toggleVote: UseMutationResult<boolean, Error, {
        demoId: number;
    }, unknown> | null;
    category: Category;
    seasonalTheme?: string;
    isLoading?: boolean;
    isHistorical?: boolean;
}
export declare function LeaderboardList({ submissions, roundId, toggleVote, category, seasonalTheme, isLoading, isHistorical, }: LeaderboardListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map