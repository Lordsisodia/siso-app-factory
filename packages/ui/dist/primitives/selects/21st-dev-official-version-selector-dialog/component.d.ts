interface VersionSelectorDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    username?: string;
    onCreateSandbox?: () => Promise<void>;
    isCreating?: boolean;
}
export declare function VersionSelectorDialog({ isOpen, onOpenChange, username, onCreateSandbox, isCreating, }: VersionSelectorDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map