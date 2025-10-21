import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, } from "lucide-react";
const PaginationControls = ({ currentPage, totalPages, totalCount, itemsPerPage, onPageChange, onItemsPerPageChange, loading = false, }) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalCount);
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }
        if (currentPage - delta > 2) {
            rangeWithDots.push(1, "...");
        }
        else {
            rangeWithDots.push(1);
        }
        rangeWithDots.push(...range);
        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push("...", totalPages);
        }
        else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }
        return rangeWithDots;
    };
    if (totalCount === 0) {
        return null;
    }
    return (_jsxs("div", { className: "flex items-center justify-between px-2 py-4", children: [_jsxs("div", { className: "flex items-center space-x-6 lg:space-x-8", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("p", { className: "text-sm font-medium", children: "Rows per page" }), _jsxs(Select, { value: itemsPerPage.toString(), onValueChange: (value) => onItemsPerPageChange(Number(value)), disabled: loading, children: [_jsx(SelectTrigger, { className: "h-8 w-[70px]", children: _jsx(SelectValue, { placeholder: itemsPerPage }) }), _jsx(SelectContent, { side: "top", children: [25, 50, 100, 200].map((pageSize) => (_jsx(SelectItem, { value: pageSize.toString(), children: pageSize }, pageSize))) })] })] }), _jsxs("div", { className: "flex w-[100px] items-center justify-center text-sm font-medium", children: ["Page ", currentPage, " of ", totalPages] }), _jsx("div", { className: "text-sm text-muted-foreground", children: totalCount > 0 ? (_jsxs(_Fragment, { children: ["Showing ", startItem, " to ", endItem, " of ", totalCount, " results"] })) : ("No results") })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsxs(Button, { variant: "outline", className: "hidden h-8 w-8 p-0 lg:flex", onClick: () => onPageChange(1), disabled: currentPage === 1 || loading, children: [_jsx("span", { className: "sr-only", children: "Go to first page" }), _jsx(ChevronsLeft, { className: "h-4 w-4" })] }), _jsxs(Button, { variant: "outline", className: "h-8 w-8 p-0", onClick: () => onPageChange(currentPage - 1), disabled: currentPage === 1 || loading, children: [_jsx("span", { className: "sr-only", children: "Go to previous page" }), _jsx(ChevronLeft, { className: "h-4 w-4" })] }), _jsx("div", { className: "flex items-center space-x-1", children: getVisiblePages().map((page, index) => (_jsx("div", { children: page === "..." ? (_jsx("span", { className: "flex h-8 w-8 items-center justify-center text-sm", children: "..." })) : (_jsx(Button, { variant: currentPage === page ? "default" : "outline", className: "h-8 w-8 p-0", onClick: () => onPageChange(page), disabled: loading, children: page })) }, index))) }), _jsxs(Button, { variant: "outline", className: "h-8 w-8 p-0", onClick: () => onPageChange(currentPage + 1), disabled: currentPage === totalPages || loading, children: [_jsx("span", { className: "sr-only", children: "Go to next page" }), _jsx(ChevronRight, { className: "h-4 w-4" })] }), _jsxs(Button, { variant: "outline", className: "hidden h-8 w-8 p-0 lg:flex", onClick: () => onPageChange(totalPages), disabled: currentPage === totalPages || loading, children: [_jsx("span", { className: "sr-only", children: "Go to last page" }), _jsx(ChevronsRight, { className: "h-4 w-4" })] })] })] }));
};
export default PaginationControls;
//# sourceMappingURL=component.js.map