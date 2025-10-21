interface Payment {
    id: string;
    amount: number;
    currency: string;
    status: "succeeded" | "pending" | "failed" | "refunded";
    customerEmail: string;
    customerName: string;
    activityName: string;
    paymentMethod: string;
    createdAt: string;
    stripeChargeId: string | null;
}
interface PaymentsManagementProps {
    initialData: Payment[];
}
export default function PaymentsManagement({ initialData }: PaymentsManagementProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map