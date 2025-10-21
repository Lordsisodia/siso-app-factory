"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Euro, CreditCard, Percent } from "lucide-react";
import { useEffect, useState } from "react";
import { getFinancialDashboardAction } from "@/actions/db/dashboard-actions";
export default function FinancialDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getFinancialDashboardAction();
                if (result.isSuccess) {
                    setData(result.data);
                }
                else {
                    setError(result.message);
                }
            }
            catch (err) {
                setError("Failed to load financial dashboard");
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    if (loading) {
        return (_jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3", children: [[...Array(3)].map((_, i) => (_jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx("div", { className: "h-4 animate-pulse rounded bg-gray-700" }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "mb-4 h-8 animate-pulse rounded bg-gray-700" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-3 animate-pulse rounded bg-gray-700" }), _jsx("div", { className: "h-3 animate-pulse rounded bg-gray-700" })] })] })] }, i))), _jsxs(Card, { className: "col-span-full border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx("div", { className: "h-4 animate-pulse rounded bg-gray-700" }) }), _jsx(CardContent, { children: _jsx("div", { className: "h-32 animate-pulse rounded bg-gray-700" }) })] })] }));
    }
    if (error || !data) {
        return (_jsx("div", { className: "grid grid-cols-1 gap-6", children: _jsx(Card, { className: "border-gray-700 bg-gray-800", children: _jsx(CardContent, { className: "p-6", children: _jsx("div", { className: "text-center text-red-400", children: error || "Failed to load financial dashboard" }) }) }) }));
    }
    const maxRevenue = Math.max(...data.revenueChart.map(d => d.revenue));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3", children: [_jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium text-gray-100", children: "Monthly Revenue" }), _jsx(Euro, { className: "size-4 text-orange-500" })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-2xl font-bold text-white", children: ["\u20AC", data.monthlyRevenue.amount.toLocaleString()] }), _jsxs("div", { className: "mt-2 flex items-center space-x-2", children: [data.monthlyRevenue.growth >= 0 ? (_jsx(TrendingUp, { className: "size-4 text-green-500" })) : (_jsx(TrendingDown, { className: "size-4 text-red-500" })), _jsxs("span", { className: `text-xs ${data.monthlyRevenue.growth >= 0 ? "text-green-500" : "text-red-500"}`, children: [data.monthlyRevenue.growth >= 0 ? "+" : "", data.monthlyRevenue.growth.toFixed(1), "% vs last month"] })] })] })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium text-gray-100", children: "Commission Split" }), _jsx(Percent, { className: "size-4 text-orange-500" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-300", children: "Platform" }), _jsxs("span", { className: "text-sm font-medium text-white", children: [data.commissionBreakdown.platform.toFixed(1), "%"] })] }), _jsx(Progress, { value: data.commissionBreakdown.platform, className: "h-2" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-300", children: "Operators" }), _jsxs("span", { className: "text-sm font-medium text-white", children: [data.commissionBreakdown.operators.toFixed(1), "%"] })] }), _jsx(Progress, { value: data.commissionBreakdown.operators, className: "h-2" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-300", children: "Sales" }), _jsxs("span", { className: "text-sm font-medium text-white", children: [data.commissionBreakdown.sales.toFixed(1), "%"] })] }), _jsx(Progress, { value: data.commissionBreakdown.sales, className: "h-2" })] }) })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium text-gray-100", children: "Payment Health" }), _jsx(CreditCard, { className: "size-4 text-orange-500" })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-2xl font-bold text-white", children: [data.paymentHealth.successRate.toFixed(1), "%"] }), _jsx("div", { className: "mt-1 text-xs text-gray-400", children: "Success Rate" }), _jsx("div", { className: "mt-3", children: _jsx(Progress, { value: data.paymentHealth.successRate, className: "h-2" }) }), _jsxs("div", { className: "mt-3 flex items-center justify-between", children: [_jsx("span", { className: "text-xs text-gray-400", children: "Total Transactions" }), _jsx(Badge, { variant: "secondary", className: "bg-gray-700 text-gray-100", children: data.paymentHealth.totalTransactions })] })] })] })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-lg font-medium text-gray-100", children: "7-Day Revenue Trend" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: data.revenueChart.length > 0 ? (data.revenueChart.map((day, index) => (_jsxs("div", { className: "flex items-center space-x-4", children: [_jsx("div", { className: "w-16 text-sm text-gray-400", children: day.day }), _jsx("div", { className: "flex-1", children: _jsxs("div", { className: "mb-1 flex items-center justify-between", children: [_jsx("div", { className: "mr-3 h-4 flex-1 overflow-hidden rounded-full bg-gray-700", children: _jsx("div", { className: "h-full bg-orange-500 transition-all duration-300", style: {
                                                            width: `${maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0}%`
                                                        } }) }), _jsxs("span", { className: "min-w-[80px] text-right text-sm font-medium text-white", children: ["\u20AC", day.revenue.toLocaleString()] })] }) })] }, index)))) : (_jsx("div", { className: "py-8 text-center text-gray-400", children: "No revenue data available for the last 7 days" })) }) })] })] }));
}
//# sourceMappingURL=component.js.map