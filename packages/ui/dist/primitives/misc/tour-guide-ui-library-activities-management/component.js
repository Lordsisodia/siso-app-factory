"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { Search, Edit, Eye, Trash2, Copy, CheckSquare, Square } from "lucide-react";
import Link from "next/link";
import SortableTable from "../../_components/sortable-table";
import CSVExport from "../../_components/csv-export";
export default function ActivitiesManagement({ initialActivities = [] }) {
    const [activities, setActivities] = useState(initialActivities);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedActivities, setSelectedActivities] = useState([]);
    const [isLoading, setIsLoading] = useState(!initialActivities.length);
    // Load activities if not provided
    useEffect(() => {
        if (!initialActivities.length) {
            loadActivities();
        }
    }, [initialActivities.length]);
    const loadActivities = async () => {
        setIsLoading(true);
        try {
            // Call the activities action to get real data
            const response = await fetch("/api/activities");
            if (!response.ok)
                throw new Error("Failed to fetch activities");
            const data = await response.json();
            const formattedActivities = data.map((activity) => ({
                id: activity.id,
                title: activity.title,
                description: activity.description || "",
                price: parseFloat(activity.price) || 0,
                location: activity.location || "",
                status: activity.status || "draft",
                createdAt: new Date(activity.createdAt),
                updatedAt: new Date(activity.updatedAt),
                displayOrder: activity.displayOrder || 0
            }));
            setActivities(formattedActivities);
        }
        catch (error) {
            console.error("Error loading activities:", error);
            // Fallback to mock data if API fails
            const mockActivities = [
                {
                    id: "1",
                    title: "Jet Ski Adventure",
                    description: "Experience the thrill of jet skiing",
                    price: 85,
                    location: "Palma Bay",
                    status: "active",
                    createdAt: new Date("2024-01-15"),
                    updatedAt: new Date("2024-01-20"),
                    displayOrder: 1
                },
                {
                    id: "2",
                    title: "Boat Tour",
                    description: "Scenic coastal boat tour",
                    price: 120,
                    location: "Port Adriano",
                    status: "active",
                    createdAt: new Date("2024-01-14"),
                    updatedAt: new Date("2024-01-19"),
                    displayOrder: 2
                },
                {
                    id: "3",
                    title: "Snorkeling Experience",
                    description: "Explore underwater paradise",
                    price: 65,
                    location: "Cala Millor",
                    status: "draft",
                    createdAt: new Date("2024-01-13"),
                    updatedAt: new Date("2024-01-18"),
                    displayOrder: 3
                }
            ];
            setActivities(mockActivities);
        }
        finally {
            setIsLoading(false);
        }
    };
    // Filter and search activities
    const filteredActivities = useMemo(() => {
        let filtered = activities;
        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(activity => activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                activity.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                activity.location?.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        // Apply status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter(activity => activity.status === statusFilter);
        }
        return filtered;
    }, [activities, searchQuery, statusFilter]);
    // Handle bulk selection
    const handleSelectAll = () => {
        if (selectedActivities.length === filteredActivities.length) {
            setSelectedActivities([]);
        }
        else {
            setSelectedActivities(filteredActivities.map(a => a.id));
        }
    };
    const handleSelectActivity = (activityId) => {
        setSelectedActivities(prev => prev.includes(activityId)
            ? prev.filter(id => id !== activityId)
            : [...prev, activityId]);
    };
    // Bulk actions
    const handleBulkStatusChange = async (newStatus) => {
        if (selectedActivities.length === 0)
            return;
        try {
            // In real implementation, this would call the API
            setActivities(prev => prev.map(activity => selectedActivities.includes(activity.id)
                ? { ...activity, status: newStatus }
                : activity));
            setSelectedActivities([]);
        }
        catch (error) {
            console.error("Error updating activities:", error);
        }
    };
    const handleBulkDelete = async () => {
        if (selectedActivities.length === 0)
            return;
        const confirmed = confirm(`Delete ${selectedActivities.length} activities? This action cannot be undone.`);
        if (!confirmed)
            return;
        try {
            // In real implementation, this would call the API
            setActivities(prev => prev.filter(activity => !selectedActivities.includes(activity.id)));
            setSelectedActivities([]);
        }
        catch (error) {
            console.error("Error deleting activities:", error);
        }
    };
    // Table columns configuration
    const columns = [
        {
            key: "select",
            label: "",
            sortable: false,
            width: "w-12",
            render: (_, activity) => (_jsx("button", { onClick: () => handleSelectActivity(activity.id), className: "text-gray-400 transition-colors hover:text-white", children: selectedActivities.includes(activity.id) ? (_jsx(CheckSquare, { className: "size-4 text-orange-500" })) : (_jsx(Square, { className: "size-4" })) }))
        },
        {
            key: "title",
            label: "Activity",
            sortable: true,
            render: (title, activity) => (_jsxs("div", { children: [_jsx(Link, { href: `/activities/${activity.id}`, className: "font-medium text-white transition-colors hover:text-orange-500", children: title }), _jsx("p", { className: "max-w-xs truncate text-sm text-gray-400", children: activity.description })] }))
        },
        {
            key: "price",
            label: "Price",
            sortable: true,
            render: price => (_jsxs("span", { className: "font-medium text-green-400", children: ["\u20AC", price] }))
        },
        {
            key: "location",
            label: "Location",
            sortable: true
        },
        {
            key: "status",
            label: "Status",
            sortable: true,
            render: status => {
                const statusStyles = {
                    active: "bg-green-600 text-green-100",
                    draft: "bg-yellow-600 text-yellow-100",
                    inactive: "bg-red-600 text-red-100"
                };
                return (_jsx("span", { className: `rounded-full px-2 py-1 text-xs ${statusStyles[status] || "bg-gray-600 text-gray-100"}`, children: status }));
            }
        },
        {
            key: "createdAt",
            label: "Created",
            sortable: true,
            render: date => new Date(date).toLocaleDateString()
        },
        {
            key: "actions",
            label: "Actions",
            sortable: false,
            width: "w-32",
            render: (_, activity) => (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Link, { href: `/activities/${activity.id}`, className: "p-1 text-gray-400 transition-colors hover:text-blue-400", title: "View", children: _jsx(Eye, { className: "size-4" }) }), _jsx("button", { className: "p-1 text-gray-400 transition-colors hover:text-green-400", title: "Edit", children: _jsx(Edit, { className: "size-4" }) }), _jsx("button", { className: "p-1 text-gray-400 transition-colors hover:text-purple-400", title: "Duplicate", children: _jsx(Copy, { className: "size-4" }) }), _jsx("button", { className: "p-1 text-gray-400 transition-colors hover:text-red-400", title: "Delete", children: _jsx(Trash2, { className: "size-4" }) })] }))
        }
    ];
    if (isLoading) {
        return (_jsxs("div", { className: "rounded-lg bg-gray-800 p-8 text-center", children: [_jsx("div", { className: "mx-auto mb-4 size-8 animate-spin rounded-full border-b-2 border-orange-500" }), _jsx("p", { className: "text-gray-400", children: "Loading activities..." })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "rounded-lg border border-gray-700 bg-gray-800 p-6", children: [_jsxs("div", { className: "mb-4 flex flex-col gap-4 sm:flex-row", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Search activities...", className: "w-full rounded-lg border border-gray-600 bg-gray-700 py-2 pl-10 pr-4 text-white placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500", value: searchQuery, onChange: e => setSearchQuery(e.target.value) })] }), _jsxs("select", { className: "rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500", value: statusFilter, onChange: e => setStatusFilter(e.target.value), children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "draft", children: "Draft" }), _jsx("option", { value: "inactive", children: "Inactive" })] }), _jsx(CSVExport, {})] }), selectedActivities.length > 0 && (_jsxs("div", { className: "flex items-center justify-between rounded-lg bg-gray-700 p-3", children: [_jsxs("span", { className: "text-sm text-white", children: [selectedActivities.length, " activities selected"] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { onClick: () => handleBulkStatusChange("active"), className: "rounded bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700", children: "Activate" }), _jsx("button", { onClick: () => handleBulkStatusChange("inactive"), className: "rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700", children: "Deactivate" }), _jsx("button", { onClick: handleBulkDelete, className: "rounded bg-red-700 px-3 py-1 text-sm text-white transition-colors hover:bg-red-800", children: "Delete" })] })] }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-sm text-gray-400", children: ["Showing ", filteredActivities.length, " of ", activities.length, " activities"] }), _jsxs("button", { onClick: handleSelectAll, className: "flex items-center space-x-2 text-sm text-gray-400 transition-colors hover:text-white", children: [selectedActivities.length === filteredActivities.length ? (_jsx(CheckSquare, { className: "size-4 text-orange-500" })) : (_jsx(Square, { className: "size-4" })), _jsx("span", { children: "Select All" })] })] }), _jsx(SortableTable, { columns: columns, data: filteredActivities, defaultSort: { key: "createdAt", direction: "desc" }, onRowClick: activity => console.log("Row clicked:", activity), rowClassName: activity => selectedActivities.includes(activity.id)
                    ? "bg-gray-750 border-l-4 border-orange-500"
                    : "" })] }));
}
//# sourceMappingURL=component.js.map