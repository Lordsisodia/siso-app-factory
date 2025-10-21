"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Calendar, AlertTriangle, Users, Euro, Activity, Clock, UserPlus, Star, MapPin, MessageSquare, ArrowRight, Zap, Target } from "lucide-react";
function StatCard({ title, count, change, changeType, icon: Icon, color, bgColor, borderColor }) {
    const changeIcon = changeType === "increase"
        ? TrendingUp
        : changeType === "decrease"
            ? TrendingDown
            : Activity;
    const ChangeIcon = changeIcon;
    return (_jsx(Card, { className: `${bgColor} ${borderColor} group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10`, children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsx("div", { className: `rounded-xl p-3 ${bgColor} border ${borderColor} transition-transform duration-300 group-hover:scale-110`, children: _jsx(Icon, { className: `size-6 ${color}` }) }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(ChangeIcon, { className: `size-4 ${changeType === "increase"
                                        ? "text-green-400"
                                        : changeType === "decrease"
                                            ? "text-red-400"
                                            : "text-gray-400"}` }), _jsx("span", { className: `text-sm font-medium ${changeType === "increase"
                                        ? "text-green-400"
                                        : changeType === "decrease"
                                            ? "text-red-400"
                                            : "text-gray-400"}`, children: change })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-sm font-medium uppercase tracking-wide text-gray-400", children: title }), _jsx("div", { className: "text-3xl font-bold text-white", children: count.toLocaleString() })] })] }) }));
}
function ActivityIcon({ type }) {
    switch (type) {
        case "booking":
            return _jsx(Calendar, { className: "size-4 text-blue-400" });
        case "review":
            return _jsx(Star, { className: "size-4 text-yellow-400" });
        case "user":
            return _jsx(UserPlus, { className: "size-4 text-green-400" });
        case "activity":
            return _jsx(MapPin, { className: "size-4 text-orange-400" });
        default:
            return _jsx(Activity, { className: "size-4 text-gray-400" });
    }
}
function ActivityItem({ activity }) {
    const timeAgo = new Date(activity.timestamp).toLocaleString();
    return (_jsxs("div", { className: "group flex items-start space-x-4 rounded-lg border border-gray-700/50 bg-gray-800/30 p-4 transition-all duration-200 hover:border-gray-600/50 hover:bg-gray-800/50", children: [_jsx("div", { className: "shrink-0 rounded-lg bg-gray-700/50 p-2 transition-transform duration-200 group-hover:scale-110", children: _jsx(ActivityIcon, { type: activity.type }) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "mb-1 flex items-center justify-between", children: [_jsx("h4", { className: "truncate text-sm font-medium text-white", children: activity.title }), _jsx(Badge, { variant: "outline", className: "border-gray-600 bg-gray-700/50 text-xs text-gray-300", children: activity.type })] }), _jsx("p", { className: "mb-2 line-clamp-2 text-sm text-gray-400", children: activity.description }), _jsxs("div", { className: "flex items-center justify-between text-xs text-gray-500", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Clock, { className: "size-3" }), _jsx("span", { children: timeAgo })] }), activity.metadata && (_jsxs("div", { className: "flex items-center space-x-2", children: [activity.metadata.amount && (_jsxs("span", { className: "font-medium text-green-400", children: ["\u20AC", activity.metadata.amount] })), activity.metadata.rating && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Star, { className: "size-3 fill-current text-yellow-400" }), _jsx("span", { children: activity.metadata.rating })] }))] }))] })] })] }));
}
export default function EnhancedQuickStats({ initialStats, initialActivity }) {
    const [stats, setStats] = useState(initialStats);
    const [activity, setActivity] = useState(initialActivity);
    const [isLoading, setIsLoading] = useState(!initialStats);
    useEffect(() => {
        if (initialStats) {
            setStats(initialStats);
            setIsLoading(false);
        }
        if (initialActivity) {
            setActivity(initialActivity);
        }
    }, [initialStats, initialActivity]);
    if (isLoading) {
        return (_jsx("div", { className: "space-y-8", children: _jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4", children: [...Array(4)].map((_, i) => (_jsx(Card, { className: "border-gray-700/50 bg-gray-800/50", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "animate-pulse space-y-4", children: [_jsx("div", { className: "size-12 rounded-xl bg-gray-700" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-4 w-3/4 rounded bg-gray-700" }), _jsx("div", { className: "h-8 w-1/2 rounded bg-gray-700" })] })] }) }) }, i))) }) }));
    }
    if (!stats) {
        return (_jsx(Card, { className: "border-gray-700/50 bg-gray-800/50", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center space-x-3 text-red-400", children: [_jsx(AlertTriangle, { className: "size-6" }), _jsx("span", { children: "Failed to load dashboard statistics" })] }) }) }));
    }
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "mb-2 text-2xl font-bold text-white", children: "Quick Statistics" }), _jsx("p", { className: "text-gray-400", children: "Key metrics at a glance" })] }), _jsx("div", { className: "flex items-center space-x-2", children: _jsxs(Badge, { variant: "outline", className: "border-orange-500/20 bg-orange-900/20 text-orange-400", children: [_jsx(Zap, { className: "mr-1 size-3" }), "Real-time"] }) })] }), _jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4", children: [_jsx(StatCard, { title: "Total Activities", count: stats.totalActivities.count, change: stats.totalActivities.change, changeType: stats.totalActivities.changeType, icon: MapPin, color: "text-orange-400", bgColor: "bg-orange-900/20", borderColor: "border-orange-500/20" }), _jsx(StatCard, { title: "Total Users", count: stats.totalUsers.count, change: stats.totalUsers.change, changeType: stats.totalUsers.changeType, icon: Users, color: "text-blue-400", bgColor: "bg-blue-900/20", borderColor: "border-blue-500/20" }), _jsx(StatCard, { title: "Total Reviews", count: stats.totalReviews.count, change: stats.totalReviews.change, changeType: stats.totalReviews.changeType, icon: Star, color: "text-yellow-400", bgColor: "bg-yellow-900/20", borderColor: "border-yellow-500/20" }), _jsx(StatCard, { title: "Total Bookings", count: stats.totalBookings.count, change: stats.totalBookings.change, changeType: stats.totalBookings.changeType, icon: Calendar, color: "text-green-400", bgColor: "bg-green-900/20", borderColor: "border-green-500/20" })] }), _jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2", children: [_jsx(Card, { className: "border-green-500/20 bg-gradient-to-br from-green-900/20 to-emerald-900/20 transition-all duration-300 hover:scale-105", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsx("div", { className: "rounded-xl border border-green-500/20 bg-green-900/30 p-3", children: _jsx(Euro, { className: "size-6 text-green-400" }) }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(TrendingUp, { className: "size-4 text-green-400" }), _jsx("span", { className: "text-sm font-medium text-green-400", children: stats.weeklyRevenue.change })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-sm font-medium uppercase tracking-wide text-gray-400", children: "Weekly Revenue" }), _jsxs("div", { className: "text-3xl font-bold text-white", children: ["\u20AC", stats.weeklyRevenue.amount.toLocaleString()] })] })] }) }), _jsx(Card, { className: "border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20 transition-all duration-300 hover:scale-105", children: _jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsx("div", { className: "rounded-xl border border-purple-500/20 bg-purple-900/30 p-3", children: _jsx(Target, { className: "size-6 text-purple-400" }) }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(TrendingUp, { className: "size-4 text-purple-400" }), _jsx("span", { className: "text-sm font-medium text-purple-400", children: stats.monthlyRevenue.change })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-sm font-medium uppercase tracking-wide text-gray-400", children: "Monthly Revenue" }), _jsxs("div", { className: "text-3xl font-bold text-white", children: ["\u20AC", stats.monthlyRevenue.amount.toLocaleString()] })] })] }) })] }), _jsxs(Card, { className: "border-gray-700/50 bg-gray-800/50", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "flex items-center space-x-2 text-white", children: [_jsx(MessageSquare, { className: "size-5 text-orange-500" }), _jsx("span", { children: "Recent Activity" })] }), _jsxs(Button, { variant: "ghost", size: "sm", className: "text-gray-400 hover:text-white", children: ["View All", _jsx(ArrowRight, { className: "ml-1 size-4" })] })] }) }), _jsx(CardContent, { className: "p-6", children: activity.length > 0 ? (_jsxs("div", { className: "space-y-4", children: [activity.slice(0, 5).map((item, index) => (_jsx(ActivityItem, { activity: item }, index))), activity.length > 5 && (_jsx("div", { className: "pt-4 text-center", children: _jsx(Button, { variant: "outline", size: "sm", className: "border-gray-600 text-gray-400 hover:border-gray-500 hover:text-white", children: "Load More Activities" }) }))] })) : (_jsxs("div", { className: "py-8 text-center text-gray-400", children: [_jsx(Activity, { className: "mx-auto mb-4 size-12 opacity-50" }), _jsx("p", { children: "No recent activity to display" })] })) })] })] }));
}
//# sourceMappingURL=component.js.map