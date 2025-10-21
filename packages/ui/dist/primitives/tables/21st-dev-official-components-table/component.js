"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DbLinks } from "@/components/features/admin/db-links";
import { useIsAdmin } from "@/components/features/publish/hooks/use-is-admin";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, } from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { transferOwnershipAction } from "@/lib/api/components";
import { cn } from "@/lib/utils";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, ExternalLink, InfoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { toast } from "sonner";
import { UserPicker } from "../../admin/user-picker";
import { VisibilityToggle } from "./visibility-toggle";
// Format text with clickable links
const formatTextWithLinks = (text) => {
    if (!text)
        return null;
    // Replace URLs with HTML links
    const linkedText = text.replace(/(https?:\/\/[^\s]+)|(www\.[^\s]+)/g, (url) => {
        const href = url.startsWith("www.") ? `https://${url}` : url;
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline break-all">${url}</a>`;
    });
    // Return with dangerouslySetInnerHTML since we're only adding safe <a> tags
    return _jsx("div", { dangerouslySetInnerHTML: { __html: linkedText } });
};
// Format status text: capitalize and replace underscores with spaces
const formatStatusText = (status) => {
    if (!status)
        return "None";
    // Custom status display names
    const statusDisplay = {
        on_review: "On Review",
        featured: "Featured",
        posted: "Published",
        rejected: "Rejected",
        draft: "Draft",
    };
    return (statusDisplay[status] ||
        status
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "));
};
export function DemosTable({ demos = [], onEdit, onOpenSandbox, onUpdateVisibility, isOwnProfile = false, }) {
    const id = useId();
    const router = useRouter();
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 20,
    });
    const isAdmin = useIsAdmin();
    const [imageLoadStatus, setImageLoadStatus] = useState({});
    // Format numbers with thousand separators (spaces)
    const formatNumberWithSpaces = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };
    useEffect(() => {
        // Process all preview images at once instead of in each cell
        demos.forEach((demo) => {
            if (demo.preview_url) {
                // Fix URL if it's a relative path without http(s)
                const previewUrl = demo.preview_url.startsWith("http")
                    ? demo.preview_url
                    : `https://cdn.21st.dev${demo.preview_url.startsWith("/") ? "" : "/"}${demo.preview_url}`;
                const img = new Image();
                img.onload = () => {
                    setImageLoadStatus((prev) => ({
                        ...prev,
                        [demo.id]: { loaded: true, fixedUrl: previewUrl },
                    }));
                };
                img.onerror = () => {
                    setImageLoadStatus((prev) => ({
                        ...prev,
                        [demo.id]: {
                            loaded: false,
                            error: "Failed to load image",
                            fixedUrl: previewUrl,
                        },
                    }));
                };
                img.src = previewUrl;
            }
            else {
                setImageLoadStatus((prev) => ({
                    ...prev,
                    [demo.id]: { loaded: false, error: "No preview URL" },
                }));
            }
        });
    }, [demos]);
    const [sorting, setSorting] = useState([
        {
            id: "created_at",
            desc: true,
        },
    ]);
    const columns = [
        {
            header: "Component",
            accessorKey: "name",
            cell: ({ row }) => {
                const isDraft = row.original.submission_status === "draft";
                const demo = row.original;
                const isComponentAvailable = demo.demo_slug &&
                    demo.component?.component_slug &&
                    demo.user?.username;
                const handleRowClick = (e) => {
                    if (isComponentAvailable) {
                        router.push(`/${demo.user?.username}/${demo.component.component_slug}/${demo.demo_slug}`);
                    }
                };
                return (_jsxs("div", { className: cn("flex items-center gap-3 pl-1"), children: [_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { className: "shrink-0", asChild: true, children: _jsx("div", { onClick: (e) => e.stopPropagation(), children: _jsx(Button, { variant: "ghost", size: "icon", disabled: !isComponentAvailable, onClick: handleRowClick, children: _jsx(ExternalLink, { size: 16, className: "text-blue-600" }) }) }) }), _jsx(TooltipContent, { children: isComponentAvailable ? (_jsx("p", { children: "Open component page" })) : (_jsx("p", { children: "Component page is not available" })) })] }), _jsx("div", { className: "h-12 w-20 overflow-hidden rounded-md border bg-muted shrink-0", children: row.original.preview_url ? (_jsx("div", { className: "h-12 w-20 bg-cover bg-center", style: {
                                    backgroundImage: `url(${row.original.preview_url})`,
                                } })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center text-xs text-muted-foreground", children: isDraft ? "Draft" : "No preview" })) }), _jsxs("div", { className: "flex flex-col min-w-0", children: [_jsx("div", { className: "font-medium truncate", children: row.original.component?.name || "Unknown component" }), _jsx("div", { className: "text-sm text-muted-foreground truncate", children: row.getValue("name") })] })] }));
            },
            size: 300,
            sortingFn: "alphanumeric",
        },
        {
            header: "Status",
            id: "submission_status",
            accessorFn: (row) => row.submission_status || "featured",
            cell: ({ row }) => {
                const status = row.original.submission_status || "featured";
                const feedback = row.original.moderators_feedback;
                const hasFeedback = !!feedback;
                const [tooltipOpen, setTooltipOpen] = useState(false);
                return (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: cn("px-2 py-1 text-xs rounded", status === "on_review" && "bg-yellow-100 text-yellow-700", status === "featured" && "bg-green-100 text-green-700", status === "posted" && "bg-blue-100 text-blue-700", status === "draft" && "bg-gray-100 text-gray-700", status === "rejected" && "bg-red-100 text-red-700", !status && "bg-gray-100 text-gray-700"), children: formatStatusText(status) }), hasFeedback && status !== "featured" && (_jsx(TooltipProvider, { delayDuration: 100, children: _jsxs(Tooltip, { open: tooltipOpen, onOpenChange: setTooltipOpen, children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "icon", className: "h-5 w-5 p-0 text-muted-foreground hover:text-foreground", onClick: (e) => {
                                                e.stopPropagation();
                                                setTooltipOpen(!tooltipOpen);
                                            }, children: [_jsx(InfoIcon, { size: 14 }), _jsx("span", { className: "sr-only", children: "Feedback" })] }) }), _jsxs(TooltipContent, { side: "bottom", className: "max-w-xs", children: [_jsx("div", { className: "font-medium mb-1 text-xs", children: "Moderator feedback:" }), _jsx("div", { className: "font-light text-xs", children: formatTextWithLinks(feedback) })] })] }) }))] }));
            },
            size: 100,
            sortingFn: "alphanumeric",
        },
        {
            header: "Visibility",
            id: "is_private",
            accessorFn: (row) => (row.is_private ? "private" : "public"),
            cell: ({ row }) => {
                const isPrivate = Boolean(row.original.is_private);
                const isDraft = row.original.submission_status === "draft";
                const isFeatured = row.original.submission_status === "featured";
                const handleToggleVisibility = async (newIsPrivate) => {
                    if (!onUpdateVisibility)
                        return;
                    // Don't allow setting draft components to public
                    if (isDraft && !newIsPrivate)
                        return;
                    // Don't allow changing visibility if not featured
                    if (!isFeatured)
                        return;
                    await onUpdateVisibility(row.original.component.id, newIsPrivate);
                };
                return (_jsx(VisibilityToggle, { isPrivate: isDraft ? true : isPrivate, onToggle: onUpdateVisibility && !isDraft && isFeatured
                        ? handleToggleVisibility
                        : undefined, readonly: !isOwnProfile || !onUpdateVisibility || !isFeatured }));
            },
            size: 100,
            sortingFn: "alphanumeric",
        },
        {
            header: "Created",
            id: "created_at",
            accessorFn: (row) => row.created_at || row.updated_at || "",
            cell: ({ row }) => {
                const dateValue = row.original.created_at || row.original.updated_at;
                try {
                    const date = new Date(dateValue || "");
                    return (_jsx("div", { children: date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        }) }));
                }
                catch (e) {
                    return _jsx("div", { children: "Unknown" });
                }
            },
            size: 150,
            sortingFn: (rowA, rowB, columnId) => {
                const a = rowA.original.created_at || rowA.original.updated_at || "";
                const b = rowB.original.created_at || rowB.original.updated_at || "";
                const dateA = a ? new Date(a).getTime() : 0;
                const dateB = b ? new Date(b).getTime() : 0;
                return dateA > dateB ? 1 : dateA < dateB ? -1 : 0;
            },
        },
        {
            header: "Views",
            id: "view_count",
            accessorFn: (row) => {
                return row.view_count || 0;
            },
            cell: ({ row }) => {
                const viewCount = row.original.view_count || 0;
                return (_jsx("div", { className: "text-right", children: formatNumberWithSpaces(viewCount) }));
            },
            size: 80,
            sortingFn: "alphanumeric",
        },
        {
            header: "Likes",
            id: "bookmarks_count",
            accessorFn: (row) => {
                return row.bookmarks_count || 0;
            },
            cell: ({ row }) => {
                const bookmarksCount = row.original.bookmarks_count || 0;
                return (_jsx("div", { className: "text-right", children: formatNumberWithSpaces(bookmarksCount) }));
            },
            size: 80,
            sortingFn: "alphanumeric",
        },
    ];
    if (isAdmin) {
        columns.push({
            header: "Admin",
            id: "admin",
            cell: ({ row }) => {
                const componentId = row.original.component_id ?? row.original.component?.id;
                return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(DbLinks, { componentId: componentId, demoId: row.original.id }), _jsx(UserPicker, { disabled: !componentId, onSelect: (userId) => {
                                toast.promise(transferOwnershipAction({ componentId, userId }), {
                                    loading: "Transferring ownership...",
                                    success: "Ownership transferred successfully",
                                    error: "Failed to transfer ownership",
                                });
                            } })] }));
            },
            size: 280,
        });
    }
    // Adjust colSpan for the empty state
    const columnCount = columns.length;
    // Ensure demos is always an array
    const safeData = Array.isArray(demos) ? demos : [];
    const table = useReactTable({
        data: safeData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        enableSortingRemoval: false,
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            sorting,
            pagination,
        },
        sortingFns: {
            "view-count": (rowA, rowB, columnId) => {
                const a = rowA.original.view_count || 0;
                const b = rowB.original.view_count || 0;
                return a > b ? 1 : a < b ? -1 : 0;
            },
            "bookmarks-count": (rowA, rowB, columnId) => {
                const a = rowA.original.bookmarks_count || 0;
                const b = rowB.original.bookmarks_count || 0;
                return a > b ? 1 : a < b ? -1 : 0;
            },
            status: (rowA, rowB, columnId) => {
                // Status priority: featured > posted > on_review > rejected > draft/null
                const statusPriority = {
                    featured: 5,
                    posted: 4,
                    on_review: 3,
                    rejected: 2,
                    draft: 1,
                    null: 1,
                };
                const statusA = rowA.original.submission_status || "draft";
                const statusB = rowB.original.submission_status || "draft";
                const priorityA = statusPriority[statusA] || 0;
                const priorityB = statusPriority[statusB] || 0;
                return priorityA > priorityB ? 1 : priorityA < priorityB ? -1 : 0;
            },
            visibility: (rowA, rowB, columnId) => {
                // Public first, then private
                const a = rowA.original.is_private ? 0 : 1;
                const b = rowB.original.is_private ? 0 : 1;
                return a > b ? 1 : a < b ? -1 : 0;
            },
        },
    });
    // Safely get page count
    const pageCount = table ? table.getPageCount() : 0;
    const currentPage = table ? table.getState().pagination.pageIndex + 1 : 1;
    // Create an array of page numbers to render
    const pageNumbers = [];
    if (pageCount <= 5) {
        // If 5 or fewer pages, show all
        for (let i = 1; i <= pageCount; i++) {
            pageNumbers.push(i);
        }
    }
    else {
        // Always show first page
        pageNumbers.push(1);
        // Calculate range to show around current page
        if (currentPage <= 3) {
            // Near start
            pageNumbers.push(2, 3, 4);
            pageNumbers.push("ellipsis");
        }
        else if (currentPage >= pageCount - 2) {
            // Near end
            pageNumbers.push("ellipsis");
            pageNumbers.push(pageCount - 3, pageCount - 2, pageCount - 1);
        }
        else {
            // Middle
            pageNumbers.push("ellipsis");
            pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
            pageNumbers.push("ellipsis");
        }
        // Always show last page
        pageNumbers.push(pageCount);
    }
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "rounded-lg border border-border bg-background overflow-auto", children: _jsxs(Table, { className: "table-fixed min-w-full", children: [_jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => (_jsx(TableRow, { className: "hover:bg-transparent", children: headerGroup.headers.map((header, index) => {
                                    const isLastColumn = index === headerGroup.headers.length - 1;
                                    return (_jsx(TableHead, { style: { width: `${header.getSize()}px` }, className: cn("h-11", isLastColumn && "pr-6"), children: header.isPlaceholder ? null : header.column.getCanSort() ? (_jsxs("div", { className: cn(header.column.getCanSort() &&
                                                "flex h-full cursor-pointer select-none items-center gap-2", header.id === "view_count" ||
                                                header.id === "bookmarks_count"
                                                ? "justify-end"
                                                : "justify-between"), onClick: header.column.getToggleSortingHandler(), onKeyDown: (e) => {
                                                if (header.column.getCanSort() &&
                                                    (e.key === "Enter" || e.key === " ")) {
                                                    e.preventDefault();
                                                    header.column.getToggleSortingHandler()?.(e);
                                                }
                                            }, tabIndex: header.column.getCanSort() ? 0 : undefined, children: [flexRender(header.column.columnDef.header, header.getContext()), {
                                                    asc: (_jsx(ChevronUp, { className: "shrink-0 opacity-60", size: 16, strokeWidth: 2, "aria-hidden": "true" })),
                                                    desc: (_jsx(ChevronDown, { className: "shrink-0 opacity-60", size: 16, strokeWidth: 2, "aria-hidden": "true" })),
                                                }[header.column.getIsSorted()] ?? null] })) : (flexRender(header.column.columnDef.header, header.getContext())) }, header.id));
                                }) }, headerGroup.id))) }), _jsx(TableBody, { children: table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => {
                                const demo = row.original;
                                // Logic to determine where to navigate when clicking the row
                                const handleRowClick = () => {
                                    if (demo.component?.sandbox_id || String(demo.id)) {
                                        onOpenSandbox?.(demo.component?.sandbox_id || String(demo.id));
                                    }
                                };
                                return (_jsx(TableRow, { className: "group cursor-pointer hover:bg-muted/50", onClick: handleRowClick, children: row.getVisibleCells().map((cell, index) => {
                                        const isLastColumn = index === row.getVisibleCells().length - 1;
                                        return (_jsx(TableCell, { className: cn(cell.column.id === "actions" && "pr-4", isLastColumn && "pr-6"), onClick: ["is_private", "admin"].includes(cell.column.id)
                                                ? (e) => e.stopPropagation()
                                                : undefined, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id));
                                    }) }, row.id));
                            })) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: columnCount, className: "h-24 text-center text-muted-foreground", children: "No demos published yet" }) })) })] }) }), demos.length > 0 && (_jsxs("div", { className: "flex items-center justify-between gap-8", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Label, { htmlFor: id, className: "max-sm:sr-only whitespace-nowrap", children: "Rows per page" }), _jsxs(Select, { value: table.getState().pagination.pageSize.toString(), onValueChange: (value) => {
                                    table.setPageSize(Number(value));
                                }, children: [_jsx(SelectTrigger, { id: id, className: "w-fit whitespace-nowrap", children: _jsx(SelectValue, { placeholder: "Select rows" }) }), _jsx(SelectContent, { children: [5, 10, 20, 50].map((pageSize) => (_jsx(SelectItem, { value: pageSize.toString(), children: pageSize }, pageSize))) })] })] }), _jsx("div", { className: "hidden md:flex grow whitespace-nowrap text-sm text-muted-foreground", children: _jsxs("p", { className: "whitespace-nowrap text-sm text-muted-foreground", "aria-live": "polite", children: [_jsxs("span", { className: "text-foreground", children: [Math.min(table.getRowCount(), 1) > 0
                                            ? table.getState().pagination.pageIndex *
                                                table.getState().pagination.pageSize +
                                                1
                                            : 0, "-", Math.min((table.getState().pagination.pageIndex + 1) *
                                            table.getState().pagination.pageSize, table.getRowCount())] }), " ", "of", " ", _jsx("span", { className: "text-foreground", children: table.getRowCount().toString() })] }) }), _jsx(Pagination, { children: _jsxs(PaginationContent, { children: [_jsx(PaginationItem, { children: _jsx(PaginationPrevious, { href: "#", onClick: (e) => {
                                            e.preventDefault();
                                            table.previousPage();
                                        }, "aria-disabled": !table.getCanPreviousPage(), className: !table.getCanPreviousPage()
                                            ? "pointer-events-none opacity-50"
                                            : "" }) }), pageNumbers.map((page, i) => page === "ellipsis" ? (_jsx(PaginationItem, { children: _jsx(PaginationEllipsis, {}) }, `ellipsis-${i}`)) : (_jsx(PaginationItem, { children: _jsx(PaginationLink, { href: "#", isActive: currentPage === page, onClick: (e) => {
                                            e.preventDefault();
                                            table.setPageIndex(page - 1);
                                        }, children: page }) }, page))), _jsx(PaginationItem, { children: _jsx(PaginationNext, { href: "#", onClick: (e) => {
                                            e.preventDefault();
                                            table.nextPage();
                                        }, "aria-disabled": !table.getCanNextPage(), className: !table.getCanNextPage()
                                            ? "pointer-events-none opacity-50"
                                            : "" }) })] }) })] }))] }));
}
// Backward compatibility export for existing imports
export const ComponentsTable = DemosTable;
//# sourceMappingURL=component.js.map