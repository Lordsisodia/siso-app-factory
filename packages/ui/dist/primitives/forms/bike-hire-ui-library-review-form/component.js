import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
export const ReviewForm = ({ productName, onSubmit, onCancel, submitButtonText = 'Submit Review', cancelButtonText = 'Cancel', title, isSubmitting: externalSubmitting }) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState('');
    const [internalSubmitting, setInternalSubmitting] = useState(false);
    const submitting = externalSubmitting ?? internalSubmitting;
    const getRatingLabel = (value) => {
        if (value === 0)
            return 'Click to rate';
        if (value === 1)
            return 'Poor';
        if (value === 2)
            return 'Fair';
        if (value === 3)
            return 'Good';
        if (value === 4)
            return 'Very good';
        return 'Excellent';
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            return;
        }
        try {
            setInternalSubmitting(true);
            await onSubmit(rating, comment.trim() || undefined);
            // Reset form
            setRating(0);
            setComment('');
        }
        catch (error) {
            console.error('Error submitting review:', error);
        }
        finally {
            setInternalSubmitting(false);
        }
    };
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-xl", children: title || `Review ${productName ? `your experience with ${productName}` : 'this product'}` }) }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Rating *" }), _jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((value) => (_jsx("button", { type: "button", onClick: () => setRating(value), onMouseEnter: () => setHoveredRating(value), onMouseLeave: () => setHoveredRating(0), className: "p-1 focus:outline-none focus:ring-2 focus:ring-primary rounded", disabled: submitting, children: _jsx(Star, { className: `w-8 h-8 ${(hoveredRating ? value <= hoveredRating : value <= rating)
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : 'text-gray-300'} transition-colors` }) }, value))) }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: getRatingLabel(hoveredRating || rating) }), rating === 0 && (_jsx("p", { className: "text-xs text-destructive", children: "Please select a rating" }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "comment", className: "text-sm font-medium", children: "Comments (optional)" }), _jsx(Textarea, { id: "comment", placeholder: "Share your experience...", value: comment, onChange: (e) => setComment(e.target.value), rows: 4, className: "resize-none", disabled: submitting })] })] }), _jsxs(CardFooter, { className: "flex justify-between", children: [onCancel && (_jsx(Button, { type: "button", variant: "outline", onClick: onCancel, disabled: submitting, children: cancelButtonText })), _jsx(Button, { type: "submit", disabled: submitting || rating === 0, className: !onCancel ? 'ml-auto' : '', children: submitting ? 'Submitting...' : submitButtonText })] })] })] }));
};
export default ReviewForm;
//# sourceMappingURL=component.js.map