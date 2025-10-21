"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { motion } from "motion/react";
const Logo21SVG = ({ color = "white", logoColor = "black", width = 124, height = 24, }) => (_jsxs("svg", { width: width, height: height, viewBox: "0 0 84 84", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("rect", { width: "84", height: "84", rx: "42", fill: logoColor === "white" ? "black" : "white" }), _jsx("path", { d: "M13 32C13 20.9543 21.9543 12 33 12C44.0457 12 53 20.9543 53 32C53 43.0457 44.5 47.5 33 52H53C53 63.0457 44.0457 72 33 72C21.9543 72 13 63.0457 13 52C13 40.9543 22.5 34 33 32H13Z", fill: color }), _jsx("path", { d: "M53 72C64.7324 67.0977 73 55.5117 73 42C73 28.4883 64.7324 16.9023 53 12V72Z", fill: color })] }));
const AssetCard = ({ title, logoColor, background, className, style, index = 0, }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        const svgElement = document.querySelector(`[data-asset="${title}"] svg`);
        if (svgElement) {
            const svgString = new XMLSerializer().serializeToString(svgElement);
            navigator.clipboard.writeText(svgString);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };
    const logoFile = title.includes("Dark") ? "21st-logo-dark" : "21st-logo-white";
    return (_jsxs(motion.li, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.2, delay: index * 0.1 }, className: cn("w-[184px] bg-white shadow-md dark:bg-[#181818] dark:outline dark:outline-1 dark:outline-[#2a2a2a] p-1 flex flex-col gap-1 rounded-[20px]", className), style: style, children: [_jsx("h3", { className: "sr-only", children: title }), _jsx("div", { "data-asset": title, "aria-hidden": "true", className: cn("flex items-center justify-center h-16 rounded-2xl bg-foreground/10"), children: _jsx(Logo21SVG, { color: logoColor, logoColor: logoColor, width: 124, height: 24 }) }), _jsxs("div", { className: "flex justify-stretch", children: [_jsxs("button", { className: "py-[5px] group relative flex flex-1 items-center justify-center text-muted-foreground text-[13px] font-medium hover:bg-slate-100 dark:hover:bg-[#202020] rounded-md first:rounded-l-[20px] last:rounded-r-2xl transition-colors uppercase", onClick: handleCopy, children: [_jsx("div", { "aria-hidden": "true", className: cn("absolute transition-opacity", copied ? "opacity-100" : "opacity-0"), children: _jsx(Icons.check, { className: "h-4 w-4" }) }), _jsxs("div", { className: cn("flex items-center justify-center gap-0.5 transition-opacity", copied ? "opacity-0" : "opacity-100"), children: [_jsx(Icons.copy, { className: "h-4 w-4 mr-1" }), "svg"] })] }), _jsxs("a", { className: "py-[5px] group relative flex flex-1 items-center justify-center text-muted-foreground text-[13px] font-medium hover:bg-slate-100 dark:hover:bg-[#202020] rounded-md first:rounded-l-[20px] last:rounded-r-2xl transition-colors uppercase", href: `/brand/${logoFile}.png`, download: `${logoFile}.png`, children: [_jsx("div", { "aria-hidden": "true", className: "absolute opacity-0 transition-opacity", children: _jsx(Icons.check, { className: "h-4 w-4" }) }), _jsxs("div", { className: "flex items-center justify-center gap-0.5 opacity-100 transition-opacity", children: [_jsx(Icons.download, { className: "h-4 w-4 mr-1" }), "png"] })] }), _jsxs("a", { className: "py-[5px] group relative flex flex-1 items-center justify-center text-muted-foreground text-[13px] font-medium hover:bg-slate-100 dark:hover:bg-[#202020] rounded-md first:rounded-l-[20px] last:rounded-r-2xl transition-colors uppercase", href: `/brand/${logoFile}.svg`, download: `${logoFile}.svg`, children: [_jsx("div", { "aria-hidden": "true", className: "absolute opacity-0 transition-opacity", children: _jsx(Icons.check, { className: "h-4 w-4" }) }), _jsxs("div", { className: "flex items-center justify-center gap-0.5 opacity-100 transition-opacity", children: [_jsx(Icons.download, { className: "h-4 w-4 mr-1" }), "svg"] })] })] })] }));
};
export function BrandAssetsMenu({ isVisible, setIsVisible, }) {
    const menuRef = useRef(null);
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsVisible(false);
        }
    };
    const handleContextMenu = (event) => {
        event.preventDefault();
        setIsVisible(false);
    };
    useEffect(() => {
        if (isVisible) {
            document.addEventListener("click", handleClickOutside);
            document.addEventListener("contextmenu", handleContextMenu);
            return () => {
                document.removeEventListener("click", handleClickOutside);
                document.removeEventListener("contextmenu", handleContextMenu);
            };
        }
    }, [isVisible, setIsVisible]);
    if (!isVisible)
        return null;
    return (_jsxs(motion.ul, { ref: menuRef, className: "fixed top-16 left-4 z-[100] flex flex-col gap-4", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onContextMenu: (e) => e.preventDefault(), children: [_jsx(AssetCard, { title: "Logo Dark (Black BG)", logoColor: "white", background: "black", index: 0 }), _jsx(AssetCard, { title: "Logo White (White BG)", logoColor: "black", background: "white", index: 1 }), _jsx(motion.li, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.2, delay: 2 * 0.1 }, className: "w-[184px] bg-white shadow-md dark:bg-[#181818] dark:outline dark:outline-1 dark:outline-[#2a2a2a] p-1 flex flex-col gap-1 rounded-[20px]", children: _jsxs(Link, { href: "/brand/21st-brand.zip", className: "flex items-center justify-center gap-2 text-primary dark:text-slate-400 font-medium p-1 text-center text-sm hover:bg-slate-100 dark:hover:bg-[#202020] rounded-[24px] transition-colors", children: [_jsx(Icons.download, { className: "h-4 w-4" }), " 21st-brand.zip"] }) })] }));
}
export const useBrandAssetsMenu = () => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleMenu = (e) => {
        // Handle both right-click and Command/Ctrl key
        if (e.button === 2 || e.metaKey || e.ctrlKey) {
            e.preventDefault();
            setIsVisible(!isVisible);
        }
    };
    return {
        isVisible,
        setIsVisible,
        toggleMenu,
    };
};
//# sourceMappingURL=component.js.map