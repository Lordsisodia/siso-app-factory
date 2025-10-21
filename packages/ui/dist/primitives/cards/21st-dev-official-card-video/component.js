"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState, useCallback } from "react";
import { cn } from "../../../lib/utils";
const videoLoadingCache = new Map();
const videoLoadPromises = new Map();
export function ComponentVideoPreview({ component, demo, }) {
    const videoRef = useRef(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isDemo = "demo_slug" in component;
    const id = component.id.toString();
    const videoUrl = isDemo ? component.video_url : null;
    const toggleVideoIcon = useCallback((hide) => {
        const videoIcon = document.querySelector(`[data-video-icon="${id}"]`);
        if (videoIcon) {
            videoIcon.style.opacity = hide ? "0" : "1";
            videoIcon.style.visibility = hide ? "hidden" : "visible";
        }
    }, [id]);
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
    const playVideo = useCallback(() => {
        toggleVideoIcon(true);
        loadVideo();
    }, [toggleVideoIcon, loadVideo]);
    const stopVideo = useCallback(() => {
        toggleVideoIcon(false);
        const videoElement = videoRef.current;
        if (videoElement) {
            videoElement.pause();
        }
    }, [toggleVideoIcon]);
    return (_jsxs("div", { onMouseEnter: playVideo, onMouseLeave: stopVideo, onTouchStart: playVideo, onTouchEnd: stopVideo, className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [isLoading && _jsx("div", { className: "loading-border" }), _jsx("video", { ref: videoRef, "data-video": `${id}`, autoPlay: true, muted: true, loop: true, playsInline: true, preload: "none", className: cn("absolute inset-0", "w-full h-full", "object-cover rounded-lg") })] }));
}
//# sourceMappingURL=component.js.map