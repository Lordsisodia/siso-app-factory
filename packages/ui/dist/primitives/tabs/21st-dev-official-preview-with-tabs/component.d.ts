import { UseFormReturn } from "react-hook-form";
import type { FormData } from "../config/utils";
import { FormStep } from "@/types/global";
interface DemoPreviewTabsProps {
    code: string;
    slugToPublish: string;
    registryToPublish: string;
    directRegistryDependencies: string[];
    demoDirectRegistryDependencies: string[];
    isDarkTheme: boolean;
    customTailwindConfig?: string;
    customGlobalCss?: string;
    form?: UseFormReturn<FormData>;
    shouldBlurPreview?: boolean;
    onRestartPreview?: () => void;
    formStep?: FormStep;
    previewKey?: string;
    currentDemoIndex: number;
    demoCode?: string;
    demoDependencies?: Record<string, string>;
}
export declare function DemoPreviewTabs({ code, slugToPublish, registryToPublish, directRegistryDependencies, isDarkTheme, customTailwindConfig, customGlobalCss, form, shouldBlurPreview, onRestartPreview, formStep, previewKey, currentDemoIndex, demoCode, demoDependencies, }: DemoPreviewTabsProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map