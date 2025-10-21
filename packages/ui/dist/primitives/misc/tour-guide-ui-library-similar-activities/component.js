"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
<ai_context>
Enhanced Similar Activities - Full Width Grid Component
Shows related activities in an attractive grid layout for the main page.
Features dark glassmorphism theme and improved visual presentation.
Designed for cross-selling and user engagement.
</ai_context>
*/
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Clock, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getActivitiesSupabaseAction } from "@/actions/db/activities-actions";
// Enhanced glassmorphism card component
function GlassmorphismCard({ children, className = "" }) {
    return (_jsx("div", { className: `rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-sm ${className}`, children: children }));
}
export default function SimilarActivities({ currentActivityId, category }) {
    const [similarActivities, setSimilarActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchSimilarActivities = async () => {
            setLoading(true);
            // Get 3 activities from the same category, excluding current activity
            const result = await getActivitiesSupabaseAction();
            if (result.isSuccess) {
                // Filter for same category and exclude current activity
                const filtered = result.data
                    .filter(act => act.id !== currentActivityId && act.category === category)
                    .slice(0, 3);
                // If not enough in same category, add from different categories
                if (filtered.length < 3) {
                    const additional = result.data
                        .filter(act => act.id !== currentActivityId && act.category !== category)
                        .slice(0, 3 - filtered.length);
                    setSimilarActivities([...filtered, ...additional]);
                }
                else {
                    setSimilarActivities(filtered);
                }
            }
            setLoading(false);
        };
        fetchSimilarActivities();
    }, [currentActivityId, category]);
    if (loading) {
        return (_jsx("div", { className: "grid gap-6 md:grid-cols-3", children: [...Array(3)].map((_, i) => (_jsxs(GlassmorphismCard, { className: "overflow-hidden p-0", children: [_jsx("div", { className: "h-48 animate-pulse bg-white/10" }), _jsxs("div", { className: "space-y-3 p-4", children: [_jsx("div", { className: "h-4 animate-pulse rounded bg-white/10" }), _jsx("div", { className: "h-3 w-3/4 animate-pulse rounded bg-white/10" }), _jsx("div", { className: "h-3 w-1/2 animate-pulse rounded bg-white/10" })] })] }, i))) }));
    }
    if (similarActivities.length === 0) {
        return (_jsx("div", { className: "py-12 text-center", children: _jsx("p", { className: "text-white/60", children: "No similar activities found" }) }));
    }
    return (_jsx("div", { className: "grid gap-6 md:grid-cols-3", children: similarActivities.map(similarActivity => {
            const primaryImage = similarActivity.images?.find(img => img.isPrimary) ||
                similarActivity.images?.[0];
            const adultPricing = similarActivity.pricing?.find(p => p.priceType === "adult");
            const price = adultPricing ? parseFloat(adultPricing.basePrice) : 0;
            return (_jsx(Link, { href: `/activities/${similarActivity.slug}`, className: "group block", children: _jsxs(GlassmorphismCard, { className: "group overflow-hidden p-0 transition-all duration-300 hover:bg-white/15", children: [_jsxs("div", { className: "relative h-48 overflow-hidden", children: [_jsx(Image, { src: primaryImage?.imageUrl ||
                                        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center&q=85", alt: primaryImage?.altText || similarActivity.title, fill: true, className: "object-cover transition-transform duration-300 group-hover:scale-110" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" }), _jsx("div", { className: "absolute left-3 top-3", children: _jsx(Badge, { className: "border-white/30 bg-white/20 text-white backdrop-blur-sm", children: similarActivity.category
                                            .replace("_", " ")
                                            .replace(/\b\w/g, l => l.toUpperCase()) }) }), similarActivity.featured && (_jsx("div", { className: "absolute right-3 top-3", children: _jsx(Badge, { className: "bg-gradient-to-r from-yellow-400 to-amber-500 font-bold text-black", children: "Featured" }) })), _jsx(Button, { size: "icon", className: "absolute bottom-3 right-3 border-white/30 bg-black/40 backdrop-blur-sm hover:bg-black/60", onClick: e => {
                                        e.preventDefault();
                                        // Handle wishlist toggle
                                    }, children: _jsx(Heart, { className: "size-4 text-white" }) })] }), _jsxs("div", { className: "space-y-3 p-4", children: [_jsx("h3", { className: "line-clamp-2 font-semibold leading-tight text-white transition-colors group-hover:text-yellow-400", children: similarActivity.title }), _jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-white/70", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(MapPin, { className: "size-3" }), _jsx("span", { children: similarActivity.location })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "size-3" }), _jsxs("span", { children: [Math.floor(similarActivity.durationMinutes / 60), "h"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "size-3" }), _jsxs("span", { children: ["Max ", similarActivity.maxParticipants] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "size-4 fill-yellow-400 text-yellow-400" }), _jsx("span", { className: "font-medium text-white", children: similarActivity.avgRating }), _jsxs("span", { className: "text-sm text-white/60", children: ["(", similarActivity.totalReviews, ")"] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("span", { className: "text-lg font-bold text-yellow-400", children: ["\u20AC", price] }), _jsx("span", { className: "ml-1 text-sm text-white/60", children: "per person" })] })] }), _jsx("p", { className: "line-clamp-2 text-sm leading-relaxed text-white/70", children: similarActivity.shortDescription }), _jsx("div", { className: "pt-2", children: _jsx(Button, { className: "w-full border border-yellow-400/30 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 text-white transition-all hover:from-yellow-400/30 hover:to-amber-500/30", children: "View Details" }) })] })] }) }, similarActivity.id));
        }) }));
}
//# sourceMappingURL=component.js.map