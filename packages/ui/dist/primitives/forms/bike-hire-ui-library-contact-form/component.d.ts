import React from 'react';
export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}
export interface ContactFormProps {
    onSubmit: (data: ContactFormData) => Promise<void>;
    submitButtonText?: string;
    isSubmitting?: boolean;
    showPhone?: boolean;
    showSubject?: boolean;
    className?: string;
}
export declare const ContactForm: React.FC<ContactFormProps>;
export default ContactForm;
//# sourceMappingURL=component.d.ts.map