import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { ReviewCard } from '../ReviewCard';
import { ReviewStars } from '../ReviewStars';
import { Separator } from '@/components/ui/separator';
import { MessageSquare } from 'lucide-react';
export const ReviewsList = ({ productId, fetchReviews, fetchAverageRating, emptyMessage = "This product doesn't have any reviews yet.", className = '' }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [average, setAverage] = useState(0);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const loadReviews = async () => {
            try {
                setLoading(true);
                const reviewsData = await fetchReviews(productId);
                setReviews(reviewsData);
                if (fetchAverageRating) {
                    const ratingData = await fetchAverageRating(productId);
                    setAverage(ratingData.average);
                    setCount(ratingData.count);
                }
                else {
                    // Calculate from reviews if no fetch function provided
                    const avg = reviewsData.length > 0
                        ? reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length
                        : 0;
                    setAverage(avg);
                    setCount(reviewsData.length);
                }
            }
            catch (error) {
                console.error('Error loading reviews:', error);
            }
            finally {
                setLoading(false);
            }
        };
        if (productId) {
            loadReviews();
        }
    }, [productId, fetchReviews, fetchAverageRating]);
    return (_jsxs("div", { className: `space-y-6 ${className}`, children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-semibold mb-2", children: "Customer Reviews" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "flex items-center", children: [_jsx("span", { className: "text-3xl font-bold mr-2", children: average.toFixed(1) }), _jsx(ReviewStars, { rating: average, size: "lg" })] }), _jsx(Separator, { orientation: "vertical", className: "h-8" }), _jsxs("div", { className: "text-muted-foreground", children: [count, " ", count === 1 ? 'review' : 'reviews'] })] })] }), loading ? (_jsx("div", { className: "flex justify-center py-8", children: _jsx("div", { className: "animate-pulse h-32 w-full max-w-lg bg-muted rounded-md" }) })) : reviews.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: reviews.map((review) => (_jsx(ReviewCard, { review: review }, review.id))) })) : (_jsxs("div", { className: "text-center py-12 bg-muted/30 rounded-lg", children: [_jsx(MessageSquare, { className: "mx-auto h-12 w-12 text-muted-foreground/70 mb-4" }), _jsx("h3", { className: "text-lg font-medium mb-1", children: "No reviews yet" }), _jsx("p", { className: "text-muted-foreground", children: emptyMessage })] }))] }));
};
export default ReviewsList;
//# sourceMappingURL=component.js.map