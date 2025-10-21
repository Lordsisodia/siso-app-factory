interface PreviewPaneProps {
    previewURL: string | null;
    isPreviewVisible?: boolean;
    selectedFile?: any;
    code?: string;
    onCodeChange?: (value: string) => void;
    isFileLoading?: boolean;
    connectedShellId?: string;
    showPreview: boolean;
    iframeKey: number;
    onRefresh: () => void;
}
export declare function PreviewPane({ previewURL, isPreviewVisible, selectedFile, code, onCodeChange, isFileLoading, connectedShellId, showPreview, iframeKey, onRefresh, }: PreviewPaneProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map