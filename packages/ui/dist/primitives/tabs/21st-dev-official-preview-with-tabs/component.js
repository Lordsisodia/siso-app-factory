import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PublishComponentPreview } from "./preview";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
export function DemoPreviewTabs({ code, slugToPublish, registryToPublish, directRegistryDependencies, isDarkTheme, customTailwindConfig, customGlobalCss, form, shouldBlurPreview, onRestartPreview, formStep, previewKey, currentDemoIndex, demoCode, demoDependencies, }) {
    const demos = form?.watch("demos") || [];
    const [activeTab, setActiveTab] = useState("demo-0");
    const [renderedTabs, setRenderedTabs] = useState(new Set(["demo-0"]));
    const [previewKeys, setPreviewKeys] = useState({});
    const handleRestartPreview = () => {
        if (onRestartPreview) {
            onRestartPreview();
            setPreviewKeys((prev) => ({
                ...prev,
                [currentDemoIndex]: `${Date.now()}`,
            }));
        }
    };
    useEffect(() => {
        setActiveTab(`demo-${currentDemoIndex}`);
        setRenderedTabs((prev) => new Set([...prev, `demo-${currentDemoIndex}`]));
    }, [currentDemoIndex]);
    useEffect(() => {
        if (demos.length === 0) {
            setActiveTab("demo-0");
            return;
        }
        const currentIndex = parseInt(activeTab.replace("demo-", ""));
        if (currentIndex >= demos.length) {
            setActiveTab(`demo-${demos.length - 1}`);
        }
    }, [demos.length, activeTab]);
    useEffect(() => {
        setRenderedTabs((prev) => new Set([...prev, activeTab]));
    }, [activeTab]);
    return (_jsx("div", { className: "flex flex-col h-full", children: _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "flex flex-col h-full", children: [demos.length > 1 && (_jsx(TabsList, { className: "h-auto gap-2 rounded-none bg-transparent px-4 py-2 overflow-x-auto scrollbar-none whitespace-nowrap", children: demos.map((demo, index) => (_jsx(TabsTrigger, { value: `demo-${index}`, className: "relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent data-[state=inactive]:text-foreground/70", children: demo.name || `Demo ${index + 1}` }, index))) })), _jsx("div", { className: "relative flex-1 h-full", children: demos.map((demo, index) => {
                        const tabId = `demo-${index}`;
                        if (!renderedTabs.has(tabId)) {
                            return null;
                        }
                        return (_jsx("div", { className: cn("absolute inset-0 w-full h-full transition-opacity duration-300", activeTab === tabId ? "opacity-100 z-10" : "opacity-0 z-0"), children: _jsx(React.Suspense, { fallback: _jsx(LoadingSpinner, {}), children: _jsxs("div", { className: "relative h-full", children: [_jsx(PublishComponentPreview, { code: code, demoCode: demo.demo_code ?? demoCode, slugToPublish: slugToPublish, registryToPublish: registryToPublish, directRegistryDependencies: [
                                                ...directRegistryDependencies,
                                                ...(demo.demo_direct_registry_dependencies || []),
                                            ], isDarkTheme: isDarkTheme, customTailwindConfig: form?.getValues("tailwind_config"), customGlobalCss: form?.getValues("globals_css"), demoDependencies: demo.demo_dependencies || demoDependencies }, previewKeys[index] || previewKey), shouldBlurPreview &&
                                            formStep === "demoCode" &&
                                            currentDemoIndex === index && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-background/50", children: _jsx(Button, { onClick: handleRestartPreview, variant: "secondary", className: "z-20", children: "Update Preview" }) }))] }) }) }, index));
                    }) })] }) }));
}
//# sourceMappingURL=component.js.map