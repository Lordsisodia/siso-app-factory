"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
/**
 * OptimizedVideo component
 * Renders an optimized video with lazy loading and poster image support
 */
export function OptimizedVideo({ src, cloudinaryId, className, poster, autoPlay = false, muted = true, loop = false, controls = true, width, height, lazy = true, objectFit = "cover", onLoadStart, onLoadedData, onError }) {
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(!lazy);
    // Set up Intersection Observer for lazy loading
    useEffect(() => {
        if (!lazy || !videoRef.current)
            return;
        const options = {
            root: null,
            rootMargin: "200px", // Load when 200px from viewport
            threshold: 0.1
        };
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, options);
        observer.observe(videoRef.current);
        return () => {
            observer.disconnect();
        };
    }, [lazy]);
    // Format the video source URL
    const videoSrc = cloudinaryId
        ? `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${cloudinaryId}`
        : src;
    // Video load handlers
    const handleLoadStart = () => {
        onLoadStart?.();
    };
    const handleLoadedData = () => {
        setIsLoaded(true);
        onLoadedData?.();
    };
    const handleError = (error) => {
        console.error("Video loading error:", error);
        onError?.(error);
    };
    return (_jsxs("div", { className: cn("relative overflow-hidden bg-gray-900", className), style: {
            width: width ? `${width}px` : "100%",
            height: height ? `${height}px` : "auto"
        }, children: [_jsxs("video", { ref: videoRef, className: cn("size-full transition-opacity duration-300", isLoaded ? "opacity-100" : "opacity-0", {
                    "object-cover": objectFit === "cover",
                    "object-contain": objectFit === "contain",
                    "object-fill": objectFit === "fill",
                    "object-none": objectFit === "none",
                    "object-scale-down": objectFit === "scale-down"
                }), poster: poster, controls: controls, autoPlay: isVisible && autoPlay, muted: muted, loop: loop, playsInline: true, preload: lazy ? "none" : "auto", width: width, height: height, onLoadStart: handleLoadStart, onLoadedData: handleLoadedData, onError: handleError, children: [isVisible && _jsx("source", { src: videoSrc, type: "video/mp4" }), "Your browser does not support the video tag."] }), !isLoaded && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-900", children: _jsx("div", { className: "size-12 animate-spin rounded-full border-4 border-gray-700 border-t-orange-500" }) }))] }));
}
//# sourceMappingURL=component.js.map