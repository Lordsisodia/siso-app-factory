import React from "react";
interface LeaderboardCardProps {
    submission: any;
    index: number;
    isVoting: boolean;
    handleVote: (e: React.MouseEvent, demoId: number) => Promise<void>;
    handleDemoClick: (submission: any) => void;
    isHistorical?: boolean;
}
export declare function LeaderboardCard({ submission, index, isVoting, handleVote, handleDemoClick, isHistorical, }: LeaderboardCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map