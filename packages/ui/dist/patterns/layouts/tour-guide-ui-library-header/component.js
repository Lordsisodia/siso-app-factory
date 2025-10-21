/*
<ai_context>
Enhanced header component for the We Are Excursions platform.
Features improved spacing, better visual hierarchy, sophisticated mobile menu with category dropdowns,
and modern design with glassmorphism effects.
</ai_context>
*/
"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { MapPin, Calendar, Heart, Compass, Info, ChevronDown, User, Settings, Waves, Mountain, Camera, Utensils, Music, Plane, Car, Building, Sun, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { ThemeSwitcher } from "./utilities/theme-switcher";
// Performance optimization: throttle function
const throttle = (func, delay) => {
    let timeoutId = null;
    let lastExecTime = 0;
    return (...args) => {
        const currentTime = Date.now();
        if (currentTime - lastExecTime > delay) {
            func(...args);
            lastExecTime = currentTime;
        }
        else {
            if (timeoutId)
                clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
};
const navLinks = [
    { href: "/activities", label: "All Activities", icon: Compass },
    { href: "/about", label: "About", icon: Info },
    { href: "/blog", label: "Blog", icon: FileText }
];
const signedInLinks = [
    { href: "/bookings", label: "My Bookings", icon: Calendar },
    { href: "/wishlist", label: "Wishlist", icon: Heart }
];
const activityCategories = [
    {
        href: "/activities?category=water_sports",
        label: "Water Sports",
        icon: Waves,
        description: "Diving, sailing, jet skiing and more"
    },
    {
        href: "/activities?category=land_adventures",
        label: "Land Adventures",
        icon: Mountain,
        description: "Hiking, cycling, rock climbing"
    },
    {
        href: "/activities?category=cultural",
        label: "Cultural Tours",
        icon: Camera,
        description: "Museums, historic sites, local experiences"
    },
    {
        href: "/activities?category=food_wine",
        label: "Food & Wine",
        icon: Utensils,
        description: "Tastings, cooking classes, markets"
    },
    {
        href: "/activities?category=nightlife",
        label: "Nightlife",
        icon: Music,
        description: "Bars, clubs, evening entertainment"
    },
    {
        href: "/activities?category=day_trips",
        label: "Day Trips",
        icon: Car,
        description: "Explore beyond Mallorca"
    }
];
const quickLinks = [
    { href: "/popular", label: "Popular Activities", icon: Sun },
    { href: "/deals", label: "Special Deals", icon: Heart },
    { href: "/transport", label: "Transportation", icon: Plane },
    { href: "/accommodation", label: "Hotels & Stays", icon: Building }
];
export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    console.log("🔥 Header component is rendering!");
    // Check if Clerk is available
    const isClerkAvailable = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleScroll = useCallback(throttle(() => {
        setIsScrolled(window.scrollY > 10);
    }, 16), // 60fps throttling
    []);
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);
    // Safe Clerk component for authenticated users
    function SafeSignedIn({ children }) {
        if (!isClerkAvailable) {
            return null;
        }
        return _jsx(SignedIn, { children: children });
    }
    // Safe Clerk component for unauthenticated users
    function SafeSignedOut({ children }) {
        if (!isClerkAvailable) {
            // If Clerk is not available, show the content (as if user is signed out)
            return _jsx(_Fragment, { children: children });
        }
        return _jsx(SignedOut, { children: children });
    }
    // Safe user button component
    function SafeUserButton() {
        if (!isClerkAvailable) {
            return null;
        }
        return _jsx(UserButton, {});
    }
    // Safe sign in button
    function SafeSignInButton() {
        if (!isClerkAvailable) {
            return (_jsx(Button, { variant: "ghost", size: "sm", className: "text-white hover:bg-white/10 hover:text-rose-200", children: "Sign In" }));
        }
        return (_jsx(SignInButton, { children: _jsx(Button, { variant: "ghost", size: "sm", className: "text-white hover:bg-white/10 hover:text-rose-200", children: "Sign In" }) }));
    }
    // Safe sign up button
    function SafeSignUpButton() {
        if (!isClerkAvailable) {
            return (_jsx(Button, { size: "sm", className: "bg-gradient-to-r from-yellow-400 to-amber-500 font-semibold text-black hover:from-yellow-500 hover:to-amber-600 hover:shadow-lg", children: "Sign Up" }));
        }
        return (_jsx(SignUpButton, { children: _jsx(Button, { size: "sm", className: "bg-gradient-to-r from-yellow-400 to-amber-500 font-semibold text-black hover:from-yellow-500 hover:to-amber-600 hover:shadow-lg", children: "Sign Up" }) }));
    }
    return (_jsx("header", { className: "circular-nav-header sticky left-1/2 top-0 z-[9999] w-full max-w-5xl -translate-x-1/2 px-6 pt-6", children: _jsx("div", { className: `relative mx-auto flex items-center justify-between rounded-full border border-white/30 px-6 py-3 shadow-lg transition-all duration-500 ${isScrolled ? "bg-white/25 shadow-xl" : "bg-white/20"}`, style: {
                backdropFilter: "blur(20px) saturate(150%)",
                WebkitBackdropFilter: "blur(20px) saturate(150%)",
                boxShadow: isScrolled
                    ? "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                    : "0 4px 24px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
            }, children: _jsxs("div", { className: "relative flex w-full items-center justify-between", children: [_jsxs(Link, { href: "/", className: "group flex items-center space-x-2 transition-all duration-300 hover:scale-[1.02]", children: [_jsxs("div", { className: "relative overflow-hidden rounded-full bg-gradient-to-br from-orange-400/80 via-yellow-500/70 to-amber-500/80 p-2 shadow-lg shadow-orange-500/20 backdrop-blur-sm transition-all duration-300 group-hover:shadow-orange-500/40", children: [_jsx("div", { className: "absolute inset-0 bg-white/10 backdrop-blur-sm" }), _jsx(MapPin, { className: "relative z-10 size-4 font-bold text-white drop-shadow-lg" })] }), _jsxs("div", { className: "hidden text-sm font-bold transition-all duration-300 group-hover:text-white sm:block", children: [_jsx("span", { className: "text-black drop-shadow-lg", children: "WE" }), _jsx("span", { className: "text-yellow-400 drop-shadow-lg", children: " ARE " }), _jsx("span", { className: "text-white drop-shadow-lg", children: "EXCURSIONS" })] })] }), _jsx("nav", { className: "flex items-center justify-center", children: _jsx(NavigationMenu, { children: _jsxs(NavigationMenuList, { className: "hidden items-center space-x-1 lg:flex", children: [navLinks.map(link => {
                                        const IconComponent = link.icon;
                                        return (_jsx(NavigationMenuItem, { children: link.href === "/activities" ? (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", className: "flex items-center gap-2 border border-transparent px-4 py-2 text-white/90 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/15 hover:text-white hover:shadow-lg", children: [_jsx(IconComponent, { className: "size-4" }), link.label, _jsx(ChevronDown, { className: "size-3" })] }) }), _jsxs(DropdownMenuContent, { className: "bg-white/8 w-80 border-white/20 shadow-xl backdrop-blur-xl", style: {
                                                            backdropFilter: "blur(20px) saturate(150%)",
                                                            WebkitBackdropFilter: "blur(20px) saturate(150%)"
                                                        }, children: [_jsx("div", { className: "grid grid-cols-1 gap-1 p-2", children: activityCategories.map(category => {
                                                                    const CategoryIcon = category.icon;
                                                                    return (_jsx(DropdownMenuItem, { asChild: true, children: _jsxs(Link, { href: category.href, className: "flex items-start gap-3 rounded-lg p-3 text-white/90 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white", children: [_jsx(CategoryIcon, { className: "mt-0.5 size-5 text-yellow-400" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: category.label }), _jsx("div", { className: "text-xs text-white/60", children: category.description })] })] }) }, category.href));
                                                                }) }), _jsx(DropdownMenuSeparator, { className: "bg-white/10" }), _jsx("div", { className: "p-2", children: _jsx(DropdownMenuItem, { asChild: true, children: _jsxs(Link, { href: "/activities", className: "flex items-center gap-2 rounded-lg p-2 font-medium text-orange-400 transition-all duration-200 hover:bg-white/10 hover:text-orange-300", children: [_jsx(Compass, { className: "size-4" }), "View All Activities"] }) }) })] })] })) : (_jsxs(Link, { href: link.href, className: "flex items-center gap-1 rounded-full border border-transparent px-3 py-1.5 text-sm text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/15 hover:text-white", children: [_jsx(IconComponent, { className: "size-3" }), link.label] })) }, link.href));
                                    }), _jsx(SafeSignedIn, { children: signedInLinks.map(link => {
                                            const IconComponent = link.icon;
                                            return (_jsx(NavigationMenuItem, { children: _jsxs(Link, { href: link.href, className: "flex items-center gap-1 rounded-full border border-transparent px-3 py-1.5 text-sm text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/15 hover:text-white", children: [_jsx(IconComponent, { className: "size-3" }), link.label] }) }, link.href));
                                        }) })] }) }) }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(SafeSignedOut, { children: _jsxs("div", { className: "hidden items-center space-x-3 lg:flex", children: [_jsx(SafeSignInButton, {}), _jsx(SafeSignUpButton, {})] }) }), _jsx(SafeSignedIn, { children: _jsx("div", { className: "hidden lg:block", children: _jsx(SafeUserButton, {}) }) }), _jsx("div", { className: "hidden lg:block", children: _jsx(ThemeSwitcher, {}) }), _jsxs(Sheet, { open: isMenuOpen, onOpenChange: setIsMenuOpen, children: [_jsx(SheetTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "icon", className: "relative border border-transparent text-white backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/15 hover:text-white lg:hidden", onClick: toggleMenu, children: [_jsxs("div", { className: "flex flex-col space-y-1", children: [_jsx("div", { className: `h-0.5 w-5 bg-current transition-all duration-300 ${isMenuOpen ? "translate-y-1.5 rotate-45" : ""}` }), _jsx("div", { className: `h-0.5 w-5 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}` }), _jsx("div", { className: `h-0.5 w-5 bg-current transition-all duration-300 ${isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}` })] }), _jsx("span", { className: "sr-only", children: "Toggle menu" })] }) }), _jsx(SheetContent, { side: "right", className: "w-full border-l border-white/20 bg-white/5 backdrop-blur-xl sm:max-w-sm", style: {
                                            backdropFilter: "blur(20px) saturate(150%)",
                                            WebkitBackdropFilter: "blur(20px) saturate(150%)"
                                        }, children: _jsxs("div", { className: "flex flex-col space-y-6 pt-6", children: [_jsx("div", { className: "flex items-center justify-between border-b border-white/10 pb-6", children: _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs("div", { className: "relative overflow-hidden rounded-lg bg-gradient-to-br from-orange-400/80 to-amber-500/80 p-2 shadow-lg backdrop-blur-sm", children: [_jsx("div", { className: "absolute inset-0 bg-white/10 backdrop-blur-sm" }), _jsx(MapPin, { className: "relative z-10 size-5 font-bold text-white" })] }), _jsxs("span", { className: "text-lg font-bold", children: [_jsx("span", { className: "text-black drop-shadow-lg", children: "WE" }), _jsxs("span", { className: "text-yellow-400 drop-shadow-lg", children: [" ", "ARE", " "] }), _jsx("span", { className: "text-white drop-shadow-lg", children: "EXCURSIONS" })] })] }) }), _jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide text-orange-400", children: "Quick Actions" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: quickLinks.map(link => {
                                                                const LinkIcon = link.icon;
                                                                return (_jsxs(Link, { href: link.href, className: "flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-center text-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white", onClick: () => setIsMenuOpen(false), children: [_jsx(LinkIcon, { className: "size-5 text-orange-400" }), _jsx("span", { className: "text-xs font-medium", children: link.label })] }, link.href));
                                                            }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide text-rose-300", children: "Navigation" }), _jsx("div", { className: "space-y-1", children: navLinks.map(link => {
                                                                const IconComponent = link.icon;
                                                                return (_jsxs(Link, { href: link.href, className: "flex items-center gap-3 rounded-lg p-3 text-gray-300 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-300", onClick: () => setIsMenuOpen(false), children: [_jsx(IconComponent, { className: "size-5" }), _jsx("span", { className: "font-medium", children: link.label })] }, link.href));
                                                            }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide text-rose-300", children: "Activity Categories" }), _jsx("div", { className: "space-y-1", children: activityCategories.map(category => {
                                                                const CategoryIcon = category.icon;
                                                                return (_jsxs(Link, { href: category.href, className: "flex items-start gap-3 rounded-lg p-3 text-gray-300 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-300", onClick: () => setIsMenuOpen(false), children: [_jsx(CategoryIcon, { className: "mt-0.5 size-5 text-yellow-400" }), _jsxs("div", { children: [_jsx("div", { className: "font-medium", children: category.label }), _jsx("div", { className: "text-xs text-gray-400", children: category.description })] })] }, category.href));
                                                            }) })] }), _jsx(SafeSignedIn, { children: _jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide text-rose-300", children: "Account" }), _jsx("div", { className: "space-y-1", children: signedInLinks.map(link => {
                                                                    const IconComponent = link.icon;
                                                                    return (_jsxs(Link, { href: link.href, className: "flex items-center gap-3 rounded-lg p-3 text-gray-300 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-300", onClick: () => setIsMenuOpen(false), children: [_jsx(IconComponent, { className: "size-5" }), _jsx("span", { className: "font-medium", children: link.label })] }, link.href));
                                                                }) })] }) }), _jsx(SafeSignedOut, { children: _jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: "text-sm font-semibold uppercase tracking-wide text-rose-300", children: "Account" }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Button, { variant: "ghost", className: "w-full justify-start gap-3 rounded-lg bg-rose-500/5 p-3 text-gray-300 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-300", onClick: () => setIsMenuOpen(false), children: [_jsx(User, { className: "size-5" }), _jsx("span", { className: "font-medium", children: "Sign In" })] }), _jsxs(Button, { className: "w-full justify-start gap-3 rounded-lg bg-gradient-to-r from-yellow-400 to-amber-500 p-3 text-black transition-all duration-200 hover:from-yellow-500 hover:to-amber-600", onClick: () => setIsMenuOpen(false), children: [_jsx(User, { className: "size-5" }), _jsx("span", { className: "font-medium", children: "Sign Up" })] })] })] }) }), _jsx("div", { className: "mt-auto border-t border-rose-500/20 pt-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3 text-gray-300", children: [_jsx(Settings, { className: "size-5" }), _jsx("span", { className: "font-medium", children: "Theme" })] }), _jsx(ThemeSwitcher, {})] }) })] }) })] })] })] }) }) }));
}
//# sourceMappingURL=component.js.map