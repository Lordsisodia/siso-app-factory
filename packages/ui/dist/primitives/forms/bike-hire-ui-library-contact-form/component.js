import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
export const ContactForm = ({ onSubmit, submitButtonText = 'Send Message', isSubmitting: externalSubmitting, showPhone = true, showSubject = true, className = '' }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [internalSubmitting, setInternalSubmitting] = useState(false);
    const submitting = externalSubmitting ?? internalSubmitting;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setInternalSubmitting(true);
        try {
            await onSubmit(formData);
            // Reset form on success
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        }
        catch (error) {
            console.error('Error submitting contact form:', error);
        }
        finally {
            setInternalSubmitting(false);
        }
    };
    return (_jsxs("div", { className: `bg-white p-8 rounded-xl shadow-sm ${className}`, children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "Send Us a Message" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Full Name *" }), _jsx(Input, { id: "name", name: "name", value: formData.name, onChange: handleChange, required: true, disabled: submitting, className: "bg-secondary border-secondary" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email *" }), _jsx(Input, { id: "email", name: "email", type: "email", value: formData.email, onChange: handleChange, required: true, disabled: submitting, className: "bg-secondary border-secondary" })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [showPhone && (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "phone", children: "Phone Number" }), _jsx(Input, { id: "phone", name: "phone", type: "tel", value: formData.phone, onChange: handleChange, disabled: submitting, className: "bg-secondary border-secondary" })] })), showSubject && (_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "subject", children: ["Subject ", !showPhone && '*'] }), _jsx(Input, { id: "subject", name: "subject", value: formData.subject, onChange: handleChange, required: !showPhone, disabled: submitting, className: "bg-secondary border-secondary" })] }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "message", children: "Message *" }), _jsx(Textarea, { id: "message", name: "message", rows: 5, value: formData.message, onChange: handleChange, required: true, disabled: submitting, className: "bg-secondary border-secondary" })] })] }), _jsx(Button, { type: "submit", className: "w-full bg-primary hover:bg-primary/90", disabled: submitting, children: submitting ? 'Sending...' : submitButtonText })] })] }));
};
export default ContactForm;
//# sourceMappingURL=component.js.map