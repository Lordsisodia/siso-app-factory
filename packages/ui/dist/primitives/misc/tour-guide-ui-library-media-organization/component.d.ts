interface MediaFile {
    id: string;
    name: string;
    type: "image" | "video";
    url: string;
    activityName: string;
}
interface MediaOrganizationProps {
    mediaFiles: MediaFile[];
}
export default function MediaOrganization({ mediaFiles }: MediaOrganizationProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map