import { SelectMedia } from "@/db/schema/media-schema";
interface MediaUploadProps {
    onUploadComplete?: (media: SelectMedia) => void;
    className?: string;
    maxSize?: number;
    accept?: string;
    activityId?: string;
    buttonText?: string;
}
export declare function MediaUpload({ onUploadComplete, className, maxSize, // 10MB default
accept, activityId, buttonText }: MediaUploadProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map