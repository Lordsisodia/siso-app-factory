"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ApiKeySection } from "./api-key-section";
import { IdeInstructions } from "./ide-instructions";
import { WelcomeOnboarding } from "./welcome-onboarding";
import { cn } from "@/lib/utils";
import { Check, Circle } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export function Onboarding({ apiKey, setApiKey, userId, showWelcome = true, onWelcomeComplete, allStepsCompleted = false, }) {
    const [showWelcomeDialog, setShowWelcomeDialog] = useState(showWelcome);
    const [selectedOS, setSelectedOS] = useState("mac");
    useEffect(() => {
        // Detect OS on mount
        const userAgent = window.navigator.userAgent.toLowerCase();
        setSelectedOS(userAgent.includes("windows") ? "windows" : "mac");
    }, []);
    useEffect(() => {
        setShowWelcomeDialog(showWelcome);
    }, [showWelcome]);
    const handleWelcomeComplete = () => {
        setShowWelcomeDialog(false);
        onWelcomeComplete?.();
    };
    const steps = [
        {
            id: "api-key",
            title: "Add an API Key",
            description: "Use the following generated key to authenticate requests",
            isCompleted: !!apiKey || allStepsCompleted,
            content: (_jsx(ApiKeySection, { apiKey: apiKey, setApiKey: setApiKey, userId: userId })),
        },
        {
            id: "ide-setup",
            title: (_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("span", { children: "Setup your IDE" }), _jsx("div", { className: "flex items-center gap-2 text-sm", children: _jsx(Tabs, { defaultValue: "mac", onValueChange: (value) => setSelectedOS(value), children: _jsxs(TabsList, { className: "rounded-md h-7 p-0.5", children: [_jsx(TabsTrigger, { value: "mac", className: "text-xs h-6", children: "macOS" }), _jsx(TabsTrigger, { value: "windows", className: "text-xs h-6", children: "Windows" })] }) }) })] })),
            description: "Install Magic in your preferred IDE",
            isCompleted: allStepsCompleted,
            content: _jsx(IdeInstructions, { apiKey: apiKey, selectedOS: selectedOS }),
        },
        {
            id: "first-component",
            title: "Create your first component",
            description: "Try creating your first UI component with Magic",
            isCompleted: allStepsCompleted,
            content: (_jsxs("div", { className: "space-y-6 max-w-[650px]", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "1" }), _jsxs("div", { className: "space-y-3 flex-1", children: [_jsx("h3", { className: "font-medium", children: "Tell Agent What You Need" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "In your AI Agent's chat, type /ui and describe the component you want to create" }), _jsx("div", { className: "relative w-full aspect-[21/5] rounded-md overflow-hidden", children: _jsx(Image, { src: "/how-it-works-1.png", alt: "Tell agent what you need", fill: true, className: "object-cover object-left-top mix-blend-difference" }) })] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "2" }), _jsxs("div", { className: "space-y-3 flex-1", children: [_jsx("h3", { className: "font-medium", children: "Let Magic Create It" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "When prompted in Cursor, use Magic to instantly build your polished UI component" }), _jsx("div", { className: "relative w-full aspect-[21/5] rounded-md overflow-hidden", children: _jsx(Image, { src: "/how-it-works-3.png", alt: "Let Magic create it", fill: true, className: "object-cover object-left-top mix-blend-difference" }) })] })] })] })] })),
        },
    ];
    return (_jsx("div", { className: "relative", children: _jsxs("div", { className: "mx-auto max-w-[1200px] px-2 sm:px-4", children: [_jsxs("div", { className: "border-b pb-4 mb-4", children: [_jsx("h1", { className: "font-semibold tracking-tight", children: "Get Started" }), showWelcomeDialog && (_jsx(WelcomeOnboarding, { onComplete: handleWelcomeComplete, autoOpen: true }))] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute left-[15px] top-[40px] bottom-0 w-[2px] bg-border" }), _jsx("div", { className: "space-y-8 sm:space-y-12", children: steps.map((step) => (_jsx("div", { className: "relative", children: _jsxs("div", { className: "flex gap-4", children: [_jsx("div", { className: cn("relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2", step.isCompleted
                                                ? "border-primary bg-primary text-primary-foreground"
                                                : "border-muted-foreground/20 bg-background"), children: step.isCompleted ? (_jsx(Check, { className: "h-4 w-4" })) : (_jsx(Circle, { className: "h-3 w-3", fill: "currentColor" })) }), _jsxs("div", { className: "flex-1 min-w-0 max-w-[650px]", children: [_jsxs("div", { className: "space-y-2 mb-4", children: [_jsx("h3", { className: "text-base sm:text-lg font-semibold leading-tight sm:leading-none tracking-tight", children: step.title }), _jsx("p", { className: "text-xs sm:text-sm text-muted-foreground", children: step.description })] }), _jsx("div", { className: "w-full overflow-hidden", children: _jsx("div", { className: "max-w-full overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0", children: step.content }) })] })] }) }, step.id))) })] })] }) }));
}
//# sourceMappingURL=component.js.map