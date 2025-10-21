"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
<ai_context>
Activity card component for displaying activity listings.
Features image galleries, pricing, ratings, availability, and booking options.
Implements dark theme with lighter, more vibrant rose accents and yellow premium indicators.
</ai_context>
*/
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Clock, Users, MapPin, Star, Heart, Calendar, Zap, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours === 0) {
        return `${remainingMinutes}min`;
    }
    else if (remainingMinutes === 0) {
        return `${hours}h`;
    }
    else {
        return `${hours}h ${remainingMinutes}min`;
    }
}
function formatPrice(price, currency) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0
    }).format(price);
}
export default function ActivityCard({ id, title, shortDescription, category, location, duration, maxParticipants, price, currency, rating, reviewCount, imageUrl, imageAlt, availableToday = true, featured = false, spotsLeft, className }) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const handleWishlistToggle = (e) => {
        e.preventDefault();
        setIsWishlisted(!isWishlisted);
    };
    const handleImageError = () => {
        setImageError(true);
        setImageLoaded(true);
    };
    const fallbackImageUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop";
    return (_jsx(Link, { href: `/activities/${id}`, className: "group block", children: _jsxs(Card, { className: cn("overflow-hidden border-2 border-yellow-300/80 bg-rose-500/95 transition-all duration-300", "hover:-translate-y-2 hover:border-yellow-300 hover:shadow-2xl hover:shadow-yellow-300/30", "focus-within:border-yellow-300 focus-within:shadow-2xl focus-within:shadow-yellow-300/30", className), children: [_jsxs("div", { className: "relative h-48 overflow-hidden", children: [_jsx(Image, { src: imageError ? fallbackImageUrl : imageUrl, alt: imageAlt, fill: true, className: cn("object-cover transition-all duration-500 group-hover:scale-110", !imageLoaded && "opacity-0"), onLoad: () => setImageLoaded(true), onError: handleImageError, sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw", priority: featured }), !imageLoaded && (_jsx("div", { className: "absolute inset-0 animate-pulse bg-rose-500" })), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" }), _jsxs("div", { className: "absolute inset-x-3 top-3 flex items-start justify-between", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [featured && (_jsx(Badge, { className: "border-none bg-yellow-300 font-bold text-black shadow-xl shadow-yellow-300/50", children: "\u2B50 Featured" })), availableToday && (_jsxs(Badge, { className: "border-none bg-green-500 font-bold text-white shadow-lg shadow-green-500/40", children: [_jsx(Zap, { className: "mr-1 size-3" }), "Available Today"] })), spotsLeft && spotsLeft <= 5 && (_jsxs(Badge, { className: "border-none bg-orange-500 font-bold text-white shadow-lg shadow-orange-500/40", children: [_jsx(TrendingUp, { className: "mr-1 size-3" }), "Only ", spotsLeft, " spots left"] }))] }), _jsx(Button, { variant: "ghost", size: "sm", className: "size-9 border-none bg-black/30 p-0 shadow-lg backdrop-blur-sm hover:bg-black/50", onClick: handleWishlistToggle, children: _jsx(Heart, { className: cn("size-4 transition-colors", isWishlisted ? "fill-rose-400 text-rose-400" : "text-white") }) })] }), _jsx("div", { className: "absolute inset-x-3 bottom-3", children: _jsxs("div", { className: "flex items-center justify-between text-white", children: [_jsxs("div", { className: "flex items-center gap-1 rounded bg-black/30 px-2 py-1 shadow-lg backdrop-blur-sm", children: [_jsx(Star, { className: "size-4 fill-yellow-300 text-yellow-300 drop-shadow-md" }), _jsx("span", { className: "text-sm font-bold drop-shadow-sm", children: rating }), _jsxs("span", { className: "text-xs text-gray-200 drop-shadow-sm", children: ["(", reviewCount, ")"] })] }), _jsx("div", { className: "rounded bg-black/30 px-2 py-1 shadow-lg backdrop-blur-sm", children: _jsx("span", { className: "text-lg font-bold drop-shadow-lg", children: formatPrice(price, currency) }) })] }) })] }), _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "mb-3", children: [_jsx("h3", { className: "mb-2 line-clamp-2 text-lg font-bold text-white drop-shadow-md transition-colors group-hover:text-yellow-100", children: title }), _jsx("p", { className: "line-clamp-2 text-sm text-yellow-100 drop-shadow-sm", children: shortDescription })] }), _jsxs("div", { className: "mb-4 flex flex-wrap gap-4 text-sm text-yellow-100", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "size-4 text-yellow-300 drop-shadow-sm" }), _jsx("span", { className: "font-medium", children: location })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "size-4 text-yellow-300 drop-shadow-sm" }), _jsx("span", { className: "font-medium", children: formatDuration(duration) })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "size-4 text-yellow-300 drop-shadow-sm" }), _jsxs("span", { className: "font-medium", children: ["Up to ", maxParticipants] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("div", { className: "flex items-center gap-2", children: availableToday && (_jsxs(Badge, { variant: "outline", className: "border-green-400 bg-green-500/20 font-bold text-green-300 shadow-sm", children: [_jsx(Calendar, { className: "mr-1 size-3" }), "Book Today"] })) }), _jsx(Link, { href: `/book/${id}/select`, onClick: e => e.stopPropagation(), children: _jsx(Button, { size: "sm", className: "border-none bg-yellow-300 px-4 font-bold text-black shadow-xl shadow-yellow-300/50 transition-all duration-200 hover:scale-105 hover:bg-yellow-200 hover:shadow-yellow-200/60", children: "Book Now" }) })] })] })] }) }));
}
//# sourceMappingURL=component.js.map