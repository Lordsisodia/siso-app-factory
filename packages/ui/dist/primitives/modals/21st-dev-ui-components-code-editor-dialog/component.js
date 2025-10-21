import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { EditorStep } from "@/components/features/publish/components/code-editor";
import { DemoPreviewTabs } from "@/components/features/publish/components/preview-with-tabs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm, FormProvider } from "react-hook-form";
export function CodeEditorDialog({ isOpen, setIsOpen, code, demoCode, componentSlug, registryToPublish, directRegistryDependencies, demoDirectRegistryDependencies = [], customTailwindConfig, customGlobalCss, onSave, mode, currentState, }) {
    const { resolvedTheme } = useTheme();
    const isDarkTheme = resolvedTheme === "dark";
    const [editedCode, setEditedCode] = useState(mode === "component"
        ? code
        : mode === "demo"
            ? demoCode
            : mode === "styles" && customTailwindConfig
                ? customTailwindConfig
                : "");
    const [isSaving, setIsSaving] = useState(false);
    const [activeStyleTab, setActiveStyleTab] = useState("tailwind");
    const methods = useForm({
        defaultValues: {
            code: currentState.code,
            name: "",
            component_slug: componentSlug,
            registry: registryToPublish,
            demos: [
                {
                    name: "",
                    demo_code: currentState.demoCode,
                    demo_slug: "",
                    tags: [],
                    preview_image_data_url: "",
                    preview_video_data_url: "",
                    demo_direct_registry_dependencies: currentState.demoDirectRegistryDependencies,
                    demo_dependencies: {},
                },
            ],
            direct_registry_dependencies: currentState.directRegistryDependencies,
            tailwind_config: currentState.tailwindConfig,
            globals_css: currentState.globalsCss,
        },
    });
    const [previewKey, setPreviewKey] = useState(() => `${code}-${demoCode}-${customTailwindConfig}-${customGlobalCss}-${isDarkTheme}`);
    const [currentStateValue, setCurrentStateValue] = useState(currentState);
    const handleCodeChange = (value) => {
        setEditedCode(value);
        if (mode === "component") {
            methods.setValue("code", value);
            setCurrentStateValue({
                ...currentStateValue,
                code: value,
            });
        }
        else if (mode === "demo") {
            methods.setValue("demos.0.demo_code", value);
            setCurrentStateValue({
                ...currentStateValue,
                demoCode: value,
            });
        }
        setPreviewKey(`${value}-${Date.now()}`);
    };
    const handleSave = async () => {
        try {
            setIsSaving(true);
            await onSave(editedCode);
            setIsOpen(false);
        }
        catch (error) {
            console.error("Error saving code:", error);
        }
        finally {
            setIsSaving(false);
        }
    };
    const previewProps = {
        code: mode === "component" ? editedCode : currentStateValue.code,
        demoCode: mode === "demo" ? editedCode : currentStateValue.demoCode,
        directRegistryDependencies: currentStateValue.directRegistryDependencies ?? [],
        demoDirectRegistryDependencies: currentStateValue.demoDirectRegistryDependencies ?? [],
        customTailwindConfig: mode === "styles" && activeStyleTab === "tailwind"
            ? editedCode
            : currentStateValue.tailwindConfig,
        customGlobalCss: mode === "styles" && activeStyleTab === "globals"
            ? editedCode
            : currentStateValue.globalsCss,
    };
    return (_jsx(FormProvider, { ...methods, children: _jsx(Sheet, { open: isOpen, onOpenChange: setIsOpen, children: _jsx(SheetContent, { side: "center", className: "w-screen h-screen p-0 sm:max-w-none [&_button[aria-label='Close']]:hidden", hideCloseButton: true, children: _jsxs("div", { className: "flex flex-col h-screen", children: [_jsxs("div", { className: "flex items-center justify-between px-4 py-1 border-b", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: "font-medium text-sm", children: [mode === "component" && "Edit Component Code", mode === "demo" && "Edit Demo Code", mode === "styles" && "Edit Styles"] }), mode === "styles" && (_jsx(Tabs, { value: activeStyleTab, onValueChange: (v) => setActiveStyleTab(v), children: _jsxs(TabsList, { className: "h-auto gap-2 rounded-none bg-transparent px-0 py-1 text-foreground", children: [_jsx(TabsTrigger, { value: "tailwind", className: "relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent data-[state=inactive]:text-foreground/70", children: "tailwind.config.js" }), _jsx(TabsTrigger, { value: "globals", className: "relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-2 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent data-[state=inactive]:text-foreground/70", children: "globals.css" })] }) }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { variant: "outline", onClick: () => setIsOpen(false), children: "Cancel" }), _jsx(Button, { onClick: handleSave, disabled: isSaving, className: "relative transition-all duration-200", children: _jsxs("div", { className: "flex items-center justify-center gap-2", children: [isSaving && (_jsx(LoaderCircle, { className: "animate-spin", size: 16, strokeWidth: 2, "aria-hidden": "true" })), "Save"] }) })] })] }), _jsxs("div", { className: "flex flex-1 overflow-hidden", children: [_jsx("div", { className: "w-1/2 border-r", children: _jsx(EditorStep, { form: methods, isDarkTheme: isDarkTheme, fieldName: mode === "demo" ? "demos.0.demo_code" : "code", value: editedCode, onChange: handleCodeChange }) }), _jsx("div", { className: "w-1/2", children: _jsx(DemoPreviewTabs, { ...previewProps, slugToPublish: componentSlug, registryToPublish: registryToPublish, isDarkTheme: isDarkTheme, form: methods, shouldBlurPreview: false, onRestartPreview: () => {
                                            setPreviewKey(`${editedCode}-${Date.now()}`);
                                        }, formStep: "code", previewKey: previewKey, currentDemoIndex: 0 }, previewKey) })] })] }) }) }) }));
}
//# sourceMappingURL=component.js.map