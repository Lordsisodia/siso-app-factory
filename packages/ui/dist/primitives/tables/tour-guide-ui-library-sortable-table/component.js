"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
export default function SortableTable({ columns, data, defaultSort, className = "", rowClassName, onRowClick }) {
    const [sortKey, setSortKey] = useState(defaultSort?.key || null);
    const [sortDirection, setSortDirection] = useState(defaultSort?.direction || null);
    const handleSort = (columnKey) => {
        const column = columns.find(col => col.key === columnKey);
        if (!column?.sortable)
            return;
        if (sortKey === columnKey) {
            // Cycle through: asc -> desc -> none -> asc
            if (sortDirection === "asc") {
                setSortDirection("desc");
            }
            else if (sortDirection === "desc") {
                setSortDirection(null);
                setSortKey(null);
            }
            else {
                setSortDirection("asc");
            }
        }
        else {
            setSortKey(columnKey);
            setSortDirection("asc");
        }
    };
    const sortedData = useMemo(() => {
        if (!sortKey || !sortDirection)
            return data;
        return [...data].sort((a, b) => {
            const aValue = a[sortKey];
            const bValue = b[sortKey];
            // Handle null/undefined values
            if (aValue == null && bValue == null)
                return 0;
            if (aValue == null)
                return sortDirection === "asc" ? 1 : -1;
            if (bValue == null)
                return sortDirection === "asc" ? -1 : 1;
            // Handle different types
            if (typeof aValue === "string" && typeof bValue === "string") {
                const result = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
                return sortDirection === "asc" ? result : -result;
            }
            if (typeof aValue === "number" && typeof bValue === "number") {
                const result = aValue - bValue;
                return sortDirection === "asc" ? result : -result;
            }
            if (aValue instanceof Date && bValue instanceof Date) {
                const result = aValue.getTime() - bValue.getTime();
                return sortDirection === "asc" ? result : -result;
            }
            // Fallback to string comparison
            const result = String(aValue).localeCompare(String(bValue));
            return sortDirection === "asc" ? result : -result;
        });
    }, [data, sortKey, sortDirection]);
    const getSortIcon = (columnKey) => {
        if (sortKey !== columnKey) {
            return _jsx(ChevronsUpDown, { className: "size-4 text-gray-500" });
        }
        if (sortDirection === "asc") {
            return _jsx(ChevronUp, { className: "size-4 text-orange-500" });
        }
        if (sortDirection === "desc") {
            return _jsx(ChevronDown, { className: "size-4 text-orange-500" });
        }
        return _jsx(ChevronsUpDown, { className: "size-4 text-gray-500" });
    };
    const getCellValue = (column, row) => {
        const value = row[column.key];
        if (column.render) {
            return column.render(value, row);
        }
        // Default formatting for common types
        if (value instanceof Date) {
            return value.toLocaleDateString();
        }
        if (typeof value === "number" &&
            column.key.toLowerCase().includes("amount")) {
            return `€${value.toLocaleString()}`;
        }
        if (value == null) {
            return _jsx("span", { className: "text-gray-500", children: "-" });
        }
        return String(value);
    };
    if (data.length === 0) {
        return (_jsx("div", { className: `rounded-lg border border-gray-700 bg-gray-800 ${className}`, children: _jsx("div", { className: "p-8 text-center", children: _jsx("p", { className: "text-gray-400", children: "No data available" }) }) }));
    }
    return (_jsxs("div", { className: `overflow-hidden rounded-lg border border-gray-700 bg-gray-800 ${className}`, children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "border-b border-gray-700 bg-gray-900", children: _jsx("tr", { children: columns.map(column => (_jsx("th", { className: `px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400 ${column.width || "w-auto"} ${column.sortable
                                        ? "cursor-pointer select-none transition-colors hover:bg-gray-800"
                                        : ""}`, onClick: () => column.sortable && handleSort(column.key), children: _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { children: column.label }), column.sortable && getSortIcon(column.key)] }) }, column.key))) }) }), _jsx("tbody", { className: "divide-y divide-gray-700", children: sortedData.map((row, index) => (_jsx("tr", { className: `
                  ${onRowClick ? "hover:bg-gray-750 cursor-pointer" : ""} 
                  ${rowClassName ? rowClassName(row) : ""} 
                  transition-colors
                `, onClick: () => onRowClick?.(row), children: columns.map(column => (_jsx("td", { className: "whitespace-nowrap px-6 py-4 text-sm text-gray-300", children: getCellValue(column, row) }, column.key))) }, index))) })] }) }), _jsx("div", { className: "border-t border-gray-700 bg-gray-900 px-6 py-3", children: _jsxs("div", { className: "flex items-center justify-between text-xs text-gray-400", children: [_jsxs("span", { children: ["Showing ", sortedData.length, " of ", data.length, " results"] }), sortKey && sortDirection && (_jsxs("span", { children: ["Sorted by ", columns.find(col => col.key === sortKey)?.label, "(", sortDirection === "asc" ? "ascending" : "descending", ")"] }))] }) })] }));
}
//# sourceMappingURL=component.js.map