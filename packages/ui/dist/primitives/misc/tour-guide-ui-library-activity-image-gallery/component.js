"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/*
<ai_context>
Image gallery component for activity detail pages.
Features lightbox functionality, responsive grid, and touch gestures for mobile.
Shows main image prominently with thumbnail navigation.
Now connected to activities database.
</ai_context>
*/
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
export default function ActivityImageGallery({ activity }) {
    // Transform database images to match expected interface
    const images = activity.images
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
        .map(img => ({
        url: img.imageUrl || "/placeholder-activity.jpg",
        alt: img.altText || activity.title,
        caption: img.caption
    }));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const nextImage = () => {
        setCurrentIndex(prev => (prev + 1) % images.length);
    };
    const previousImage = () => {
        setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    };
    const openLightbox = (index) => {
        setLightboxIndex(index);
        setIsLightboxOpen(true);
    };
    const closeLightbox = () => {
        setIsLightboxOpen(false);
    };
    const nextLightboxImage = () => {
        setLightboxIndex(prev => (prev + 1) % images.length);
    };
    const previousLightboxImage = () => {
        setLightboxIndex(prev => (prev - 1 + images.length) % images.length);
    };
    // Auto-play functionality
    useEffect(() => {
        if (images.length > 1) {
            const interval = setInterval(nextImage, 5000);
            return () => clearInterval(interval);
        }
    }, [images.length]);
    // Loading state
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);
    if (!images || images.length === 0) {
        return (_jsx("div", { className: "flex h-96 w-full items-center justify-center rounded-lg bg-gradient-to-br from-gray-800 to-gray-900", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gray-700", children: _jsx(Camera, { className: "size-8 text-gray-400" }) }), _jsx("p", { className: "text-gray-400", children: "No images available" })] }) }));
    }
    return (_jsxs("div", { className: "relative", children: [_jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "group relative h-80 w-full overflow-hidden rounded-xl md:h-96 lg:h-[500px]", children: [_jsx(Image, { src: images[currentIndex].url, alt: images[currentIndex].alt, fill: true, className: "object-cover transition-all duration-700 group-hover:scale-110", priority: true, onLoad: () => setIsLoading(false) }), isLoading && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-900", children: _jsx("div", { className: "size-8 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" }) })), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }), images.length > 1 && (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "ghost", size: "icon", className: "absolute left-4 top-1/2 -translate-y-1/2 border-none bg-black/50 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black/70", onClick: previousImage, children: _jsx(ChevronLeft, { className: "size-6" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "absolute right-4 top-1/2 -translate-y-1/2 border-none bg-black/50 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black/70", onClick: nextImage, children: _jsx(ChevronRight, { className: "size-6" }) })] })), _jsx("div", { className: "absolute right-4 top-4 flex gap-2", children: _jsx(Button, { variant: "ghost", size: "icon", className: "border-none bg-black/50 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-black/70", onClick: () => openLightbox(currentIndex), children: _jsx(ZoomIn, { className: "size-5" }) }) }), images.length > 1 && (_jsxs("div", { className: "absolute bottom-4 right-4", children: [_jsxs("div", { className: "rounded-full bg-black/70 px-3 py-1 text-sm text-white backdrop-blur-sm", children: [currentIndex + 1, " / ", images.length] }), _jsx("div", { className: "mt-2 h-1 w-full rounded-full bg-white/20", children: _jsx("div", { className: "h-full rounded-full bg-yellow-400 transition-all duration-300", style: {
                                                width: `${((currentIndex + 1) / images.length) * 100}%`
                                            } }) })] })), images.length > 1 && (_jsx(Button, { variant: "ghost", size: "icon", className: "absolute bottom-4 left-4 border-none bg-black/50 text-white backdrop-blur-sm hover:bg-black/70", onClick: () => {
                                    /* Toggle auto-play */
                                }, children: _jsx(Play, { className: "size-4" }) }))] }), images.length > 1 && (_jsx("div", { className: "grid grid-cols-4 gap-3 md:grid-cols-6 lg:grid-cols-8", children: images.map((image, index) => (_jsxs("button", { className: cn("group relative aspect-square overflow-hidden rounded-lg transition-all duration-300", currentIndex === index
                                ? "scale-110 ring-2 ring-yellow-400 ring-offset-2 ring-offset-gray-900"
                                : "opacity-70 hover:scale-105 hover:opacity-100 hover:ring-2 hover:ring-gray-400 hover:ring-offset-2 hover:ring-offset-gray-900"), onClick: () => setCurrentIndex(index), children: [_jsx(Image, { src: image.url, alt: image.alt, fill: true, className: "object-cover transition-all duration-300 group-hover:scale-110" }), currentIndex !== index && (_jsx("div", { className: "absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/20" })), _jsx("div", { className: "absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100", children: _jsx(ZoomIn, { className: "size-4 text-white" }) })] }, index))) }))] }), isLightboxOpen && (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "absolute right-4 top-4 z-10 border-none bg-black/50 text-white transition-all duration-200 hover:scale-110 hover:bg-black/70", onClick: closeLightbox, children: _jsx(X, { className: "size-6" }) }), images.length > 1 && (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "ghost", size: "icon", className: "absolute left-4 top-1/2 z-10 -translate-y-1/2 border-none bg-black/50 text-white transition-all duration-200 hover:scale-110 hover:bg-black/70", onClick: previousLightboxImage, children: _jsx(ChevronLeft, { className: "size-8" }) }), _jsx(Button, { variant: "ghost", size: "icon", className: "absolute right-4 top-1/2 z-10 -translate-y-1/2 border-none bg-black/50 text-white transition-all duration-200 hover:scale-110 hover:bg-black/70", onClick: nextLightboxImage, children: _jsx(ChevronRight, { className: "size-8" }) })] })), _jsx("div", { className: "relative size-full max-h-[90vh] max-w-6xl", children: _jsx(Image, { src: images[lightboxIndex].url, alt: images[lightboxIndex].alt, fill: true, className: "object-contain transition-transform duration-300", quality: 95 }) }), _jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2", children: _jsxs("div", { className: "rounded-lg bg-black/70 px-6 py-3 text-center backdrop-blur-sm", children: [_jsxs("div", { className: "text-sm font-medium text-white", children: [lightboxIndex + 1, " of ", images.length] }), images[lightboxIndex]?.caption && (_jsx("div", { className: "mt-1 max-w-md text-xs text-white/80", children: images[lightboxIndex].caption }))] }) }), images.length > 1 && (_jsx("div", { className: "absolute bottom-20 left-1/2 -translate-x-1/2", children: _jsx("div", { className: "flex gap-2 overflow-x-auto pb-2", children: images.map((image, index) => (_jsx("button", { className: cn("relative size-12 shrink-0 overflow-hidden rounded transition-all duration-200", lightboxIndex === index
                                    ? "scale-110 ring-2 ring-yellow-400"
                                    : "opacity-50 hover:scale-105 hover:opacity-100"), onClick: () => setLightboxIndex(index), children: _jsx(Image, { src: image.url, alt: image.alt, fill: true, className: "object-cover" }) }, index))) }) }))] }))] }));
}
//# sourceMappingURL=component.js.map