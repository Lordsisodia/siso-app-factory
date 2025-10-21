"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
<ai_context>
Reviews section component for activity detail pages.
Shows overall rating, rating distribution, and individual customer reviews.
Provides social proof to boost conversion rates.
Now connected to activities database.
</ai_context>
*/
import { useState } from "react";
import { Star, ThumbsUp, MoreHorizontal, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
// Mock reviews data (will be replaced with database query)
const mockReviews = [
    {
        id: "1",
        author: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612c6cd?q=80&w=150&auto=format&fit=crop",
        rating: 5,
        date: "2025-01-20",
        title: "Absolutely incredible experience!",
        content: "This activity was the highlight of our Mallorca trip! The instructor was professional and made us feel safe while having the time of our lives. The views were breathtaking, and we even spotted some dolphins! Highly recommend for anyone visiting the island.",
        helpful: 12,
        verified: true
    },
    {
        id: "2",
        author: "Marcus Weber",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        rating: 5,
        date: "2025-01-18",
        title: "Perfect for beginners",
        content: "Never done this before, but the team made it so easy and fun! Great safety briefing and constant support. The experience was amazing - perfect photo opportunities!",
        helpful: 8,
        verified: true
    },
    {
        id: "3",
        author: "Emma Thompson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
        rating: 4,
        date: "2025-01-15",
        title: "Great fun, slightly overpriced",
        content: "Really enjoyed the experience and the guide was fantastic. Beautiful location and well-organized. Only downside is it felt a bit pricey for the duration, but overall worth it for the memories!",
        helpful: 5,
        verified: true
    },
    {
        id: "4",
        author: "David Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
        rating: 5,
        date: "2025-01-12",
        title: "Adventure of a lifetime!",
        content: "Booked this for my wife's birthday and it exceeded all expectations. Professional equipment, stunning scenery, and an unforgettable experience. The photos were a nice touch too!",
        helpful: 15,
        verified: true
    }
];
const ratingDistribution = [
    { stars: 5, percentage: 78, count: 183 },
    { stars: 4, percentage: 15, count: 35 },
    { stars: 3, percentage: 4, count: 10 },
    { stars: 2, percentage: 2, count: 4 },
    { stars: 1, percentage: 1, count: 2 }
];
export default function ReviewsSection({ activity }) {
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [sortBy, setSortBy] = useState("newest");
    const [filterBy, setFilterBy] = useState("all");
    // Extract rating data from activity
    const rating = parseFloat(activity.avgRating || "4.5");
    const reviewCount = activity.totalReviews;
    const displayedReviews = showAllReviews
        ? mockReviews
        : mockReviews.slice(0, 3);
    const renderStars = (rating, size = "sm") => {
        const sizeClasses = {
            sm: "size-4",
            md: "size-5",
            lg: "size-6"
        };
        return (_jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map(star => (_jsx(Star, { className: cn(sizeClasses[size], star <= rating ? "fill-current text-yellow-500" : "text-gray-400") }, star))) }));
    };
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "space-y-6", children: [_jsx("h2", { className: "text-2xl font-bold text-white", children: "Reviews & Ratings" }), _jsxs("div", { className: "grid gap-8 md:grid-cols-2", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "flex items-center gap-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-4xl font-bold text-white", children: rating }), renderStars(rating, "lg"), _jsxs("p", { className: "mt-1 text-sm text-gray-400", children: [reviewCount, " reviews"] })] }) }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-300", children: [_jsx("span", { className: "text-green-400", children: "\u2713" }), _jsx("span", { children: "98% would recommend this activity" })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-300", children: [_jsx("span", { className: "text-green-400", children: "\u2713" }), _jsx("span", { children: "95% rated 4 stars or higher" })] })] })] }), _jsx("div", { className: "space-y-3", children: ratingDistribution.map(item => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex w-12 items-center gap-1 text-sm text-gray-300", children: [_jsx("span", { children: item.stars }), _jsx(Star, { className: "size-3 fill-current text-yellow-500" })] }), _jsx("div", { className: "h-2 flex-1 rounded-full bg-gray-700", children: _jsx("div", { className: "h-2 rounded-full bg-yellow-500 transition-all duration-500", style: { width: `${item.percentage}%` } }) }), _jsx("span", { className: "w-8 text-sm text-gray-400", children: item.count })] }, item.stars))) })] })] }), _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 border-t border-gray-700 pt-6", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: [_jsx(Filter, { className: "mr-2 size-4" }), "All Ratings"] }), _jsx(Button, { variant: "outline", size: "sm", className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: "Verified Only" })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-400", children: [_jsx("span", { children: "Sort by:" }), _jsxs("select", { className: "rounded border border-gray-600 bg-gray-800 px-2 py-1 text-gray-300", value: sortBy, onChange: e => setSortBy(e.target.value), children: [_jsx("option", { value: "newest", children: "Most Recent" }), _jsx("option", { value: "oldest", children: "Oldest First" }), _jsx("option", { value: "highest", children: "Highest Rated" }), _jsx("option", { value: "lowest", children: "Lowest Rated" }), _jsx("option", { value: "helpful", children: "Most Helpful" })] })] })] }), _jsx("div", { className: "space-y-6", children: displayedReviews.map(review => (_jsxs("div", { className: "rounded-lg border border-gray-700 bg-gray-800 p-6", children: [_jsxs("div", { className: "mb-4 flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsxs(Avatar, { className: "size-12", children: [_jsx(AvatarImage, { src: review.avatar, alt: review.author }), _jsx(AvatarFallback, { className: "bg-gray-600 text-white", children: review.author
                                                        .split(" ")
                                                        .map(n => n[0])
                                                        .join("") })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h4", { className: "font-semibold text-white", children: review.author }), review.verified && (_jsx(Badge, { variant: "secondary", className: "bg-green-600 text-white", children: "Verified" }))] }), _jsxs("div", { className: "mt-1 flex items-center gap-2", children: [renderStars(review.rating), _jsx("span", { className: "text-sm text-gray-400", children: new Date(review.date).toLocaleDateString() })] })] })] }), _jsx(Button, { variant: "ghost", size: "icon", className: "text-gray-400 hover:text-white", children: _jsx(MoreHorizontal, { className: "size-4" }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h5", { className: "font-medium text-white", children: review.title }), _jsx("p", { className: "leading-relaxed text-gray-300", children: review.content })] }), _jsxs("div", { className: "mt-4 flex items-center justify-between border-t border-gray-700 pt-4", children: [_jsxs(Button, { variant: "ghost", size: "sm", className: "text-gray-400 hover:text-white", children: [_jsx(ThumbsUp, { className: "mr-2 size-4" }), "Helpful (", review.helpful, ")"] }), _jsx(Button, { variant: "ghost", size: "sm", className: "text-gray-400 hover:text-white", children: "Reply" })] })] }, review.id))) }), !showAllReviews && mockReviews.length > 3 && (_jsx("div", { className: "text-center", children: _jsxs(Button, { variant: "outline", onClick: () => setShowAllReviews(true), className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: ["Show All ", mockReviews.length, " Reviews"] }) }))] }));
}
//# sourceMappingURL=component.js.map