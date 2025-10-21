import { FC } from "react";
import { Submission } from "./types";
interface ManageSubmissionModalProps {
    submission: Submission;
    feedback: string;
    onFeedbackChange: (feedback: string) => void;
    onStatusChange: (status: string) => void;
    onClose: () => void;
    onSave: () => void;
}
declare const ManageSubmissionModal: FC<ManageSubmissionModalProps>;
export default ManageSubmissionModal;
//# sourceMappingURL=component.d.ts.map