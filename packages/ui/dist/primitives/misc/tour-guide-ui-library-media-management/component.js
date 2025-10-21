"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Trash2, Eye, Image as ImageIcon, Video, ExternalLink, Play } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Video Preview Component
function VideoPreview({ url, name }) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };
    if (hasError) {
        return (_jsxs("div", { className: "flex size-full flex-col items-center justify-center rounded-lg bg-gray-900 text-gray-400", children: [_jsx(Video, { className: "mb-2 size-8" }), _jsx("span", { className: "text-center text-xs", children: "Video unavailable" })] }));
    }
    return (_jsxs("div", { className: "relative size-full overflow-hidden rounded-lg bg-gray-900", children: [isLoading && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-900", children: _jsxs("div", { className: "flex flex-col items-center text-gray-400", children: [_jsx("div", { className: "mb-2 size-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" }), _jsx("span", { className: "text-xs", children: "Loading..." })] }) })), _jsx("video", { src: url, className: "size-full object-cover", muted: true, preload: "metadata", onLoadStart: handleLoadStart, onCanPlay: handleCanPlay, onError: handleError, poster: "" // Remove default poster to show first frame
             }), _jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity hover:opacity-100", children: _jsx(Play, { className: "size-8 text-white drop-shadow-lg" }) })] }));
}
export default function MediaManagement({ initialData }) {
    const [mediaFiles, setMediaFiles] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const filteredFiles = mediaFiles.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            file.activityName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === "all" || file.type === typeFilter;
        return matchesSearch && matchesType;
    });
    const handleSelectFile = (fileId) => {
        setSelectedFiles(prev => prev.includes(fileId)
            ? prev.filter(id => id !== fileId)
            : [...prev, fileId]);
    };
    const handleSelectAll = () => {
        if (selectedFiles.length === filteredFiles.length) {
            setSelectedFiles([]);
        }
        else {
            setSelectedFiles(filteredFiles.map(file => file.id));
        }
    };
    const handleBulkDelete = () => {
        setMediaFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
        setSelectedFiles([]);
    };
    const handleViewFile = (url) => {
        window.open(url, "_blank");
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-4 sm:flex-row", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" }), _jsx(Input, { placeholder: "Search media files...", value: searchTerm, onChange: e => setSearchTerm(e.target.value), className: "border-gray-700 bg-gray-800 pl-10 text-white" })] }), _jsxs(Select, { value: typeFilter, onValueChange: setTypeFilter, children: [_jsxs(SelectTrigger, { className: "w-48 border-gray-700 bg-gray-800 text-white", children: [_jsx(Filter, { className: "mr-2 size-4" }), _jsx(SelectValue, { placeholder: "Filter by type" })] }), _jsxs(SelectContent, { className: "border-gray-700 bg-gray-800", children: [_jsx(SelectItem, { value: "all", children: "All Types" }), _jsx(SelectItem, { value: "image", children: "Images" }), _jsx(SelectItem, { value: "video", children: "Videos" })] })] })] }), selectedFiles.length > 0 && (_jsxs("div", { className: "flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4", children: [_jsxs("span", { className: "text-white", children: [selectedFiles.length, " file", selectedFiles.length !== 1 ? "s" : "", " ", "selected"] }), _jsx("div", { className: "flex space-x-2", children: _jsxs(Button, { variant: "outline", size: "sm", onClick: handleBulkDelete, className: "border-red-600 text-red-400 hover:bg-red-600 hover:text-white", children: [_jsx(Trash2, { className: "mr-2 size-4" }), "Delete Selected"] }) })] })), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "text-white", children: [_jsx("span", { className: "font-medium", children: filteredFiles.length }), _jsxs("span", { className: "ml-1 text-gray-400", children: ["file", filteredFiles.length !== 1 ? "s" : "", " found"] })] }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleSelectAll, className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: selectedFiles.length === filteredFiles.length
                            ? "Deselect All"
                            : "Select All" })] }), _jsx("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", children: filteredFiles.map(file => (_jsx(Card, { className: `cursor-pointer border-gray-700 bg-gray-800 transition-colors hover:border-gray-600 ${selectedFiles.includes(file.id) ? "ring-2 ring-orange-500" : ""}`, onClick: () => handleSelectFile(file.id), children: _jsxs(CardContent, { className: "p-4", children: [_jsx("div", { className: "mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-gray-900", children: file.type === "image" ? (_jsx("img", { src: file.url, alt: file.name, className: "size-full object-cover", onError: e => {
                                        // Fallback for broken images
                                        const target = e.target;
                                        target.src =
                                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23374151'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' fill='%23D1D5DB' text-anchor='middle' dy='0.3em'%3EImage Error%3C/text%3E%3C/svg%3E";
                                    } })) : (_jsx(VideoPreview, { url: file.url, name: file.name })) }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "mr-2 flex-1 truncate font-medium text-white", children: file.name }), _jsxs(Badge, { variant: "outline", className: `text-xs ${file.type === "image"
                                                    ? "border-blue-500 text-blue-400"
                                                    : "border-purple-500 text-purple-400"}`, children: [file.type === "image" ? (_jsx(ImageIcon, { className: "mr-1 size-3" })) : (_jsx(Video, { className: "mr-1 size-3" })), file.type.toUpperCase()] })] }), _jsx("div", { className: "text-xs text-gray-400", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: file.size }), _jsx("span", { children: formatDate(file.uploadedAt) })] }) }), _jsx("div", { className: "text-xs", children: _jsx(Badge, { variant: "secondary", className: "bg-gray-700 text-gray-300", children: file.activityName }) }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs(Button, { variant: "outline", size: "sm", onClick: e => {
                                                    e.stopPropagation();
                                                    handleViewFile(file.url);
                                                }, className: "flex-1 border-gray-600 text-gray-300 hover:bg-gray-700", children: [_jsx(Eye, { className: "mr-2 size-3" }), "View"] }), _jsx(Button, { variant: "outline", size: "sm", onClick: e => {
                                                    e.stopPropagation();
                                                    window.open(file.url, "_blank");
                                                }, className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: _jsx(ExternalLink, { className: "size-3" }) })] })] })] }) }, file.id))) }), filteredFiles.length === 0 && (_jsx("div", { className: "py-12 text-center", children: _jsxs("div", { className: "text-gray-400", children: [_jsx(ImageIcon, { className: "mx-auto mb-4 size-12" }), _jsx("p", { className: "text-lg font-medium", children: "No media files found" }), _jsx("p", { className: "text-sm", children: "Try adjusting your search or filter criteria" })] }) }))] }));
}
//# sourceMappingURL=component.js.map