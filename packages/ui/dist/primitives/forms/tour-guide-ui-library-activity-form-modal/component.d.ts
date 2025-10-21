import { ActivityWithDetails } from "@/actions/db/activities-actions";
interface ActivityFormModalProps {
    show: boolean;
    onClose: () => void;
    activity?: ActivityWithDetails | null;
    onSave: (activity: ActivityWithDetails) => void;
}
export default function ActivityFormModal({ show, onClose, activity, onSave }: ActivityFormModalProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=component.d.ts.map