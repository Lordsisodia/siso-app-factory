"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Icons } from "@/components/icons";
import { Spinner } from "@/components/icons/spinner";
import { BookmarkButton } from "@/components/ui/bookmark-button";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useSupabaseAnalytics } from "@/hooks/use-analytics";
import { useComponentAccess } from "@/hooks/use-component-access";
import { useIsMobile } from "@/hooks/use-media-query";
import { AMPLITUDE_EVENTS, trackEvent, trackPageProperties, } from "@/lib/amplitude";
import { useClerkSupabaseClient } from "@/lib/clerk";
import { useHasUserBookmarkedDemo } from "@/lib/queries";
import { cn } from "@/lib/utils";
import { AnalyticsActivityType, PROMPT_TYPES, } from "@/types/global";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { ArrowLeft, Copy, Lock, Maximize, Minimize, Moon, MoreVertical, Share2, Sun, } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PayWall } from "./pay-wall";
const selectedPromptTypeAtom = atomWithStorage("previewDialogSelectedPromptType", PROMPT_TYPES.EXTENDED);
export function PreviewSkeleton() {
    return (_jsx("div", { className: "flex-1 animate-pulse bg-muted flex items-center justify-center", children: _jsx(LoadingSpinner, {}) }));
}
export function ComponentPreviewDialog({ isOpen, onClose, demo, hasPurchased = false, }) {
    const { resolvedTheme } = useTheme();
    const [previewTheme, setPreviewTheme] = useState("light");
    const [isLoading, setIsLoading] = useState(true);
    const [isPromptLoading, setIsPromptLoading] = useState(false);
    const [isOpening, setIsOpening] = useState(false);
    const [showUnlockDialog, setShowUnlockDialog] = useState(false);
    const accessState = useComponentAccess(demo.component, hasPurchased);
    // Close unlock dialog when component becomes unlocked
    useEffect(() => {
        if (accessState === "UNLOCKED") {
            setShowUnlockDialog(false);
        }
    }, [accessState]);
    // Add effect to sync preview theme with system theme
    useEffect(() => {
        if (resolvedTheme) {
            setPreviewTheme(resolvedTheme === "dark" ? "dark" : "light");
        }
    }, [resolvedTheme]);
    const { user } = useUser();
    const supabase = useClerkSupabaseClient();
    const { capture } = useSupabaseAnalytics();
    const [selectedPromptType, setSelectedPromptType] = useAtom(selectedPromptTypeAtom);
    const isMobile = useIsMobile();
    const [isFullscreen, setIsFullscreen] = useState(false);
    // Add analytics tracking
    useEffect(() => {
        if (!isOpen)
            return; // Only track when dialog is open
        trackPageProperties({
            componentId: demo.component.id,
            componentName: demo.component.name,
            authorId: demo.component.user_id,
            isPublic: demo.component.is_public,
            tags: [],
            downloadsCount: demo.component.downloads_count,
            hasDemo: !!demo.component.demo_code,
            deviceType: window.innerWidth < 768 ? "mobile" : "desktop",
        });
        capture(demo.component.id, AnalyticsActivityType.COMPONENT_VIEW, user?.id);
    }, [
        isOpen,
        demo.component.id,
        demo.component.name,
        demo.component.user_id,
        demo.component.is_public,
        demo.component.downloads_count,
        demo.component.demo_code,
        user?.id,
        capture,
    ]);
    const bundleUrl = demo.bundle_html_url || demo.bundle_url?.html;
    const { data: bookmarked } = useHasUserBookmarkedDemo(supabase, demo?.id, user?.id);
    useEffect(() => {
        const handleKeyPress = (e) => {
            // Only handle keyboard shortcuts if dialog is open
            if (!isOpen)
                return;
            // Check if target is an input/textarea element
            const target = e.target;
            if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
                return;
            }
            // Check for 'F' keypress for fullscreen
            if (e.code === "KeyF" && !e.ctrlKey && !e.altKey && !e.metaKey) {
                e.preventDefault();
                setIsFullscreen((prev) => !prev);
            }
            // Add CMD + X handler for copying prompts
            if (e.code === "KeyX" && e.metaKey && !e.ctrlKey && !e.altKey) {
                e.preventDefault();
                handlePromptAction();
            }
            // Handle Enter key for opening component page
            if (e.code === "Enter" && !e.ctrlKey && !e.altKey && !e.metaKey) {
                e.preventDefault();
                handleOpenComponentPage();
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [isOpen]);
    if (!bundleUrl) {
        return null;
    }
    const handlePromptAction = async () => {
        if (accessState !== "UNLOCKED") {
            setShowUnlockDialog(true);
            return;
        }
        // Set loading state before API call
        setIsPromptLoading(true);
        try {
            const response = await fetch("/api/prompts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt_type: selectedPromptType,
                    demo_id: demo.id,
                }),
            });
            if (!response.ok) {
                throw new Error("Failed to generate prompt");
            }
            const { prompt } = await response.json();
            // Use the more reliable clipboard copy approach
            const copyToClipboard = (text) => {
                // Try the modern clipboard API first
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard
                        .writeText(text)
                        .then(() => {
                        toast.success("Prompt copied to clipboard");
                    })
                        .catch((err) => {
                        console.error("Clipboard API failed:", err);
                        // Fall back to the textarea method
                        fallbackCopyTextToClipboard(text);
                    });
                }
                else {
                    // Use fallback for non-secure contexts or older browsers
                    fallbackCopyTextToClipboard(text);
                }
            };
            // Fallback method using textarea and document.execCommand
            const fallbackCopyTextToClipboard = (text) => {
                // Create a temporary textarea element
                const textarea = document.createElement("textarea");
                textarea.value = text;
                // Make the textarea out of viewport but fully visible to ensure it works
                textarea.style.position = "fixed";
                textarea.style.left = "0";
                textarea.style.top = "0";
                textarea.style.width = "2em";
                textarea.style.height = "2em";
                textarea.style.padding = "0";
                textarea.style.border = "none";
                textarea.style.outline = "none";
                textarea.style.boxShadow = "none";
                textarea.style.background = "transparent";
                document.body.appendChild(textarea);
                try {
                    // Focus and select the text
                    textarea.focus();
                    textarea.select();
                    // Execute copy command
                    const successful = document.execCommand("copy");
                    if (successful) {
                        toast.success("Prompt copied to clipboard");
                    }
                    else {
                        console.error("execCommand failed");
                        toast.error("Failed to copy prompt - please copy manually");
                        // If we can't copy automatically, show the text for manual copying
                        textarea.style.width = "80%";
                        textarea.style.height = "200px";
                        textarea.style.background = "white";
                        textarea.style.color = "black";
                        textarea.style.zIndex = "10000";
                        textarea.style.padding = "10px";
                        textarea.style.top = "100px";
                        toast.info("You can manually copy the text from the text box");
                        // Let user know we've made the text visible
                        setTimeout(() => {
                            document.body.removeChild(textarea);
                        }, 10000);
                        return;
                    }
                }
                catch (err) {
                    console.error("Failed to copy text: ", err);
                    toast.error("Failed to copy prompt");
                }
                finally {
                    // Clean up if we didn't leave it visible
                    if (textarea.parentNode) {
                        document.body.removeChild(textarea);
                    }
                }
            };
            try {
                copyToClipboard(prompt);
                if (capture) {
                    capture(demo.component.id, AnalyticsActivityType.COMPONENT_PROMPT_COPY, user?.id);
                }
                trackEvent(AMPLITUDE_EVENTS.COPY_AI_PROMPT, {
                    componentId: demo.component.id,
                    componentName: demo.component.name,
                    promptType: selectedPromptType,
                    action: "copy",
                });
            }
            catch (error) {
                console.error("Error in copy process:", error);
                toast.error("Failed to copy prompt");
            }
        }
        catch (error) {
            console.error("Error copying prompt:", error);
            toast.error("Failed to copy prompt");
        }
        finally {
            // Reset loading state when done
            setIsPromptLoading(false);
        }
    };
    const handleOpenComponentPage = () => {
        setIsOpening(true);
        const componentUrl = `/${demo.component.user.display_username || demo.component.user.username}/${demo.component.component_slug}/${demo.demo_slug || "default"}`;
        window.location.href = componentUrl;
    };
    const handleShare = async () => {
        const componentUrl = `${window.location.origin}/${demo.user.display_username || demo.user.username}/${demo.component.component_slug}/${demo.demo_slug || "default"}`;
        await navigator.clipboard.writeText(componentUrl);
        toast.success("Link copied to clipboard");
    };
    const toggleTheme = () => {
        setPreviewTheme((current) => (current === "dark" ? "light" : "dark"));
    };
    const renderDesktopActions = () => (_jsxs(_Fragment, { children: [_jsx("div", { className: "inline-flex -space-x-px divide-x divide-primary-foreground/30 rounded-lg", children: _jsx(Button, { onClick: handlePromptAction, variant: "ghost", className: cn("focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70"), disabled: isPromptLoading, children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("div", { className: "flex items-center gap-2", children: accessState !== "UNLOCKED" ? (_jsxs(_Fragment, { children: [_jsx(Lock, { size: 16 }), _jsx("span", { children: "Unlock" })] })) : isPromptLoading ? (_jsxs(_Fragment, { children: [_jsx(Spinner, { size: 16 }), _jsx("span", { children: "Generating..." })] })) : (_jsxs(_Fragment, { children: [_jsx(Copy, { size: 16 }), _jsx("span", { children: "Copy prompt" })] })) }) }), _jsxs(TooltipContent, { className: "flex items-center gap-1.5", children: [accessState !== "UNLOCKED"
                                        ? "Unlock component"
                                        : isPromptLoading
                                            ? "Generating prompt..."
                                            : "Copy prompt", _jsx("kbd", { className: "pointer-events-none h-5 text-muted-foreground select-none items-center gap-1 rounded border bg-muted px-1.5 opacity-100 flex text-[11px] leading-none font-sans", children: "\u2318X" })] })] }) }) }), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", onClick: toggleTheme, className: "h-8 w-8", children: previewTheme === "dark" ? _jsx(Sun, { size: 16 }) : _jsx(Moon, { size: 16 }) }) }), _jsx(TooltipContent, { children: "Toggle theme" })] }), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", onClick: handleShare, className: "h-8 w-8", children: _jsx(Share2, { size: 16 }) }) }), _jsx(TooltipContent, { children: "Share component" })] }), _jsx(SignedIn, { children: _jsx(BookmarkButton, { demoId: demo.id, bookmarksCount: demo.bookmarks_count || 0, size: 18, showTooltip: true, bookmarked: bookmarked ?? false }) }), _jsx(SignedOut, { children: _jsx(SignInButton, { children: _jsx(BookmarkButton, { demoId: demo.id, bookmarksCount: demo.bookmarks_count || 0, size: 18, bookmarked: false }) }) }), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", onClick: () => setIsFullscreen((prev) => !prev), className: "h-8 w-8", children: isFullscreen ? _jsx(Minimize, { size: 16 }) : _jsx(Maximize, { size: 16 }) }) }), _jsxs(TooltipContent, { className: "flex items-center gap-1.5", children: ["Toggle fullscreen", _jsx("kbd", { className: "pointer-events-none h-5 text-muted-foreground select-none items-center gap-1 rounded border bg-muted px-1.5 opacity-100 flex text-[11px] leading-none font-sans", children: "F" })] })] }), _jsx(Button, { onClick: handleOpenComponentPage, className: "focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70", autoFocus: true, disabled: isOpening, children: isOpening ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Spinner, { size: 16, color: "#ffffff" }), _jsx("span", { children: "Opening..." })] })) : (_jsxs(_Fragment, { children: [_jsx("span", { children: "Open component" }), _jsx("kbd", { className: "pointer-events-none h-5 select-none items-center gap-1 rounded border-muted-foreground/40 bg-muted-foreground/20 px-1.5 ml-1.5 font-sans text-[11px] text-kbd leading-none opacity-100 flex", children: _jsx(Icons.enter, { className: "h-2.5 w-2.5" }) })] })) })] }));
    return (_jsxs(Dialog, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: [_jsxs(DialogContent, { className: cn("flex flex-col p-0 gap-0 overflow-hidden bg-background transition-all duration-200", isMobile
                    ? "w-screen h-screen max-w-none m-0"
                    : isFullscreen
                        ? "w-screen h-screen max-w-none m-0"
                        : "w-[90vw] h-[90vh] max-w-[1200px]"), hideCloseButton: true, children: [!isMobile && (_jsxs(DialogHeader, { className: "h-14 flex flex-row items-center justify-between border-b text-sm pl-4 pr-2.5 space-y-0 flex-shrink-0", children: [_jsxs("div", { className: "flex items-center gap-2 min-w-0 text-left", children: [_jsx(UserAvatar, { src: demo.user.display_image_url ||
                                            demo.user.image_url ||
                                            "/placeholder.svg", alt: demo.user.display_name ||
                                            demo.user.name ||
                                            demo.user.username ||
                                            "", size: 24, isClickable: true, user: demo.user, className: "flex-shrink-0" }), _jsxs("div", { className: "flex flex-col min-w-0 overflow-hidden", children: [_jsxs(DialogTitle, { className: "text-md font-medium flex gap-1 items-center truncate", children: [_jsx("span", { className: "truncate", children: demo.component.name }), demo.name != "Default" && (_jsxs(_Fragment, { children: [_jsx(Icons.slash, { className: "text-border w-[12px] h-[12px] flex-shrink-0" }), _jsx("span", { className: "truncate", children: demo.name })] }))] }), _jsx(Link, { href: `/${demo.user.display_username || demo.user.username}`, className: "text-xs text-muted-foreground hover:underline truncate", children: demo.user.display_name ||
                                                    demo.user.name ||
                                                    demo.user.username })] })] }), _jsx("div", { className: "flex items-center h-full gap-2", children: renderDesktopActions() })] })), _jsx("div", { className: "flex-1 flex flex-col overflow-hidden", style: {
                            minHeight: 0,
                            width: "100%",
                        }, children: bundleUrl && (_jsxs(_Fragment, { children: [isLoading && _jsx(PreviewSkeleton, {}), _jsx("iframe", { src: `${bundleUrl}?theme=${previewTheme}${previewTheme === "dark" ? "&dark=true" : ""}`, className: cn("w-full h-full border-0", isLoading && "hidden"), style: {
                                        flex: 1,
                                        minHeight: 0,
                                    }, allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true, onLoad: () => setIsLoading(false) })] })) }), isMobile && (_jsxs("div", { className: "flex flex-row items-center justify-between border-t text-sm px-4 space-y-0 flex-shrink-0", style: {
                            paddingBottom: "calc(0.5rem + var(--safe-area-bottom, env(safe-area-inset-bottom, 0px)))",
                            paddingTop: "0.5rem",
                            height: "calc(3.5rem + var(--safe-area-bottom, env(safe-area-inset-bottom, 0px)))",
                        }, children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0 max-w-[70%] overflow-hidden", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: onClose, className: "h-8 w-8 flex-shrink-0", children: _jsx(ArrowLeft, { size: 16 }) }), _jsx(UserAvatar, { src: demo.user.display_image_url ||
                                            demo.user.image_url ||
                                            "/placeholder.svg", alt: demo.user.display_name ||
                                            demo.user.name ||
                                            demo.user.username ||
                                            "", size: 24, isClickable: true, user: demo.user, className: "flex-shrink-0" }), _jsxs("div", { className: "flex flex-col min-w-0 overflow-hidden", children: [_jsxs(DialogTitle, { className: "text-md font-medium flex gap-1 items-center truncate", children: [_jsx("span", { className: "truncate", children: demo.component.name }), demo.name != "Default" && (_jsxs(_Fragment, { children: [_jsx(Icons.slash, { className: "text-border w-[12px] h-[12px] flex-shrink-0" }), _jsx("span", { className: "truncate", children: demo.name })] }))] }), _jsx(Link, { href: `/${demo.user.display_username || demo.user.username}`, className: "text-xs text-muted-foreground hover:underline truncate", children: demo.user.display_name ||
                                                    demo.user.name ||
                                                    demo.user.username })] })] }), _jsx("div", { className: "flex items-center h-full gap-2", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "h-8 w-8", children: _jsx(MoreVertical, { size: 16 }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [accessState !== "UNLOCKED" ? (_jsx(DropdownMenuItem, { onClick: handlePromptAction, children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Lock, { size: 16 }), _jsx("span", { children: "Unlock" })] }) })) : (_jsx(DropdownMenuItem, { onClick: handlePromptAction, children: "\"Copy prompt\"" })), _jsx(DropdownMenuItem, { onClick: toggleTheme, children: "Toggle theme" }), _jsx(DropdownMenuItem, { onClick: handleShare, children: "Share component" }), _jsx(DropdownMenuItem, { onClick: handleOpenComponentPage, children: isOpening ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Spinner, { size: 16, color: "#ffffff" }), _jsx("span", { children: "Opening..." })] })) : ("Open component page") })] })] }) })] }))] }), showUnlockDialog && (_jsx(Dialog, { open: showUnlockDialog, onOpenChange: setShowUnlockDialog, children: _jsx(DialogContent, { className: "w-fit", children: _jsx(PayWall, { accessState: accessState, component: demo.component }) }) }))] }));
}
//# sourceMappingURL=component.js.map