interface ImportHeaderProps {
    showUrlInput: boolean;
    isLoading: boolean;
    onSubmit: () => void;
    formStep: "detailedForm" | "demoCode";
    isSubmitting: boolean;
    onEditDemoCode: () => void;
    onSaveDemoCode: () => void;
    isEditingFromCard: boolean;
}
export declare function ImportHeader({ showUrlInput, isLoading, onSubmit, formStep, isSubmitting, onEditDemoCode, onSaveDemoCode, isEditingFromCard, }: ImportHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map