"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { Search, Edit, Eye, Mail, CheckSquare, Square, XCircle } from "lucide-react";
import Link from "next/link";
import SortableTable from "../../_components/sortable-table";
import CSVExport from "../../_components/csv-export";
export default function BookingsManagement({ initialBookings = [] }) {
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [dateFilter, setDateFilter] = useState("all");
    const [selectedBookings, setSelectedBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(!initialBookings.length);
    // Load and format bookings from server data
    useEffect(() => {
        formatBookings(initialBookings);
    }, [initialBookings]);
    const formatBookings = (rawBookings) => {
        const formatted = rawBookings.map(booking => ({
            id: booking.id,
            activityId: booking.activityId,
            activityTitle: booking.activity?.title || `Activity ${booking.activityId}`,
            customerName: booking.customerName || "Unknown Customer",
            customerEmail: booking.customerEmail || "",
            totalParticipants: booking.participants || 1,
            totalAmount: parseFloat(booking.totalAmount?.toString()) || 0,
            status: booking.status || "pending",
            bookingDate: new Date(booking.bookingDate),
            activityDate: new Date(booking.activityDate),
            createdAt: new Date(booking.createdAt),
            updatedAt: new Date(booking.updatedAt)
        }));
        setBookings(formatted);
        setIsLoading(false);
    };
    // Filter and search bookings
    const filteredBookings = useMemo(() => {
        let filtered = bookings;
        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(booking => booking.customerName
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                booking.customerEmail
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                booking.activityTitle
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                booking.id.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        // Apply status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter(booking => booking.status === statusFilter);
        }
        // Apply date filter
        if (dateFilter !== "all") {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            switch (dateFilter) {
                case "today":
                    filtered = filtered.filter(booking => booking.activityDate >= today &&
                        booking.activityDate <
                            new Date(today.getTime() + 24 * 60 * 60 * 1000));
                    break;
                case "week":
                    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                    filtered = filtered.filter(booking => booking.activityDate >= today &&
                        booking.activityDate <= weekFromNow);
                    break;
                case "month":
                    const monthFromNow = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
                    filtered = filtered.filter(booking => booking.activityDate >= today &&
                        booking.activityDate <= monthFromNow);
                    break;
            }
        }
        return filtered;
    }, [bookings, searchQuery, statusFilter, dateFilter]);
    // Handle bulk selection
    const handleSelectAll = () => {
        if (selectedBookings.length === filteredBookings.length) {
            setSelectedBookings([]);
        }
        else {
            setSelectedBookings(filteredBookings.map(b => b.id));
        }
    };
    const handleSelectBooking = (bookingId) => {
        setSelectedBookings(prev => prev.includes(bookingId)
            ? prev.filter(id => id !== bookingId)
            : [...prev, bookingId]);
    };
    // Bulk actions
    const handleBulkStatusChange = async (newStatus) => {
        if (selectedBookings.length === 0)
            return;
        try {
            // In real implementation, this would call the API
            setBookings(prev => prev.map(booking => selectedBookings.includes(booking.id)
                ? { ...booking, status: newStatus }
                : booking));
            setSelectedBookings([]);
        }
        catch (error) {
            console.error("Error updating bookings:", error);
        }
    };
    // Table columns configuration
    const columns = [
        {
            key: "select",
            label: "",
            sortable: false,
            width: "w-12",
            render: (_, booking) => (_jsx("button", { onClick: () => handleSelectBooking(booking.id), className: "text-gray-400 transition-colors hover:text-white", children: selectedBookings.includes(booking.id) ? (_jsx(CheckSquare, { className: "size-4 text-orange-500" })) : (_jsx(Square, { className: "size-4" })) }))
        },
        {
            key: "id",
            label: "Booking ID",
            sortable: true,
            width: "w-32",
            render: id => (_jsxs("span", { className: "font-mono text-sm text-orange-400", children: ["#", id.slice(-6).toUpperCase()] }))
        },
        {
            key: "customerName",
            label: "Customer",
            sortable: true,
            render: (name, booking) => (_jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: name }), _jsx("p", { className: "text-sm text-gray-400", children: booking.customerEmail })] }))
        },
        {
            key: "activityTitle",
            label: "Activity",
            sortable: true,
            render: (title, booking) => (_jsx(Link, { href: `/activities/${booking.activityId}`, className: "text-blue-400 transition-colors hover:text-blue-300", children: title }))
        },
        {
            key: "totalParticipants",
            label: "Participants",
            sortable: true,
            render: participants => (_jsxs("span", { className: "text-gray-300", children: [participants, " people"] }))
        },
        {
            key: "totalAmount",
            label: "Amount",
            sortable: true,
            render: amount => (_jsxs("span", { className: "font-medium text-green-400", children: ["\u20AC", amount.toLocaleString()] }))
        },
        {
            key: "status",
            label: "Status",
            sortable: true,
            render: status => {
                const statusStyles = {
                    confirmed: "bg-green-600 text-green-100",
                    pending: "bg-yellow-600 text-yellow-100",
                    cancelled: "bg-red-600 text-red-100",
                    completed: "bg-blue-600 text-blue-100"
                };
                return (_jsx("span", { className: `rounded-full px-2 py-1 text-xs ${statusStyles[status] || "bg-gray-600 text-gray-100"}`, children: status }));
            }
        },
        {
            key: "activityDate",
            label: "Activity Date",
            sortable: true,
            render: date => new Date(date).toLocaleDateString()
        },
        {
            key: "actions",
            label: "Actions",
            sortable: false,
            width: "w-32",
            render: (_, booking) => (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Link, { href: `/booking/${booking.id}`, className: "p-1 text-gray-400 transition-colors hover:text-blue-400", title: "View Details", children: _jsx(Eye, { className: "size-4" }) }), _jsx("button", { className: "p-1 text-gray-400 transition-colors hover:text-green-400", title: "Edit Booking", children: _jsx(Edit, { className: "size-4" }) }), _jsx("button", { className: "p-1 text-gray-400 transition-colors hover:text-purple-400", title: "Contact Customer", children: _jsx(Mail, { className: "size-4" }) }), _jsx("button", { className: "p-1 text-gray-400 transition-colors hover:text-red-400", title: "Cancel Booking", children: _jsx(XCircle, { className: "size-4" }) })] }))
        }
    ];
    if (isLoading) {
        return (_jsxs("div", { className: "rounded-lg bg-gray-800 p-8 text-center", children: [_jsx("div", { className: "mx-auto mb-4 size-8 animate-spin rounded-full border-b-2 border-orange-500" }), _jsx("p", { className: "text-gray-400", children: "Loading bookings..." })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "rounded-lg border border-gray-700 bg-gray-800 p-6", children: [_jsxs("div", { className: "mb-4 flex flex-col gap-4 lg:flex-row", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Search bookings, customers, activities...", className: "w-full rounded-lg border border-gray-600 bg-gray-700 py-2 pl-10 pr-4 text-white placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500", value: searchQuery, onChange: e => setSearchQuery(e.target.value) })] }), _jsxs("select", { className: "rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500", value: statusFilter, onChange: e => setStatusFilter(e.target.value), children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "confirmed", children: "Confirmed" }), _jsx("option", { value: "pending", children: "Pending" }), _jsx("option", { value: "cancelled", children: "Cancelled" }), _jsx("option", { value: "completed", children: "Completed" })] }), _jsxs("select", { className: "rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500", value: dateFilter, onChange: e => setDateFilter(e.target.value), children: [_jsx("option", { value: "all", children: "All Dates" }), _jsx("option", { value: "today", children: "Today" }), _jsx("option", { value: "week", children: "This Week" }), _jsx("option", { value: "month", children: "This Month" })] }), _jsx(CSVExport, {})] }), selectedBookings.length > 0 && (_jsxs("div", { className: "flex items-center justify-between rounded-lg bg-gray-700 p-3", children: [_jsxs("span", { className: "text-sm text-white", children: [selectedBookings.length, " bookings selected"] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { onClick: () => handleBulkStatusChange("confirmed"), className: "rounded bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700", children: "Confirm" }), _jsx("button", { onClick: () => handleBulkStatusChange("cancelled"), className: "rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700", children: "Cancel" }), _jsx("button", { onClick: () => console.log("Send emails to selected customers"), className: "rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700", children: "Email Customers" })] })] }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-sm text-gray-400", children: ["Showing ", filteredBookings.length, " of ", bookings.length, " bookings"] }), _jsxs("button", { onClick: handleSelectAll, className: "flex items-center space-x-2 text-sm text-gray-400 transition-colors hover:text-white", children: [selectedBookings.length === filteredBookings.length ? (_jsx(CheckSquare, { className: "size-4 text-orange-500" })) : (_jsx(Square, { className: "size-4" })), _jsx("span", { children: "Select All" })] })] }), _jsx(SortableTable, { columns: columns, data: filteredBookings, defaultSort: { key: "createdAt", direction: "desc" }, onRowClick: booking => console.log("Row clicked:", booking), rowClassName: booking => selectedBookings.includes(booking.id)
                    ? "bg-gray-750 border-l-4 border-orange-500"
                    : "" })] }));
}
//# sourceMappingURL=component.js.map