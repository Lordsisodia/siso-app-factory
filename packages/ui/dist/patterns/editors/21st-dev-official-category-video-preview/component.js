"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useRef, useState } from "react";
import { cn } from "../../../lib/utils";
const videoLoadingCache = new Map();
const videoLoadPromises = new Map();
export function CategoryVideoPreview({ videoUrl }) {
    const videoRef = useRef(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const loadVideo = useCallback(async () => {
        const videoElement = videoRef.current;
        if (!videoElement || !videoUrl)
            return;
        if (videoLoadPromises.has(videoUrl)) {
            try {
                setIsLoading(true);
                await videoLoadPromises.get(videoUrl);
                if (videoLoadingCache.get(videoUrl)) {
                    videoElement.currentTime = 0;
                    videoElement.play().catch(() => { });
                }
            }
            catch (error) {
                console.error("Error loading video:", error);
            }
            finally {
                setIsLoading(false);
            }
            return;
        }
        if (!isVideoLoaded && !videoLoadingCache.get(videoUrl)) {
            setIsLoading(true);
            const loadPromise = new Promise((resolve, reject) => {
                const handleLoad = () => {
                    videoElement
                        .play()
                        .then(() => {
                        setIsVideoLoaded(true);
                        videoLoadingCache.set(videoUrl, true);
                        resolve();
                    })
                        .catch(reject);
                };
                videoElement.addEventListener("loadeddata", handleLoad, { once: true });
                videoElement.src = videoUrl;
                videoElement.load();
            });
            videoLoadPromises.set(videoUrl, loadPromise);
            try {
                await loadPromise;
            }
            catch (error) {
                console.error("Error loading video:", error);
                videoLoadingCache.set(videoUrl, false);
            }
            finally {
                videoLoadPromises.delete(videoUrl);
                setIsLoading(false);
            }
        }
        else if (isVideoLoaded) {
            videoElement.currentTime = 0;
            videoElement.play().catch(() => { });
        }
    }, [videoUrl, isVideoLoaded]);
    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
        loadVideo();
    }, [loadVideo]);
    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0;
        }
    }, []);
    return (_jsxs("div", { className: "absolute inset-0 z-10", onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: [isLoading && _jsx("div", { className: "loading-border" }), _jsx("video", { ref: videoRef, muted: true, playsInline: true, loop: true, preload: "none", className: cn("w-full h-full object-cover", isHovered ? "opacity-100" : "opacity-0", "transition-opacity duration-300") })] }));
}
export default CategoryVideoPreview;
//# sourceMappingURL=component.js.map