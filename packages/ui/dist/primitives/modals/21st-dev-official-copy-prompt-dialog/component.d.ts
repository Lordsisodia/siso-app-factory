import { PromptType } from "@/types/global";
interface CopyPromptDialogProps {
    isOpen: boolean;
    onClose: () => void;
    selectedPromptType: PromptType;
    onPromptTypeChange: (value: PromptType) => void;
    onCopyPrompt: (ruleId?: number, context?: string) => void;
    demoId: string;
}
export declare function CopyPromptDialog({ isOpen, onClose, selectedPromptType, onPromptTypeChange, onCopyPrompt, demoId, }: CopyPromptDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map