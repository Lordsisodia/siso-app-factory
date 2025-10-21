import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import { Info } from "lucide-react";
export function PayoutHistoryTable({ payouts, isLoading, }) {
    return (_jsx("div", { className: "w-full overflow-auto", children: _jsx("div", { className: "overflow-hidden rounded-lg border border-border bg-background", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { className: "bg-muted/50", children: [_jsx(TableHead, { className: "h-9 py-2", children: "Period" }), _jsx(TableHead, { className: "h-9 py-2", children: "Amount" }), _jsx(TableHead, { className: "h-9 py-2", children: "Status" }), _jsx(TableHead, { className: "h-9 py-2", children: "Date" })] }) }), _jsx(TableBody, { children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(PayoutRowSkeleton, {}), _jsx(PayoutRowSkeleton, {}), _jsx(PayoutRowSkeleton, {})] })) : payouts && payouts.length > 0 ? (payouts.map((payout) => (_jsxs(TableRow, { children: [_jsxs(TableCell, { className: "py-2", children: [new Date(payout.period_start).toLocaleDateString(), " -", " ", new Date(payout.period_end).toLocaleDateString()] }), _jsx(TableCell, { className: "py-2", children: formatPrice(payout.total_amount) }), _jsx(TableCell, { className: "py-2", children: _jsx("span", { className: `px-2 py-1 rounded-full text-xs ${payout.status === "completed"
                                            ? "bg-green-100 text-green-800"
                                            : payout.status === "pending"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-gray-100 text-gray-800"}`, children: payout.status.charAt(0).toUpperCase() +
                                            payout.status.slice(1) }) }), _jsx(TableCell, { className: "py-2", children: new Date(payout.created_at).toLocaleDateString() })] }, payout.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 4, className: "h-24 text-center", children: _jsxs("div", { className: "flex flex-col items-center justify-center text-muted-foreground", children: [_jsx(Info, { className: "h-4 w-4 mb-2" }), _jsx("p", { children: "No payout history yet" }), _jsx("p", { className: "text-xs max-w-md text-center mt-1", children: "Payouts are processed at the end of each billing period for component creators" })] }) }) })) })] }) }) }));
}
function PayoutRowSkeleton() {
    return (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "py-2", children: _jsx(Skeleton, { className: "h-5 w-24" }) }), _jsx(TableCell, { className: "py-2", children: _jsx(Skeleton, { className: "h-5 w-16" }) }), _jsx(TableCell, { className: "py-2", children: _jsx(Skeleton, { className: "h-6 w-20 rounded-full" }) }), _jsx(TableCell, { className: "py-2", children: _jsx(Skeleton, { className: "h-5 w-24" }) })] }));
}
//# sourceMappingURL=component.js.map