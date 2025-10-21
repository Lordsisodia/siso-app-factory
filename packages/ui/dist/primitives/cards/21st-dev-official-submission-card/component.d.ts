import { FC } from "react";
import { Submission } from "./types";
interface SubmissionCardProps {
    submission: Submission;
    onManage: (submission: Submission) => void;
    onEditDemo: (submission: Submission) => void;
    onSetDefaultDemo: (submission: Submission) => void;
}
declare const SubmissionCard: FC<SubmissionCardProps>;
export default SubmissionCard;
//# sourceMappingURL=component.d.ts.map