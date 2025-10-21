"use client";
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Client Design Variant System - Context Provider
 *
 * Revolutionary client feedback system that allows real-time design variant switching
 * Eliminates traditional back-and-forth revision process with instant visual feedback
 *
 * Features:
 * - Real-time component variant switching
 * - URL sharing of specific variant combinations
 * - Smooth animations between variants
 * - Client-friendly interface for design selection
 * - Professional presentation without multiple deployments
 */
import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
// Default variant configuration (current production design)
const defaultVariants = {
    header: "glass", // Current glass morphism header
    hero: "video", // Current video background hero
    background: "dark", // Current dark gradient background
    colorScheme: "pink-red", // Current pink-red brand colors
    typography: "bold", // Current bold typography
    buttons: "rounded" // Current rounded buttons
};
// Create the context
const VariantContext = createContext(undefined);
export function VariantProvider({ children }) {
    const [variants, setVariants] = useState(defaultVariants);
    const [isVariantSelectorOpen, setVariantSelectorOpen] = useState(false);
    const [isDevMode, setDevMode] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    // Load variants from URL parameters on component mount
    useEffect(() => {
        const variantParam = searchParams.get("variants");
        const devModeParam = searchParams.get("dev");
        // Enable dev mode if dev parameter is present
        if (devModeParam === "true") {
            setDevMode(true);
        }
        // Load variant configuration from URL
        if (variantParam) {
            try {
                const urlVariants = JSON.parse(atob(variantParam));
                setVariants({ ...defaultVariants, ...urlVariants });
            }
            catch (error) {
                console.warn("Invalid variant URL parameter:", error);
                setVariants(defaultVariants);
            }
        }
    }, [searchParams]);
    // Update a specific component variant
    const setVariant = (component, variant) => {
        setVariants(prev => ({
            ...prev,
            [component]: variant
        }));
        // Optional: Auto-update URL with new variant combination
        if (isDevMode) {
            updateUrlWithVariants({ ...variants, [component]: variant });
        }
    };
    // Reset all variants to default values
    const resetVariants = () => {
        setVariants(defaultVariants);
        if (isDevMode) {
            updateUrlWithVariants(defaultVariants);
        }
    };
    // Update URL with current variant configuration for sharing
    const updateUrlWithVariants = (variantConfig) => {
        const variantString = btoa(JSON.stringify(variantConfig));
        const url = new URL(window.location.href);
        url.searchParams.set("variants", variantString);
        if (isDevMode) {
            url.searchParams.set("dev", "true");
        }
        // Update URL without page reload
        window.history.replaceState({}, "", url.toString());
    };
    // Generate shareable URL with current variant configuration
    const getShareableUrl = () => {
        const variantString = btoa(JSON.stringify(variants));
        const url = new URL(window.location.origin + pathname);
        url.searchParams.set("variants", variantString);
        if (isDevMode) {
            url.searchParams.set("dev", "true");
        }
        return url.toString();
    };
    const contextValue = {
        variants,
        setVariant,
        resetVariants,
        getShareableUrl,
        isVariantSelectorOpen,
        setVariantSelectorOpen,
        isDevMode,
        setDevMode
    };
    return (_jsx(VariantContext.Provider, { value: contextValue, children: children }));
}
// Custom hook to use variant context
export const useVariants = () => {
    const context = useContext(VariantContext);
    if (!context) {
        throw new Error("useVariants must be used within a VariantProvider");
    }
    return context;
};
// Utility hook for individual component variants
export const useComponentVariant = (component) => {
    const { variants, setVariant } = useVariants();
    return {
        current: variants[component],
        set: (variant) => setVariant(component, variant),
        is: (variant) => variants[component] === variant
    };
};
export { defaultVariants };
//# sourceMappingURL=component.js.map