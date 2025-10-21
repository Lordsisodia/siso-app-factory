import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
// Format date
const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
};
// Format currency
const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.toUpperCase(),
    }).format(amount);
};
// Get invoice status text
const getInvoiceStatusText = (status) => {
    switch (status) {
        case "paid":
            return "Paid";
        case "open":
            return "Pending";
        case "void":
            return "Voided";
        case "draft":
            return "Draft";
        case "uncollectible":
            return "Uncollectible";
        default:
            return status;
    }
};
// Get invoice status color
const getInvoiceStatusColor = (status) => {
    switch (status) {
        case "paid":
            return "text-green-700 bg-green-100 border border-green-200 shadow-inner";
        case "open":
            return "text-yellow-700 bg-yellow-100 border border-yellow-200 shadow-inner";
        case "void":
        case "uncollectible":
            return "text-red-700 bg-red-100 border border-red-200 shadow-inner";
        case "draft":
            return "text-gray-700 bg-gray-100 border border-gray-200 shadow-inner";
        default:
            return "text-gray-700 bg-gray-100 border border-gray-200 shadow-inner";
    }
};
function InvoiceRowSkeleton() {
    return (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "py-2", children: _jsx(Skeleton, { className: "h-4 w-16" }) }), _jsx(TableCell, { className: "py-2", children: _jsx(Skeleton, { className: "h-4 w-24" }) }), _jsx(TableCell, { className: "py-2", children: _jsx(Skeleton, { className: "h-4 w-20" }) }), _jsx(TableCell, { className: "py-2", children: _jsx(Skeleton, { className: "h-4 w-32" }) }), _jsx(TableCell, { className: "py-2", children: _jsx(Skeleton, { className: "h-6 w-20 rounded-full" }) }), _jsx(TableCell, { className: "py-2 text-right", children: _jsx(Skeleton, { className: "h-8 w-8 rounded-md ml-auto" }) })] }));
}
export function InvoicesList({ invoices, isLoading }) {
    if (isLoading) {
        return (_jsx("div", { className: "bg-background rounded-lg border border-border overflow-hidden", children: _jsx("div", { className: "w-full overflow-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "bg-muted/50", children: [_jsx(TableHead, { className: "h-9 py-2", children: "\u2116" }), _jsx(TableHead, { className: "h-9 py-2", children: "Date" }), _jsx(TableHead, { className: "h-9 py-2", children: "Amount" }), _jsx(TableHead, { className: "h-9 py-2", children: "Period" }), _jsx(TableHead, { className: "h-9 py-2", children: "Status" }), _jsx(TableHead, { className: "h-9 py-2" })] }) }), _jsxs(TableBody, { children: [_jsx(InvoiceRowSkeleton, {}), _jsx(InvoiceRowSkeleton, {}), _jsx(InvoiceRowSkeleton, {})] })] }) }) }));
    }
    if (invoices.length === 0) {
        return (_jsx("div", { className: "bg-background rounded-lg border border-border overflow-hidden", children: _jsx("div", { className: "min-h-24 flex items-center justify-center p-6", children: _jsx("p", { className: "text-xs text-muted-foreground", children: "No invoices yet" }) }) }));
    }
    return (_jsx("div", { className: "bg-background rounded-lg border border-border overflow-hidden", children: _jsx("div", { className: "w-full overflow-auto", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "bg-muted/50", children: [_jsx(TableHead, { className: "h-9 py-2", children: "\u2116" }), _jsx(TableHead, { className: "h-9 py-2", children: "Date" }), _jsx(TableHead, { className: "h-9 py-2", children: "Amount" }), _jsx(TableHead, { className: "h-9 py-2", children: "Period" }), _jsx(TableHead, { className: "h-9 py-2", children: "Status" }), _jsx(TableHead, { className: "h-9 py-2" })] }) }), _jsx(TableBody, { children: invoices.map((invoice) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "py-2", children: invoice.number }), _jsx(TableCell, { className: "py-2", children: formatDate(invoice.created) }), _jsx(TableCell, { className: "py-2", children: formatCurrency(invoice.amount_paid, invoice.currency) }), _jsxs(TableCell, { className: "py-2", children: [formatDate(invoice.period_start), " -", " ", formatDate(invoice.period_end)] }), _jsx(TableCell, { className: "py-2", children: _jsx("span", { className: `px-2 py-1 rounded-full text-xs ${getInvoiceStatusColor(invoice.status)}`, children: getInvoiceStatusText(invoice.status) }) }), _jsx(TableCell, { className: "py-2 text-right", children: invoice.invoice_pdf && (_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => window.open(invoice.invoice_pdf, "_blank"), className: "h-8 w-8 p-0", title: "Download PDF", children: [_jsx(Download, { className: "h-4 w-4" }), _jsx("span", { className: "sr-only", children: "Download PDF" })] })) })] }, invoice.id))) })] }) }) }));
}
//# sourceMappingURL=component.js.map