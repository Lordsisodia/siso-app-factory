"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Users, MapPin, Calendar, DollarSign, TrendingUp, TrendingDown, Activity, Eye, AlertTriangle, BarChart3, Target, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
function MetricCard({ title, value, subtitle, icon: Icon, growth, status = "neutral", trend = "stable", className = "" }) {
    const statusColors = {
        positive: "text-green-400 bg-green-900/20 border-green-500/20",
        negative: "text-red-400 bg-red-900/20 border-red-500/20",
        neutral: "text-blue-400 bg-blue-900/20 border-blue-500/20"
    };
    const trendIcons = {
        up: TrendingUp,
        down: TrendingDown,
        stable: Activity
    };
    const TrendIcon = trendIcons[trend];
    return (_jsx(Card, { className: `border-gray-700/50 bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:bg-gray-800/70 hover:shadow-lg hover:shadow-orange-500/10 ${className}`, children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsx("div", { className: `rounded-lg p-3 ${statusColors[status]}`, children: _jsx(Icon, { className: "size-6" }) }), growth !== undefined && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(TrendIcon, { className: `size-4 ${trend === "up"
                                        ? "text-green-400"
                                        : trend === "down"
                                            ? "text-red-400"
                                            : "text-gray-400"}` }), _jsxs("span", { className: `text-sm font-medium ${trend === "up"
                                        ? "text-green-400"
                                        : trend === "down"
                                            ? "text-red-400"
                                            : "text-gray-400"}`, children: [growth > 0 ? "+" : "", growth, "%"] })] }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-sm font-medium uppercase tracking-wide text-gray-400", children: title }), _jsx("div", { className: "text-3xl font-bold text-white", children: typeof value === "number" &&
                                title.toLowerCase().includes("revenue")
                                ? `€${value.toLocaleString()}`
                                : value.toLocaleString() }), subtitle && _jsx("p", { className: "text-sm text-gray-500", children: subtitle })] })] }) }));
}
function PerformanceIndicator({ label, value, unit = "", status, icon: Icon }) {
    const statusConfig = {
        good: {
            color: "text-green-400",
            bg: "bg-green-900/20",
            border: "border-green-500/20"
        },
        warning: {
            color: "text-yellow-400",
            bg: "bg-yellow-900/20",
            border: "border-yellow-500/20"
        },
        critical: {
            color: "text-red-400",
            bg: "bg-red-900/20",
            border: "border-red-500/20"
        }
    };
    const config = statusConfig[status];
    return (_jsx("div", { className: `rounded-lg border p-4 ${config.bg} ${config.border} transition-all duration-300 hover:scale-105`, children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: `rounded-lg p-2 ${config.bg}`, children: _jsx(Icon, { className: `size-5 ${config.color}` }) }), _jsxs("div", { children: [_jsx("div", { className: "text-sm text-gray-400", children: label }), _jsxs("div", { className: `text-xl font-bold ${config.color}`, children: [value, unit] })] })] }) }));
}
export default function EnhancedAnalytics({ initialData }) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(!initialData);
    useEffect(() => {
        if (initialData) {
            setData(initialData);
            setIsLoading(false);
        }
    }, [initialData]);
    if (isLoading) {
        return (_jsx("div", { className: "space-y-6", children: _jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4", children: [...Array(8)].map((_, i) => (_jsx(Card, { className: "border-gray-700/50 bg-gray-800/50", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "animate-pulse space-y-4", children: [_jsx("div", { className: "size-12 rounded-lg bg-gray-700" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-4 w-3/4 rounded bg-gray-700" }), _jsx("div", { className: "h-8 w-1/2 rounded bg-gray-700" })] })] }) }) }, i))) }) }));
    }
    if (!data) {
        return (_jsx(Card, { className: "border-gray-700/50 bg-gray-800/50", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center space-x-3 text-red-400", children: [_jsx(AlertTriangle, { className: "size-6" }), _jsx("span", { children: "Failed to load analytics data" })] }) }) }));
    }
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "mb-2 text-2xl font-bold text-white", children: "Analytics Overview" }), _jsx("p", { className: "text-gray-400", children: "Real-time insights into your business performance" })] }), _jsx(Badge, { variant: "outline", className: "border-green-500/20 bg-green-900/20 text-green-400", children: "Live Data" })] }), _jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4", children: [_jsx(MetricCard, { title: "Total Users", value: data.users.total, subtitle: `${data.users.newThisMonth} new this month`, icon: Users, growth: data.users.growth, status: "positive", trend: "up" }), _jsx(MetricCard, { title: "Active Users", value: data.users.activeUsers, subtitle: `${Math.round((data.users.activeUsers / data.users.total) * 100)}% of total`, icon: Activity, growth: 8.2, status: "positive", trend: "up" }), _jsx(MetricCard, { title: "Total Activities", value: data.activities.total, subtitle: `${data.activities.published} published, ${data.activities.draft} drafts`, icon: MapPin, growth: data.activities.growth, status: "positive", trend: "up" }), _jsx(MetricCard, { title: "Activity Views", value: data.activities.totalViews, subtitle: `Avg rating: ${data.activities.avgRating}★`, icon: Eye, growth: 12.3, status: "positive", trend: "up" })] }), _jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4", children: [_jsx(MetricCard, { title: "Total Bookings", value: data.bookings.total, subtitle: `${data.bookings.thisMonth} this month`, icon: Calendar, growth: data.bookings.growth, status: "positive", trend: "up" }), _jsx(MetricCard, { title: "Confirmed Bookings", value: data.bookings.confirmed, subtitle: `${data.bookings.pending} pending`, icon: CheckCircle, growth: 18.5, status: "positive", trend: "up" }), _jsx(MetricCard, { title: "Total Revenue", value: data.bookings.revenue, subtitle: "All time revenue", icon: DollarSign, growth: data.bookings.growth, status: "positive", trend: "up", className: "md:col-span-2" })] }), _jsxs(Card, { className: "border-gray-700/50 bg-gray-800/50", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2 text-white", children: [_jsx(BarChart3, { className: "size-5 text-orange-500" }), _jsx("span", { children: "System Performance" })] }) }), _jsx(CardContent, { children: _jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-3", children: [_jsx(PerformanceIndicator, { label: "Response Time", value: data.performance.responseTime, unit: "ms", status: data.performance.responseTime < 200
                                        ? "good"
                                        : data.performance.responseTime < 500
                                            ? "warning"
                                            : "critical", icon: Clock }), _jsx(PerformanceIndicator, { label: "Uptime", value: data.performance.uptime, unit: "%", status: data.performance.uptime > 99
                                        ? "good"
                                        : data.performance.uptime > 95
                                            ? "warning"
                                            : "critical", icon: Target }), _jsx(PerformanceIndicator, { label: "Error Rate", value: data.performance.errorRate, unit: "%", status: data.performance.errorRate < 1
                                        ? "good"
                                        : data.performance.errorRate < 5
                                            ? "warning"
                                            : "critical", icon: AlertTriangle })] }) })] })] }));
}
//# sourceMappingURL=component.js.map