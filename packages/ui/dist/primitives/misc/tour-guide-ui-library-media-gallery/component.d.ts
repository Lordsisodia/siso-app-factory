import { SelectMedia } from "@/db/schema/media-schema";
interface MediaGalleryProps {
    userId?: string;
    activityId?: string;
    className?: string;
    onSelect?: (media: SelectMedia) => void;
    onDelete?: (id: string) => void;
    selectable?: boolean;
    deletable?: boolean;
    maxItems?: number;
}
export declare function MediaGallery({ userId, activityId, className, onSelect, onDelete, selectable, deletable, maxItems }: MediaGalleryProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map