"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const heroImages = [
    {
        src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1920&auto=format&fit=crop",
        alt: "Jet skiing in crystal clear waters",
        title: "Thrilling Water Sports",
        subtitle: "Experience the adrenaline rush of jet skiing in Palma Bay"
    },
    {
        src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1920&auto=format&fit=crop",
        alt: "Sailing at sunset",
        title: "Magical Sunset Sailing",
        subtitle: "Watch the sun set over the Mediterranean in luxury"
    },
    {
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop",
        alt: "Mountain hiking adventure",
        title: "Mountain Exploration",
        subtitle: "Discover breathtaking views from Mallorca's peaks"
    },
    {
        src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1920&auto=format&fit=crop",
        alt: "Cultural site exploration",
        title: "Cultural Heritage",
        subtitle: "Explore centuries of Mediterranean history and culture"
    },
    {
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1920&auto=format&fit=crop",
        alt: "Happy customers enjoying activities",
        title: "Unforgettable Memories",
        subtitle: "Join thousands of happy adventurers"
    }
];
export default function HeroCarousel({ className, autoplay = true, interval = 5000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(autoplay);
    const [isLoading, setIsLoading] = useState(true);
    // Auto-advance carousel
    useEffect(() => {
        if (!isPlaying)
            return;
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1);
        }, interval);
        return () => clearInterval(timer);
    }, [isPlaying, interval]);
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };
    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? heroImages.length - 1 : currentIndex - 1);
    };
    const goToNext = () => {
        setCurrentIndex(currentIndex === heroImages.length - 1 ? 0 : currentIndex + 1);
    };
    const togglePlayback = () => {
        setIsPlaying(!isPlaying);
    };
    return (_jsxs("div", { className: cn("relative overflow-hidden rounded-2xl shadow-2xl", className), children: [_jsxs("div", { className: "relative h-[400px] w-full md:h-[500px] lg:h-[600px]", children: [heroImages.map((image, index) => (_jsxs("div", { className: cn("absolute inset-0 transition-opacity duration-1000 ease-in-out", index === currentIndex ? "opacity-100" : "opacity-0"), children: [_jsx(Image, { src: image.src, alt: image.alt, fill: true, className: "object-cover", priority: index === 0, onLoad: () => index === 0 && setIsLoading(false), sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" }), _jsxs("div", { className: "absolute bottom-6 left-6 text-white", children: [_jsx("h3", { className: "mb-2 text-xl font-bold drop-shadow-lg md:text-2xl", children: image.title }), _jsx("p", { className: "text-sm drop-shadow-md md:text-base", children: image.subtitle })] })] }, index))), isLoading && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-rose-100", children: _jsx("div", { className: "size-8 animate-spin rounded-full border-4 border-rose-400 border-t-transparent" }) }))] }), _jsxs("div", { className: "absolute inset-0 flex items-center justify-between p-4", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: goToPrevious, className: "size-10 rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30 md:size-12", "aria-label": "Previous image", children: _jsx(ChevronLeft, { className: "size-5 md:size-6" }) }), _jsx(Button, { variant: "ghost", size: "icon", onClick: goToNext, className: "size-10 rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30 md:size-12", "aria-label": "Next image", children: _jsx(ChevronRight, { className: "size-5 md:size-6" }) })] }), _jsxs("div", { className: "absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4", children: [_jsx("div", { className: "flex gap-2", children: heroImages.map((_, index) => (_jsx("button", { onClick: () => goToSlide(index), className: cn("size-2 rounded-full transition-all duration-300 hover:scale-125 md:size-3", index === currentIndex
                                ? "bg-white shadow-lg"
                                : "bg-white/50 hover:bg-white/75"), "aria-label": `Go to slide ${index + 1}` }, index))) }), _jsx(Button, { variant: "ghost", size: "icon", onClick: togglePlayback, className: "size-8 rounded-full bg-white/20 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30", "aria-label": isPlaying ? "Pause slideshow" : "Play slideshow", children: isPlaying ? (_jsx(Pause, { className: "size-3" })) : (_jsx(Play, { className: "size-3" })) })] })] }));
}
//# sourceMappingURL=component.js.map