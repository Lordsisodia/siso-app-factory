"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/*
<ai_context>
Stunning Enhanced Hero Section with 2024 Design Trends
Features glassmorphism, kinetic typography, scroll animations, and modern visual effects.
Implements motion effects, interactive storytelling, and advanced visual hierarchy.
Mobile-first design with accessibility and performance optimization.
</ai_context>
*/
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, Users, Award, Zap, MapPin, Play, Heart, Share2, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MagneticButton, FloatingActionBubble, SmartHoverCard } from "@/components/ui/magnetic-elements";
import { ScrollProgressIndicator, MorphingShape, ParallaxText } from "@/components/ui/advanced-scroll-effects";
function AnimatedCategoryCard({ title, description, icon, count, href, delay }) {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true });
    return (_jsx(motion.div, { ref: cardRef, initial: { opacity: 0, y: 50, scale: 0.9 }, animate: isInView ? { opacity: 1, y: 0, scale: 1 } : {}, transition: { duration: 0.6, delay, ease: "easeOut" }, whileHover: {
            y: -8,
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeOut" }
        }, className: "group", children: _jsx(Link, { href: href, className: "block", children: _jsxs("div", { className: "relative overflow-hidden rounded-2xl border-2 p-6 backdrop-blur-xl transition-all duration-500 hover:shadow-2xl", style: {
                    borderColor: "rgba(255, 29, 206, 0.6)",
                    backgroundColor: "rgba(255, 29, 206, 0.2)",
                    boxShadow: "rgba(255, 29, 206, 0.3)"
                }, onMouseEnter: e => {
                    e.currentTarget.style.borderColor = "rgba(255, 29, 206, 0.8)";
                    e.currentTarget.style.backgroundColor = "rgba(255, 29, 206, 0.3)";
                }, onMouseLeave: e => {
                    e.currentTarget.style.borderColor = "rgba(255, 29, 206, 0.6)";
                    e.currentTarget.style.backgroundColor = "rgba(255, 29, 206, 0.2)";
                }, children: [_jsx("div", { className: "absolute inset-0 rounded-2xl", style: {
                            background: "linear-gradient(135deg, rgba(255, 29, 206, 0.3), rgba(220, 38, 38, 0.2), transparent)"
                        } }), _jsxs("div", { className: "relative z-10", children: [_jsxs("div", { className: "mb-4 flex items-center gap-3", children: [_jsx(motion.span, { className: "text-4xl drop-shadow-lg", whileHover: { scale: 1.2, rotate: 10 }, transition: { duration: 0.3 }, children: icon }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-white drop-shadow-lg transition-colors group-hover:text-yellow-200", children: title }), _jsxs(Badge, { variant: "outline", className: "border-yellow-400/50 bg-yellow-400/20 text-xs font-semibold text-black backdrop-blur-sm", children: [count, " activities"] })] })] }), _jsx("p", { className: "text-sm text-white/80 group-hover:text-white/90", children: description })] })] }) }) }));
}
function KineticTypography() {
    const textRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: textRef,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.3]);
    return (_jsxs(motion.div, { ref: textRef, style: { y, opacity }, className: "space-y-4", children: [_jsx(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.2 }, children: _jsx(Badge, { className: "mb-6 w-fit border-none px-6 py-3 font-bold text-white shadow-xl", style: {
                        background: "linear-gradient(to right, #ff1dce, #dc2626)",
                        boxShadow: "0 20px 25px -5px rgba(255, 29, 206, 0.4)"
                    }, children: _jsx(motion.span, { animate: { scale: [1, 1.05, 1] }, transition: { duration: 2, repeat: Infinity }, children: "\uD83C\uDFC6 #1 Rated Activity Platform in Mallorca" }) }) }), _jsxs(motion.h1, { className: "text-5xl font-bold leading-tight text-white drop-shadow-xl md:text-6xl lg:text-7xl", initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 0.4 }, children: [_jsx("span", { className: "block text-black", children: "Discover" }), _jsx(motion.span, { className: "block text-yellow-400", initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay: 0.6 }, children: "Mallorca's" }), _jsx(motion.span, { className: "block text-white", initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.8, delay: 0.8 }, children: "Best Activities" })] }), _jsxs(motion.p, { className: "text-xl leading-relaxed text-white/90 md:text-2xl", initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 1.0 }, children: ["From thrilling water sports to peaceful cultural tours, discover the best of Mallorca with", " ", _jsx(motion.span, { className: "font-semibold", style: { color: "#ff1dce" }, whileHover: { scale: 1.05 }, transition: { duration: 0.2 }, children: "We Are Excursions" }), ". Book instantly with local experts and create unforgettable memories."] })] }));
}
function GlassmorphismSearchForm() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    return (_jsxs(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 1.2 }, className: "space-y-6", children: [_jsx("div", { className: "mb-8 grid grid-cols-2 gap-4", children: [
                    { icon: Zap, text: "Instant Booking", color: "yellow" },
                    { icon: MapPin, text: "Local Experts", color: "pink" },
                    { icon: Award, text: "Best Price Guarantee", color: "yellow" },
                    { icon: Users, text: "Small Groups", color: "pink" }
                ].map((benefit, index) => (_jsx(SmartHoverCard, { previewContent: _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "font-semibold text-gray-900", children: benefit.text }), _jsxs("p", { className: "text-sm text-gray-600", children: [benefit.text === "Instant Booking" &&
                                        "Book your adventure in seconds with our streamlined booking system", benefit.text === "Local Experts" &&
                                        "Our guides are born and raised in Mallorca, knowing every hidden gem", benefit.text === "Best Price Guarantee" &&
                                        "We match any competitor's price and beat it by 5%", benefit.text === "Small Groups" &&
                                        "Maximum 8 people per group for a personalized experience"] })] }), children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.5, delay: 1.4 + index * 0.1 }, className: "flex items-center gap-3 rounded-xl border p-3 backdrop-blur-xl transition-all duration-300", style: {
                            borderColor: "rgba(255, 29, 206, 0.4)",
                            backgroundColor: "rgba(255, 29, 206, 0.2)"
                        }, onMouseEnter: e => {
                            e.currentTarget.style.borderColor = "rgba(255, 29, 206, 0.6)";
                            e.currentTarget.style.backgroundColor =
                                "rgba(255, 29, 206, 0.3)";
                        }, onMouseLeave: e => {
                            e.currentTarget.style.borderColor = "rgba(255, 29, 206, 0.4)";
                            e.currentTarget.style.backgroundColor =
                                "rgba(255, 29, 206, 0.2)";
                        }, children: [_jsx(benefit.icon, { className: `size-5 ${benefit.color === "yellow" ? "text-yellow-400" : ""}`, style: {
                                    color: benefit.color === "pink" ? "#ff1dce" : undefined
                                } }), _jsx("span", { className: "text-sm font-medium text-white", children: benefit.text })] }) }, benefit.text))) }), _jsx("div", { className: "rounded-2xl border p-6 backdrop-blur-xl", style: {
                    borderColor: "rgba(255, 29, 206, 0.4)",
                    backgroundColor: "rgba(255, 29, 206, 0.15)"
                }, children: _jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-white", children: "Activity Type" }), _jsxs("select", { className: "w-full rounded-lg border-none p-3 text-white backdrop-blur-sm placeholder:text-white/60 focus:outline-none", style: { backgroundColor: "rgba(255, 29, 206, 0.2)" }, onFocus: e => (e.target.style.backgroundColor = "rgba(255, 29, 206, 0.3)"), onBlur: e => (e.target.style.backgroundColor = "rgba(255, 29, 206, 0.2)"), children: [_jsx("option", { value: "", children: "All Activities" }), _jsx("option", { value: "water", children: "Water Sports" }), _jsx("option", { value: "culture", children: "Cultural Tours" }), _jsx("option", { value: "adventure", children: "Adventure" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-white", children: "Date" }), _jsx("input", { type: "date", className: "w-full rounded-lg border-none p-3 text-white backdrop-blur-sm placeholder:text-white/60 focus:outline-none", style: { backgroundColor: "rgba(255, 29, 206, 0.2)" }, onFocus: e => (e.target.style.backgroundColor = "rgba(255, 29, 206, 0.3)"), onBlur: e => (e.target.style.backgroundColor = "rgba(255, 29, 206, 0.2)") })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-white", children: "Guests" }), _jsxs("select", { className: "w-full rounded-lg border-none p-3 text-white backdrop-blur-sm placeholder:text-white/60 focus:outline-none", style: { backgroundColor: "rgba(255, 29, 206, 0.2)" }, onFocus: e => (e.target.style.backgroundColor = "rgba(255, 29, 206, 0.3)"), onBlur: e => (e.target.style.backgroundColor = "rgba(255, 29, 206, 0.2)"), children: [_jsx("option", { value: "", children: "Select" }), _jsx("option", { value: "1", children: "1 Person" }), _jsx("option", { value: "2", children: "2 People" }), _jsx("option", { value: "4", children: "4 People" }), _jsx("option", { value: "8", children: "8+ People" })] })] }), _jsx("div", { className: "flex items-end", children: _jsxs(MagneticButton, { variant: "secondary", size: "lg", className: "w-full", onClick: () => console.log("Search clicked"), children: [_jsx(Search, { className: "size-5" }), "Search"] }) })] }) }), _jsxs("div", { className: "flex flex-col gap-4 sm:flex-row", children: [_jsx(MagneticButton, { variant: "primary", size: "lg", className: "flex-1", onClick: () => console.log("Browse activities"), children: "Browse All Activities" }), _jsxs(MagneticButton, { variant: "outline", size: "lg", className: "flex-1 border-white/50 text-white hover:bg-white/10", onClick: () => console.log("Watch video"), children: [_jsx(Play, { className: "mr-2 size-5" }), "Watch Video"] })] })] }));
}
export default function EnhancedHeroSection({ className }) {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const videos = [
        {
            src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            poster: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop"
        },
        {
            src: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            poster: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1200&auto=format&fit=crop"
        }
    ];
    const categories = [
        {
            title: "Water Adventures",
            description: "Jet skiing, sailing, and diving in crystal clear waters",
            icon: "🌊",
            count: 24,
            href: "/activities?category=water",
            delay: 0
        },
        {
            title: "Cultural Journeys",
            description: "Historic sites, local markets, and authentic experiences",
            icon: "🏛️",
            count: 18,
            href: "/activities?category=culture",
            delay: 0.2
        },
        {
            title: "Mountain Escapes",
            description: "Hiking, climbing, and breathtaking panoramic views",
            icon: "⛰️",
            count: 12,
            href: "/activities?category=mountain",
            delay: 0.4
        },
        {
            title: "Culinary Delights",
            description: "Cooking classes, wine tours, and gastronomic adventures",
            icon: "🍷",
            count: 15,
            href: "/activities?category=food",
            delay: 0.6
        }
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex(prev => (prev + 1) % videos.length);
        }, 8000);
        return () => clearInterval(interval);
    }, [videos.length]);
    return (_jsxs(_Fragment, { children: [_jsx(ScrollProgressIndicator, {}), _jsx(FloatingActionBubble, { icon: _jsx(Heart, { className: "size-5" }), tooltip: "Save Favorites", onClick: () => console.log("Favorites"), position: { bottom: 120, right: 20 }, delay: 2000 }), _jsx(FloatingActionBubble, { icon: _jsx(Share2, { className: "size-5" }), tooltip: "Share Experience", onClick: () => console.log("Share"), position: { bottom: 120, right: 90 }, delay: 4000 }), _jsx(FloatingActionBubble, { icon: _jsx(MessageCircle, { className: "size-5" }), tooltip: "Live Chat Support", onClick: () => console.log("Chat"), position: { bottom: 120, right: 160 }, delay: 6000 }), _jsxs("section", { className: cn("relative min-h-screen overflow-hidden", className), children: [_jsxs("div", { className: "absolute inset-0", children: [_jsx(motion.video, { className: "size-full object-cover", autoPlay: true, muted: true, loop: true, playsInline: true, poster: videos[currentVideoIndex].poster, initial: { scale: 1.1, opacity: 0 }, animate: { scale: 1, opacity: 1 }, transition: { duration: 1 }, children: _jsx("source", { src: videos[currentVideoIndex].src, type: "video/mp4" }) }, currentVideoIndex), _jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" }), _jsx("div", { className: "absolute left-20 top-20 opacity-30", children: _jsx(MorphingShape, { size: 150 }) }), _jsx("div", { className: "absolute bottom-20 right-20 opacity-20", children: _jsx(MorphingShape, { size: 100, colors: ["#FF6B9D", "#C44569", "#F8B500", "#ECE9EC"] }) })] }), _jsx("div", { className: "relative z-10 flex min-h-screen items-center", children: _jsx("div", { className: "mx-auto max-w-7xl px-4 py-20", children: _jsxs("div", { className: "grid grid-cols-1 items-center gap-12 lg:grid-cols-2", children: [_jsxs("div", { className: "space-y-8", children: [_jsx(ParallaxText, { speed: 0.3, children: _jsx(KineticTypography, {}) }), _jsx(ParallaxText, { speed: 0.2, children: _jsx(GlassmorphismSearchForm, {}) })] }), _jsxs(ParallaxText, { speed: 0.1, className: "space-y-6", children: [_jsx(motion.h3, { className: "text-2xl font-bold text-white md:text-3xl", initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay: 1.4 }, children: "Popular Categories" }), _jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: categories.map(category => (_jsx(AnimatedCategoryCard, { ...category }, category.title))) })] })] }) }) }), _jsx(motion.div, { className: "absolute bottom-8 left-1/2 -translate-x-1/2", animate: { y: [0, 10, 0] }, transition: { duration: 2, repeat: Infinity }, children: _jsxs("div", { className: "flex flex-col items-center gap-2 text-white/80", children: [_jsx("span", { className: "text-sm font-medium", children: "Discover More" }), _jsx("div", { className: "flex h-8 w-5 items-start justify-center rounded-full border-2 border-white/50 p-1", children: _jsx(motion.div, { className: "size-1 rounded-full bg-white", animate: { y: [0, 12, 0] }, transition: { duration: 2, repeat: Infinity } }) })] }) })] })] }));
}
//# sourceMappingURL=component.js.map