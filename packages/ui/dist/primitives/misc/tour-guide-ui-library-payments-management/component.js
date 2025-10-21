"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, RefreshCw, Eye, Calendar, User, CreditCard, Euro } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SortableTable from "@/app/admin/_components/sortable-table";
export default function PaymentsManagement({ initialData }) {
    const [payments, setPayments] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [methodFilter, setMethodFilter] = useState("all");
    const filteredPayments = payments.filter(payment => {
        const matchesSearch = payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.activityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
        const matchesMethod = methodFilter === "all" || payment.paymentMethod === methodFilter;
        return matchesSearch && matchesStatus && matchesMethod;
    });
    const formatCurrency = (amount, currency) => {
        return new Intl.NumberFormat("en-IE", {
            style: "currency",
            currency: (currency || "EUR").toUpperCase()
        }).format(amount);
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case "succeeded":
                return _jsx(Badge, { className: "bg-green-600 text-white", children: "Succeeded" });
            case "pending":
                return _jsx(Badge, { className: "bg-yellow-600 text-white", children: "Pending" });
            case "failed":
                return _jsx(Badge, { className: "bg-red-600 text-white", children: "Failed" });
            case "refunded":
                return _jsx(Badge, { className: "bg-gray-600 text-white", children: "Refunded" });
            default:
                return _jsx(Badge, { className: "bg-gray-600 text-white", children: status });
        }
    };
    const getPaymentMethodIcon = (method) => {
        switch (method) {
            case "card":
                return _jsx(CreditCard, { className: "size-4 text-blue-500" });
            case "bank_transfer":
                return _jsx(Euro, { className: "size-4 text-green-500" });
            default:
                return _jsx(CreditCard, { className: "size-4 text-gray-500" });
        }
    };
    const handleRefund = (paymentId) => {
        setPayments(prev => prev.map(payment => payment.id === paymentId
            ? { ...payment, status: "refunded" }
            : payment));
    };
    const handleViewDetails = (paymentId) => {
        console.log("View payment details:", paymentId);
        // Navigate to payment details page or open modal
    };
    const columns = [
        {
            key: "id",
            label: "Payment ID",
            sortable: true,
            render: (payment) => (_jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "font-mono text-sm text-white", children: payment.id }), payment.stripeChargeId && (_jsxs("div", { className: "text-xs text-gray-400", children: ["Stripe: ", payment.stripeChargeId] }))] }))
        },
        {
            key: "amount",
            label: "Amount",
            sortable: true,
            render: (payment) => (_jsx("div", { className: "font-medium text-white", children: formatCurrency(payment.amount, payment.currency) }))
        },
        {
            key: "status",
            label: "Status",
            sortable: true,
            render: (payment) => getStatusBadge(payment.status)
        },
        {
            key: "customerName",
            label: "Customer",
            sortable: true,
            render: (payment) => (_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(User, { className: "size-4 text-gray-400" }), _jsx("span", { className: "font-medium text-white", children: payment.customerName })] }), _jsx("div", { className: "text-sm text-gray-400", children: payment.customerEmail })] }))
        },
        {
            key: "activityName",
            label: "Activity",
            sortable: true,
            render: (payment) => (_jsx("div", { className: "max-w-xs truncate text-white", children: payment.activityName }))
        },
        {
            key: "paymentMethod",
            label: "Method",
            sortable: true,
            render: (payment) => (_jsxs("div", { className: "flex items-center space-x-2", children: [getPaymentMethodIcon(payment.paymentMethod || "unknown"), _jsx("span", { className: "capitalize text-white", children: (payment.paymentMethod || "unknown").replace("_", " ") })] }))
        },
        {
            key: "createdAt",
            label: "Date",
            sortable: true,
            render: (payment) => (_jsxs("div", { className: "flex items-center space-x-2 text-gray-300", children: [_jsx(Calendar, { className: "size-4 text-gray-400" }), _jsx("span", { children: formatDate(payment.createdAt) })] }))
        },
        {
            key: "actions",
            label: "Actions",
            sortable: false,
            render: (payment) => (_jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: () => handleViewDetails(payment.id), className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: _jsx(Eye, { className: "size-3" }) }), payment?.status === "succeeded" && (_jsx(Button, { size: "sm", variant: "outline", onClick: () => handleRefund(payment.id), className: "border-red-600 text-red-400 hover:bg-red-600 hover:text-white", children: _jsx(RefreshCw, { className: "size-3" }) }))] }))
        }
    ];
    const paymentMethods = Array.from(new Set(payments.map(payment => payment.paymentMethod)));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-4 sm:flex-row", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" }), _jsx(Input, { placeholder: "Search payments, customers, activities...", value: searchTerm, onChange: e => setSearchTerm(e.target.value), className: "border-gray-700 bg-gray-800 pl-10 text-white" })] }), _jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsxs(SelectTrigger, { className: "w-48 border-gray-700 bg-gray-800 text-white", children: [_jsx(Filter, { className: "mr-2 size-4" }), _jsx(SelectValue, { placeholder: "Filter by status" })] }), _jsxs(SelectContent, { className: "border-gray-700 bg-gray-800", children: [_jsx(SelectItem, { value: "all", children: "All Status" }), _jsx(SelectItem, { value: "succeeded", children: "Succeeded" }), _jsx(SelectItem, { value: "pending", children: "Pending" }), _jsx(SelectItem, { value: "failed", children: "Failed" }), _jsx(SelectItem, { value: "refunded", children: "Refunded" })] })] }), _jsxs(Select, { value: methodFilter, onValueChange: setMethodFilter, children: [_jsxs(SelectTrigger, { className: "w-48 border-gray-700 bg-gray-800 text-white", children: [_jsx(Filter, { className: "mr-2 size-4" }), _jsx(SelectValue, { placeholder: "Filter by method" })] }), _jsxs(SelectContent, { className: "border-gray-700 bg-gray-800", children: [_jsx(SelectItem, { value: "all", children: "All Methods" }), paymentMethods.map(method => (_jsx(SelectItem, { value: method, children: method
                                            .replace("_", " ")
                                            .replace(/\b\w/g, l => l.toUpperCase()) }, method)))] })] })] }), _jsxs("div", { className: "text-white", children: [_jsx("span", { className: "font-medium", children: filteredPayments.length }), _jsxs("span", { className: "ml-1 text-gray-400", children: ["payment", filteredPayments.length !== 1 ? "s" : "", " found"] })] }), _jsx(SortableTable, { data: filteredPayments, columns: columns, className: "border-gray-700 bg-gray-800" }), filteredPayments.length === 0 && (_jsxs("div", { className: "py-12 text-center", children: [_jsx(CreditCard, { className: "mx-auto mb-4 size-12 text-gray-600" }), _jsx("h3", { className: "mb-2 text-lg font-medium text-white", children: "No payments found" }), _jsx("p", { className: "text-gray-400", children: searchTerm || statusFilter !== "all" || methodFilter !== "all"
                            ? "Try adjusting your search or filters"
                            : "No payment transactions to display" })] }))] }));
}
//# sourceMappingURL=component.js.map