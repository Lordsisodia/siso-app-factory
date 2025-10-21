import { SelectMedia } from "@/db/schema/media-schema";
interface MediaImportProps {
    onImportComplete?: (media: SelectMedia) => void;
    activityId?: string;
    className?: string;
    buttonText?: string;
}
export declare function MediaImport({ onImportComplete, activityId, className, buttonText }: MediaImportProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map