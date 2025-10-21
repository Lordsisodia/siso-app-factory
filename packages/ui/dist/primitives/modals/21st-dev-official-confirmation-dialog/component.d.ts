interface ConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void;
    isLoading: boolean;
}
export declare function ConfirmationDialog({ open, onOpenChange, title, description, onConfirm, isLoading, }: ConfirmationDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map