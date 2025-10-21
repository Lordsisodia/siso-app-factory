interface PublishHeaderProps {
    sandboxId: string | null;
    sandboxName?: string;
    username?: string;
    onGenerateRegistry?: () => void;
    isRegenerating?: boolean;
    showPreview?: boolean;
    onNameChange?: (newName: string) => void;
}
export declare function PublishHeader({ sandboxId, sandboxName, username, onGenerateRegistry, isRegenerating, showPreview, onNameChange, }: PublishHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map