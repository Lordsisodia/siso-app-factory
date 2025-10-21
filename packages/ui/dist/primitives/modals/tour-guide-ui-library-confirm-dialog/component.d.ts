interface ConfirmDialogProps {
    show: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    variant?: "danger" | "warning" | "info";
}
export default function ConfirmDialog({ show, title, message, confirmText, cancelText, onConfirm, onCancel, variant }: ConfirmDialogProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=component.d.ts.map