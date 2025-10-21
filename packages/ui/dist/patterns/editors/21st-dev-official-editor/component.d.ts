import { SandpackFiles } from "@codesandbox/sandpack-react";
interface EditorProps {
    initialFiles: SandpackFiles;
    mainComponentPath: string;
    unresolvedDependencies?: Array<{
        name: string;
        path: string;
    }>;
    onCodeChange?: (path: string, content: string) => void;
    isUnresolvedDependencyFn?: (path: string) => boolean;
    activePath?: string;
    sandpackTemplate?: "react" | "react-ts" | "vanilla" | "vanilla-ts";
    dependencies?: Record<string, string>;
    visiblePaths?: string[];
    loadingFiles?: string[];
    actionRequiredFiles?: string[];
    processedData?: any;
}
export declare function Editor({ initialFiles, mainComponentPath, unresolvedDependencies, onCodeChange, isUnresolvedDependencyFn, activePath, sandpackTemplate, dependencies, visiblePaths, loadingFiles, actionRequiredFiles, processedData, }: EditorProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map