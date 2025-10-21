import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { toast } from "sonner";
import { AlertTriangle, Loader2, ShieldAlert, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
export function DeleteAccountDialog({ open, onOpenChange, }) {
    const [isDeleting, setIsDeleting] = useState(false);
    async function handleDeleteAccount() {
        setIsDeleting(true);
        try {
            const response = await fetch("/api/user/delete-account", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || "Failed to delete account");
            }
            toast.success("Your account data has been deleted");
            // Show message about needing to delete the Clerk account
            toast.success("Please visit your account settings to complete deletion", {
                duration: 5000,
                action: {
                    label: "Go to Account Settings",
                    onClick: () => window.open(result.clerkAccountUrl, "_blank"),
                },
            });
        }
        catch (error) {
            console.error("Delete account error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to delete account");
        }
        finally {
            setIsDeleting(false);
            onOpenChange(false);
        }
    }
    return (_jsx(AlertDialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(AlertDialogContent, { className: "sm:max-w-[450px] p-0 gap-0 overflow-hidden border-destructive/20", children: [_jsx("div", { className: "bg-destructive/5 p-6 border-b border-destructive/10", children: _jsxs(AlertDialogHeader, { className: "gap-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive", children: _jsx(ShieldAlert, { className: "h-5 w-5" }) }), _jsx(AlertDialogTitle, { className: "text-xl font-semibold text-destructive", children: "Delete Account Permanently" })] }), _jsx(AlertDialogDescription, { className: "text-destructive/80", children: "This action cannot be undone. Please read carefully before proceeding." })] }) }), _jsxs("div", { className: "p-6 space-y-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "font-medium text-foreground", children: "Deleting your account will:" }), _jsx("ul", { className: "space-y-2", children: [
                                        "Permanently remove all your profile information",
                                        "Delete all your saved components and projects",
                                        "Remove your access to any paid features",
                                        "Cannot be undone or recovered",
                                    ].map((item, i) => (_jsxs("li", { className: "flex items-start gap-2 text-sm text-muted-foreground", children: [_jsx("div", { className: "mt-0.5 h-5 w-5 flex-shrink-0 flex items-center justify-center rounded-full bg-destructive/10", children: _jsx(AlertTriangle, { className: "h-3 w-3 text-destructive" }) }), _jsx("span", { children: item })] }, i))) })] }), _jsxs("div", { className: cn("rounded-md border border-destructive/30 bg-destructive/5 p-4", "flex items-start gap-3"), children: [_jsx(Trash2, { className: "h-5 w-5 text-destructive flex-shrink-0 mt-0.5" }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "font-medium text-sm text-destructive", children: "Are you absolutely sure you want to proceed?" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Once deleted, your data cannot be recovered by our support team." })] })] })] }), _jsx(Separator, { className: "bg-border/60" }), _jsxs("div", { className: "p-6 pt-4 flex justify-between", children: [_jsx(Button, { variant: "ghost", onClick: handleDeleteAccount, disabled: isDeleting, className: "text-destructive hover:bg-destructive/10 hover:text-destructive", children: isDeleting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" }), "Deleting..."] })) : ("Delete Permanently") }), _jsx(Button, { variant: "default", onClick: () => onOpenChange(false), disabled: isDeleting, children: "Cancel" })] })] }) }));
}
//# sourceMappingURL=component.js.map