export interface PayoutRecord {
    id: number;
    period_start: string;
    period_end: string;
    total_amount: number;
    paypal_email: string;
    status: string;
    transaction_id: string | null;
    created_at: string;
    processed_at: string | null;
}
interface PayoutHistoryTableProps {
    payouts: PayoutRecord[] | undefined;
    isLoading: boolean;
}
export declare function PayoutHistoryTable({ payouts, isLoading, }: PayoutHistoryTableProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map