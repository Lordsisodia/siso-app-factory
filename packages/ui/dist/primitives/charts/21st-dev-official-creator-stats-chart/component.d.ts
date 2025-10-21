export type PayoutStats = {
    mcp_earnings: number;
    mcp_usages: number;
    views: number;
    views_earnings: number;
    total_earnings: number;
    date: string;
};
interface PayoutStatsChartProps {
    data: PayoutStats[];
    isLoading?: boolean;
    isPartner?: boolean;
}
export declare function PayoutStatsChart({ data, isLoading, isPartner, }: PayoutStatsChartProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map