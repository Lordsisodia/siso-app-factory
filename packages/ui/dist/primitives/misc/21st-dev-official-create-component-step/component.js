"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
// Create an atom with storage for tracking if Magic onboarding is completed
export const magicOnboardingCompletedAtom = atomWithStorage("magic_agent_used", false);
export function CreateComponentStep({ hasCreatedComponent, onComplete, }) {
    const [isChecking, setIsChecking] = useState(false);
    const [localHasCreated, setLocalHasCreated] = useState(hasCreatedComponent);
    const [, setMagicOnboardingCompleted] = useAtom(magicOnboardingCompletedAtom);
    // Effect to simulate checking for component creation
    useEffect(() => {
        setLocalHasCreated(hasCreatedComponent);
        if (hasCreatedComponent) {
            setMagicOnboardingCompleted(true);
        }
    }, [hasCreatedComponent, setMagicOnboardingCompleted]);
    // Add keyboard shortcut for Enter key and Help
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                onComplete("next");
            }
            else if (e.code === "KeyH" &&
                !e.metaKey &&
                !e.ctrlKey &&
                !e.altKey &&
                !e.shiftKey) {
                e.preventDefault();
                onComplete("troubleshooting");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onComplete]);
    // Add focus tracking to trigger check status
    useEffect(() => {
        const handleFocus = () => {
            if (!localHasCreated && !isChecking) {
                handleCheckStatus();
            }
        };
        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, [localHasCreated, isChecking]);
    const handleCheckStatus = () => {
        if (isChecking)
            return;
        setIsChecking(true);
        // Simulate checking - in reality this is handled by the parent component's query
        setTimeout(() => {
            setIsChecking(false);
        }, 1500);
    };
    return (_jsxs("div", { className: "flex flex-col space-y-8 px-4 max-w-[700px] mx-auto w-full z-10", children: [_jsxs("div", { className: "space-y-4 max-w-2xl", children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Create Your First Component" }), _jsx("p", { className: "text-lg text-muted-foreground", children: "Let's create your first UI component with Magic MCP" })] }), _jsx("div", { className: "bg-card rounded-lg max-w-3xl", children: localHasCreated ? (_jsxs("div", { className: "flex items-start gap-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-4", children: [_jsx(CheckCircle, { className: "h-5 w-5 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-green-800 dark:text-green-400", children: "Component Created!" }), _jsx("p", { className: "text-sm text-green-700 dark:text-green-300 mt-1", children: "You've successfully created your first component with Magic MCP." })] })] })) : (_jsxs("div", { className: "space-y-6 p-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "1" }), _jsxs("div", { className: "space-y-3 flex-1", children: [_jsx("h3", { className: "font-medium", children: "Tell Agent What You Need" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "In your AI Agent's chat, type /ui and describe the component you want to create" }), _jsx("div", { className: "relative w-full aspect-[21/5] rounded-md overflow-hidden", children: _jsx(Image, { src: "/how-it-works-1.png", alt: "Tell agent what you need", fill: true, className: "object-cover object-left-top mix-blend-difference" }) })] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "2" }), _jsxs("div", { className: "space-y-3 flex-1", children: [_jsx("h3", { className: "font-medium", children: "Let Magic Create It" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "When prompted in your IDE, use Magic to instantly build your polished UI component" }), _jsx("div", { className: "relative w-full aspect-[21/5] rounded-md overflow-hidden", children: _jsx(Image, { src: "/how-it-works-3.png", alt: "Let Magic create it", fill: true, className: "object-cover object-left-top mix-blend-difference" }) })] })] })] }), _jsx("div", { className: "flex justify-center pt-4", children: _jsx(Button, { variant: "outline", onClick: handleCheckStatus, disabled: isChecking, children: isChecking ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4 animate-spin" }), "Checking..."] })) : (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), "Check Status"] })) }) })] })) }), _jsx("div", { className: "sticky bottom-5 w-full pt-8 pb-4", children: _jsxs("div", { className: "flex justify-center w-full gap-2", children: [_jsxs(Button, { variant: "outline", className: "pr-1.5", onClick: () => onComplete("troubleshooting"), children: ["Need help?", _jsx("kbd", { className: "pointer-events-none h-5 w-5 justify-center select-none items-center gap-1 rounded border-muted-foreground/40 bg-foreground/10 px-1.5 ml-1.5 font-sans text-[11px] text-foreground leading-none opacity-100 flex", children: "H" })] }), _jsxs(Button, { className: "pr-1.5", onClick: () => onComplete("next"), children: ["Continue", _jsx("kbd", { className: "pointer-events-none h-5 w-5 justify-center select-none items-center gap-1 rounded border-muted-foreground/40 bg-muted-foreground/20 px-1.5 ml-1.5 font-sans text-[11px] text-kbd leading-none opacity-100 flex", children: _jsx(Icons.enter, { className: "h-2.5 w-2.5" }) })] })] }) })] }));
}
//# sourceMappingURL=component.js.map