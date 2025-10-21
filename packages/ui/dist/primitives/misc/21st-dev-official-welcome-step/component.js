"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Icons } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { TermsDialog } from "@/components/features/api/terms-dialog";
import { SignInButton } from "@clerk/nextjs";
export function WelcomeStep({ onComplete, isAuthenticated = false, }) {
    const buttonRef = useRef(null);
    const checkboxRef = useRef(null);
    const signInButtonRef = useRef(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [termsDialogOpen, setTermsDialogOpen] = useState(false);
    // Focus checkbox on mount if authenticated, otherwise focus sign in button
    useEffect(() => {
        if (isAuthenticated && checkboxRef.current) {
            checkboxRef.current.focus();
        }
        else if (!isAuthenticated && signInButtonRef.current) {
            signInButtonRef.current.focus();
        }
    }, [isAuthenticated]);
    // Add keyboard shortcut for Enter key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter" &&
                !e.shiftKey &&
                !e.ctrlKey &&
                !e.altKey &&
                !e.metaKey) {
                e.preventDefault();
                if (isAuthenticated) {
                    if (!termsAccepted) {
                        setTermsAccepted(true);
                    }
                    else {
                        onComplete();
                    }
                }
                else if (signInButtonRef.current) {
                    signInButtonRef.current.click();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onComplete, termsAccepted, isAuthenticated]);
    const handleTermsAccept = () => {
        setTermsAccepted(true);
        setTermsDialogOpen(false);
    };
    return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 px-4", children: [_jsxs("div", { className: "space-y-4 max-w-2xl", children: [_jsx("h1", { className: "text-4xl font-bold tracking-tight", children: "Welcome to Magic MCP" }), _jsx("p", { className: "text-xl text-muted-foreground", children: "Magic MCP helps you create beautiful UI components with AI in seconds. Let's get you set up with everything you need." })] }), isAuthenticated && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "terms", ref: checkboxRef, checked: termsAccepted, onCheckedChange: (checked) => setTermsAccepted(checked === true) }), _jsxs("label", { htmlFor: "terms", className: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: ["I agree to the", " ", _jsx("button", { type: "button", className: "text-primary underline hover:text-primary/80", onClick: () => setTermsDialogOpen(true), children: "Terms of Use" })] })] })), isAuthenticated ? (_jsxs(Button, { onClick: onComplete, ref: buttonRef, className: "mt-8 pr-1.5", disabled: !termsAccepted, children: ["Continue", _jsx("kbd", { className: "pointer-events-none h-5 w-5 justify-center select-none items-center gap-1 rounded border-muted-foreground/40 bg-muted-foreground/20 px-1.5 ml-1.5 font-sans text-[11px] text-kbd leading-none opacity-100 flex", children: _jsx(Icons.enter, { className: "h-2.5 w-2.5" }) })] })) : (_jsx(SignInButton, { mode: "modal", children: _jsxs(Button, { className: "mt-4 pr-1.5", ref: signInButtonRef, children: ["Sign In to Continue", _jsx("kbd", { className: "pointer-events-none h-5 w-5 justify-center select-none items-center gap-1 rounded border-muted-foreground/40 bg-muted-foreground/20 px-1.5 ml-1.5 font-sans text-[11px] text-kbd leading-none opacity-100 flex", children: _jsx(Icons.enter, { className: "h-2.5 w-2.5" }) })] }) })), _jsx(TermsDialog, { open: termsDialogOpen, onAccept: handleTermsAccept, onClose: () => setTermsDialogOpen(false) })] }));
}
//# sourceMappingURL=component.js.map