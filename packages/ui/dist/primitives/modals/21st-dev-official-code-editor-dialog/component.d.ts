interface CodeEditorDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    code: string;
    demoCode: string;
    componentSlug: string;
    registryToPublish: string;
    directRegistryDependencies: string[];
    demoDirectRegistryDependencies?: string[];
    customTailwindConfig?: string;
    customGlobalCss?: string;
    onSave: (newCode: string) => Promise<void>;
    mode: "component" | "demo" | "styles";
    currentState: {
        code: string;
        demoCode: string;
        directRegistryDependencies: string[];
        demoDirectRegistryDependencies?: string[];
        tailwindConfig?: string;
        globalsCss?: string;
    };
}
export declare function CodeEditorDialog({ isOpen, setIsOpen, code, demoCode, componentSlug, registryToPublish, directRegistryDependencies, demoDirectRegistryDependencies, customTailwindConfig, customGlobalCss, onSave, mode, currentState, }: CodeEditorDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map