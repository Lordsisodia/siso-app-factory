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
import { ReactNode } from "react";
interface VariantConfig {
    header: "glass" | "solid" | "gradient";
    hero: "video" | "image" | "interactive";
    background: "dark" | "gradient" | "animated";
    colorScheme: "pink-red" | "blue-purple" | "green-yellow";
    typography: "bold" | "elegant" | "modern";
    buttons: "rounded" | "sharp" | "pill";
}
declare const defaultVariants: VariantConfig;
interface VariantContextType {
    variants: VariantConfig;
    setVariant: (component: keyof VariantConfig, variant: string) => void;
    resetVariants: () => void;
    getShareableUrl: () => string;
    isVariantSelectorOpen: boolean;
    setVariantSelectorOpen: (open: boolean) => void;
    isDevMode: boolean;
    setDevMode: (enabled: boolean) => void;
}
interface VariantProviderProps {
    children: ReactNode;
}
export declare function VariantProvider({ children }: VariantProviderProps): import("react/jsx-runtime").JSX.Element;
export declare const useVariants: () => VariantContextType;
export declare const useComponentVariant: (component: keyof VariantConfig) => {
    current: "video" | "image" | "bold" | "dark" | "gradient" | "interactive" | "animated" | "solid" | "glass" | "pink-red" | "blue-purple" | "green-yellow" | "elegant" | "modern" | "rounded" | "sharp" | "pill";
    set: (variant: string) => void;
    is: (variant: string) => boolean;
};
export type { VariantConfig, VariantContextType };
export { defaultVariants };
//# sourceMappingURL=component.d.ts.map