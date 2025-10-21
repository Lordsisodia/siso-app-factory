import React from 'react';
export interface ReviewFormProps {
    productName?: string;
    onSubmit: (rating: number, comment?: string) => Promise<void>;
    onCancel?: () => void;
    submitButtonText?: string;
    cancelButtonText?: string;
    title?: string;
    isSubmitting?: boolean;
}
export declare const ReviewForm: React.FC<ReviewFormProps>;
export default ReviewForm;
//# sourceMappingURL=component.d.ts.map