"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-media-query";
import { setCookie } from "@/lib/cookies";
import { AuroraBackground } from "./aurora-background";
import { Button } from "./button";
import { Icons } from "../icons";
import { GitHubStarsBasic } from "./github-stars-number";
export function HeroSection() {
    const router = useRouter();
    const isMobile = useIsMobile();
    const onEnterWebsite = async () => {
        await setCookie({
            name: "has_visited",
            value: "true",
            expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "lax",
        });
        router.refresh();
    };
    useEffect(() => {
        document.body.style.overflow = "hidden";
        const handleKeyPress = async (e) => {
            if (e.key === "Enter") {
                await onEnterWebsite();
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [router]);
    return (_jsx(AuroraBackground, { className: "fixed inset-0 z-50", children: _jsxs("div", { className: "container relative z-10 pointer-events-auto px-6 md:px-8 flex flex-col min-h-screen", children: [_jsx("div", { className: "w-full justify-center pt-6 hidden md:flex", children: _jsxs(motion.nav, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1, duration: 0.6 }, className: "flex items-center gap-6 bg-background/50 backdrop-blur-sm pl-4 pr-6 py-3 rounded-full border border-border/40", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-6 w-6 rounded-full bg-foreground" }), _jsx("span", { className: "font-semibold text-foreground", children: "21st.dev" })] }), _jsx("div", { className: "h-4 w-[1px] bg-border/60" }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsx(Link, { href: "/", onClick: onEnterWebsite, className: "text-sm text-foreground/90 hover:text-foreground transition-colors", children: "Explore" }), _jsx(Link, { href: "/api-access", onClick: onEnterWebsite, className: "text-sm text-foreground/90 hover:text-foreground transition-colors", children: "API" }), _jsx(Link, { href: "/magic", onClick: onEnterWebsite, className: "text-sm text-foreground/90 hover:text-foreground transition-colors", children: "Magic MCP" }), _jsxs(Link, { href: "https://github.com/serafimcloud/21st", target: "_blank", rel: "noreferrer", className: "flex items-center gap-1.5 text-sm text-foreground/90 hover:text-foreground transition-colors", children: [_jsx(Icons.gitHub, { className: "h-3.5 w-3.5", "aria-hidden": "true" }), _jsx(GitHubStarsBasic, { className: "inline-flex" })] })] })] }) }), _jsx("div", { className: "flex-1 flex items-center justify-center", children: _jsxs(motion.div, { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: {
                            delay: 0.3,
                            duration: 0.8,
                            ease: "easeInOut",
                        }, className: "flex flex-col max-w-[300px] md:max-w-[800px] sm:max-w-[450px] text-center", children: [_jsx("h1", { className: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 md:mb-8 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent leading-[1.2] pb-1", children: "Discover, share & remix the best UI components" }), _jsx("h2", { className: "text-base sm:text-lg md:text-xl leading-relaxed mb-8 md:mb-12 bg-gradient-to-b from-muted-foreground to-muted-foreground/70 bg-clip-text text-transparent max-w-[600px] mx-auto", children: "Built by design engineers, loved by vibe coders." }), _jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 justify-center mb-20", children: [_jsxs(Button, { onClick: onEnterWebsite, children: ["Browse components", !isMobile && (_jsx("kbd", { className: "-me-1 ms-3 inline-flex h-5 max-h-full items-center rounded border border-muted-foreground/70 bg-muted-foreground/10 px-1.5 text-[0.625rem] font-medium text-white", children: _jsx(Icons.enter, { className: "h-2.5 w-2.5" }) }))] }), _jsx(Button, { variant: "ghost", className: "gap-2 border-border hover:bg-transparent text-foreground opacity-60 hover:opacity-90 transition-opacity duration-200", asChild: true, children: _jsxs(Link, { href: "/magic", onClick: onEnterWebsite, children: ["Integrate in IDE AI Agent", _jsx(ArrowRight, { className: "h-4 w-4 ml-1.5" })] }) })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6, duration: 0.8 }, className: "text-center", children: [_jsx("p", { className: "text-muted-foreground mb-4", children: "Optimized for" }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-12 text-foreground max-w-[350px] md:max-w-[800px] mx-auto", children: [_jsxs("div", { className: "flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-200 basis-[30%] sm:basis-auto justify-center", children: [_jsx(Icons.cursorAnimatedLogo, {}), _jsx(Icons.cursorLogo, { className: "h-3 sm:h-4 w-auto" })] }), _jsx("div", { className: "flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-200 basis-[30%] sm:basis-auto justify-center", children: _jsx("div", { className: "w-[24px] h-[24px] sm:w-[32px] sm:h-[32px]", children: _jsx(Icons.windsurfTealLogo, { className: "w-full h-full" }) }) }), _jsx("div", { className: "flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-200 basis-[30%] sm:basis-auto justify-center", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Icons.vscode, { className: "w-6 h-6 mr-1" }), _jsx("span", { className: "text-sm text-muted-foreground", children: "+" }), _jsx("div", { className: "flex items-center gap-2 bg-gradient-to-b from-[#0E0F0F] to-[#0C0C0C] overflow-hidden rounded-xl border border-white/10 w-[36px] h-[36px]", children: _jsx("img", { src: "https://avatars.githubusercontent.com/u/184127137?s=200&v=4", alt: "Cline", width: 36, height: 36, className: "mix-blend-hard-light" }) })] }) })] }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:gap-12 text-foreground max-w-[350px] md:max-w-[800px] mx-auto", children: [_jsx("div", { className: "flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-200 basis-[30%] sm:basis-auto justify-center", children: _jsx(Icons.v0Logo, { className: "h-6 sm:h-8 w-auto" }) }), _jsx("div", { className: "flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-200 basis-[30%] sm:basis-auto justify-center", children: _jsx(Icons.boltLogo, { className: "h-5 sm:h-6 w-auto" }) }), _jsxs("div", { className: "flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-200 basis-[45%] sm:basis-auto justify-center", children: [_jsx(Icons.lovableLogo, { className: "h-5 sm:h-6 w-auto" }), _jsx("span", { className: "text-[16px] sm:text-[20px] font-bold", children: "lovable" })] }), _jsx("div", { className: "flex items-center gap-2 grayscale hover:grayscale-0 transition-all duration-200 basis-[45%] sm:basis-auto justify-center overflow-hidden max-w-[100px]", children: _jsx(Icons.replitWithText, { className: "h-12 sm:h-16 w-auto min-w-[120px] sm:min-w-[150px]" }) })] })] })] })] }) })] }) }));
}
//# sourceMappingURL=component.js.map