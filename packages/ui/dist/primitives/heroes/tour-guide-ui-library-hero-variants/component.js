"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Hero Section Variants Component - Landing Page
 *
 * Three distinct hero section designs for the Client Design Variant System
 * Allows real-time switching between Video, Image, and Interactive 3D hero styles
 *
 * Variants:
 * 1. Video Background - Dynamic video carousel with overlays (current production)
 * 2. Static Parallax - High-quality images with parallax effects
 * 3. Interactive 3D - CSS 3D transforms and interactive animations
 */
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useVariants, useComponentVariant } from "@/context/VariantContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Users, Star, Play, Pause, Volume2, VolumeX, ArrowRight, Sparkles, Activity, ChevronDown, Award, Heart, TrendingUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
export function HeroVariants({ heroVideos, onSearch }) {
    const { variants } = useVariants();
    const heroVariant = useComponentVariant("hero");
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const videoRef = useRef(null);
    const { scrollY } = useScroll();
    const parallaxY = useTransform(scrollY, [0, 500], [0, 150]);
    // Handle mouse movement for interactive variant
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };
        if (heroVariant.current === "interactive") {
            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        }
    }, [heroVariant.current]);
    // Auto-advance videos for video variant
    useEffect(() => {
        if (heroVariant.current === "video" && heroVideos.length > 1) {
            const interval = setInterval(() => {
                setCurrentVideoIndex(prev => (prev + 1) % heroVideos.length);
            }, 8000);
            return () => clearInterval(interval);
        }
    }, [heroVariant.current, heroVideos.length]);
    const handleSearch = () => {
        if (onSearch && searchQuery.trim()) {
            onSearch(searchQuery);
        }
    };
    const handleVideoToggle = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            }
            else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    const handleMuteToggle = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };
    // Variant-specific configurations
    const variantConfigs = {
        video: {
            containerClass: "relative min-h-screen flex items-center justify-center overflow-hidden",
            backgroundClass: "bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900",
            contentClass: "relative z-20 text-center px-4 max-w-4xl mx-auto",
            overlayClass: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 z-10"
        },
        image: {
            containerClass: "relative min-h-screen flex items-center justify-center overflow-hidden",
            backgroundClass: "bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900",
            contentClass: "relative z-20 text-center px-4 max-w-4xl mx-auto",
            overlayClass: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"
        },
        interactive: {
            containerClass: "relative min-h-screen flex items-center justify-center overflow-hidden",
            backgroundClass: "bg-gradient-to-br from-purple-900 via-pink-900 to-red-900",
            contentClass: "relative z-20 text-center px-4 max-w-4xl mx-auto",
            overlayClass: "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-10"
        }
    };
    const currentConfig = variantConfigs[heroVariant.current];
    return (_jsxs(motion.section, { className: `${currentConfig.containerClass} ${currentConfig.backgroundClass}`, initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.8 }, children: [heroVariant.current === "video" && (_jsxs("div", { className: "absolute inset-0 z-0", children: [_jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.video, { ref: videoRef, className: "absolute inset-0 size-full object-cover", autoPlay: true, muted: isMuted, loop: true, playsInline: true, poster: heroVideos[currentVideoIndex]?.poster, initial: { opacity: 0, scale: 1.1 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: { duration: 1 }, children: [_jsx("source", { src: heroVideos[currentVideoIndex]?.src, type: "video/mp4" }), _jsx("source", { src: heroVideos[currentVideoIndex]?.fallbackSrc, type: "video/mp4" })] }, currentVideoIndex) }), _jsxs("div", { className: "absolute bottom-6 left-6 z-30 flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: handleVideoToggle, className: "border-white/30 bg-black/20 text-white hover:bg-black/40", children: isPlaying ? (_jsx(Pause, { className: "size-4" })) : (_jsx(Play, { className: "size-4" })) }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleMuteToggle, className: "border-white/30 bg-black/20 text-white hover:bg-black/40", children: isMuted ? (_jsx(VolumeX, { className: "size-4" })) : (_jsx(Volume2, { className: "size-4" })) })] }), _jsx("div", { className: "absolute bottom-6 right-6 z-30 flex gap-2", children: heroVideos.map((_, index) => (_jsx("button", { onClick: () => setCurrentVideoIndex(index), className: `size-2 rounded-full transition-all duration-300 ${index === currentVideoIndex ? "bg-white" : "bg-white/50"}` }, index))) })] })), heroVariant.current === "image" && (_jsxs(motion.div, { className: "absolute inset-0 z-0", style: { y: parallaxY }, children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50" }), _jsx(Image, { src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop", alt: "Mallorca landscape", fill: true, className: "object-cover", priority: true }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" }), _jsx(motion.div, { className: "absolute left-10 top-1/4 size-32 rounded-full bg-white/10 blur-3xl", animate: {
                            x: [0, 30, 0],
                            y: [0, -20, 0],
                            scale: [1, 1.1, 1]
                        }, transition: { duration: 8, repeat: Infinity, ease: "easeInOut" } }), _jsx(motion.div, { className: "absolute bottom-1/4 right-10 size-24 rounded-full bg-pink-500/20 blur-2xl", animate: {
                            x: [0, -20, 0],
                            y: [0, 30, 0],
                            scale: [1, 0.9, 1]
                        }, transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } })] })), heroVariant.current === "interactive" && (_jsxs("div", { className: "absolute inset-0 z-0", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900" }), _jsx("div", { className: "absolute inset-0 overflow-hidden", children: [...Array(5)].map((_, i) => (_jsx(motion.div, { className: "absolute size-64 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-2xl", style: {
                                left: `${20 + i * 15}%`,
                                top: `${30 + i * 10}%`,
                                transform: `perspective(1000px) rotateY(${mousePosition.x * 0.1}deg) rotateX(${mousePosition.y * 0.1}deg)`
                            }, animate: {
                                x: [0, 50, 0],
                                y: [0, -30, 0],
                                scale: [1, 1.2, 1]
                            }, transition: {
                                duration: 4 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.5
                            } }, i))) }), _jsx(motion.div, { className: "pointer-events-none absolute z-10 size-4 rounded-full bg-yellow-300 blur-sm", style: {
                            left: `${mousePosition.x}%`,
                            top: `${mousePosition.y}%`,
                            transform: "translate(-50%, -50%)"
                        }, animate: {
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7]
                        }, transition: { duration: 2, repeat: Infinity } })] })), _jsx("div", { className: currentConfig.overlayClass }), _jsxs("div", { className: currentConfig.contentClass, children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "mb-6", children: _jsxs(Badge, { className: "border-pink-500/30 bg-gradient-to-r from-pink-500/20 to-red-500/20 px-4 py-2 text-sm text-white", children: [_jsx(Award, { className: "mr-1 size-4" }), heroVariant.current === "video"
                                    ? "Premium Video Experience"
                                    : heroVariant.current === "image"
                                        ? "High-Quality Imagery"
                                        : "Interactive 3D Experience"] }) }), _jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "mb-8", children: [_jsxs("h1", { className: "text-4xl font-bold leading-tight md:text-6xl lg:text-7xl", children: [_jsx("span", { className: "text-black", children: "Discover" }), " ", _jsx("span", { className: "text-yellow-400", style: { textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }, children: "Mallorca's" }), _jsx("br", {}), _jsx("span", { className: "text-white", children: "Best Activities" })] }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.6 }, className: "mt-4 flex items-center justify-center gap-4 text-lg text-white/90", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "size-5 fill-current text-yellow-400" }), _jsx("span", { className: "font-semibold", children: "4.9" })] }), _jsx("div", { className: "size-1 rounded-full bg-white/50" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "size-5 text-pink-400" }), _jsx("span", { children: "50k+ Happy Customers" })] }), _jsx("div", { className: "size-1 rounded-full bg-white/50" }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(TrendingUp, { className: "size-5 text-green-400" }), _jsx("span", { children: "Trending Now" })] })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.7 }, className: "mx-auto mb-8 max-w-2xl", children: _jsxs("div", { className: "flex gap-3 rounded-2xl bg-white/95 p-3 shadow-2xl backdrop-blur-md", children: [_jsxs("div", { className: "flex flex-1 items-center gap-3", children: [_jsx(Search, { className: "ml-2 size-5 text-gray-400" }), _jsx(Input, { type: "text", placeholder: heroVariant.current === "video"
                                                ? "Search activities with video previews..."
                                                : heroVariant.current === "image"
                                                    ? "Discover beautiful Mallorca experiences..."
                                                    : "Find interactive adventures...", value: searchQuery, onChange: e => setSearchQuery(e.target.value), className: "border-0 bg-transparent text-lg text-gray-800 placeholder:text-gray-500 focus:ring-0", onKeyPress: e => e.key === "Enter" && handleSearch() })] }), _jsxs(Button, { onClick: handleSearch, className: "rounded-xl bg-gradient-to-r from-pink-500 to-red-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-pink-600 hover:to-red-600 hover:shadow-xl", children: [_jsx(Search, { className: "mr-2 size-5" }), "Search"] })] }) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.8 }, className: "mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row", children: [_jsxs(Button, { size: "lg", className: "rounded-xl bg-gradient-to-r from-pink-500 to-red-500 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:from-pink-600 hover:to-red-600 hover:shadow-2xl", children: [_jsx(Activity, { className: "mr-2 size-5" }), "Explore Activities", _jsx(ArrowRight, { className: "ml-2 size-5" })] }), _jsxs(Button, { variant: "outline", size: "lg", className: "rounded-xl border-2 border-white/30 px-8 py-4 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-xl", children: [_jsx(Heart, { className: "mr-2 size-5" }), "View Favorites"] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.9 }, className: "mx-auto grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4", children: [
                            { icon: Activity, label: "Activities", value: "150+" },
                            { icon: MapPin, label: "Locations", value: "50+" },
                            { icon: Users, label: "Customers", value: "50k+" },
                            { icon: Award, label: "Rating", value: "4.9★" }
                        ].map((stat, index) => (_jsxs(motion.div, { className: "text-center", whileHover: { scale: 1.05 }, transition: { duration: 0.2 }, children: [_jsx("div", { className: "mx-auto mb-2 flex size-12 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm", children: _jsx(stat.icon, { className: "size-6 text-pink-300" }) }), _jsx("div", { className: "text-2xl font-bold text-white", children: stat.value }), _jsx("div", { className: "text-sm text-white/70", children: stat.label })] }, stat.label))) }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 1.2 }, className: "absolute bottom-8 left-1/2 -translate-x-1/2", children: _jsxs(motion.div, { animate: { y: [0, 10, 0] }, transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }, className: "flex flex-col items-center gap-2 text-white/70", children: [_jsx("span", { className: "text-sm", children: heroVariant.current === "interactive"
                                        ? "Move mouse to interact"
                                        : "Scroll to explore" }), _jsx(ChevronDown, { className: "size-5" })] }) })] }), process.env.NODE_ENV === "development" && (_jsx(motion.div, { className: "absolute left-4 top-20 z-50", initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { delay: 1.5 }, children: _jsxs("div", { className: "rounded-full border border-pink-500/30 bg-black/80 px-3 py-2 text-xs text-white backdrop-blur-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Sparkles, { className: "size-3" }), "Hero:", " ", heroVariant.current === "video"
                                    ? "Video Background"
                                    : heroVariant.current === "image"
                                        ? "Static Parallax"
                                        : "Interactive 3D"] }), heroVariant.current === "interactive" && (_jsxs("div", { className: "mt-1 text-xs text-gray-300", children: ["Mouse: ", Math.round(mousePosition.x), "%,", " ", Math.round(mousePosition.y), "%"] }))] }) }))] }, `hero-${heroVariant.current}`));
}
//# sourceMappingURL=component.js.map