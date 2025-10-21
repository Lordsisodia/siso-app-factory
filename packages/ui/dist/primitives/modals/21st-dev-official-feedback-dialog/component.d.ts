type FeedbackType = "feedback" | "feature_request";
interface FeedbackDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialType?: FeedbackType;
}
export declare function FeedbackDialog({ open, onOpenChange, initialType, }: FeedbackDialogProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map