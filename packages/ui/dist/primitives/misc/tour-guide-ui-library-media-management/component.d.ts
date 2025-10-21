interface MediaFile {
    id: string;
    name: string;
    type: "image" | "video";
    size: string;
    url: string;
    uploadedAt: string;
    activityId: string;
    activityName: string;
}
interface MediaManagementProps {
    initialData: MediaFile[];
}
export default function MediaManagement({ initialData }: MediaManagementProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map