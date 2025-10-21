interface Invoice {
    id: string;
    number: string;
    created: number;
    amount_paid: number;
    status: string;
    period_start: number;
    period_end: number;
    invoice_pdf: string | null;
    currency: string;
}
interface InvoicesListProps {
    invoices: Invoice[];
    isLoading: boolean;
}
export declare function InvoicesList({ invoices, isLoading }: InvoicesListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map