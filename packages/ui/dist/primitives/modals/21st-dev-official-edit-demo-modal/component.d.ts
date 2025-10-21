import { FC } from "react";
import { Submission } from "./types";
interface EditDemoModalProps {
    submission: Submission;
    demoName: string;
    demoSlug: string;
    onDemoNameChange: (name: string) => void;
    onDemoSlugChange: (slug: string) => void;
    onClose: () => void;
    onSave: () => void;
}
declare const EditDemoModal: FC<EditDemoModalProps>;
export default EditDemoModal;
//# sourceMappingURL=component.d.ts.map