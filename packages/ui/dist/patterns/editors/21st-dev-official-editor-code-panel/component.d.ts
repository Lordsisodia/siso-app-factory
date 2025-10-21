import React from "react";
interface EditorCodePanelProps {
    onCodeChange?: (code: string) => void;
    componentPath: string;
}
export declare const EditorCodePanel: React.NamedExoticComponent<EditorCodePanelProps>;
interface SimpleEditorProps {
    onChange?: (code: string) => void;
}
export declare function SimpleEditor({ onChange }: SimpleEditorProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map