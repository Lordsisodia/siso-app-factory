"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { OptimizedVideo } from "./optimized-video";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
export function VideoCarousel({ videos, autoRotate = true, rotationInterval = 8000, // 8 seconds default
showControls = true, showIndicators = true, className, overlayText }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const timerRef = useRef(null);
    // Handle auto-rotation
    useEffect(() => {
        if (autoRotate && isPlaying) {
            timerRef.current = setInterval(() => {
                setActiveIndex(prev => (prev + 1) % videos.length);
            }, rotationInterval);
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [autoRotate, isPlaying, rotationInterval, videos.length]);
    // Navigation handlers
    const goToNext = () => {
        setActiveIndex(prev => (prev + 1) % videos.length);
        resetTimer();
    };
    const goToPrevious = () => {
        setActiveIndex(prev => (prev === 0 ? videos.length - 1 : prev - 1));
        resetTimer();
    };
    const goToIndex = (index) => {
        setActiveIndex(index);
        resetTimer();
    };
    const resetTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            if (autoRotate && isPlaying) {
                timerRef.current = setInterval(() => {
                    setActiveIndex(prev => (prev + 1) % videos.length);
                }, rotationInterval);
            }
        }
    };
    // Pause/resume auto-rotation when user interacts
    const handleUserInteraction = () => {
        setIsPlaying(false);
    };
    // Resume auto-rotation after a period of inactivity
    useEffect(() => {
        if (!isPlaying) {
            const resumeTimer = setTimeout(() => {
                setIsPlaying(true);
            }, 10000); // Resume after 10 seconds of inactivity
            return () => clearTimeout(resumeTimer);
        }
    }, [isPlaying]);
    if (videos.length === 0) {
        return null;
    }
    return (_jsxs("div", { className: cn("relative h-screen w-full overflow-hidden", className), onMouseMove: handleUserInteraction, onTouchStart: handleUserInteraction, children: [videos.map((video, index) => (_jsxs("div", { className: cn("absolute inset-0 size-full transition-opacity duration-1000", index === activeIndex
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"), children: [video.directUrl ? (
                    // Use direct video element for Pixabay URLs
                    _jsx("video", { src: video.directUrl, muted: true, loop: true, autoPlay: true, playsInline: true, className: "size-full object-cover", preload: index === 0 ? "auto" : "none" })) : (
                    // Use OptimizedVideo for Cloudinary videos
                    _jsx(OptimizedVideo, { cloudinaryId: video.cloudinaryId, src: "" // We're using cloudinaryId instead
                        , muted: true, loop: true, autoPlay: true, controls: false, objectFit: "cover", className: "size-full", lazy: index !== 0 })), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" })] }, video.cloudinaryId))), overlayText && (_jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center", children: overlayText })), showControls && videos.length > 1 && (_jsxs(_Fragment, { children: [_jsx("button", { onClick: goToPrevious, className: "absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/60", "aria-label": "Previous video", children: _jsx(ChevronLeft, { className: "size-6" }) }), _jsx("button", { onClick: goToNext, className: "absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/60", "aria-label": "Next video", children: _jsx(ChevronRight, { className: "size-6" }) })] })), showIndicators && videos.length > 1 && (_jsx("div", { className: "absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2", children: videos.map((_, index) => (_jsx("button", { onClick: () => goToIndex(index), className: cn("h-2 w-8 rounded-full transition-all", index === activeIndex
                        ? "bg-white"
                        : "bg-white/40 hover:bg-white/60"), "aria-label": `Go to video ${index + 1}` }, index))) }))] }));
}
//# sourceMappingURL=component.js.map