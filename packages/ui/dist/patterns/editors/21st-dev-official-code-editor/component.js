import { jsx as _jsx } from "react/jsx-runtime";
import { Editor } from "@monaco-editor/react";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { editorOptions } from "../config/editor-themes";
import { editorThemes } from "../config/editor-themes";
export function EditorStep({ form, isDarkTheme, fieldName, value, onChange, language = "typescript", }) {
    return (_jsx(FormField, { control: form.control, name: fieldName, render: ({ field }) => (_jsx(FormItem, { className: "h-full", children: _jsx(FormControl, { children: _jsx(Editor, { defaultLanguage: language, value: value, onChange: (value) => {
                        onChange(value || "");
                        field.onChange(value || "");
                    }, theme: isDarkTheme ? "github-dark" : "github-light", options: {
                        ...editorOptions,
                        roundedSelection: false,
                        minimap: { enabled: false },
                        lineNumbers: "on",
                        lineNumbersMinChars: 3,
                        scrollbar: {
                            vertical: "visible",
                            horizontal: "visible",
                            verticalScrollbarSize: 8,
                            horizontalScrollbarSize: 8,
                            useShadows: false,
                        },
                        padding: { top: 16, bottom: 16 },
                        glyphMargin: false,
                        folding: true,
                        lineDecorationsWidth: 0,
                    }, className: "h-full w-full bg-muted", beforeMount: (monaco) => {
                        monaco.editor.defineTheme("github-dark", editorThemes.dark);
                        monaco.editor.defineTheme("github-light", editorThemes.light);
                    } }) }) })) }));
}
//# sourceMappingURL=component.js.map