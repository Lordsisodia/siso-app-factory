"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Download, Calendar, Users, Activity } from "lucide-react";
export default function CSVExport({ className = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedExport, setSelectedExport] = useState(null);
    const [isExporting, setIsExporting] = useState(false);
    const [exportFields, setExportFields] = useState([]);
    const exportOptions = [
        {
            id: "activities",
            name: "Activities",
            description: "Export all activity data",
            icon: Activity,
            fields: [
                { key: "id", label: "ID", selected: true },
                { key: "title", label: "Title", selected: true },
                { key: "description", label: "Description", selected: false },
                { key: "price", label: "Price", selected: true },
                { key: "location", label: "Location", selected: true },
                { key: "status", label: "Status", selected: true },
                { key: "createdAt", label: "Created Date", selected: true }
            ],
            getData: async () => {
                // Mock data - in real implementation this would call the API
                return [
                    {
                        id: "ACT001",
                        title: "Jet Ski Adventure",
                        description: "Thrilling jet ski experience",
                        price: 85,
                        location: "Palma Bay",
                        status: "active",
                        createdAt: "2024-01-15"
                    },
                    {
                        id: "ACT002",
                        title: "Boat Tour",
                        description: "Scenic coastal boat tour",
                        price: 120,
                        location: "Port Adriano",
                        status: "active",
                        createdAt: "2024-01-14"
                    }
                ];
            }
        },
        {
            id: "bookings",
            name: "Bookings",
            description: "Export booking information",
            icon: Calendar,
            fields: [
                { key: "id", label: "Booking ID", selected: true },
                { key: "activityTitle", label: "Activity", selected: true },
                { key: "customerName", label: "Customer Name", selected: true },
                { key: "customerEmail", label: "Email", selected: false },
                { key: "totalParticipants", label: "Participants", selected: true },
                { key: "totalAmount", label: "Amount", selected: true },
                { key: "status", label: "Status", selected: true },
                { key: "bookingDate", label: "Booking Date", selected: true },
                { key: "activityDate", label: "Activity Date", selected: true }
            ],
            getData: async () => {
                return [
                    {
                        id: "BK001",
                        activityTitle: "Jet Ski Adventure",
                        customerName: "John Doe",
                        customerEmail: "john@example.com",
                        totalParticipants: 2,
                        totalAmount: 170,
                        status: "confirmed",
                        bookingDate: "2024-01-20",
                        activityDate: "2024-01-25"
                    }
                ];
            }
        },
        {
            id: "customers",
            name: "Customers",
            description: "Export customer data",
            icon: Users,
            fields: [
                { key: "id", label: "Customer ID", selected: true },
                { key: "name", label: "Name", selected: true },
                { key: "email", label: "Email", selected: true },
                { key: "phone", label: "Phone", selected: false },
                { key: "totalBookings", label: "Total Bookings", selected: true },
                { key: "totalSpent", label: "Total Spent", selected: true },
                { key: "lastBooking", label: "Last Booking", selected: true },
                { key: "createdAt", label: "Registered Date", selected: true }
            ],
            getData: async () => {
                return [
                    {
                        id: "CUST001",
                        name: "John Doe",
                        email: "john@example.com",
                        phone: "+34 123 456 789",
                        totalBookings: 3,
                        totalSpent: 450,
                        lastBooking: "2024-01-25",
                        createdAt: "2024-01-10"
                    }
                ];
            }
        }
    ];
    const handleExportSelect = (exportId) => {
        const option = exportOptions.find(opt => opt.id === exportId);
        if (option) {
            setSelectedExport(exportId);
            setExportFields([...option.fields]);
        }
    };
    const toggleField = (fieldKey) => {
        setExportFields(fields => fields.map(field => field.key === fieldKey ? { ...field, selected: !field.selected } : field));
    };
    const generateCSV = (data, fields) => {
        const selectedFields = fields.filter(field => field.selected);
        const headers = selectedFields.map(field => field.label);
        const csvContent = [
            // Headers
            headers.join(","),
            // Data rows
            ...data.map(row => selectedFields
                .map(field => {
                const value = row[field.key];
                // Handle values that might contain commas or quotes
                if (typeof value === "string" &&
                    (value.includes(",") || value.includes('"'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value ?? "";
            })
                .join(","))
        ].join("\n");
        return csvContent;
    };
    const downloadCSV = (content, filename) => {
        const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    const handleExport = async () => {
        if (!selectedExport)
            return;
        const option = exportOptions.find(opt => opt.id === selectedExport);
        if (!option)
            return;
        setIsExporting(true);
        try {
            const data = await option.getData();
            const csvContent = generateCSV(data, exportFields);
            const timestamp = new Date().toISOString().slice(0, 10);
            const filename = `${option.name.toLowerCase()}-export-${timestamp}.csv`;
            downloadCSV(csvContent, filename);
            // Success feedback
            setIsOpen(false);
            setSelectedExport(null);
        }
        catch (error) {
            console.error("Export failed:", error);
            alert("Export failed. Please try again.");
        }
        finally {
            setIsExporting(false);
        }
    };
    const selectedOption = exportOptions.find(opt => opt.id === selectedExport);
    const selectedFieldsCount = exportFields.filter(f => f.selected).length;
    return (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => setIsOpen(true), className: `inline-flex items-center space-x-2 rounded-lg bg-gray-700 px-4 py-2 text-white transition-colors hover:bg-gray-600 ${className}`, children: [_jsx(Download, { className: "size-4" }), _jsx("span", { children: "Export CSV" })] }), isOpen && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4", children: _jsx("div", { className: "max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-gray-700 bg-gray-800", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "mb-6 flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-xl font-semibold text-white", children: "Export Data" }), _jsx("p", { className: "text-sm text-gray-400", children: "Choose data type and fields to export" })] }), _jsx("button", { onClick: () => setIsOpen(false), className: "text-gray-400 hover:text-white", children: "\u2715" })] }), !selectedExport && (_jsxs("div", { children: [_jsx("h4", { className: "mb-4 text-lg font-medium text-white", children: "Select Data Type" }), _jsx("div", { className: "grid gap-3", children: exportOptions.map(option => {
                                            const Icon = option.icon;
                                            return (_jsxs("button", { onClick: () => handleExportSelect(option.id), className: "flex items-center space-x-3 rounded-lg bg-gray-700 p-4 text-left transition-colors hover:bg-gray-600", children: [_jsx("div", { className: "shrink-0 rounded-lg bg-orange-600 p-2", children: _jsx(Icon, { className: "size-5 text-white" }) }), _jsxs("div", { children: [_jsx("h5", { className: "font-medium text-white", children: option.name }), _jsx("p", { className: "text-sm text-gray-400", children: option.description })] })] }, option.id));
                                        }) })] })), selectedExport && selectedOption && (_jsxs("div", { children: [_jsxs("div", { className: "mb-4 flex items-center justify-between", children: [_jsxs("h4", { className: "text-lg font-medium text-white", children: ["Select Fields for ", selectedOption.name] }), _jsx("button", { onClick: () => setSelectedExport(null), className: "text-sm text-orange-400 hover:text-orange-300", children: "\u2190 Back" })] }), _jsxs("div", { className: "mb-6", children: [_jsxs("p", { className: "mb-3 text-sm text-gray-400", children: ["Choose which fields to include in your export (", selectedFieldsCount, " selected)"] }), _jsx("div", { className: "max-h-64 space-y-2 overflow-y-auto", children: exportFields.map(field => (_jsxs("label", { className: "flex cursor-pointer items-center space-x-3 rounded p-2 hover:bg-gray-700", children: [_jsx("input", { type: "checkbox", checked: field.selected, onChange: () => toggleField(field.key), className: "size-4 rounded border-gray-600 bg-gray-700 text-orange-600 focus:ring-orange-500" }), _jsx("span", { className: "text-sm text-white", children: field.label })] }, field.key))) })] }), _jsxs("div", { className: "flex justify-end space-x-3", children: [_jsx("button", { onClick: () => setIsOpen(false), className: "px-4 py-2 text-gray-400 transition-colors hover:text-white", children: "Cancel" }), _jsx("button", { onClick: handleExport, disabled: selectedFieldsCount === 0 || isExporting, className: "flex items-center space-x-2 rounded-lg bg-orange-600 px-6 py-2 text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-600", children: isExporting ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "size-4 animate-spin rounded-full border-2 border-white border-t-transparent" }), _jsx("span", { children: "Exporting..." })] })) : (_jsxs(_Fragment, { children: [_jsx(Download, { className: "size-4" }), _jsx("span", { children: "Export CSV" })] })) })] })] }))] }) }) }))] }));
}
//# sourceMappingURL=component.js.map