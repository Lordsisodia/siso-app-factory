"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/*
<ai_context>
Enhanced Reviews Section - Real-time data from Supabase with authentication
Comprehensive review display with rating distribution, sorting options, and authenticated review submission.
Now connected to Clerk authentication and booking verification.
</ai_context>
*/
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, ThumbsUp, Filter, MessageSquare, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { getActivityReviewsAction, getActivityReviewStatsAction, updateReviewHelpfulVotesAction } from "@/actions/db/reviews-actions";
import ReviewSubmissionModal from "./review-submission-modal";
export default function EnhancedReviewsSection({ activityId, userId, userProfile, userBookingInfo, activityTitle }) {
    const [reviews, setReviews] = useState([]);
    const [reviewStats, setReviewStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [sortBy, setSortBy] = useState("newest");
    const [filterBy, setFilterBy] = useState("all");
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    // Load reviews and stats
    const loadReviews = async () => {
        setIsLoading(true);
        try {
            console.log("Loading reviews for activity:", activityId);
            const [reviewsResult, statsResult] = await Promise.all([
                getActivityReviewsAction(activityId, sortBy, showAllReviews ? 50 : 6, 0),
                getActivityReviewStatsAction(activityId)
            ]);
            console.log("Reviews result:", reviewsResult);
            console.log("Stats result:", statsResult);
            if (reviewsResult.isSuccess && reviewsResult.data) {
                // Transform database reviews to match our interface
                const transformedReviews = reviewsResult.data.reviews.map((review) => ({
                    id: review.id,
                    customerId: review.customerId,
                    customerName: review.reviewerName || "Anonymous User",
                    customerAvatar: review.customerAvatar,
                    rating: review.rating,
                    title: review.title,
                    content: review.content,
                    pros: review.pros,
                    cons: review.cons,
                    wouldRecommend: review.wouldRecommend || false,
                    isVerified: review.isVerified || false,
                    helpfulVotes: review.helpfulVotes || 0,
                    photoUrls: review.photoUrls || [],
                    createdAt: review.createdAt?.toString() || new Date().toISOString(),
                    operatorResponse: review.operatorResponse,
                    operatorResponseDate: review.operatorResponseDate?.toString()
                }));
                console.log("Transformed reviews:", transformedReviews);
                setReviews(transformedReviews);
            }
            if (statsResult.isSuccess && statsResult.data) {
                // Transform stats to match our interface
                const transformedStats = {
                    averageRating: statsResult.data.avgRating || 0,
                    totalReviews: statsResult.data.totalReviews || 0,
                    ratingDistribution: statsResult.data.ratingDistribution?.map((item) => ({
                        rating: item.stars,
                        count: item.count,
                        percentage: item.percentage
                    })) || [],
                    recentTrend: "stable",
                    verifiedPercentage: statsResult.data.recommendationPercentage || 0
                };
                console.log("Transformed stats:", transformedStats);
                setReviewStats(transformedStats);
            }
        }
        catch (error) {
            console.error("Error loading reviews:", error);
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        loadReviews();
    }, [activityId, sortBy, showAllReviews]);
    const handleHelpfulVote = async (reviewId) => {
        try {
            const result = await updateReviewHelpfulVotesAction(reviewId, true);
            if (result.isSuccess) {
                // Update the local state
                setReviews(prev => prev.map(review => review.id === reviewId
                    ? { ...review, helpfulVotes: (review.helpfulVotes || 0) + 1 }
                    : review));
            }
        }
        catch (error) {
            console.error("Error updating helpful vote:", error);
        }
    };
    const renderStars = (rating, size = "sm") => {
        const sizeClasses = {
            sm: "size-4",
            md: "size-5",
            lg: "size-6"
        };
        return (_jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map(star => (_jsx(Star, { className: cn(sizeClasses[size], star <= rating ? "fill-current text-yellow-500" : "text-gray-400") }, star))) }));
    };
    // Use real data if available, fallback to activity data
    const rating = reviewStats?.averageRating || parseFloat(userProfile?.avgRating || "0");
    const reviewCount = reviews.length ||
        reviewStats?.totalReviews ||
        userProfile?.totalReviews ||
        0;
    if (isLoading) {
        return (_jsx("div", { className: "space-y-8", children: _jsxs("div", { className: "animate-pulse", children: [_jsx("div", { className: "mb-6 h-8 w-48 rounded bg-gray-700" }), _jsxs("div", { className: "grid gap-8 md:grid-cols-2", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "h-16 rounded bg-gray-700" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-4 rounded bg-gray-700" }), _jsx("div", { className: "h-4 rounded bg-gray-700" })] })] }), _jsx("div", { className: "space-y-3", children: [1, 2, 3, 4, 5].map(i => (_jsx("div", { className: "h-4 rounded bg-gray-700" }, i))) })] })] }) }));
    }
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-2xl font-bold text-white", children: "Reviews & Ratings" }), userId && userBookingInfo && (_jsxs(Button, { onClick: () => setIsReviewModalOpen(true), className: "bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600", children: [_jsx(LogIn, { className: "mr-2 size-4" }), "Write Review"] }))] }), reviewCount === 0 ? (_jsxs("div", { className: "py-12 text-center", children: [_jsx(MessageSquare, { className: "mx-auto mb-4 size-12 text-gray-500" }), _jsx("h3", { className: "mb-2 text-lg font-semibold text-white", children: "No reviews yet" }), _jsx("p", { className: "mb-6 text-gray-400", children: "Be the first to share your experience with this activity!" }), userId && userBookingInfo && (_jsxs(Button, { onClick: () => setIsReviewModalOpen(true), className: "bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600", children: [_jsx(LogIn, { className: "mr-2 size-4" }), "Write First Review"] }))] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid gap-8 md:grid-cols-2", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "flex items-center gap-4", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-4xl font-bold text-white", children: rating.toFixed(1) }), renderStars(Math.round(rating), "lg"), _jsxs("p", { className: "mt-1 text-sm text-gray-400", children: [reviewCount, " ", reviewCount === 1 ? "review" : "reviews"] })] }) }), _jsx("div", { className: "space-y-2", children: reviewStats && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-300", children: [_jsx("span", { className: "text-green-400", children: "\u2713" }), _jsxs("span", { children: [reviewStats.verifiedPercentage, "% verified reviews"] })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-300", children: [_jsx("span", { className: "text-green-400", children: "\u2713" }), _jsxs("span", { children: [reviewStats.ratingDistribution
                                                                            .filter(item => item.rating >= 4)
                                                                            .reduce((sum, item) => sum + item.percentage, 0), "% rated 4 stars or higher"] })] })] })) })] }), reviewStats && (_jsx("div", { className: "space-y-3", children: reviewStats.ratingDistribution.map(item => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex w-12 items-center gap-1 text-sm text-gray-300", children: [_jsx("span", { children: item.rating }), _jsx(Star, { className: "size-3 fill-current text-yellow-500" })] }), _jsx("div", { className: "h-2 flex-1 rounded-full bg-gray-700", children: _jsx("div", { className: "h-2 rounded-full bg-yellow-500 transition-all duration-500", style: { width: `${item.percentage}%` } }) }), _jsx("span", { className: "w-8 text-sm text-gray-400", children: item.count })] }, item.rating))) }))] }), _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 border-t border-gray-700 pt-6", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: [_jsx(Filter, { className: "mr-2 size-4" }), "All Ratings"] }), _jsx(Button, { variant: "outline", size: "sm", className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: "Verified Only" })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-400", children: [_jsx("span", { children: "Sort by:" }), _jsxs("select", { className: "rounded border border-gray-600 bg-gray-800 px-2 py-1 text-gray-300", value: sortBy, onChange: e => setSortBy(e.target.value), children: [_jsx("option", { value: "newest", children: "Most Recent" }), _jsx("option", { value: "oldest", children: "Oldest First" }), _jsx("option", { value: "highest", children: "Highest Rated" }), _jsx("option", { value: "lowest", children: "Lowest Rated" }), _jsx("option", { value: "helpful", children: "Most Helpful" })] })] })] }), _jsx("div", { className: "space-y-6", children: reviews.map(review => (_jsxs("div", { className: "rounded-lg border border-gray-700 bg-gray-800 p-6", children: [_jsx("div", { className: "mb-4 flex items-start justify-between", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx(Avatar, { className: "size-12", children: _jsx(AvatarFallback, { className: "bg-gray-600 text-white", children: review.customerName
                                                                ? `${review.customerName[0]}${review.customerAvatar?.[0] || ""}`
                                                                : "U" }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h4", { className: "font-semibold text-white", children: review.customerName
                                                                            ? `${review.customerName} ${review.customerAvatar || ""}`.trim()
                                                                            : "Anonymous User" }), review.isVerified && (_jsx(Badge, { variant: "secondary", className: "bg-green-600 text-white", children: "Verified" }))] }), _jsxs("div", { className: "mt-1 flex items-center gap-2", children: [renderStars(review.rating), _jsx("span", { className: "text-sm text-gray-400", children: new Date(review.createdAt).toLocaleDateString() })] })] })] }) }), _jsxs("div", { className: "space-y-2", children: [review.title && (_jsx("h5", { className: "font-medium text-white", children: review.title })), review.content && (_jsx("p", { className: "leading-relaxed text-gray-300", children: review.content })), (review.pros || review.cons) && (_jsxs("div", { className: "mt-4 grid gap-4 md:grid-cols-2", children: [review.pros && (_jsxs("div", { className: "rounded-lg border border-green-700 bg-green-900/20 p-3", children: [_jsx("h6", { className: "mb-1 font-medium text-green-400", children: "What they loved:" }), _jsx("p", { className: "text-sm text-gray-300", children: review.pros })] })), review.cons && (_jsxs("div", { className: "rounded-lg border border-amber-700 bg-amber-900/20 p-3", children: [_jsx("h6", { className: "mb-1 font-medium text-amber-400", children: "Could be improved:" }), _jsx("p", { className: "text-sm text-gray-300", children: review.cons })] }))] })), review.wouldRecommend !== null && (_jsx("div", { className: "mt-3 flex items-center gap-2", children: _jsx("span", { className: cn("text-sm font-medium", review.wouldRecommend
                                                            ? "text-green-400"
                                                            : "text-red-400"), children: review.wouldRecommend
                                                            ? "✓ Recommends this activity"
                                                            : "✗ Doesn't recommend this activity" }) }))] }), _jsxs("div", { className: "mt-4 flex items-center justify-between border-t border-gray-700 pt-4", children: [_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => handleHelpfulVote(review.id), className: "text-gray-400 hover:text-white", children: [_jsx(ThumbsUp, { className: "mr-2 size-4" }), "Helpful (", review.helpfulVotes || 0, ")"] }), review.operatorResponse && (_jsx("div", { className: "ml-4 flex-1", children: _jsxs("div", { className: "rounded-lg border border-blue-700 bg-blue-900/20 p-3", children: [_jsx("h6", { className: "mb-1 font-medium text-blue-400", children: "Operator Response:" }), _jsx("p", { className: "text-sm text-gray-300", children: review.operatorResponse }), review.operatorResponseDate && (_jsx("p", { className: "mt-1 text-xs text-gray-500", children: new Date(review.operatorResponseDate).toLocaleDateString() }))] }) }))] })] }, review.id))) }), !showAllReviews && reviews.length >= 6 && (_jsx("div", { className: "text-center", children: _jsx(Button, { variant: "outline", onClick: () => setShowAllReviews(true), className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: "Show All Reviews" }) }))] }))] }), _jsx(ReviewSubmissionModal, { isOpen: isReviewModalOpen, onClose: () => setIsReviewModalOpen(false), activityId: activityId, activityTitle: activityTitle || "Activity", bookingId: userBookingInfo?.eligibleBookingId, userId: userId || undefined, onReviewSubmitted: loadReviews })] }));
}
//# sourceMappingURL=component.js.map