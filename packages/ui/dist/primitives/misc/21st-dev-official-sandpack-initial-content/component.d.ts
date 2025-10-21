interface SandpackInitialContentProps {
    activePreview: {
        type: "regular" | "unknown";
        filePath: string;
        componentName?: string;
    } | null;
    onPreviewSelect: (preview: {
        type: "regular" | "unknown";
        filePath: string;
        componentName?: string;
    }) => void;
    unresolvedDependencies?: Array<{
        name: string;
        path: string;
    }>;
    getComponentFilePath: () => string;
    setComponentCode: (code: string) => void;
    isUnresolvedDependency: (path: string) => boolean;
    loadingFiles?: string[];
    actionRequiredFiles?: string[];
    processedData?: any;
}
export declare function SandpackInitialContent({ activePreview, onPreviewSelect, unresolvedDependencies, getComponentFilePath, setComponentCode, isUnresolvedDependency, loadingFiles, actionRequiredFiles, processedData, }: SandpackInitialContentProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map