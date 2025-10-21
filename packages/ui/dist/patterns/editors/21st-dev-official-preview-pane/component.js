import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { EditorPane } from "./editor-pane";
import { cn } from "@/lib/utils";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "@/components/ui/resizable";
import { useTheme } from "next-themes";
export function PreviewPane({ previewURL, isPreviewVisible = true, selectedFile = null, code = "", onCodeChange = () => { }, isFileLoading = false, connectedShellId = "", showPreview, iframeKey, onRefresh, }) {
    const [previousConnectedShellId, setPreviousConnectedShellId] = useState(connectedShellId);
    const { resolvedTheme } = useTheme();
    //  takes time to complile need to reload iframe, will be fixed at codesandbox SDK team side
    useEffect(() => {
        setPreviousConnectedShellId(connectedShellId);
        if (previousConnectedShellId !== connectedShellId &&
            previousConnectedShellId !== "") {
            setTimeout(() => {
                onRefresh();
            }, 1000 * 8);
        }
    }, [connectedShellId, onRefresh]);
    return (_jsx("div", { className: "relative h-full", children: _jsxs(ResizablePanelGroup, { direction: "horizontal", className: "h-full", children: [_jsx(ResizablePanel, { defaultSize: showPreview ? 50 : 100, minSize: 30, children: _jsx(EditorPane, { selectedFile: selectedFile, code: code, onCodeChange: onCodeChange, isLoading: isFileLoading }) }), _jsx(ResizableHandle, { className: cn(showPreview ? "opacity-100 scale-100" : "opacity-0 scale-95") }), _jsx(ResizablePanel, { defaultSize: 50, minSize: 30, style: {
                        maxWidth: showPreview ? "100%" : "0px",
                        minWidth: showPreview ? "30%" : "0px",
                        opacity: showPreview ? 1 : 0,
                        overflow: "hidden",
                        transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1)",
                    }, children: _jsx("div", { className: "flex flex-col h-full", children: !previewURL ? (_jsx("div", { className: "h-full flex items-center justify-center text-muted-foreground", children: "Waiting for dev server..." })) : (_jsx("iframe", { src: `${previewURL}?theme=${resolvedTheme}`, className: "w-full h-full rounded-b" }, `${iframeKey}-${connectedShellId}`)) }) })] }) }));
}
//# sourceMappingURL=component.js.map