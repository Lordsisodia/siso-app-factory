"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { LayoutDashboard, Activity, Users, Calendar, Image, BarChart3, FileText, CreditCard, Settings, Menu, X, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
// Mock notification data - replace with real API calls
const getNotificationCount = (itemName) => {
    const notifications = {
        Bookings: 3,
        Users: 5,
        Payments: 2
    };
    return notifications[itemName] || 0;
};
const navigationGroups = [
    {
        header: "Main",
        items: [
            {
                name: "Dashboard",
                href: "/admin/dashboard",
                icon: LayoutDashboard,
                ariaLabel: "Go to dashboard overview"
            }
        ]
    },
    {
        header: "Management",
        items: [
            {
                name: "Activities",
                href: "/admin/activities",
                icon: Activity,
                ariaLabel: "Manage activity listings"
            },
            {
                name: "Bookings",
                href: "/admin/bookings",
                icon: Calendar,
                ariaLabel: "View and manage bookings",
                notifications: getNotificationCount("Bookings")
            },
            {
                name: "Users",
                href: "/admin/users",
                icon: Users,
                ariaLabel: "Manage user accounts",
                notifications: getNotificationCount("Users")
            },
            {
                name: "Media",
                href: "/admin/media",
                icon: Image,
                ariaLabel: "Manage media library"
            },
            {
                name: "Blog",
                href: "/admin/blog",
                icon: FileText,
                ariaLabel: "Manage blog content"
            },
            {
                name: "Payments",
                href: "/admin/payments",
                icon: CreditCard,
                ariaLabel: "Manage payments and transactions",
                notifications: getNotificationCount("Payments")
            }
        ]
    },
    {
        header: "Analytics",
        items: [
            {
                name: "Analytics",
                href: "/admin/analytics",
                icon: BarChart3,
                ariaLabel: "View analytics and reports"
            }
        ]
    },
    {
        header: "Settings",
        items: [
            {
                name: "Settings",
                href: "/admin/settings",
                icon: Settings,
                ariaLabel: "Configure system settings"
            }
        ]
    }
];
export default function AdminSidebar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const pathname = usePathname();
    const sidebarRef = useRef(null);
    // Flatten navigation items for keyboard navigation
    const flatNavItems = navigationGroups.flatMap(group => group.items);
    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!sidebarRef.current?.contains(document.activeElement))
                return;
            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setFocusedIndex(prev => Math.min(prev + 1, flatNavItems.length - 1));
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setFocusedIndex(prev => Math.max(prev - 1, 0));
                    break;
                case "Enter":
                case " ":
                    if (focusedIndex >= 0) {
                        e.preventDefault();
                        const focusedItem = flatNavItems[focusedIndex];
                        window.location.href = focusedItem.href;
                    }
                    break;
                case "Escape":
                    e.preventDefault();
                    setFocusedIndex(-1);
                    document.activeElement?.blur();
                    break;
                case "Home":
                    e.preventDefault();
                    setFocusedIndex(0);
                    break;
                case "End":
                    e.preventDefault();
                    setFocusedIndex(flatNavItems.length - 1);
                    break;
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [focusedIndex, flatNavItems]);
    // Load persisted collapsed state on mount
    useEffect(() => {
        const stored = localStorage.getItem("admin:sidebar-collapsed");
        if (stored !== null) {
            setCollapsed(stored === "true");
        }
    }, []);
    // Persist to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("admin:sidebar-collapsed", String(collapsed));
    }, [collapsed]);
    return (_jsxs(Tooltip.Provider, { children: [_jsx("div", { className: "md:hidden", children: _jsx(motion.div, { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), className: "hover:bg-exc-rose-700 fixed left-4 top-4 z-50 text-white", "aria-label": isMobileMenuOpen
                            ? "Close navigation menu"
                            : "Open navigation menu", children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { rotate: 0, opacity: 0 }, animate: { rotate: 0, opacity: 1 }, exit: { rotate: 90, opacity: 0 }, transition: { duration: 0.15 }, children: isMobileMenuOpen ? _jsx(X, { size: 20 }) : _jsx(Menu, { size: 20 }) }, isMobileMenuOpen ? "close" : "open") }) }) }) }), _jsx(motion.div, { ref: sidebarRef, initial: { x: -280 }, animate: {
                    x: 0,
                    width: collapsed ? 80 : 256
                }, transition: {
                    type: "spring",
                    damping: 20,
                    stiffness: 150,
                    duration: 0.3
                }, className: `${collapsed ? "w-20" : "w-64"} bg-exc-black transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-40 h-screen md:relative md:h-auto md:min-h-screen md:translate-x-0`, role: "navigation", "aria-label": "Main navigation", children: _jsxs("div", { className: "flex h-full flex-col", children: [_jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, className: "border-exc-surface flex h-16 shrink-0 items-center gap-3 border-b px-6", children: [_jsx(motion.div, { whileHover: { rotate: 360, scale: 1.1 }, transition: { duration: 0.6, ease: "easeInOut" }, className: "bg-exc-rose flex size-10 items-center justify-center rounded-full shadow-lg", children: _jsx("span", { className: "text-lg font-bold text-white", children: "W" }) }), _jsx(AnimatePresence, { children: !collapsed && (_jsx(motion.h1, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, transition: { duration: 0.2 }, className: "text-exc-rose ml-2 text-lg font-bold leading-tight", children: "We Are Excursions" })) }), _jsx(AnimatePresence, { children: !collapsed && (_jsx(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0 }, className: "relative ml-auto mr-2", children: _jsxs(Button, { variant: "ghost", size: "icon", className: "hover:text-exc-rose relative text-gray-400", "aria-label": "Notifications", children: [_jsx(Bell, { size: 18 }), _jsx(motion.span, { animate: { scale: [1, 1.2, 1] }, transition: { duration: 2, repeat: Infinity }, className: "bg-exc-rose absolute -right-1 -top-1 flex size-3 items-center justify-center rounded-full", children: _jsx("span", { className: "text-xs font-bold text-white", children: "3" }) })] }) })) }), _jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: _jsx(Button, { variant: "ghost", size: "icon", className: "hover:text-exc-rose text-gray-400 md:inline-flex", onClick: () => setCollapsed(c => !c), "aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar", children: _jsx(AnimatePresence, { mode: "wait", children: _jsx(motion.div, { initial: { rotate: 0, opacity: 0 }, animate: { rotate: 0, opacity: 1 }, exit: { rotate: 180, opacity: 0 }, transition: { duration: 0.15 }, children: collapsed ? _jsx(Menu, { size: 20 }) : _jsx(X, { size: 20 }) }, collapsed ? "expand" : "collapse") }) }) })] }), _jsx("nav", { className: "flex-1 space-y-4 overflow-y-auto px-2 py-4", children: navigationGroups.map((group, index) => (_jsxs("div", { className: `mb-4 ${index > 0 ? "border-exc-surface/30 border-t pt-4" : ""}`, children: [!collapsed && (_jsx("div", { className: "border-exc-surface mb-2 border-l-2 px-3 text-xs font-medium uppercase tracking-widest text-gray-500/80", children: group.header })), _jsx("div", { className: "space-y-1", children: group.items.map((item, itemIndex) => {
                                            const isActive = pathname === item.href;
                                            const globalIndex = flatNavItems.findIndex(navItem => navItem.name === item.name);
                                            const isFocused = globalIndex === focusedIndex;
                                            const hasNotifications = item.notifications > 0;
                                            return (_jsxs(Tooltip.Root, { delayDuration: 300, children: [_jsx(Tooltip.Trigger, { asChild: true, children: _jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: itemIndex * 0.03 }, whileHover: { x: 2 }, whileTap: { scale: 0.98 }, children: _jsxs(Link, { href: item.href, className: `group relative flex items-center rounded-lg p-3 text-sm font-medium transition-all duration-200 ${isActive
                                                                    ? "border-exc-rose bg-exc-rose/90 shadow-exc-rose/20 translate-x-1 border-l-4 pl-4 text-white shadow-lg"
                                                                    : "hover:bg-exc-rose-700/50 border-l-4 border-transparent pl-4 text-gray-300 hover:translate-x-1 hover:text-white"} ${collapsed ? "justify-center px-0" : ""} ${isFocused
                                                                    ? "ring-exc-rose ring-offset-exc-black ring-2 ring-offset-2"
                                                                    : ""} focus:ring-exc-rose focus:ring-offset-exc-black focus:outline-none focus:ring-2 focus:ring-offset-2`, onClick: () => setIsMobileMenuOpen(false), tabIndex: 0, "aria-current": isActive ? "page" : undefined, "aria-label": item.ariaLabel, children: [_jsx(motion.div, { whileHover: { scale: 1.05 }, transition: {
                                                                            type: "spring",
                                                                            stiffness: 400,
                                                                            damping: 10
                                                                        }, children: _jsx(item.icon, { className: `mr-3 size-5 shrink-0 transition-all duration-200 ${isActive
                                                                                ? "text-white"
                                                                                : "text-gray-400 group-hover:text-gray-300"} ${collapsed ? "mx-auto" : ""}`, "aria-hidden": "true" }) }), !collapsed && (_jsx(motion.span, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.1 }, children: item.name })), hasNotifications && (_jsx(motion.div, { initial: { scale: 0 }, animate: { scale: 1 }, whileHover: { scale: 1.1 }, className: `absolute ${collapsed ? "right-0 top-0 -translate-y-1 translate-x-1" : "right-3"} bg-exc-rose flex h-5 min-w-5 items-center justify-center rounded-full text-xs font-bold text-white shadow-lg`, children: _jsx(motion.span, { animate: { scale: [1, 1.1, 1] }, transition: {
                                                                                duration: 2,
                                                                                repeat: Infinity,
                                                                                ease: "easeInOut"
                                                                            }, children: item.notifications }) })), isActive && !collapsed && !hasNotifications && (_jsxs(motion.div, { initial: { opacity: 0, scale: 0 }, animate: { opacity: 1, scale: 1 }, className: "absolute right-3 flex items-center", children: [_jsx(motion.span, { animate: { scale: [1, 1.2, 1] }, transition: {
                                                                                    duration: 2,
                                                                                    repeat: Infinity
                                                                                }, className: "size-2 rounded-full bg-white/90" }), _jsx("span", { className: "ml-1 text-xs font-bold text-white/80", children: "\u2022" })] })), isActive && collapsed && !hasNotifications && (_jsx(motion.span, { initial: { scale: 0 }, animate: { scale: 1 }, className: "absolute right-1 top-1 size-2 animate-pulse rounded-full bg-white" }))] }) }) }), collapsed && (_jsx(Tooltip.Portal, { children: _jsxs(Tooltip.Content, { side: "right", align: "center", className: "bg-exc-surface border-exc-rose/20 z-50 rounded-lg border px-3 py-2 text-sm font-medium text-white shadow-lg", sideOffset: 10, children: [_jsxs(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, className: "flex items-center gap-2", children: [item.name, hasNotifications && (_jsx("span", { className: "bg-exc-rose flex h-5 min-w-5 items-center justify-center rounded-full text-xs font-bold text-white", children: item.notifications }))] }), _jsx(Tooltip.Arrow, { className: "fill-exc-surface" })] }) }))] }, item.name));
                                        }) })] }, group.header))) }), _jsxs("div", { className: "border-exc-surface from-exc-black to-exc-surface/20 flex shrink-0 items-center gap-3 border-t bg-gradient-to-r p-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "bg-exc-rose flex size-9 items-center justify-center rounded-full shadow-lg", children: _jsx("span", { className: "text-sm font-bold text-white", children: "A" }) }), !collapsed && (_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium text-gray-200", children: "Admin User" }), _jsx("span", { className: "text-xs text-gray-400", children: "Administrator" })] }))] }), _jsxs(Button, { variant: "ghost", className: `hover:bg-exc-rose-700 ml-auto text-gray-300 transition-all duration-200 hover:scale-105 hover:text-white ${collapsed ? "size-9 justify-center p-0" : "w-auto justify-start px-3 py-2"}`, children: [_jsx(LogOut, { className: `size-4 ${!collapsed ? "mr-2" : ""}` }), !collapsed && "Sign out"] })] })] }) }), _jsx(AnimatePresence, { children: isMobileMenuOpen && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 }, className: "from-exc-black/80 to-exc-black/50 fixed inset-0 z-30 bg-gradient-to-r md:hidden", onClick: () => setIsMobileMenuOpen(false) })) })] }));
}
//# sourceMappingURL=component.js.map