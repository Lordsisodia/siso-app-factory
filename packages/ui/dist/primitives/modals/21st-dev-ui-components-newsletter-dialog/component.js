"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { useIsMobile } from "@/hooks/use-media-query";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { addToNewsletter } from "@/lib/resend";
export function NewsletterDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isMobile = useIsMobile();
    useEffect(() => {
        const hasSubscribed = localStorage.getItem("hasSubscribedToNewsletter");
        const hasDeclined = localStorage.getItem("hasDeclinedNewsletter");
        const timer = setTimeout(() => {
            if (!hasSubscribed && !hasDeclined) {
                setIsOpen(true);
            }
        }, 40000);
        return () => clearTimeout(timer);
    }, []);
    const handleClose = () => {
        localStorage.setItem("hasDeclinedNewsletter", "true");
        setIsOpen(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const time = new Date();
        const timestamp = time.valueOf();
        const previousTimestamp = localStorage.getItem("loops-form-timestamp");
        if (previousTimestamp && Number(previousTimestamp) + 60000 > timestamp) {
            toast.error("Too many signups, please try again in a little while");
            setIsSubmitting(false);
            return;
        }
        localStorage.setItem("loops-form-timestamp", timestamp.toString());
        try {
            const { success, error } = await addToNewsletter(email);
            if (success) {
                toast.success("Thanks! We'll be in touch!");
                localStorage.setItem("hasSubscribedToNewsletter", "true");
                setIsOpen(false);
            }
            else {
                throw error;
            }
        }
        catch (error) {
            if (error instanceof Error && error.message === "Failed to fetch") {
                toast.error("Too many signups, please try again in a little while");
                return;
            }
            toast.error(error instanceof Error
                ? error.message
                : "Failed to subscribe. Please try again.");
            localStorage.setItem("loops-form-timestamp", "");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsx(Dialog, { open: isOpen, onOpenChange: handleClose, children: _jsxs(DialogContent, { className: "sm:max-w-[425px]", children: [_jsxs("div", { className: "mb-2 flex flex-col items-center gap-2", children: [_jsx(Logo, { position: "flex", className: "h-6 w-6", hasLink: false }), _jsxs(DialogHeader, { children: [_jsx(DialogTitle, { className: "sm:text-center", children: "Stay Updated with Latest UI Components" }), _jsx(DialogDescription, { className: "sm:text-center", children: "Join our weekly digest featuring carefully curated UI components and design patterns from top design engineers." })] })] }), _jsxs("form", { className: "space-y-5", onSubmit: handleSubmit, children: [_jsx("div", { className: "space-y-2", children: _jsxs("div", { className: "relative", children: [_jsx(Input, { id: "dialog-subscribe", name: "email", className: "peer ps-9", placeholder: "you@company.com", type: "email", autoComplete: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, "aria-label": "Email" }), _jsx("div", { className: "pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50", children: _jsx(Mail, { size: 16, strokeWidth: 2, "aria-hidden": "true" }) })] }) }), _jsx(Button, { type: "submit", className: "w-full", disabled: isSubmitting, children: isSubmitting ? "Subscribing..." : "Subscribe" })] }), _jsxs("p", { className: "text-center text-xs text-muted-foreground", children: ["By subscribing you agree to our", " ", _jsx(Link, { href: "/privacy", children: "Privacy Policy" }), "."] })] }) }));
}
//# sourceMappingURL=component.js.map