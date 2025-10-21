"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Shield } from "lucide-react";
const adminPages = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Activities", path: "/admin/activities" },
    { name: "Bookings", path: "/admin/bookings" },
    { name: "Users", path: "/admin/users" },
    { name: "Analytics", path: "/admin/analytics" },
    { name: "Media", path: "/admin/media" },
    { name: "Blog", path: "/admin/blog" },
    { name: "Payments", path: "/admin/payments" },
    { name: "Settings", path: "/admin/settings" }
];
export default function NavigationStatus() {
    const [pageStatuses, setPageStatuses] = useState(adminPages.map(page => ({ ...page, status: "loading" })));
    useEffect(() => {
        checkAllPages();
    }, []);
    const checkAllPages = async () => {
        const promises = adminPages.map(async (page) => {
            try {
                // Use GET request instead of HEAD to avoid issues with redirects
                const response = await fetch(page.path, {
                    method: "GET",
                    redirect: "manual" // Don't follow redirects automatically
                });
                // 307 redirects indicate protected pages (expected behavior)
                if (response.status === 307 || response.status === 302) {
                    return {
                        ...page,
                        status: "protected",
                        statusCode: response.status
                    };
                }
                // 200 indicates accessible page
                if (response.status === 200) {
                    return {
                        ...page,
                        status: "success",
                        statusCode: response.status
                    };
                }
                // Other status codes are errors
                return {
                    ...page,
                    status: "error",
                    statusCode: response.status
                };
            }
            catch (error) {
                // Network errors
                return {
                    ...page,
                    status: "error",
                    statusCode: 0
                };
            }
        });
        const results = await Promise.all(promises);
        setPageStatuses(results);
    };
    const getStatusIcon = (status) => {
        switch (status) {
            case "success":
                return _jsx(CheckCircle, { className: "size-4 text-green-500" });
            case "protected":
                return _jsx(Shield, { className: "size-4 text-blue-500" });
            case "error":
                return _jsx(XCircle, { className: "size-4 text-red-500" });
            case "loading":
                return _jsx(Clock, { className: "size-4 animate-spin text-yellow-500" });
        }
    };
    const getStatusBadge = (status, statusCode) => {
        switch (status) {
            case "success":
                return _jsx(Badge, { className: "bg-green-600 text-white", children: "Accessible" });
            case "protected":
                return (_jsx(Badge, { className: "bg-blue-600 text-white", children: "Protected (Auth)" }));
            case "error":
                return (_jsx(Badge, { className: "bg-red-600 text-white", children: statusCode === 0 ? "Network Error" : `Error ${statusCode}` }));
            case "loading":
                return _jsx(Badge, { className: "bg-yellow-600 text-white", children: "Checking..." });
        }
    };
    const workingCount = pageStatuses.filter(p => p.status === "success" || p.status === "protected").length;
    const totalCount = pageStatuses.length;
    return (_jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between text-orange-500", children: ["Admin Navigation Status", _jsxs(Badge, { variant: "outline", className: "border-orange-400 text-orange-400", children: [workingCount, "/", totalCount, " Working"] })] }) }), _jsxs(CardContent, { children: [_jsx("div", { className: "space-y-3", children: pageStatuses.map(page => (_jsxs("div", { className: "flex items-center justify-between rounded-lg bg-gray-700 p-3", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [getStatusIcon(page.status), _jsx("span", { className: "font-medium text-white", children: page.name }), _jsx("code", { className: "rounded bg-gray-600 px-2 py-1 text-sm text-gray-400", children: page.path })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [getStatusBadge(page.status, page.statusCode), _jsx(Button, { size: "sm", variant: "outline", onClick: () => window.open(page.path, "_blank"), className: "border-gray-600 text-gray-300 hover:bg-gray-600", children: "Test" })] })] }, page.path))) }), _jsxs("div", { className: "mt-4 border-t border-gray-600 pt-4", children: [_jsxs("div", { className: "mb-3 text-sm text-gray-400", children: [_jsx("strong", { children: "Status Guide:" }), " Protected pages are normal for authenticated admin routes."] }), _jsx(Button, { onClick: checkAllPages, className: "bg-orange-600 text-white hover:bg-orange-700", children: "Recheck All Pages" })] })] })] }));
}
//# sourceMappingURL=component.js.map