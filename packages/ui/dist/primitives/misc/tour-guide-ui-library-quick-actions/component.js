"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Plus, Download, Bell, RefreshCw, Users, Activity, Mail, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
export default function QuickActions() {
    const [isExporting, setIsExporting] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    const handleExportData = async () => {
        setIsExporting(true);
        // Simulate export process
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsExporting(false);
        console.log("Data exported successfully");
    };
    const handleRefreshData = async () => {
        setIsRefreshing(true);
        // Simulate refresh process
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsRefreshing(false);
        console.log("Data refreshed successfully");
    };
    const handleSendNotifications = () => {
        console.log("Sending notifications...");
    };
    if (!mounted) {
        return (_jsx("div", { className: "space-y-6", children: _jsx(Card, { className: "border-gray-700 bg-gray-800", children: _jsx(CardContent, { className: "p-6", children: _jsx("div", { className: "h-32 animate-pulse rounded bg-gray-700" }) }) }) }));
    }
    const quickActions = [
        {
            id: "add-activity",
            title: "Add New Activity",
            description: "Create a new activity listing",
            icon: Plus,
            color: "bg-orange-600 hover:bg-orange-700",
            href: "/admin/activities/new"
        },
        {
            id: "export-data",
            title: "Export Data",
            description: "Download CSV reports",
            icon: Download,
            color: "bg-blue-600 hover:bg-blue-700",
            action: handleExportData,
            loading: isExporting
        },
        {
            id: "refresh-data",
            title: "Refresh Analytics",
            description: "Update all dashboard metrics",
            icon: RefreshCw,
            color: "bg-green-600 hover:bg-green-700",
            action: handleRefreshData,
            loading: isRefreshing
        },
        {
            id: "send-notifications",
            title: "Send Notifications",
            description: "Notify users of updates",
            icon: Bell,
            color: "bg-purple-600 hover:bg-purple-700",
            action: handleSendNotifications
        }
    ];
    const managementShortcuts = [
        {
            title: "Manage Users",
            description: "11 total users",
            icon: Users,
            color: "text-blue-400",
            href: "/admin/users",
            count: 11,
            change: "+3 this month"
        },
        {
            title: "Review Activities",
            description: "28 activities",
            icon: Activity,
            color: "text-orange-400",
            href: "/admin/activities",
            count: 28,
            change: "+5 this month"
        },
        {
            title: "Email Templates",
            description: "Manage communications",
            icon: Mail,
            color: "text-green-400",
            href: "/admin/settings",
            count: 8,
            change: "2 updated"
        },
        {
            title: "Content Management",
            description: "Blog posts & pages",
            icon: FileText,
            color: "text-yellow-400",
            href: "/admin/blog",
            count: 5,
            change: "1 draft"
        }
    ];
    const systemStatus = {
        databaseHealth: 98,
        serverResponse: 95,
        apiCalls: 87,
        userSatisfaction: 92
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Quick Actions" }), _jsx(CardDescription, { className: "text-gray-400", children: "Common tasks and shortcuts" })] }), _jsx(CardContent, { children: _jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: quickActions.map(action => {
                                const Icon = action.icon;
                                return (_jsx(Button, { onClick: action.action, disabled: action.loading, className: `h-auto flex-col items-start space-y-2 p-4 ${action.color}`, asChild: !!action.href, children: action.href ? (_jsxs("a", { href: action.href, children: [_jsxs("div", { className: "flex w-full items-center space-x-2", children: [_jsx(Icon, { className: `size-5 ${action.loading ? "animate-spin" : ""}` }), _jsx("span", { className: "font-medium", children: action.title })] }), _jsx("p", { className: "text-xs opacity-90", children: action.description })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex w-full items-center space-x-2", children: [_jsx(Icon, { className: `size-5 ${action.loading ? "animate-spin" : ""}` }), _jsx("span", { className: "font-medium", children: action.title })] }), _jsx("p", { className: "text-xs opacity-90", children: action.description })] })) }, action.id));
                            }) }) })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Management Overview" }), _jsx(CardDescription, { className: "text-gray-400", children: "Quick access to key areas" })] }), _jsx(CardContent, { children: _jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: managementShortcuts.map(shortcut => {
                                const Icon = shortcut.icon;
                                return (_jsxs("a", { href: shortcut.href, className: "flex items-center space-x-3 rounded-lg border border-gray-700 p-4 transition-colors hover:bg-gray-700", children: [_jsx(Icon, { className: `size-6 ${shortcut.color}` }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "font-medium text-white", children: shortcut.title }), _jsx(Badge, { variant: "outline", className: "border-gray-600 text-gray-400", children: shortcut.count })] }), _jsx("p", { className: "text-sm text-gray-400", children: shortcut.description }), _jsx("p", { className: "text-xs text-green-400", children: shortcut.change })] })] }, shortcut.title));
                            }) }) })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "System Health" }), _jsx(CardDescription, { className: "text-gray-400", children: "Real-time system performance metrics" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: Object.entries(systemStatus).map(([key, value]) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-gray-300", children: key
                                                    .replace(/([A-Z])/g, " $1")
                                                    .replace(/^./, str => str.toUpperCase()) }), _jsxs("span", { className: `text-sm font-medium ${value >= 95
                                                    ? "text-green-400"
                                                    : value >= 90
                                                        ? "text-yellow-400"
                                                        : "text-red-400"}`, children: [value, "%"] })] }), _jsx(Progress, { value: value, className: `h-2 ${value >= 95
                                            ? "bg-green-900"
                                            : value >= 90
                                                ? "bg-yellow-900"
                                                : "bg-red-900"}` })] }, key))) }) })] }), _jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-white", children: "Recent Updates" }), _jsx(CardDescription, { className: "text-gray-400", children: "Latest changes and improvements" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-3", children: [
                                {
                                    title: "Enhanced Analytics Dashboard",
                                    description: "Added real-time data visualization and performance metrics",
                                    time: "2 hours ago",
                                    type: "feature"
                                },
                                {
                                    title: "Universal Search Implemented",
                                    description: "Search across activities, users, reviews, and bookings",
                                    time: "3 hours ago",
                                    type: "feature"
                                },
                                {
                                    title: "Database Optimization",
                                    description: "Improved query performance by 40%",
                                    time: "1 day ago",
                                    type: "improvement"
                                },
                                {
                                    title: "New Export Options",
                                    description: "CSV export now available for all data types",
                                    time: "2 days ago",
                                    type: "feature"
                                }
                            ].map((update, index) => (_jsxs("div", { className: "flex items-start space-x-3", children: [_jsx("div", { className: `mt-1 size-2 rounded-full ${update.type === "feature"
                                            ? "bg-green-500"
                                            : update.type === "improvement"
                                                ? "bg-blue-500"
                                                : "bg-orange-500"}` }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm font-medium text-white", children: update.title }), _jsx("span", { className: "text-xs text-gray-500", children: update.time })] }), _jsx("p", { className: "text-sm text-gray-400", children: update.description })] })] }, index))) }) })] })] }));
}
//# sourceMappingURL=component.js.map