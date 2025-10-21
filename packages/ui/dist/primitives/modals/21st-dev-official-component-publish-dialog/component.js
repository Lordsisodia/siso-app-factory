import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { Spinner } from "@/components/icons/spinner";
import { SandpackProvider } from "@codesandbox/sandpack-react";
import { usePublishDialog } from "./hooks/use-editor-dialog";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "./editor";
import { SandpackInitialContent } from "./sandpack-initial-content";
// Create a stable container for SandpackProvider to prevent re-rendering
const StableSandpackContainer = React.memo(({ children, config }) => {
    // Use a ref to maintain the same config object reference
    const configRef = useRef(config);
    // Only update the ref if critical values change
    useEffect(() => {
        if (config.files !== configRef.current.files) {
            configRef.current = config;
        }
    }, [config]);
    return (_jsx(SandpackProvider, { ...configRef.current, children: children }));
});
// Memoize the Editor component to prevent unnecessary re-renders
const MemoizedEditor = React.memo(Editor);
// Memoize SandpackContent component
const MemoizedSandpackInitialContent = React.memo(SandpackInitialContent);
export function ComponentPublishDialog({ userId, }) {
    const { open, componentCode, processedData, isProcessing, activePreview, loadingShadcnComponents, actionRequiredFiles, handleOpenChange, handleProcessComponent, handlePreviewSelect, setComponentCode, sandpackConfig, getComponentFilePath, isUnresolvedDependency, } = usePublishDialog({ userId });
    // Create a stable reference to dialogContent
    const [dialogContent, setDialogContent] = useState(null);
    // Only update dialog content when necessary data changes
    useEffect(() => {
        if (!open)
            return;
        const content = processedData ? (_jsx(StableSandpackContainer, { config: sandpackConfig, children: _jsx(MemoizedEditor, { initialFiles: sandpackConfig.files, mainComponentPath: getComponentFilePath(), unresolvedDependencies: processedData?.unresolvedDependencyImports, onCodeChange: (path, content) => {
                    if (path === getComponentFilePath()) {
                        setComponentCode(content);
                    }
                }, isUnresolvedDependencyFn: isUnresolvedDependency, activePath: activePreview?.filePath, sandpackTemplate: sandpackConfig.template, dependencies: sandpackConfig.customSetup?.dependencies, visiblePaths: Array.isArray(sandpackConfig.options?.visibleFiles)
                    ? sandpackConfig.options.visibleFiles
                    : [
                        getComponentFilePath(),
                        "/components/",
                        "/tailwind.config.js",
                        "/globals.css",
                        "/package.json",
                    ], loadingFiles: loadingShadcnComponents, actionRequiredFiles: actionRequiredFiles, processedData: processedData }) })) : (_jsx(StableSandpackContainer, { config: sandpackConfig, children: _jsx(MemoizedSandpackInitialContent, { activePreview: activePreview, onPreviewSelect: handlePreviewSelect, unresolvedDependencies: processedData?.unresolvedDependencyImports, getComponentFilePath: getComponentFilePath, setComponentCode: setComponentCode, isUnresolvedDependency: isUnresolvedDependency, loadingFiles: loadingShadcnComponents, actionRequiredFiles: actionRequiredFiles, processedData: processedData }) }));
        setDialogContent(content);
    }, [
        open,
        processedData,
        getComponentFilePath,
        activePreview?.filePath,
        loadingShadcnComponents,
        actionRequiredFiles,
        // Include only the stable, primitive values from sandpackConfig that should trigger re-renders
        sandpackConfig.template,
        // Do NOT include frequently changing props that don't affect structure
    ]);
    return (_jsxs(Dialog, { open: open, onOpenChange: handleOpenChange, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { children: [_jsx(PlusCircle, { className: "mr-2 h-4 w-4" }), "Publish Component | OLD"] }) }), _jsxs(DialogContent, { className: "sm:max-w-[1600px] sm:w-[95vw] h-[90vh] flex flex-col p-0 gap-0 overflow-hidden", hideCloseButton: true, children: [_jsxs(DialogHeader, { className: "flex flex-row p-4 gap-8 items-start justify-between border-b bg-muted", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(DialogTitle, { children: "Publish New Component" }), _jsx(DialogDescription, { children: "Enter your component code below. Make sure it follows our guidelines and includes all necessary imports." })] }), _jsx(Button, { onClick: handleProcessComponent, disabled: isProcessing || !componentCode.trim(), className: "ml-auto !mt-0", children: isProcessing ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "mr-2", children: _jsx(Spinner, { size: 16 }) }), "Processing..."] })) : ("Process Component") })] }), _jsx("div", { className: "flex-grow overflow-hidden flex flex-col h-full", children: _jsx("div", { className: "h-full min-h-[400px] overflow-hidden flex-grow", children: dialogContent }) })] })] }));
}
//# sourceMappingURL=component.js.map