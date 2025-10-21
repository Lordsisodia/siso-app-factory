"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
// Animation cache to prevent multiple fetches of the same file
const animationCache = new Map();
// Preload the default animation
if (typeof window !== "undefined") {
    fetch("/loading.json")
        .then((response) => response.json())
        .then((data) => {
        animationCache.set("/loading.json", data);
    })
        .catch((error) => console.error("Error preloading animation:", error));
}
export const LoadingSpinner = ({ size = "sm", className, animationFile = "/loading.json", logoFill = "currentColor", }) => {
    const [animationData, setAnimationData] = useState(animationCache.get(animationFile) || null);
    const [lottieReady, setLottieReady] = useState(false);
    const hasFetchedRef = useRef(false);
    const { resolvedTheme } = useTheme();
    // Унифицированные размеры для SVG и Lottie
    const sizeMap = {
        sm: { className: "w-8 h-8", style: { width: "2rem", height: "2rem" } },
        md: { className: "w-12 h-12", style: { width: "3rem", height: "3rem" } },
        lg: { className: "w-16 h-16", style: { width: "4rem", height: "4rem" } },
    };
    useEffect(() => {
        // Skip fetch if we already have the animation in cache
        if (animationCache.has(animationFile)) {
            setAnimationData(animationCache.get(animationFile));
            return;
        }
        // Skip duplicate fetches
        if (hasFetchedRef.current)
            return;
        hasFetchedRef.current = true;
        // We'll use the JSON file as default
        if (animationFile && animationFile.endsWith(".json")) {
            fetch(animationFile)
                .then((response) => response.json())
                .then((data) => {
                // Cache the animation data
                animationCache.set(animationFile, data);
                setAnimationData(data);
            })
                .catch((error) => console.error("Error loading Lottie animation:", error));
        }
    }, [animationFile]);
    // Set lottieReady to true after a small delay when animation data is available
    useEffect(() => {
        if (animationData) {
            const timer = setTimeout(() => {
                setLottieReady(true);
            }, 300); // Small delay to ensure Lottie is rendered before fading in
            return () => clearTimeout(timer);
        }
    }, [animationData]);
    return (_jsx("div", { className: cn("w-full h-full flex items-center justify-center", className), children: _jsxs("div", { className: cn(sizeMap[size].className, "flex items-center justify-center relative"), children: [_jsx("div", { className: cn("w-full h-full animate-spin-slow absolute inset-0 transition-opacity duration-300", lottieReady ? "opacity-0" : "opacity-100"), children: _jsxs("svg", { width: "100%", height: "100%", viewBox: "0 0 60 60", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-label": "21st logo loading", children: [_jsx("path", { d: "M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.5 35.5 20 40H40C40 51.0457 31.0457 60 20 60C8.95431 60 0 51.0457 0 40C0 28.9543 9.5 22 20 20H0Z", fill: logoFill }), _jsx("path", { d: "M40 60C51.7324 55.0977 60 43.5117 60 30C60 16.4883 51.7324 4.90234 40 0V60Z", fill: logoFill })] }) }), animationData && typeof window !== "undefined" && (_jsx("div", { className: cn("w-full h-full absolute inset-0 transition-opacity duration-300", lottieReady ? "opacity-100" : "opacity-0", resolvedTheme === "dark" && "lottie-dark-mode"), children: _jsx(Lottie, { animationData: animationData, loop: true, style: { width: "100%", height: "100%" }, rendererSettings: {
                            preserveAspectRatio: "xMidYMid slice",
                            progressiveLoad: true,
                        } }) }))] }) }));
};
export const LoadingSpinnerPage = ({ size, className, animationFile, logoFill, }) => (_jsx("div", { className: cn("w-full h-screen flex items-center justify-center bg-background", className), children: _jsx(LoadingSpinner, { size: size, animationFile: animationFile, logoFill: logoFill }) }));
//# sourceMappingURL=component.js.map