import { FC } from "react";
type DeleteMode = "submission" | "component" | null;
interface DeleteComponentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: (mode: DeleteMode) => Promise<void>;
    componentName: string;
    isDeleting: boolean;
}
declare const DeleteComponentDialog: FC<DeleteComponentDialogProps>;
export default DeleteComponentDialog;
//# sourceMappingURL=component.d.ts.map