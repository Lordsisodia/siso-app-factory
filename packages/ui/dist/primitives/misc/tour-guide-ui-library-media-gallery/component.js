"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { getMediaAction, deleteMediaAction } from "@/actions/db/media-actions";
import { OptimizedImage } from "./optimized-image";
import { OptimizedVideo } from "./optimized-video";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
export function MediaGallery({ userId, activityId, className, onSelect, onDelete, selectable = false, deletable = false, maxItems }) {
    const [mediaItems, setMediaItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    // Fetch media on load
    useEffect(() => {
        async function fetchMedia() {
            setLoading(true);
            setError(null);
            try {
                const result = await getMediaAction({ userId, activityId });
                if (result.isSuccess) {
                    setMediaItems(maxItems ? result.data.slice(0, maxItems) : result.data);
                }
                else {
                    setError(result.message);
                }
            }
            catch (err) {
                setError("Failed to load media");
                console.error(err);
            }
            finally {
                setLoading(false);
            }
        }
        fetchMedia();
    }, [userId, activityId, maxItems]);
    // Handle delete
    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this media?")) {
            return;
        }
        try {
            const result = await deleteMediaAction(id);
            if (result.isSuccess) {
                setMediaItems(prevItems => prevItems.filter(item => item.id !== id));
                onDelete?.(id);
            }
            else {
                setError(result.message);
            }
        }
        catch (err) {
            setError("Failed to delete media");
            console.error(err);
        }
    };
    // Handle select
    const handleSelect = (media) => {
        if (!selectable)
            return;
        setSelectedId(media.id);
        onSelect?.(media);
    };
    if (loading) {
        return (_jsx("div", { className: "flex h-40 items-center justify-center", children: _jsx("div", { className: "size-8 animate-spin rounded-full border-4 border-gray-700 border-t-orange-500" }) }));
    }
    if (error) {
        return _jsx("div", { className: "mt-2 text-sm text-red-500", children: error });
    }
    if (mediaItems.length === 0) {
        return _jsx("div", { className: "mt-2 text-sm text-gray-400", children: "No media found" });
    }
    return (_jsx("div", { className: cn("grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4", className), children: mediaItems.map(media => (_jsxs("div", { className: cn("relative cursor-pointer overflow-hidden rounded-md border border-gray-700 transition-all", selectable && selectedId === media.id && "ring-2 ring-orange-500", selectable && "hover:opacity-90"), onClick: () => handleSelect(media), children: [media.type === "image" ? (_jsx(OptimizedImage, { src: media.secureUrl, cloudinaryId: media.cloudinaryId, alt: "Media", width: 250, height: 150, className: "h-40 w-full object-cover" })) : (_jsx(OptimizedVideo, { src: media.secureUrl, cloudinaryId: media.cloudinaryId, width: 250, height: 150, className: "h-40 w-full object-cover", controls: true })), deletable && (_jsx("button", { onClick: e => handleDelete(media.id, e), className: "absolute right-2 top-2 z-10 rounded-full bg-gray-900/70 p-1 transition-colors hover:bg-red-600", children: _jsx(Trash2, { className: "size-4 text-white" }) }))] }, media.id))) }));
}
//# sourceMappingURL=component.js.map