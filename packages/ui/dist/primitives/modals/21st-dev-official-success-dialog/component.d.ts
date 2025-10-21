interface SuccessDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onAddAnother: () => void;
    onGoToComponent: () => void;
    mode?: "component" | "demo";
}
export declare function SuccessDialog({ isOpen, onOpenChange, onAddAnother, onGoToComponent, mode, }: SuccessDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map