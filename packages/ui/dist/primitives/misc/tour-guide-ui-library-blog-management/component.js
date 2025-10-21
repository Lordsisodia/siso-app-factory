"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Edit, Trash2, Eye, Calendar, User, Tag } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SortableTable from "@/app/admin/_components/sortable-table";
export default function BlogManagement({ initialData }) {
    const [blogPosts, setBlogPosts] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || post.status === statusFilter;
        const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });
    const formatDate = (dateString) => {
        if (!dateString)
            return "Not published";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };
    const getStatusBadge = (status) => {
        switch (status) {
            case "published":
                return _jsx(Badge, { className: "bg-green-600 text-white", children: "Published" });
            case "draft":
                return _jsx(Badge, { className: "bg-yellow-600 text-white", children: "Draft" });
            default:
                return _jsx(Badge, { className: "bg-gray-600 text-white", children: status });
        }
    };
    const handleEdit = (postId) => {
        console.log("Edit post:", postId);
        // Navigate to edit page
    };
    const handleDelete = (postId) => {
        setBlogPosts(prev => prev.filter(post => post.id !== postId));
    };
    const handlePublish = (postId) => {
        setBlogPosts(prev => prev.map(post => post.id === postId
            ? {
                ...post,
                status: "published",
                publishedAt: new Date().toISOString()
            }
            : post));
    };
    const columns = [
        {
            key: "title",
            label: "Title",
            sortable: true,
            render: (_, post) => (_jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "font-medium text-white", children: post.title }), _jsx("div", { className: "max-w-md truncate text-sm text-gray-400", children: post.excerpt }), _jsx("div", { className: "flex items-center space-x-2 text-xs text-gray-500", children: _jsxs("span", { children: ["/", post.slug] }) })] }))
        },
        {
            key: "status",
            label: "Status",
            sortable: true,
            render: (_, post) => getStatusBadge(post.status)
        },
        {
            key: "author",
            label: "Author",
            sortable: true,
            render: (_, post) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(User, { className: "size-4 text-gray-400" }), _jsx("span", { className: "text-white", children: post.author })] }))
        },
        {
            key: "category",
            label: "Category",
            sortable: true,
            render: (_, post) => (_jsx(Badge, { variant: "outline", className: "border-orange-500 text-orange-400", children: post.category }))
        },
        {
            key: "publishedAt",
            label: "Published",
            sortable: true,
            render: (_, post) => (_jsxs("div", { className: "flex items-center space-x-2 text-gray-300", children: [_jsx(Calendar, { className: "size-4 text-gray-400" }), _jsx("span", { children: formatDate(post.publishedAt) })] }))
        },
        {
            key: "views",
            label: "Views",
            sortable: true,
            render: (_, post) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Eye, { className: "size-4 text-gray-400" }), _jsx("span", { className: "text-white", children: (post.views || 0).toLocaleString() })] }))
        },
        {
            key: "tags",
            label: "Tags",
            sortable: false,
            render: (_, post) => (_jsxs("div", { className: "flex flex-wrap gap-1", children: [(post.tags || []).slice(0, 2).map((tag, index) => (_jsxs(Badge, { variant: "outline", className: "border-gray-600 text-xs text-gray-400", children: [_jsx(Tag, { className: "mr-1 size-3" }), tag] }, index))), (post.tags || []).length > 2 && (_jsxs(Badge, { variant: "outline", className: "border-gray-600 text-xs text-gray-400", children: ["+", (post.tags || []).length - 2] }))] }))
        },
        {
            key: "actions",
            label: "Actions",
            sortable: false,
            render: (_, post) => (_jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { size: "sm", variant: "outline", onClick: () => handleEdit(post.id), className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: _jsx(Edit, { className: "size-3" }) }), (post?.status || "draft") === "draft" && (_jsx(Button, { size: "sm", variant: "outline", onClick: () => handlePublish(post.id), className: "border-green-600 text-green-400 hover:bg-green-600 hover:text-white", children: _jsx(Eye, { className: "size-3" }) })), _jsx(Button, { size: "sm", variant: "outline", onClick: () => handleDelete(post.id), className: "border-red-600 text-red-400 hover:bg-red-600 hover:text-white", children: _jsx(Trash2, { className: "size-3" }) })] }))
        }
    ];
    const categories = Array.from(new Set(blogPosts.map(post => post.category)));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-4 sm:flex-row", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" }), _jsx(Input, { placeholder: "Search posts, authors, categories...", value: searchTerm, onChange: e => setSearchTerm(e.target.value), className: "border-gray-700 bg-gray-800 pl-10 text-white" })] }), _jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [_jsxs(SelectTrigger, { className: "w-48 border-gray-700 bg-gray-800 text-white", children: [_jsx(Filter, { className: "mr-2 size-4" }), _jsx(SelectValue, { placeholder: "Filter by status" })] }), _jsxs(SelectContent, { className: "border-gray-700 bg-gray-800", children: [_jsx(SelectItem, { value: "all", children: "All Status" }), _jsx(SelectItem, { value: "published", children: "Published" }), _jsx(SelectItem, { value: "draft", children: "Draft" })] })] }), _jsxs(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [_jsxs(SelectTrigger, { className: "w-48 border-gray-700 bg-gray-800 text-white", children: [_jsx(Filter, { className: "mr-2 size-4" }), _jsx(SelectValue, { placeholder: "Filter by category" })] }), _jsxs(SelectContent, { className: "border-gray-700 bg-gray-800", children: [_jsx(SelectItem, { value: "all", children: "All Categories" }), categories.map(category => (_jsx(SelectItem, { value: category, children: category }, category)))] })] })] }), _jsxs("div", { className: "text-white", children: [_jsx("span", { className: "font-medium", children: filteredPosts.length }), _jsxs("span", { className: "ml-1 text-gray-400", children: ["post", filteredPosts.length !== 1 ? "s" : "", " found"] })] }), _jsx(SortableTable, { data: filteredPosts, columns: columns, className: "border-gray-700 bg-gray-800" }), filteredPosts.length === 0 && (_jsxs("div", { className: "py-12 text-center", children: [_jsx(Eye, { className: "mx-auto mb-4 size-12 text-gray-600" }), _jsx("h3", { className: "mb-2 text-lg font-medium text-white", children: "No blog posts found" }), _jsx("p", { className: "text-gray-400", children: searchTerm || statusFilter !== "all" || categoryFilter !== "all"
                            ? "Try adjusting your search or filters"
                            : "Create your first blog post to get started" })] }))] }));
}
//# sourceMappingURL=component.js.map