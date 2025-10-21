"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, AlertTriangle, XCircle, Star, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { getOperationalDataAction } from "@/actions/db/dashboard-actions";
export default function OperationalCommandCenter() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await getOperationalDataAction();
                if (result.isSuccess) {
                    setData(result.data);
                }
                else {
                    setError(result.message);
                }
            }
            catch (err) {
                setError("Failed to load operational data");
            }
            finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    if (loading) {
        return (_jsx("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-2", children: [...Array(2)].map((_, i) => (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx("div", { className: "h-4 animate-pulse rounded bg-gray-700" }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: [...Array(3)].map((_, j) => (_jsx("div", { className: "h-16 animate-pulse rounded bg-gray-700" }, j))) }) })] }) }, i))) }));
    }
    if (error || !data) {
        return (_jsx("div", { className: "grid grid-cols-1 gap-6", children: _jsx(Card, { className: "border-gray-700 bg-gray-800", children: _jsx(CardContent, { className: "p-6", children: _jsx("div", { className: "text-center text-red-400", children: error || "Failed to load operational data" }) }) }) }));
    }
    const getSeverityColor = (severity) => {
        switch (severity) {
            case "high":
                return "bg-red-900 text-red-100 border-red-700";
            case "medium":
                return "bg-yellow-900 text-yellow-100 border-yellow-700";
            case "low":
                return "bg-blue-900 text-blue-100 border-blue-700";
            default:
                return "bg-gray-900 text-gray-100 border-gray-700";
        }
    };
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "confirmed":
                return "bg-green-900 text-green-100";
            case "pending":
                return "bg-yellow-900 text-yellow-100";
            case "cancelled":
                return "bg-red-900 text-red-100";
            default:
                return "bg-gray-900 text-gray-100";
        }
    };
    return (_jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-2", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2 text-gray-100", children: [_jsx(Calendar, { className: "size-5 text-orange-500" }), _jsx("span", { children: "Next 24 Hours" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: data.upcomingBookings.length > 0 ? (data.upcomingBookings.map(booking => (_jsx("div", { className: "flex items-center justify-between rounded-lg border border-gray-700 bg-gray-900 p-3", children: _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "mb-1 flex items-center justify-between", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: booking.activityTitle }), _jsx(Badge, { variant: "secondary", className: getStatusColor(booking.status), children: booking.status })] }), _jsxs("div", { className: "flex items-center space-x-4 text-xs text-gray-400", children: [_jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(Clock, { className: "size-3" }), _jsx("span", { children: booking.time })] }), _jsxs("span", { className: "flex items-center space-x-1", children: [_jsx(Users, { className: "size-3" }), _jsxs("span", { children: [booking.participants, " guests"] })] })] }), _jsx("div", { className: "mt-1 text-xs text-gray-300", children: booking.customerName }), booking.specialRequirements && (_jsxs("div", { className: "mt-1 text-xs text-orange-400", children: ["Special: ", booking.specialRequirements] }))] }) }, booking.id)))) : (_jsx("div", { className: "py-4 text-center text-gray-400", children: "No upcoming bookings in the next 24 hours" })) }) })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2 text-gray-100", children: [_jsx(XCircle, { className: "size-5 text-red-500" }), _jsx("span", { children: "Recent Cancellations" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: data.recentCancellations.length > 0 ? (data.recentCancellations.map(cancellation => (_jsxs("div", { className: "rounded-lg border border-gray-700 bg-gray-900 p-3", children: [_jsxs("div", { className: "mb-2 flex items-center justify-between", children: [_jsx("h4", { className: "text-sm font-medium text-white", children: cancellation.activityTitle }), _jsxs("span", { className: "text-sm font-medium text-red-400", children: ["\u20AC", cancellation.amount.toLocaleString()] })] }), _jsx("div", { className: "mb-1 text-xs text-gray-300", children: cancellation.customerName }), _jsxs("div", { className: "mb-1 text-xs text-gray-400", children: ["Cancelled: ", cancellation.cancelledAt] }), _jsxs("div", { className: "text-xs text-orange-400", children: ["Reason: ", cancellation.reason] })] }, cancellation.id)))) : (_jsx("div", { className: "py-4 text-center text-gray-400", children: "No recent cancellations" })) }) })] })] }), _jsx("div", { className: "space-y-6", children: _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2 text-gray-100", children: [_jsx(AlertTriangle, { className: "size-5 text-orange-500" }), _jsx("span", { children: "Activity Alerts" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: data.activityAlerts.length > 0 ? (data.activityAlerts.map(alert => (_jsxs("div", { className: `rounded-lg border p-3 ${getSeverityColor(alert.severity)}`, children: [_jsxs("div", { className: "mb-2 flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [alert.type === "rating" && _jsx(Star, { className: "size-4" }), alert.type === "availability" && (_jsx(Users, { className: "size-4" })), alert.type === "weather" && (_jsx(AlertTriangle, { className: "size-4" })), _jsx("h4", { className: "text-sm font-medium", children: alert.title })] }), _jsx(Badge, { variant: "outline", className: `text-xs ${alert.severity === "high"
                                                        ? "border-red-500 text-red-400"
                                                        : alert.severity === "medium"
                                                            ? "border-yellow-500 text-yellow-400"
                                                            : "border-blue-500 text-blue-400"}`, children: alert.severity })] }), _jsx("div", { className: "mb-1 text-xs opacity-90", children: alert.description }), _jsxs("div", { className: "text-xs opacity-75", children: ["Activity: ", alert.activityTitle] })] }, alert.id)))) : (_jsx("div", { className: "py-4 text-center text-gray-400", children: "No activity alerts at this time" })) }) })] }) })] }));
}
//# sourceMappingURL=component.js.map