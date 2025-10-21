"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { GitHubStarsBasic } from "@/components/ui/github-stars-number";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Logo } from "@/components/ui/logo";
import { useIsMobile } from "@/hooks/use-media-query";
export function MagicHeader({ isScrolled }) {
    const isMobile = useIsMobile();
    return (_jsxs(motion.header, { className: cn("fixed left-4 right-4 z-50 flex items-center justify-between transition-all duration-300 ease-out", isScrolled && !isMobile
            ? "top-4 mx-10 rounded-xl border border-white/10 bg-black/70 px-4 py-2 pr-2 shadow-lg backdrop-blur-md"
            : "top-0 rounded-none border-b border-transparent bg-transparent px-4 py-3 shadow-none backdrop-blur-none"), initial: { y: isScrolled ? 0 : -20, opacity: 0 }, animate: { y: 0, opacity: 1 }, transition: {
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.5,
        }, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Logo, { fill: "white", position: "flex", hasLink: false, className: "w-6 h-6" }), _jsxs("span", { className: "text-white font-medium", children: ["Magic ", _jsx("span", { className: "font-light text-gray-400", children: "by 21st.dev" })] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Button, { variant: "ghost", size: "sm", className: "gap-2 px-2.5 text-sm font-medium text-white hover:bg-neutral-800/10 hover:text-white", asChild: true, children: _jsxs("a", { href: "https://github.com/21st-dev/magic-mcp", target: "_blank", rel: "noopener noreferrer", children: [_jsx(Icons.gitHub, { className: "h-4 w-4" }), _jsx(GitHubStarsBasic, { repo: "21st-dev/magic-mcp", className: "text-white" })] }) }), _jsx(Button, { variant: "ghost", className: "text-white text-[14px] hover:text-gray-300 hover:bg-accent/10", children: _jsx(Link, { href: "/pricing", children: "Pricing" }) }), _jsx(SignedIn, { children: _jsx(Button, { asChild: true, className: "hidden sm:inline-flex", children: _jsx(Link, { href: "/magic/get-started", children: "Get Started" }) }) }), _jsx(SignedOut, { children: _jsx(SignInButton, { children: _jsx(Button, { children: "Sign up" }) }) })] })] }));
}
//# sourceMappingURL=component.js.map