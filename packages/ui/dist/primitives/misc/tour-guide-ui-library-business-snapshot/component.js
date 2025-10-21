"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Calendar, AlertCircle, Euro } from "lucide-react";
import { useEffect, useState } from "react";
import { getBusinessSnapshotAction } from "@/actions/db/dashboard-actions";
export default function BusinessSnapshot() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getBusinessSnapshotAction();
                if (result.isSuccess) {
                    setData(result.data);
                }
                else {
                    setError(result.message);
                }
            }
            catch (err) {
                setError("Failed to load business snapshot");
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    if (loading) {
        return (_jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4", children: [...Array(4)].map((_, i) => (_jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx("div", { className: "h-4 animate-pulse rounded bg-gray-700" }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "mb-2 h-8 animate-pulse rounded bg-gray-700" }), _jsx("div", { className: "h-3 animate-pulse rounded bg-gray-700" })] })] }, i))) }));
    }
    if (error || !data) {
        return (_jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4", children: _jsx(Card, { className: "col-span-full border-gray-700 bg-gray-800", children: _jsx(CardContent, { className: "p-6", children: _jsx("div", { className: "text-center text-red-400", children: error || "Failed to load business snapshot" }) }) }) }));
    }
    const revenueProgress = (data.todayRevenue.amount / data.todayRevenue.target) * 100;
    return (_jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4", children: [_jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium text-gray-100", children: "Today's Revenue" }), _jsx(Euro, { className: "size-4 text-orange-500" })] }), _jsxs(CardContent, { children: [_jsxs("div", { className: "text-2xl font-bold text-white", children: ["\u20AC", data.todayRevenue.amount.toLocaleString()] }), _jsxs("div", { className: "mt-2 flex items-center space-x-2", children: [data.todayRevenue.growth >= 0 ? (_jsx(TrendingUp, { className: "size-4 text-green-500" })) : (_jsx(TrendingDown, { className: "size-4 text-red-500" })), _jsxs("span", { className: `text-xs ${data.todayRevenue.growth >= 0 ? "text-green-500" : "text-red-500"}`, children: [data.todayRevenue.growth >= 0 ? "+" : "", data.todayRevenue.growth.toFixed(1), "% vs yesterday"] })] }), _jsxs("div", { className: "mt-3", children: [_jsxs("div", { className: "mb-1 flex justify-between text-xs text-gray-400", children: [_jsxs("span", { children: ["Target: \u20AC", data.todayRevenue.target.toLocaleString()] }), _jsxs("span", { children: [revenueProgress.toFixed(1), "%"] })] }), _jsx(Progress, { value: revenueProgress, className: "h-2" })] })] })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium text-gray-100", children: "Today's Bookings" }), _jsx(Calendar, { className: "size-4 text-orange-500" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold text-white", children: data.todayBookings.total }), _jsxs("div", { className: "mt-2 flex items-center space-x-4", children: [_jsx("div", { className: "flex items-center space-x-1", children: _jsxs(Badge, { variant: "secondary", className: "bg-green-900 text-green-100", children: [data.todayBookings.confirmed, " Confirmed"] }) }), _jsx("div", { className: "flex items-center space-x-1", children: _jsxs(Badge, { variant: "secondary", className: "bg-yellow-900 text-yellow-100", children: [data.todayBookings.pending, " Pending"] }) })] })] })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium text-gray-100", children: "Active Users" }), _jsx(Users, { className: "size-4 text-orange-500" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold text-white", children: data.activeUsers.total }), _jsxs("div", { className: "mt-2 flex items-center space-x-4", children: [_jsxs("div", { className: "text-xs text-gray-400", children: [data.activeUsers.customers, " Customers"] }), _jsxs("div", { className: "text-xs text-gray-400", children: [data.activeUsers.operators, " Operators"] })] })] })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsx(CardTitle, { className: "text-sm font-medium text-gray-100", children: "Pending Actions" }), _jsx(AlertCircle, { className: "size-4 text-orange-500" })] }), _jsxs(CardContent, { children: [_jsx("div", { className: "text-2xl font-bold text-white", children: data.pendingActions.total }), _jsxs("div", { className: "mt-2 flex items-center space-x-2", children: [data.pendingActions.urgent > 0 && (_jsxs(Badge, { variant: "destructive", className: "bg-red-900 text-red-100", children: [data.pendingActions.urgent, " Urgent"] })), _jsx("span", { className: "text-xs text-gray-400", children: "Requires attention" })] })] })] })] }));
}
//# sourceMappingURL=component.js.map