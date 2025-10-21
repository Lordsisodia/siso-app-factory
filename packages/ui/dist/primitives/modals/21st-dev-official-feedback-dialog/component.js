"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { useClerkSupabaseClient } from "@/lib/clerk";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Check, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import React from "react";
const CheckboxCard = React.forwardRef(({ className, checked = false, onCheckedChange, label, description, icon, ...props }, ref) => {
    return (_jsxs("div", { ref: ref, className: cn("relative flex cursor-pointer items-start gap-4 rounded-md border border-border p-4 transition-all duration-200", "hover:border-primary/50 hover:bg-muted/50", checked && "border-primary bg-primary/5", className), onClick: () => onCheckedChange?.(!checked), ...props, children: [_jsx("div", { className: "flex-shrink-0 pt-0.5", children: _jsx("div", { className: cn("flex h-5 w-5 items-center justify-center rounded-md border border-border bg-background transition-all duration-200", checked && "border-primary bg-primary text-primary-foreground", !checked && "group-hover:border-primary/50"), children: checked && _jsx(Check, { className: "h-3.5 w-3.5" }) }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [icon, _jsx("div", { className: "text-sm font-medium text-foreground", children: label })] }), description && (_jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: description }))] })] }));
});
CheckboxCard.displayName = "CheckboxCard";
export function FeedbackDialog({ open, onOpenChange, initialType = "feedback", }) {
    const { user } = useUser();
    const supabase = useClerkSupabaseClient();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [type, setType] = useState(initialType);
    const [content, setContent] = useState("");
    const [role, setRole] = useState("");
    // Load user's role using useQuery
    const { data: userData } = useQuery({
        queryKey: ["user-role", user?.id],
        queryFn: async () => {
            if (!user?.id)
                return null;
            const { data, error } = await supabase
                .from("users")
                .select("role")
                .eq("id", user.id)
                .single();
            if (error)
                throw error;
            return data;
        },
        enabled: !!user?.id,
    });
    // Set initial role when data changes
    useEffect(() => {
        if (userData?.role) {
            setRole(userData.role);
        }
    }, [userData?.role]);
    // Set initial type and reset form when dialog opens/closes
    useEffect(() => {
        if (open) {
            setType(initialType);
        }
        else {
            setContent("");
        }
    }, [open, initialType]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user?.id || !content || !role) {
            toast.error("Please fill in all required fields");
            return;
        }
        setIsSubmitting(true);
        try {
            // Only update role if it has changed from the current user data
            if (role !== userData?.role) {
                const { error: updateError } = await supabase
                    .from("users")
                    .update({
                    role: role,
                })
                    .eq("id", user.id);
                if (updateError) {
                    console.error("Error updating user role:", updateError);
                    throw new Error(`Failed to update user role: ${updateError.message}`);
                }
            }
            // Submit the feedback
            const { error: feedbackError } = await supabase.from("feedback").insert({
                user_id: user.id,
                type,
                content,
                status: "pending",
            });
            if (feedbackError) {
                console.error("Error submitting feedback:", feedbackError);
                throw new Error(`Failed to submit feedback: ${feedbackError.message}`);
            }
            toast.success("Thank you for your feedback!");
            onOpenChange(false);
            setContent("");
        }
        catch (error) {
            console.error("Error in feedback submission:", error);
            toast.error(error instanceof Error
                ? error.message
                : "Failed to submit feedback. Please try again.");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "flex h-[100dvh] flex-col gap-0 p-0 sm:h-[min(740px,90vh)] sm:max-w-[550px] sm:rounded-xl", hideCloseButton: false, children: [_jsxs(DialogHeader, { className: "flex-none border-b border-border px-6 py-4", children: [_jsx(DialogTitle, { className: "text-lg font-semibold tracking-tight", children: "Send Feedback" }), _jsx(DialogDescription, { className: "text-sm text-muted-foreground", children: "Help us improve Magic MCP by sharing your thoughts or requesting new features." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "flex flex-1 flex-col overflow-hidden", children: [_jsx("div", { className: "flex-1 overflow-y-auto overscroll-contain webkit-overflow-scrolling-touch", children: _jsx("div", { className: "min-h-full space-y-6 px-6 py-4", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { children: "What would you like to share?" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [_jsx(CheckboxCard, { checked: type === "feedback", onCheckedChange: () => setType("feedback"), label: "Feedback", className: "py-2.5" }), _jsx(CheckboxCard, { checked: type === "feature_request", onCheckedChange: () => setType("feature_request"), label: "Feature Request", className: "py-2.5" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { children: "Your Role" }), _jsx("div", { className: "grid gap-2", children: [
                                                        { value: "designer", label: "Designer" },
                                                        {
                                                            value: "frontend_developer",
                                                            label: "Frontend Developer",
                                                        },
                                                        {
                                                            value: "backend_developer",
                                                            label: "Backend Developer",
                                                        },
                                                        { value: "product_manager", label: "Product Manager" },
                                                        { value: "entrepreneur", label: "Entrepreneur" },
                                                    ].map(({ value, label }) => (_jsx(CheckboxCard, { checked: role === value, onCheckedChange: () => setRole(value), label: label, className: "py-2.5" }, value))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "content", children: type === "feedback" ? "Your Feedback" : "Feature Request" }), _jsx(Textarea, { id: "content", placeholder: type === "feedback"
                                                        ? "Tell us what you think about Magic MCP..."
                                                        : "Describe the feature you'd like to see...", value: content, onChange: (e) => setContent(e.target.value), className: "min-h-[100px]" })] })] }) }) }), _jsx(DialogFooter, { className: "flex-none border-t border-border px-6 py-4", children: _jsx(Button, { type: "submit", disabled: isSubmitting, children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(LoaderCircle, { className: "mr-2 h-3 w-3 animate-spin" }), "Submitting"] })) : ("Submit") }) })] })] }) }));
}
//# sourceMappingURL=component.js.map