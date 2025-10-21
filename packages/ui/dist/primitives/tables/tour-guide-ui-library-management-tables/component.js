"use server";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, Eye, Edit, Trash2, ExternalLink, CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { getActivitiesAction } from "@/actions/db/activities-actions";
import { getBookingsAction } from "@/actions/db/bookings-actions";
function StatusBadge({ status }) {
    const statusConfig = {
        confirmed: { color: "bg-green-600 text-green-100", icon: CheckCircle },
        pending: { color: "bg-yellow-600 text-yellow-100", icon: Clock },
        cancelled: { color: "bg-red-600 text-red-100", icon: XCircle },
        completed: { color: "bg-blue-600 text-blue-100", icon: CheckCircle },
        active: { color: "bg-green-600 text-green-100", icon: CheckCircle },
        draft: { color: "bg-gray-600 text-gray-100", icon: Clock },
        inactive: { color: "bg-red-600 text-red-100", icon: XCircle }
    };
    const config = statusConfig[status] || {
        color: "bg-gray-600 text-gray-100",
        icon: Clock
    };
    const Icon = config.icon;
    return (_jsxs("span", { className: `inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${config.color}`, children: [_jsx(Icon, { className: "mr-1 size-3" }), status] }));
}
async function getManagementData() {
    try {
        const [activitiesResponse, bookingsResponse] = await Promise.all([
            getActivitiesAction(),
            getBookingsAction()
        ]);
        const activities = activitiesResponse.isSuccess
            ? activitiesResponse.data.slice(0, 5)
            : [];
        const bookings = bookingsResponse.isSuccess
            ? bookingsResponse.data.slice(0, 5)
            : [];
        return { activities, bookings };
    }
    catch (error) {
        console.error("Error fetching management data:", error);
        return { activities: [], bookings: [] };
    }
}
export default async function ManagementTables() {
    const { activities, bookings } = await getManagementData();
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "rounded-lg border border-gray-700 bg-gray-800", children: [_jsx("div", { className: "border-b border-gray-700 p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "flex items-center text-xl font-semibold text-orange-500", children: [_jsx(Table, { className: "mr-2 size-5" }), "Recent Activities"] }), _jsxs(Link, { href: "/admin/activities", className: "flex items-center text-sm font-medium text-orange-500 hover:text-orange-400", children: ["View All", _jsx(ExternalLink, { className: "ml-1 size-4" })] })] }) }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-700 text-left text-sm text-gray-400", children: [_jsx("th", { className: "p-4 font-medium", children: "Activity" }), _jsx("th", { className: "p-4 font-medium", children: "Category" }), _jsx("th", { className: "p-4 font-medium", children: "Location" }), _jsx("th", { className: "p-4 font-medium", children: "Status" }), _jsx("th", { className: "p-4 font-medium", children: "Bookings" }), _jsx("th", { className: "p-4 font-medium", children: "Actions" })] }) }), _jsx("tbody", { children: activities.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "p-8 text-center text-gray-400", children: "No activities found" }) })) : (activities.map(activity => (_jsxs("tr", { className: "border-b border-gray-700 transition-colors hover:bg-gray-700", children: [_jsx("td", { className: "p-4", children: _jsxs("div", { children: [_jsx("p", { className: "max-w-xs truncate font-medium text-white", children: activity.title }), _jsxs("p", { className: "mt-1 text-xs text-gray-400", children: ["Created", " ", new Date(activity.createdAt).toLocaleDateString()] })] }) }), _jsx("td", { className: "p-4", children: _jsx("span", { className: "capitalize text-gray-300", children: activity.category.replace("_", " ") }) }), _jsx("td", { className: "p-4 text-gray-300", children: activity.location }), _jsx("td", { className: "p-4", children: _jsx(StatusBadge, { status: activity.status }) }), _jsx("td", { className: "p-4 text-gray-300", children: activity.totalBookings || 0 }), _jsx("td", { className: "p-4", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { className: "p-1 text-gray-400 transition-colors hover:text-orange-500", children: _jsx(Eye, { className: "size-4" }) }), _jsx("button", { className: "p-1 text-gray-400 transition-colors hover:text-orange-500", children: _jsx(Edit, { className: "size-4" }) }), _jsx("button", { className: "p-1 text-gray-400 transition-colors hover:text-red-500", children: _jsx(Trash2, { className: "size-4" }) })] }) })] }, activity.id)))) })] }) })] }), _jsxs("div", { className: "rounded-lg border border-gray-700 bg-gray-800", children: [_jsx("div", { className: "border-b border-gray-700 p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "flex items-center text-xl font-semibold text-orange-500", children: [_jsx(Table, { className: "mr-2 size-5" }), "Recent Bookings"] }), _jsxs(Link, { href: "/admin/bookings", className: "flex items-center text-sm font-medium text-orange-500 hover:text-orange-400", children: ["View All", _jsx(ExternalLink, { className: "ml-1 size-4" })] })] }) }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-gray-700 text-left text-sm text-gray-400", children: [_jsx("th", { className: "p-4 font-medium", children: "Booking Ref" }), _jsx("th", { className: "p-4 font-medium", children: "Customer" }), _jsx("th", { className: "p-4 font-medium", children: "Date" }), _jsx("th", { className: "p-4 font-medium", children: "Participants" }), _jsx("th", { className: "p-4 font-medium", children: "Amount" }), _jsx("th", { className: "p-4 font-medium", children: "Status" }), _jsx("th", { className: "p-4 font-medium", children: "Actions" })] }) }), _jsx("tbody", { children: bookings.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "p-8 text-center text-gray-400", children: "No bookings found" }) })) : (bookings.map(booking => (_jsxs("tr", { className: "border-b border-gray-700 transition-colors hover:bg-gray-700", children: [_jsx("td", { className: "p-4", children: _jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: booking.bookingReference }), _jsx("p", { className: "mt-1 text-xs text-gray-400", children: new Date(booking.createdAt).toLocaleDateString() })] }) }), _jsx("td", { className: "p-4", children: _jsxs("div", { children: [_jsx("p", { className: "text-gray-300", children: booking.leadCustomerName }), _jsx("p", { className: "text-xs text-gray-400", children: booking.leadCustomerEmail })] }) }), _jsx("td", { className: "p-4 text-gray-300", children: new Date(booking.bookingDate).toLocaleDateString() }), _jsx("td", { className: "p-4 text-gray-300", children: booking.totalParticipants }), _jsxs("td", { className: "p-4 text-gray-300", children: ["\u20AC", booking.totalAmount] }), _jsx("td", { className: "p-4", children: _jsx(StatusBadge, { status: booking.status }) }), _jsx("td", { className: "p-4", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("button", { className: "p-1 text-gray-400 transition-colors hover:text-orange-500", children: _jsx(Eye, { className: "size-4" }) }), _jsx("button", { className: "p-1 text-gray-400 transition-colors hover:text-orange-500", children: _jsx(Edit, { className: "size-4" }) }), _jsx("button", { className: "p-1 text-gray-400 transition-colors hover:text-red-500", children: _jsx(Trash2, { className: "size-4" }) })] }) })] }, booking.id)))) })] }) })] })] }));
}
//# sourceMappingURL=component.js.map