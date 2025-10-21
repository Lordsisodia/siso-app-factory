import { CodeManagerProviderProps } from "./editor-types";
/**
 * Hook to access the CodeManager context
 */
export declare function useCodeManager(): any;
export { useEditorFile } from "../hooks/use-editor-file";
export { useActionRequired } from "../hooks/use-action-required";
export { usePreviewReady } from "../hooks/use-preview-ready";
export type { ActionRequiredDetails, ActionRequiredReason, StylesActionDetails, UnresolvedDependenciesActionDetails, OtherActionDetails, } from "./editor-types";
/**
 * CodeManager Provider Component
 */
export declare function CodeManagerProvider({ children, initialComponentPath, unresolvedDependencies, onFileContentChange, isUnknownComponentFn, }: CodeManagerProviderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=component.d.ts.map