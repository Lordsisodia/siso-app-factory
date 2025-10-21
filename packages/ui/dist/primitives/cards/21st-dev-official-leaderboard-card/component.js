"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useCallback, useState } from "react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Video, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserAvatar } from "../../ui/user-avatar";
import { UpvoteIcon } from "../../icons/upvote-icon";
import { shouldHideLeaderboardRankings } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
// VideoPreview component for hover video functionality
const videoLoadingCache = new Map();
const videoLoadPromises = new Map();
function VideoPreview({ videoUrl, id }) {
    const videoRef = useRef(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
    return (_jsxs("div", { onMouseEnter: playVideo, onMouseLeave: stopVideo, onTouchStart: playVideo, onTouchEnd: stopVideo, className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [isLoading && _jsx("div", { className: "loading-border" }), _jsx("video", { ref: videoRef, "data-video": `${id}`, autoPlay: true, muted: true, loop: true, playsInline: true, preload: "none", className: "absolute inset-0 w-full h-full object-cover rounded-lg" })] }));
}
export function LeaderboardCard({ submission, index, isVoting, handleVote, handleDemoClick, isHistorical = false, }) {
    const userData = submission.user_data || {};
    const componentData = submission.component_data || {};
    const tags = submission.tags || [];
    // Use the shared utility function
    const hideRankings = shouldHideLeaderboardRankings() && !isHistorical;
    const formatNumber = (num) => {
        if (num === undefined || num === null || isNaN(num)) {
            return "0";
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`;
        }
        return num.toString();
    };
    return (_jsx("div", { onClick: () => handleDemoClick(submission), children: _jsxs("div", { className: "group relative flex flex-col sm:flex-row items-start gap-4 rounded-xl px-0 py-4 transition-all duration-300 sm:-mx-4 sm:p-4 cursor-pointer hover:sm:bg-transparent dark:hover:sm:bg-transparent", children: [_jsxs("div", { className: "relative aspect-[4/3] w-full sm:w-56 mb-4 sm:mb-0", children: [_jsx("div", { className: "absolute inset-0", children: _jsxs("div", { className: "relative w-full h-full rounded-lg shadow-base overflow-hidden", children: [_jsx("img", { src: submission.preview_url || "/placeholder.svg", alt: submission.name, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0" }), submission.video_url && (_jsx(VideoPreview, { videoUrl: submission.video_url, id: submission.id }))] }) }), _jsx("div", { className: "absolute top-2 left-2 z-20 flex gap-2", children: submission.video_url && (_jsx("div", { className: "bg-background/90 backdrop-blur rounded-sm px-2 py-1 pointer-events-none", "data-video-icon": submission.id, children: _jsx(Video, { size: 16, className: "text-foreground" }) })) })] }), _jsxs("div", { className: "flex-1 flex flex-row justify-between w-full", children: [_jsxs("div", { className: "flex flex-col space-y-2 flex-1 sm:min-h-24 justify-between", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("h3", { className: "text-base font-semibold text-foreground group-hover:text-primary", children: [!hideRankings ? `${index + 1}. ` : "", componentData.name || submission.name] }), submission.name !== "Default" && (_jsx("p", { className: "text-base text-muted-foreground", children: submission.name })), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(UserAvatar, { src: userData.image_url || "/placeholder.svg", alt: userData.name || "User", size: 20, user: userData, isClickable: true }), _jsx("span", { className: "text-sm text-muted-foreground", children: userData.name || userData.username || "Anonymous" })] })] }), _jsxs("div", { className: "flex flex-row flex-wrap items-center gap-2 mt-2", children: [_jsx(Tag, { size: 14, className: "text-muted-foreground" }), Array.isArray(tags) &&
                                            tags.map((tag, tagIndex) => (_jsx(Badge, { variant: "outline", className: "text-xs font-normal hover:bg-secondary", children: typeof tag === "string" ? tag : tag.slug || "unknown" }, typeof tag === "string" ? tag : tag.slug || tagIndex)))] })] }), !isHistorical && (_jsx("div", { className: "flex ml-4 shrink-0", children: _jsx(Button, { variant: "outline", size: "icon", className: cn("size-12 rounded-lg border transition-colors duration-200", submission.has_voted
                                    ? "border-primary bg-muted/20 text-primary"
                                    : "hover:border-primary hover:bg-primary/10 border-primary/50"), onClick: (e) => handleVote(e, submission.id), disabled: isVoting, "aria-label": submission.has_voted ? "Remove vote" : "Vote", children: _jsxs("div", { className: "flex flex-col items-center justify-center h-full", children: [isVoting ? (_jsx(Loader2, { className: "h-3.5 w-3.5 animate-spin" })) : (_jsx(motion.div, { initial: { scale: 1 }, animate: submission.has_voted ? { scale: [1, 1.1, 1] } : {}, transition: { duration: 0.2 }, children: _jsx(UpvoteIcon, { isVoted: submission.has_voted, size: 14 }) })), !hideRankings && (_jsx("div", { className: "text-sm font-semibold leading-none h-[18px]", children: _jsx(NumberFlow, { value: Number(formatNumber(submission.votes || 0)), transformTiming: {
                                                    duration: 550,
                                                    easing: "ease-in-out",
                                                }, opacityTiming: {
                                                    duration: 350,
                                                    easing: "ease-out",
                                                }, trend: 0 }) }))] }) }) })), isHistorical && (_jsxs("div", { className: "flex items-center gap-1 ml-4", children: [_jsx(UpvoteIcon, { size: 14, className: "text-muted-foreground" }), _jsx("span", { className: "text-sm text-muted-foreground font-medium", children: _jsx(NumberFlow, { value: Number(formatNumber(submission.votes || 0)), transformTiming: {
                                            duration: 550,
                                            easing: "ease-in-out",
                                        }, opacityTiming: {
                                            duration: 350,
                                            easing: "ease-out",
                                        }, trend: 0 }) })] }))] })] }) }));
}
//# sourceMappingURL=component.js.map