"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useClerkSupabaseClient } from "@/lib/clerk";
import Link from "next/link";
import { toast } from "sonner";
import { AlertTriangle, LoaderCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Code } from "@/components/ui/code";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TermsDialog } from "./terms-dialog";
export function ApiKeyManager({ initialKey, userId }) {
    const [key, setKey] = useState(initialKey);
    const [showProjectDialog, setShowProjectDialog] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [projectUrl, setProjectUrl] = useState("");
    const supabase = useClerkSupabaseClient();
    if (!userId) {
        return (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: _jsx("div", { className: "flex items-center gap-2 text-sm font-medium", children: "Your API Key" }) }), _jsxs(Alert, { children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: "Sign in to create and manage your API keys" })] }), _jsx("div", { className: "flex justify-center", children: _jsx(Link, { href: "https://accounts.21st.dev/sign-in", className: "inline-block px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90", children: "Sign In" }) })] }));
    }
    const createApiKey = async () => {
        if (!projectUrl) {
            toast.error("Please enter your project URL");
            return;
        }
        try {
            const urlObj = new URL(projectUrl);
            if (!urlObj.hostname) {
                toast.error("Please enter a valid URL");
                return;
            }
        }
        catch (e) {
            toast.error("Please enter a valid URL");
            return;
        }
        setLoading(true);
        try {
            const { data, error } = await supabase.rpc("create_api_key", {
                user_id: userId,
                plan: "free",
                requests_limit: 100,
            });
            if (error)
                throw error;
            const newKey = {
                id: data.id,
                key: data.key,
                user_id: data.user_id,
                plan: data.plan || "free",
                requests_limit: data.requests_limit || 100,
                requests_count: data.requests_count || 0,
                created_at: data.created_at || new Date().toISOString(),
                expires_at: data.expires_at,
                last_used_at: data.last_used_at,
                is_active: data.is_active ?? true,
                project_url: data.project_url || projectUrl,
            };
            setKey(newKey);
            toast.success("API key created successfully");
        }
        catch (error) {
            console.error("Error creating API key:", error);
            toast.error("Failed to create API key");
        }
        finally {
            setLoading(false);
            setShowProjectDialog(false);
        }
    };
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsx("div", { className: "flex items-center gap-2 text-sm font-medium", children: "Your API Key" }), !key && (_jsx(Button, { onClick: () => setShowTerms(true), disabled: loading, className: "w-full sm:w-auto", children: "Create API Key" })), key && (_jsx("span", { className: "text-sm text-muted-foreground", children: "Contact Serafim to upgrade your plan" }))] }), _jsx("div", { className: "grid gap-4", children: !key ? (_jsxs(Alert, { children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: "You haven't created an API key yet. Create one to get started." })] })) : (_jsxs("div", { className: "grid gap-4 p-3 sm:p-4 rounded-lg border bg-card text-card-foreground", children: [_jsx("div", { className: "flex flex-col sm:flex-row sm:items-start justify-between gap-4", children: _jsxs("div", { className: "grid gap-3 flex-1", children: [_jsx(Code, { code: key.key, language: "bash", fontSize: "sm", display: "block", className: "m-0 break-all" }), _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground", children: [_jsxs("time", { dateTime: key.created_at, className: "tabular-nums", children: ["Created ", formatDate(key.created_at)] }), key.last_used_at && (_jsxs("time", { dateTime: key.last_used_at, className: "tabular-nums", children: ["Last used ", formatDate(key.last_used_at)] }))] })] }) }), _jsxs("div", { className: "grid gap-2", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between text-sm gap-1", children: [_jsx("span", { children: "Usage" }), _jsxs("span", { className: "tabular-nums", children: [key.requests_count, " / ", key.requests_limit, " requests"] })] }), _jsx(Progress, { value: (key.requests_count / key.requests_limit) * 100, className: cn(key.requests_count / key.requests_limit >= 0.8
                                                ? "bg-destructive/20"
                                                : "", "[&>div]:bg-destructive") }), key.requests_count / key.requests_limit >= 0.8 && (_jsxs(Alert, { variant: "destructive", className: "mt-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: "You are approaching your API request limit. Consider upgrading your plan." })] }))] })] })) })] }), _jsx(TermsDialog, { open: showTerms, onAccept: () => {
                    setShowTerms(false);
                    setShowProjectDialog(true);
                }, onClose: () => setShowTerms(false) }), _jsx(Dialog, { open: showProjectDialog, onOpenChange: setShowProjectDialog, children: _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Project URL" }), _jsx(DialogDescription, { children: "Enter the URL of the project where you'll be using this API key" })] }), _jsx("div", { className: "grid gap-4 py-4", children: _jsxs("div", { className: "grid gap-2", children: [_jsx(Label, { htmlFor: "project-url", children: "Project URL" }), _jsx(Input, { id: "project-url", placeholder: "https://your-project.com", value: projectUrl, onChange: (e) => setProjectUrl(e.target.value) }), _jsx("p", { className: "text-sm text-muted-foreground", children: "We may revoke access if the URL provided is invalid or if the project is not owned by you." })] }) }), _jsxs(DialogFooter, { className: "gap-3 sm:gap-[inherit]", children: [_jsx(Button, { variant: "outline", onClick: () => setShowProjectDialog(false), children: "Cancel" }), _jsx(Button, { onClick: createApiKey, disabled: loading, className: "relative min-w-24", children: loading ? (_jsx(LoaderCircle, { className: "animate-spin", size: 16, strokeWidth: 2, "aria-hidden": "true" })) : ("Create Key") })] })] }) })] }));
}
//# sourceMappingURL=component.js.map