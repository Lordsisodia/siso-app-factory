"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRouter, usePathname } from "next/navigation";
import { useAnimation } from "motion/react";
import { useClerk } from "@clerk/nextjs";
import { useSidebar } from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { Logo } from "@/components/ui/logo";
import { UserAvatar } from "@/components/ui/user-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, Layers, BarChartBig, CreditCard, ChevronDown, } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAtom } from "jotai";
import { userStateAtom } from "@/lib/store/user-store";
import { partnerModalOpenAtom } from "@/app/studio/[username]/analytics/page.client";
export function StudioHeader({ user }) {
    const router = useRouter();
    const pathname = usePathname();
    const controls = useAnimation();
    const { signOut } = useClerk();
    const { open, setOpen } = useSidebar();
    const [userState] = useAtom(userStateAtom);
    const [, setPartnerModalOpen] = useAtom(partnerModalOpenAtom);
    const isPartner = userState?.profile?.is_partner || false;
    // Get the base username path
    const baseUsername = user.display_username || user.username;
    const basePath = `/studio/${baseUsername}`;
    // Check which item should be active
    const isComponentsActive = pathname === basePath;
    const isAnalyticsActive = pathname.includes("/analytics");
    const isMonetizationActive = pathname.includes("/monetization");
    let currentSection = "Components";
    if (isAnalyticsActive)
        currentSection = "Analytics";
    if (isMonetizationActive)
        currentSection = "Monetization";
    // Handle click on Monetization menu item
    const handleMonetizationClick = () => {
        if (!isPartner) {
            setPartnerModalOpen(true);
        }
    };
    return (_jsxs("header", { className: "flex fixed top-0 left-0 right-0 h-14 z-50 items-center pl-2 pr-4 py-3 text-foreground border-b border-border/40 bg-background", children: [_jsxs("div", { className: "flex items-center flex-1", children: [_jsx(Button, { variant: "ghost", size: "icon", className: "mr-3 hidden sm:flex", onClick: () => setOpen(!open), "aria-label": "Toggle sidebar", children: _jsx(Menu, { className: "h-5 w-5" }) }), _jsx(Logo, { position: "flex", hasLink: false, className: "w-5 h-5 sm:ml-0 ml-3" }), _jsxs("div", { className: "flex items-center gap-2 ml-2", children: [_jsx(Icons.slash, { className: "text-border w-[22px] h-[22px]" }), _jsx("span", { className: "text-[14px] font-medium hidden sm:inline", children: "Creator Studio" }), _jsxs(DropdownMenu, { children: [_jsxs(DropdownMenuTrigger, { className: "sm:hidden flex items-center gap-1 text-[14px] font-medium outline-none", children: [_jsx("span", { children: currentSection }), _jsx(ChevronDown, { className: "h-3.5 w-3.5 ml-1" })] }), _jsxs(DropdownMenuContent, { align: "start", className: "w-[180px] p-1", children: [_jsxs(DropdownMenuItem, { className: cn("flex items-center gap-2 text-sm cursor-pointer", isComponentsActive ? "bg-accent text-accent-foreground" : ""), onSelect: () => router.push(basePath), children: [_jsx(Layers, { className: "h-4 w-4" }), _jsx("span", { children: "Components" })] }), _jsxs(DropdownMenuItem, { className: cn("flex items-center gap-2 text-sm cursor-pointer", isAnalyticsActive ? "bg-accent text-accent-foreground" : ""), onSelect: () => router.push(`${basePath}/analytics`), children: [_jsx(BarChartBig, { className: "h-4 w-4" }), _jsx("span", { children: "Analytics" })] }), _jsxs(DropdownMenuItem, { className: cn("flex items-center gap-2 text-sm cursor-pointer", isMonetizationActive
                                                    ? "bg-accent text-accent-foreground"
                                                    : ""), onSelect: () => {
                                                    if (isPartner) {
                                                        router.push(`${basePath}/monetization`);
                                                    }
                                                    else {
                                                        router.push(`${basePath}/analytics#monetization`);
                                                        handleMonetizationClick();
                                                    }
                                                }, children: [_jsx(CreditCard, { className: "h-4 w-4" }), _jsx("span", { children: "Monetization" })] })] })] })] })] }), _jsx("div", { className: "flex items-center gap-1", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { className: "cursor-pointer rounded-full ml-2", children: _jsx(UserAvatar, { src: user?.display_image_url || user?.image_url || undefined, alt: user?.display_name || user?.name || undefined, size: 32 }) }), _jsxs(DropdownMenuContent, { className: "w-[240px] p-0", align: "end", children: [_jsx("div", { className: "p-3 border-b border-border", children: _jsx("p", { className: "text-sm text-foreground", children: user?.email }) }), _jsxs("div", { className: "p-1", children: [_jsx(DropdownMenuItem, { className: "text-sm px-3 py-2 cursor-pointer", onSelect: () => {
                                                if (user?.display_username) {
                                                    router.push(`/${user.display_username}`);
                                                }
                                                else if (user?.username) {
                                                    router.push(`/${user.username}`);
                                                }
                                            }, children: "View Profile" }), _jsxs(DropdownMenuItem, { className: "text-sm px-3 py-2 cursor-pointer flex items-center justify-between", onSelect: () => router.push("/"), children: ["Back to Home", _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "h-4 w-4", children: [_jsx("path", { d: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }), _jsx("polyline", { points: "9 22 9 12 15 12 15 22" })] })] }), _jsxs(DropdownMenuItem, { className: "text-sm px-3 py-2 cursor-pointer flex items-center justify-between", onSelect: () => router.push("/settings/profile"), children: ["Settings", _jsx(Icons.settings, { className: "h-4 w-4" })] })] }), _jsx("div", { className: "border-t border-border p-1", children: _jsxs(DropdownMenuItem, { onSelect: () => signOut({ redirectUrl: "/" }), className: "text-sm px-3 py-2 cursor-pointer flex justify-between items-center", onMouseEnter: () => controls.start("hover"), onMouseLeave: () => controls.start("normal"), children: [_jsx("span", { children: "Log Out" }), _jsx(Icons.logout, { size: 16, controls: controls })] }) })] })] }) })] }));
}
//# sourceMappingURL=component.js.map