"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { Search, CheckSquare, Square, Eye, Edit, Mail, Ban } from "lucide-react";
import Link from "next/link";
import SortableTable from "../../_components/sortable-table";
import CSVExport from "../../_components/csv-export";
export default function UsersManagement({ initialUsers = [] }) {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [roleFilter, setRoleFilter] = useState("all");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(!initialUsers.length);
    // Load and format users
    useEffect(() => {
        if (initialUsers.length > 0) {
            formatUsers(initialUsers);
        }
        else {
            loadUsers();
        }
    }, [initialUsers]);
    const formatUsers = (rawUsers) => {
        const formatted = rawUsers.map(user => ({
            id: user.id,
            email: user.email || user.emailAddress || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                "Unknown User",
            avatar: user.avatar || user.imageUrl,
            status: user.status || "active",
            role: user.role || "customer",
            totalBookings: user.totalBookings || 0,
            totalSpent: parseFloat(user.totalSpent?.toString()) || 0,
            lastLogin: new Date(user.lastLogin || user.lastSignInAt || user.createdAt),
            joinDate: new Date(user.createdAt),
            createdAt: new Date(user.createdAt),
            updatedAt: new Date(user.updatedAt || user.createdAt)
        }));
        setUsers(formatted);
        setIsLoading(false);
    };
    const loadUsers = async () => {
        setIsLoading(true);
        try {
            // Call the users API endpoint
            const response = await fetch("/api/users");
            if (!response.ok)
                throw new Error("Failed to fetch users");
            const data = await response.json();
            formatUsers(data);
        }
        catch (error) {
            console.error("Error loading users:", error);
            // Fallback to mock data if API fails
            const mockUsers = [
                {
                    id: "1",
                    email: "john.doe@example.com",
                    firstName: "John",
                    lastName: "Doe",
                    fullName: "John Doe",
                    status: "active",
                    role: "customer",
                    totalBookings: 5,
                    totalSpent: 850,
                    lastLogin: new Date("2024-01-24"),
                    joinDate: new Date("2023-06-15"),
                    createdAt: new Date("2023-06-15"),
                    updatedAt: new Date("2024-01-24")
                },
                {
                    id: "2",
                    email: "jane.smith@example.com",
                    firstName: "Jane",
                    lastName: "Smith",
                    fullName: "Jane Smith",
                    status: "active",
                    role: "premium",
                    totalBookings: 12,
                    totalSpent: 2340,
                    lastLogin: new Date("2024-01-25"),
                    joinDate: new Date("2023-03-10"),
                    createdAt: new Date("2023-03-10"),
                    updatedAt: new Date("2024-01-25")
                },
                {
                    id: "3",
                    email: "admin@mallocra.com",
                    firstName: "Admin",
                    lastName: "User",
                    fullName: "Admin User",
                    status: "active",
                    role: "admin",
                    totalBookings: 0,
                    totalSpent: 0,
                    lastLogin: new Date("2024-01-25"),
                    joinDate: new Date("2023-01-01"),
                    createdAt: new Date("2023-01-01"),
                    updatedAt: new Date("2024-01-25")
                }
            ];
            setUsers(mockUsers);
        }
        finally {
            setIsLoading(false);
        }
    };
    // Filter and search users
    const filteredUsers = useMemo(() => {
        let filtered = users;
        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(user => user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.id.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        // Apply status filter
        if (statusFilter !== "all") {
            filtered = filtered.filter(user => user.status === statusFilter);
        }
        // Apply role filter
        if (roleFilter !== "all") {
            filtered = filtered.filter(user => user.role === roleFilter);
        }
        return filtered;
    }, [users, searchQuery, statusFilter, roleFilter]);
    // Handle bulk selection
    const handleSelectAll = () => {
        if (selectedUsers.length === filteredUsers.length) {
            setSelectedUsers([]);
        }
        else {
            setSelectedUsers(filteredUsers.map(u => u.id));
        }
    };
    const handleSelectUser = (userId) => {
        setSelectedUsers(prev => prev.includes(userId)
            ? prev.filter(id => id !== userId)
            : [...prev, userId]);
    };
    // Bulk actions
    const handleBulkStatusChange = async (newStatus) => {
        if (selectedUsers.length === 0)
            return;
        try {
            // In real implementation, this would call the API
            setUsers(prev => prev.map(user => selectedUsers.includes(user.id)
                ? { ...user, status: newStatus }
                : user));
            setSelectedUsers([]);
        }
        catch (error) {
            console.error("Error updating users:", error);
        }
    };
    // Table columns configuration
    const columns = [
        {
            key: "select",
            label: "",
            sortable: false,
            width: "w-12",
            render: (_, user) => (_jsx("button", { onClick: () => handleSelectUser(user.id), className: "text-gray-400 transition-colors hover:text-white", children: selectedUsers.includes(user.id) ? (_jsx(CheckSquare, { className: "size-4 text-orange-500" })) : (_jsx(Square, { className: "size-4" })) }))
        },
        {
            key: "fullName",
            label: "User",
            sortable: true,
            render: (name, user) => (_jsxs("div", { className: "flex items-center space-x-3", children: [user.avatar ? (_jsx("img", { src: user.avatar, alt: name, className: "size-8 rounded-full object-cover" })) : (_jsx("div", { className: "flex size-8 items-center justify-center rounded-full bg-gray-600", children: _jsx("span", { className: "text-sm font-medium text-white", children: name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase() }) })), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: name }), _jsx("p", { className: "text-sm text-gray-400", children: user.email })] })] }))
        },
        {
            key: "role",
            label: "Role",
            sortable: true,
            render: role => {
                const roleStyles = {
                    admin: "bg-red-600 text-red-100",
                    premium: "bg-yellow-600 text-yellow-100",
                    customer: "bg-blue-600 text-blue-100",
                    moderator: "bg-purple-600 text-purple-100"
                };
                return (_jsx("span", { className: `rounded-full px-2 py-1 text-xs ${roleStyles[role] || "bg-gray-600 text-gray-100"}`, children: role }));
            }
        },
        {
            key: "status",
            label: "Status",
            sortable: true,
            render: status => {
                const statusStyles = {
                    active: "bg-green-600 text-green-100",
                    inactive: "bg-gray-600 text-gray-100",
                    suspended: "bg-red-600 text-red-100",
                    pending: "bg-yellow-600 text-yellow-100"
                };
                return (_jsx("span", { className: `rounded-full px-2 py-1 text-xs ${statusStyles[status] || "bg-gray-600 text-gray-100"}`, children: status }));
            }
        },
        {
            key: "totalBookings",
            label: "Bookings",
            sortable: true,
            render: bookings => (_jsxs("span", { className: "text-gray-300", children: [bookings, " bookings"] }))
        },
        {
            key: "totalSpent",
            label: "Total Spent",
            sortable: true,
            render: amount => (_jsxs("span", { className: "font-medium text-green-400", children: ["\u20AC", amount.toLocaleString()] }))
        },
        {
            key: "lastLogin",
            label: "Last Login",
            sortable: true,
            render: date => {
                const now = new Date();
                const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays === 1)
                    return "Today";
                if (diffDays === 2)
                    return "Yesterday";
                if (diffDays <= 7)
                    return `${diffDays} days ago`;
                return new Date(date).toLocaleDateString();
            }
        },
        {
            key: "joinDate",
            label: "Join Date",
            sortable: true,
            render: date => new Date(date).toLocaleDateString()
        },
        {
            key: "actions",
            label: "Actions",
            sortable: false,
            width: "w-32",
            render: (_, user) => (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Link, { href: `/admin/users/${user.id}`, className: "p-1 text-gray-400 transition-colors hover:text-blue-400", title: "View Profile", children: _jsx(Eye, { className: "size-4" }) }), _jsx("button", { className: "p-1 text-gray-400 transition-colors hover:text-green-400", title: "Edit User", children: _jsx(Edit, { className: "size-4" }) }), _jsx("button", { className: "p-1 text-gray-400 transition-colors hover:text-purple-400", title: "Send Email", children: _jsx(Mail, { className: "size-4" }) }), _jsx("button", { className: "p-1 text-gray-400 transition-colors hover:text-red-400", title: "Suspend User", children: _jsx(Ban, { className: "size-4" }) })] }))
        }
    ];
    if (isLoading) {
        return (_jsxs("div", { className: "rounded-lg bg-gray-800 p-8 text-center", children: [_jsx("div", { className: "mx-auto mb-4 size-8 animate-spin rounded-full border-b-2 border-orange-500" }), _jsx("p", { className: "text-gray-400", children: "Loading users..." })] }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "rounded-lg border border-gray-700 bg-gray-800 p-6", children: [_jsxs("div", { className: "mb-4 flex flex-col gap-4 lg:flex-row", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "text", placeholder: "Search users by name, email, or ID...", className: "w-full rounded-lg border border-gray-600 bg-gray-700 py-2 pl-10 pr-4 text-white placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500", value: searchQuery, onChange: e => setSearchQuery(e.target.value) })] }), _jsxs("select", { className: "rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500", value: statusFilter, onChange: e => setStatusFilter(e.target.value), children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "active", children: "Active" }), _jsx("option", { value: "inactive", children: "Inactive" }), _jsx("option", { value: "suspended", children: "Suspended" }), _jsx("option", { value: "pending", children: "Pending" })] }), _jsxs("select", { className: "rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500", value: roleFilter, onChange: e => setRoleFilter(e.target.value), children: [_jsx("option", { value: "all", children: "All Roles" }), _jsx("option", { value: "customer", children: "Customer" }), _jsx("option", { value: "premium", children: "Premium" }), _jsx("option", { value: "admin", children: "Admin" }), _jsx("option", { value: "moderator", children: "Moderator" })] }), _jsx(CSVExport, {})] }), selectedUsers.length > 0 && (_jsxs("div", { className: "flex items-center justify-between rounded-lg bg-gray-700 p-3", children: [_jsxs("span", { className: "text-sm text-white", children: [selectedUsers.length, " users selected"] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx("button", { onClick: () => handleBulkStatusChange("active"), className: "rounded bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-green-700", children: "Activate" }), _jsx("button", { onClick: () => handleBulkStatusChange("suspended"), className: "rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700", children: "Suspend" }), _jsx("button", { onClick: () => console.log("Send emails to selected users"), className: "rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700", children: "Email Users" })] })] }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("p", { className: "text-sm text-gray-400", children: ["Showing ", filteredUsers.length, " of ", users.length, " users"] }), _jsxs("button", { onClick: handleSelectAll, className: "flex items-center space-x-2 text-sm text-gray-400 transition-colors hover:text-white", children: [selectedUsers.length === filteredUsers.length ? (_jsx(CheckSquare, { className: "size-4 text-orange-500" })) : (_jsx(Square, { className: "size-4" })), _jsx("span", { children: "Select All" })] })] }), _jsx(SortableTable, { columns: columns, data: filteredUsers, defaultSort: { key: "lastLogin", direction: "desc" }, onRowClick: user => console.log("Row clicked:", user), rowClassName: user => selectedUsers.includes(user.id)
                    ? "bg-gray-750 border-l-4 border-orange-500"
                    : "" })] }));
}
//# sourceMappingURL=component.js.map