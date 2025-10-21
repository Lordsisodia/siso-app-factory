"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { atom } from "jotai";
import { SignInButton, SignedIn, SignedOut, useClerk, useUser, } from "@clerk/nextjs";
import { ChevronDown, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";
import { Icons } from "@/components/icons";
import { EditProfileDialog } from "@/components/features/profile/edit-profile-dialog";
import { useAnimation } from "motion/react";
import { useAtom } from "jotai";
import { sidebarOpenAtom } from "@/components/features/main-page/main-layout";
import { useTheme } from "next-themes";
import { useAuth } from "@clerk/nextjs";
import { userStateAtom } from "@/lib/store/user-store";
import { useClerkSupabaseClient } from "@/lib/clerk";
import { useQuery } from "@tanstack/react-query";
import { trackAttribution, ATTRIBUTION_SOURCE, SOURCE_DETAIL, } from "@/lib/attribution-tracking";
import { Logo } from "./logo";
export const searchQueryAtom = atom("");
function HeaderContent({ text, variant = "default", shouldRender, }) {
    if (!shouldRender)
        return null;
    const inputRef = React.useRef(null);
    const isMobile = useIsMobile();
    const { signOut } = useClerk();
    const [showEditProfile, setShowEditProfile] = useState(false);
    const controls = useAnimation();
    const router = useRouter();
    const [open, setSidebarOpen] = useAtom(sidebarOpenAtom);
    const { theme, setTheme } = useTheme();
    const { userId } = useAuth();
    const { user: clerkUser } = useUser();
    const [userState, setUserState] = useAtom(userStateAtom);
    const client = useClerkSupabaseClient();
    // Fetch combined user state using React Query
    const { data: userData, isLoading: isUserDataLoading } = useQuery({
        queryKey: ["user", userId, "state"],
        queryFn: async () => {
            if (!userId)
                return null;
            const { data, error } = await client.rpc("get_user_state", {
                user_id_param: userId,
            });
            if (error) {
                console.error("Error fetching user state:", error);
                return null;
            }
            return data;
        },
        enabled: !!userId,
        staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
        refetchOnWindowFocus: false, // Don't refetch on window focus
        refetchInterval: 5 * 60 * 1000,
    });
    // Fetch subscription using React Query
    const { data: subscription, isLoading: isSubscriptionLoading } = useQuery({
        queryKey: ["user", userId, "subscription"],
        queryFn: async () => {
            const response = await fetch("/api/stripe/get-subscription");
            if (!response.ok) {
                throw new Error("Failed to fetch subscription");
            }
            return response.json();
        },
        enabled: !!userId,
        staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
        refetchOnWindowFocus: false, // Don't refetch on window focus
        refetchInterval: 5 * 60 * 1000,
    });
    // Update global state when data changes
    useEffect(() => {
        if (userData) {
            setUserState((prev) => ({
                ...prev,
                profile: userData.profile,
                isProfileLoading: isUserDataLoading,
                subscription: subscription || null,
                isSubscriptionLoading,
                clerkUser: clerkUser || null,
                balance: userData.usage?.balance || null,
                isBalanceLoading: isUserDataLoading,
                lastFetched: Date.now(),
            }));
        }
    }, [
        userData,
        isUserDataLoading,
        subscription,
        isSubscriptionLoading,
        clerkUser,
        setUserState,
    ]);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault();
                inputRef.current?.focus();
            }
            else if (event.key === "Escape") {
                inputRef.current?.blur();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);
    const handleBookmarksClick = () => {
        if (userState.profile?.display_username) {
            router.push(`/${userState.profile.display_username}?tab=bookmarks`);
        }
        else if (clerkUser?.externalAccounts?.[0]?.username) {
            router.push(`/${userState.profile?.username}?tab=bookmarks`);
        }
    };
    const handleRedirectToStudio = () => {
        if (userState.profile?.display_username) {
            router.push(`/studio/${userState.profile.display_username}?new=true`);
        }
        else if (userState.profile?.username) {
            router.push(`/studio/${userState.profile.username}?new=true`);
        }
        else {
            router.push("/studio?new=true");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: cn("flex fixed top-0 left-0 right-0 h-14 z-40 items-center px-4 py-3 text-foreground", {
                    "border-b border-border/40 bg-background": variant !== "publish",
                }), children: [_jsxs("div", { className: cn("flex items-center flex-1", open ? "md:ml-64 md:pl-3" : ""), children: [_jsx(Logo, {}), text && !isMobile && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Icons.slash, { className: "text-border w-[22px] h-[22px]" }), _jsx("span", { className: "text-[14px] font-medium", children: text })] })), _jsx("div", { className: cn("hidden md:block w-[400px]", open ? "ml-4" : "absolute left-1/2 -translate-x-1/2"), children: _jsxs(Button, { variant: "outline", className: cn("relative h-8 w-full justify-start bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 hidden md:inline-flex"), onClick: () => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true })), children: [_jsx("span", { className: "hidden lg:inline-flex mr-4", children: "Global search..." }), _jsx("span", { className: "inline-flex lg:hidden mr-4", children: "Search..." }), _jsxs("kbd", { className: "pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-sans text-[11px] opacity-100 sm:flex", children: [_jsx("span", { className: "text-[11px] font-sans", children: "\u2318" }), "K"] })] }) })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsxs(SignedIn, { children: [_jsx("div", { className: "flex items-center", children: !isMobile && variant !== "publish" && (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: handleBookmarksClick, className: "mr-2", "aria-label": "Saved components", children: _jsx(Bookmark, { size: 18 }) }), !open &&
                                                    !userState.isSubscriptionLoading &&
                                                    !userState.subscription && (_jsx(Button, { variant: "ghost", size: "sm", asChild: true, className: "gap-1.5 relative cursor-pointer space-x-2 font-regular ease-out duration-200 outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 hover:bg-transparent", children: _jsx(Link, { href: "/pricing", onClick: () => trackAttribution(ATTRIBUTION_SOURCE.HEADER, SOURCE_DETAIL.HEADER_GET_PRO_LINK), className: "bg-gradient-to-r from-[hsl(var(--primary-gradient-start))] to-[hsl(var(--primary-gradient-end))] bg-clip-text text-transparent", children: _jsx("span", { className: "font-medium", children: "Get Pro" }) }) })), _jsxs("div", { className: "inline-flex -space-x-px divide-x divide-primary-foreground/30 rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse", children: [_jsx(Button, { onClick: handleRedirectToStudio, className: "rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10", children: "Add new" }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { className: "rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 !border !border-[hsl(var(--primary-gradient-start))] hover:!border-[hsl(var(--primary-gradient-start))] hover:opacity-90 hover:text-accent", size: "icon", "aria-label": "Component options", children: _jsx(ChevronDown, { size: 16, strokeWidth: 2, "aria-hidden": "true" }) }) }), _jsxs(DropdownMenuContent, { className: "w-64", side: "bottom", sideOffset: 4, align: "end", children: [_jsx(DropdownMenuItem, { onClick: handleRedirectToStudio, className: "cursor-pointer", children: _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("span", { className: "text-sm font-medium", children: "Publish component" }), _jsx("span", { className: "text-xs text-muted-foreground", children: "Create and publish a new component to the registry" })] }) }), _jsx(DropdownMenuItem, { asChild: true, children: _jsx(Link, { href: "/publish/template", className: "cursor-pointer", children: _jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("span", { className: "text-sm font-medium", children: "Publish template" }), _jsx("span", { className: "text-xs text-muted-foreground", children: "Create and publish a new website template" })] }) }) }), _jsx(DropdownMenuItem, { asChild: true, children: _jsx(Link, { href: "/import", className: "cursor-pointer", children: _jsxs("div", { className: "flex flex-col gap-1", children: [_jsxs("span", { className: "text-sm font-medium flex items-center gap-1", children: ["Import from registry", _jsx(Badge, { variant: "secondary", className: "h-5 text-[11px] tracking-wide font-medium uppercase px-1.5 py-0 leading-none", children: "beta" })] }), _jsx("span", { className: "text-xs text-muted-foreground", children: "Import an existing component from shadcn registry" })] }) }) })] })] })] })] })) }), _jsx(Button, { variant: "ghost", size: "icon", className: "md:hidden mr-2", onClick: () => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true })), "aria-label": "Search", children: _jsx(Icons.search, { className: "h-6 w-6" }) }), _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { className: "cursor-pointer rounded-full ml-2", children: _jsx(UserAvatar, { src: userState.profile?.display_image_url ||
                                                        clerkUser?.imageUrl ||
                                                        undefined, alt: userState.profile?.display_name ||
                                                        clerkUser?.fullName ||
                                                        undefined, size: 32 }) }), _jsxs(DropdownMenuContent, { className: "w-[240px] p-0", align: "end", children: [_jsx("div", { className: "p-3 border-b border-border", children: _jsx("p", { className: "text-sm text-foreground", children: clerkUser?.primaryEmailAddress?.emailAddress }) }), _jsxs("div", { className: "p-1", children: [_jsx(DropdownMenuItem, { className: "text-sm px-3 py-2 cursor-pointer", onSelect: () => {
                                                                    if (userState.profile?.display_username) {
                                                                        router.push(`/${userState.profile.display_username}`);
                                                                    }
                                                                    else if (clerkUser?.externalAccounts?.[0]?.username) {
                                                                        router.push(`/${userState.profile?.username}`);
                                                                    }
                                                                }, children: "View Profile" }), _jsxs(DropdownMenuItem, { className: "text-sm px-3 py-2 cursor-pointer flex items-center justify-between", onSelect: () => {
                                                                    if (userState.profile?.display_username) {
                                                                        router.push(`/studio/${userState.profile.display_username}`);
                                                                    }
                                                                    else if (userState.profile?.username) {
                                                                        router.push(`/studio/${userState.profile.username}`);
                                                                    }
                                                                    else {
                                                                        router.push("/studio");
                                                                    }
                                                                }, children: ["Creator Studio", _jsx(Icons.layoutDashboard, { className: "h-4 w-4" })] }), _jsxs(DropdownMenuItem, { className: "text-sm px-3 py-2 cursor-pointer flex items-center justify-between", onSelect: () => router.push("/settings/profile"), children: ["Settings", _jsx(Icons.settings, { className: "h-4 w-4" })] }), _jsxs(DropdownMenuItem, { className: "text-sm px-3 py-2 cursor-pointer flex items-center justify-between", onSelect: () => (window.location.href = "/settings/billing"), children: ["Billing", _jsx(Icons.creditCard, { className: "h-4 w-4" })] })] }), _jsxs("div", { className: "border-t border-border p-1", children: [_jsx(DropdownMenuItem, { className: "text-sm px-3 py-2 cursor-pointer", onSelect: () => (window.location.href = "/api-access"), children: "API Docs & Keys" }), _jsx(DropdownMenuItem, { className: "text-sm px-3 py-2 cursor-pointer", onSelect: () => window.open("/terms", "_blank"), children: "Terms of Service" })] }), _jsxs("div", { className: "border-t border-border p-1", children: [_jsxs(DropdownMenuItem, { className: "text-sm px-3 py-2 cursor-pointer flex justify-between items-center", onSelect: () => window.open("https://x.com/serafimcloud", "_blank"), children: [_jsx("span", { children: "Twitter" }), _jsx("div", { className: "flex items-center justify-center w-4", children: _jsx(Icons.twitter, { className: "h-3 w-3" }) })] }), _jsxs(DropdownMenuItem, { className: "text-sm px-3 py-2 cursor-pointer flex justify-between items-center", onSelect: () => window.open("https://discord.gg/Qx4rFunHfm", "_blank"), children: [_jsx("span", { children: "Discord" }), _jsx(Icons.discord, { className: "h-4 w-4" })] }), _jsxs(DropdownMenuItem, { className: "text-sm px-3 py-2 cursor-pointer flex justify-between items-center", onSelect: () => window.open("https://github.com/serafimcloud/21st", "_blank"), children: [_jsx("span", { children: "GitHub" }), _jsx(Icons.gitHub, { className: "h-4 w-4" })] })] }), _jsxs("div", { className: "border-t border-border p-1", children: [_jsxs("li", { className: "flex items-center justify-between px-3 py-2 text-sm", children: [_jsx("span", { children: "Theme" }), _jsxs("fieldset", { className: "flex items-center rounded-full border border-border/40 bg-background", children: [_jsx("legend", { className: "sr-only", children: "Select a display theme:" }), _jsxs("span", { children: [_jsx("input", { type: "radio", id: "theme-switch-light", value: "light", name: "theme", className: "sr-only peer", checked: theme === "light", onChange: () => setTheme("light") }), _jsxs("label", { htmlFor: "theme-switch-light", className: "inline-flex items-center justify-center rounded-full p-1.5 text-sm cursor-pointer text-muted-foreground hover:text-foreground peer-checked:bg-accent peer-checked:text-foreground", children: [_jsx("span", { className: "sr-only", children: "light" }), _jsx(Icons.lightTheme, { className: "h-4 w-4" })] })] }), _jsxs("span", { children: [_jsx("input", { type: "radio", id: "theme-switch-dark", value: "dark", name: "theme", className: "sr-only peer", checked: theme === "dark", onChange: () => setTheme("dark") }), _jsxs("label", { htmlFor: "theme-switch-dark", className: "inline-flex items-center justify-center rounded-full p-1.5 text-sm cursor-pointer text-muted-foreground hover:text-foreground peer-checked:bg-accent peer-checked:text-foreground", children: [_jsx("span", { className: "sr-only", children: "dark" }), _jsx(Icons.darkTheme, { className: "h-4 w-4" })] })] })] })] }), _jsxs(DropdownMenuItem, { className: "text-sm px-3 py-2 cursor-pointer flex justify-between items-center", onSelect: () => setSidebarOpen((prev) => !prev), children: [_jsx("span", { children: "Toggle Sidebar" }), _jsx("div", { className: "flex items-center", children: _jsx(Icons.sidebar, { className: "h-4 w-4" }) })] })] }), _jsx("div", { className: "border-t border-border p-1", children: _jsxs(DropdownMenuItem, { onSelect: () => signOut({ redirectUrl: "/" }), className: "text-sm px-3 py-2 cursor-pointer flex justify-between items-center", onMouseEnter: () => controls.start("hover"), onMouseLeave: () => controls.start("normal"), children: [_jsx("span", { children: "Log Out" }), _jsx(Icons.logout, { size: 16, controls: controls })] }) })] })] })] }), _jsxs(SignedOut, { children: [!isMobile && (_jsx(Button, { variant: "ghost", size: "sm", asChild: true, className: "gap-1.5 relative cursor-pointer space-x-2 font-regular ease-out duration-200 outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 hover:bg-transparent", children: _jsx(Link, { href: "/pricing", onClick: () => trackAttribution(ATTRIBUTION_SOURCE.HEADER, SOURCE_DETAIL.HEADER_GET_PRO_LINK), children: _jsx(TextShimmer, { className: "font-medium [--base-color:hsl(var(--primary-gradient-start))] [--base-gradient-color:hsl(var(--primary-gradient-end))] dark:[--base-color:hsl(var(--primary-gradient-start))] dark:[--base-gradient-color:hsl(var(--primary-gradient-end))]", duration: 1.2, spread: 2, children: "Get Pro" }) }) })), _jsx(Button, { variant: "ghost", size: "icon", className: "md:hidden mr-2", onClick: () => document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true })), "aria-label": "Search", children: _jsx(Icons.search, { className: "h-6 w-6" }) }), !isMobile && (_jsx(SignInButton, { children: _jsx(Button, { children: "Sign up" }) }))] })] })] }), showEditProfile && userState.profile && (_jsx(EditProfileDialog, { isOpen: showEditProfile, setIsOpen: setShowEditProfile, user: {
                    name: clerkUser?.fullName || "",
                    username: clerkUser?.externalAccounts?.[0]?.username || "",
                    image_url: clerkUser?.imageUrl || "",
                    display_name: userState.profile.display_name || null,
                    display_username: userState.profile.display_username || null,
                    display_image_url: userState.profile.display_image_url || null,
                    bio: userState.profile.bio || null,
                }, onUpdate: () => {
                    setShowEditProfile(false);
                    window.location.reload();
                } }))] }));
}
function HeaderWithParams({ text, variant = "default", }) {
    const searchParams = useSearchParams();
    const step = searchParams.get("step");
    const shouldRender = !(variant === "publish" && step);
    return (_jsx(HeaderContent, { text: text, variant: variant, shouldRender: shouldRender }));
}
export function Header({ text, variant = "default", }) {
    return (_jsx(Suspense, { fallback: null, children: _jsx(HeaderWithParams, { text: text, variant: variant }) }));
}
const ListItem = React.forwardRef(({ className, title, children, href, ...props }, ref) => {
    return (_jsx("li", { children: _jsx(NavigationMenuLink, { asChild: true, children: _jsxs(Link, { ref: ref, href: href || "#", className: cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className), ...props, children: [_jsx("div", { className: "text-sm font-medium leading-none text-foreground", children: title }), _jsx("p", { className: "line-clamp-2 text-sm leading-snug text-muted-foreground", children: children })] }) }) }));
});
ListItem.displayName = "ListItem";
//# sourceMappingURL=component.js.map