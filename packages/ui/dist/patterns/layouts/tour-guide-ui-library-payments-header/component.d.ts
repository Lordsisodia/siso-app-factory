interface PaymentStats {
    totalRevenue: number;
    successfulPayments: number;
    refunds: number;
    pendingPayments: number;
    thisMonth: number;
    avgOrderValue: number;
}
interface PaymentsHeaderProps {
    stats: PaymentStats;
}
export default function PaymentsHeader({ stats }: PaymentsHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map