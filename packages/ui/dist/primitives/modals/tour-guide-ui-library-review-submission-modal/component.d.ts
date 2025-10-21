interface ReviewSubmissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    activityId: string;
    activityTitle: string;
    bookingId?: string;
    userId?: string;
    onReviewSubmitted?: () => void;
}
export default function ReviewSubmissionModal({ isOpen, onClose, activityId, activityTitle, bookingId, userId, onReviewSubmitted }: ReviewSubmissionModalProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map