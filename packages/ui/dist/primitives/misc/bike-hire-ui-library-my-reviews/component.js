import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ReviewForm } from '../ReviewForm';
import { Plus } from 'lucide-react';
export const MyReviews = ({ fetchEligibleBookings, onReviewSubmit, onReviewSuccess, className = '' }) => {
    const [eligibleBookings, setEligibleBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const fetchBookings = async () => {
        try {
            setLoading(true);
            const bookings = await fetchEligibleBookings();
            setEligibleBookings(bookings);
        }
        catch (error) {
            console.error('Error fetching eligible bookings:', error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchBookings();
    }, []);
    const handleReviewSuccess = () => {
        setSelectedBooking(null);
        fetchBookings();
        if (onReviewSuccess) {
            onReviewSuccess();
        }
    };
    return (_jsx("div", { className: `space-y-6 ${className}`, children: selectedBooking ? (_jsx(ReviewForm, { productName: selectedBooking.productName, onSubmit: async (rating, comment) => {
                await onReviewSubmit(selectedBooking.id, selectedBooking.productId, rating, comment);
                handleReviewSuccess();
            }, onCancel: () => setSelectedBooking(null) })) : (_jsxs(_Fragment, { children: [_jsx("h2", { className: "text-2xl font-semibold", children: "My Reviews" }), loading ? (_jsx("div", { className: "animate-pulse space-y-4", children: [1, 2].map((i) => (_jsx("div", { className: "bg-muted h-24 rounded-lg" }, i))) })) : eligibleBookings.length > 0 ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("p", { className: "text-muted-foreground", children: ["You have ", eligibleBookings.length, " ", eligibleBookings.length === 1 ? 'booking' : 'bookings', " eligible for review."] }), eligibleBookings.map(booking => (_jsxs(Card, { className: "overflow-hidden", children: [_jsx(CardHeader, { className: "p-0", children: _jsxs("div", { className: "flex items-center", children: [booking.productImage && (_jsx("img", { src: booking.productImage, alt: booking.productName, className: "h-24 w-24 object-cover" })), _jsxs("div", { className: "p-4", children: [_jsx(CardTitle, { className: "text-base", children: booking.productName }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [new Date(booking.startDate).toLocaleDateString(), " - ", new Date(booking.endDate).toLocaleDateString()] })] })] }) }), _jsx(CardContent, { className: "p-4 pt-0 flex justify-end", children: _jsxs(Button, { size: "sm", variant: "outline", onClick: () => setSelectedBooking(booking), children: [_jsx(Plus, { className: "h-4 w-4 mr-1" }), " Add Review"] }) })] }, booking.id)))] })) : (_jsxs("div", { className: "bg-muted/30 p-8 rounded-lg text-center", children: [_jsx("h3", { className: "text-lg font-medium mb-1", children: "No bookings to review" }), _jsx("p", { className: "text-muted-foreground", children: "You don't have any completed bookings that need reviews." })] }))] })) }));
};
export default MyReviews;
//# sourceMappingURL=component.js.map