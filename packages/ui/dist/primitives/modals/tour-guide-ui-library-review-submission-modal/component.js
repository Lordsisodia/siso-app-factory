"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Star, ThumbsUp, ThumbsDown, User, LogIn, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { createReviewAction } from "@/actions/db/reviews-actions";
export default function ReviewSubmissionModal({ isOpen, onClose, activityId, activityTitle, bookingId, userId, onReviewSubmitted }) {
    const [step, setStep] = useState("rating");
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Review data state
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState("");
    const [comment, setComment] = useState("");
    const [pros, setPros] = useState("");
    const [cons, setCons] = useState("");
    const [wouldRecommend, setWouldRecommend] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [photoUrls, setPhotoUrls] = useState([]);
    // Validation state
    const [currentStep, setCurrentStep] = useState(1);
    const [validationErrors, setValidationErrors] = useState({});
    // Check authentication and booking eligibility
    useEffect(() => {
        if (!userId) {
            setCurrentStep(1); // Force login step
            setValidationErrors({ auth: "Please log in to submit a review" });
        }
        else if (!bookingId) {
            setValidationErrors({
                booking: "You must have completed this activity to leave a review"
            });
        }
        else {
            // User is authenticated and has booking, allow review
            setValidationErrors({});
        }
    }, [userId, bookingId]);
    const validateCurrentStep = () => {
        const errors = {};
        if (currentStep === 1 && !userId) {
            errors.auth = "Please log in to continue";
            setValidationErrors(errors);
            return false;
        }
        if (currentStep === 1 && !bookingId) {
            errors.booking =
                "You must have booked and completed this activity to leave a review";
            setValidationErrors(errors);
            return false;
        }
        if (currentStep === 2) {
            if (rating === 0) {
                errors.rating = "Please select a rating";
            }
        }
        if (currentStep === 3) {
            if (!comment.trim()) {
                errors.reviewText = "Please write your review";
            }
            if (!title.trim()) {
                errors.reviewTitle = "Please add a title for your review";
            }
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const resetForm = () => {
        setStep("rating");
        setRating(0);
        setHoverRating(0);
        setTitle("");
        setComment("");
        setPros("");
        setCons("");
        setWouldRecommend(null);
        setPhotos([]);
        setPhotoUrls([]);
        setIsSubmitting(false);
    };
    const handleClose = () => {
        resetForm();
        onClose();
    };
    const handleSubmit = async () => {
        if (!bookingId || !userId) {
            alert("You must be logged in and have a booking to leave a review");
            return;
        }
        if (rating === 0) {
            alert("Please select a rating");
            return;
        }
        if (comment.trim().length < 10) {
            alert("Please write at least 10 characters in your review");
            return;
        }
        setIsSubmitting(true);
        try {
            const reviewData = {
                bookingId,
                customerId: userId,
                activityId,
                rating,
                title: title.trim() || null,
                content: comment.trim(),
                reviewerName: "Anonymous User",
                reviewerEmail: "user@example.com",
                pros: pros.trim() || null,
                cons: cons.trim() || null,
                wouldRecommend: wouldRecommend ?? true,
                photoUrls: [],
                isVerified: true,
                isPublished: true,
                helpfulVotes: 0
            };
            const result = await createReviewAction(reviewData);
            if (result.isSuccess) {
                alert("Review submitted successfully!");
                onReviewSubmitted?.();
                handleClose();
            }
            else {
                alert(result.message);
            }
        }
        catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to submit review");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const renderStepContent = () => {
        switch (step) {
            case "rating":
                return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("h3", { className: "mb-2 text-lg font-semibold text-white", children: "How would you rate this experience?" }), _jsxs("p", { className: "mb-6 text-gray-400", children: ["Tap the stars to rate ", activityTitle] }), _jsx("div", { className: "mb-6 flex justify-center gap-2", children: [1, 2, 3, 4, 5].map(star => (_jsx("button", { onClick: () => setRating(star), onMouseEnter: () => setHoverRating(star), onMouseLeave: () => setHoverRating(0), className: "p-1 transition-transform hover:scale-110", children: _jsx(Star, { className: cn("size-10", star <= (hoverRating || rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-500") }) }, star))) }), rating > 0 && (_jsx("div", { className: "text-center", children: _jsxs("p", { className: "font-medium text-yellow-400", children: [rating === 1 && "Poor", rating === 2 && "Fair", rating === 3 && "Good", rating === 4 && "Very Good", rating === 5 && "Excellent"] }) }))] }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { onClick: () => setStep("details"), disabled: rating === 0, className: "bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600", children: "Continue" }) })] }));
            case "details":
                return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "title", className: "text-white", children: "Review Title (Optional)" }), _jsx(Input, { id: "title", value: title, onChange: e => setTitle(e.target.value), placeholder: "Summarize your experience...", className: "mt-2 border-gray-600 bg-gray-800 text-white", maxLength: 100 })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "comment", className: "text-white", children: "Tell us about your experience *" }), _jsx(Textarea, { id: "comment", value: comment, onChange: e => setComment(e.target.value), placeholder: "Share details about your experience, what you enjoyed, and any suggestions for future travelers...", className: "mt-2 min-h-[120px] border-gray-600 bg-gray-800 text-white", maxLength: 1000 }), _jsxs("div", { className: "mt-1 text-right text-sm text-gray-400", children: [comment.length, "/1000 characters"] })] }), _jsxs("div", { children: [_jsx(Label, { className: "mb-3 block text-white", children: "Would you recommend this to a friend?" }), _jsxs("div", { className: "flex gap-4", children: [_jsxs(Button, { variant: wouldRecommend === true ? "default" : "outline", onClick: () => setWouldRecommend(true), className: cn("flex-1", wouldRecommend === true
                                                ? "bg-green-600 hover:bg-green-700"
                                                : "border-gray-600 text-gray-300 hover:bg-gray-700"), children: [_jsx(ThumbsUp, { className: "mr-2 size-4" }), "Yes, definitely!"] }), _jsxs(Button, { variant: wouldRecommend === false ? "default" : "outline", onClick: () => setWouldRecommend(false), className: cn("flex-1", wouldRecommend === false
                                                ? "bg-red-600 hover:bg-red-700"
                                                : "border-gray-600 text-gray-300 hover:bg-gray-700"), children: [_jsx(ThumbsDown, { className: "mr-2 size-4" }), "Not really"] })] })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx(Button, { variant: "outline", onClick: () => setStep("rating"), className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: "Back" }), _jsx(Button, { onClick: handleSubmit, disabled: comment.trim().length < 10 || isSubmitting, className: "bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600", children: isSubmitting ? "Submitting..." : "Submit Review" })] })] }));
            default:
                return null;
        }
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: handleClose, children: _jsxs(DialogContent, { className: "border-gray-700 bg-gray-900 text-white sm:max-w-[500px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "text-2xl font-bold text-white", children: !userId
                                ? "Sign In Required"
                                : !bookingId
                                    ? "Booking Required"
                                    : `Share Your Experience` }), _jsx(DialogDescription, { className: "text-gray-300", children: !userId
                                ? "Please sign in to leave a review for this activity"
                                : !bookingId
                                    ? "You must have booked and completed this activity to leave a review"
                                    : `Help others discover ${activityTitle}` })] }), !userId && (_jsx("div", { className: "space-y-6 py-6", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-red-500/20", children: _jsx(User, { className: "size-8 text-red-400" }) }), _jsx("h3", { className: "mb-2 text-lg font-semibold text-white", children: "Sign In Required" }), _jsx("p", { className: "mb-6 text-gray-300", children: "Please sign in to your account to share your experience with this activity." }), _jsxs("div", { className: "space-y-3", children: [_jsxs(Button, { className: "w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700", onClick: () => (window.location.href = "/login"), children: [_jsx(LogIn, { className: "mr-2 size-4" }), "Sign In"] }), _jsx(Button, { variant: "outline", className: "w-full border-gray-600 bg-gray-700 text-white hover:bg-gray-600", onClick: onClose, children: "Cancel" })] })] }) })), userId && !bookingId && (_jsx("div", { className: "space-y-6 py-6", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-orange-500/20", children: _jsx(Calendar, { className: "size-8 text-orange-400" }) }), _jsx("h3", { className: "mb-2 text-lg font-semibold text-white", children: "Booking Required" }), _jsx("p", { className: "mb-6 text-gray-300", children: "You must have booked and completed this activity to leave a review. This helps ensure authentic feedback." }), _jsxs("div", { className: "space-y-3", children: [_jsxs(Button, { className: "w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700", onClick: () => (window.location.href = `/book/${activityId}`), children: [_jsx(Calendar, { className: "mr-2 size-4" }), "Book This Activity"] }), _jsx(Button, { variant: "outline", className: "w-full border-gray-600 bg-gray-700 text-white hover:bg-gray-600", onClick: onClose, children: "Cancel" })] })] }) })), userId && bookingId && renderStepContent(), _jsx("div", { className: "mt-6 flex justify-center gap-2", children: ["rating", "details"].map((stepName, index) => (_jsx("div", { className: cn("size-2 rounded-full transition-colors", stepName === step
                            ? "bg-rose-500"
                            : ["rating", "details"].indexOf(step) > index
                                ? "bg-rose-300"
                                : "bg-gray-600") }, stepName))) })] }) }));
}
//# sourceMappingURL=component.js.map