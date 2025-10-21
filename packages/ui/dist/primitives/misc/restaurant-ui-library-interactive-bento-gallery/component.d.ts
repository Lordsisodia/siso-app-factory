type MediaKind = "image" | "video";
type MediaItem = {
    id: number;
    type: MediaKind;
    title: string;
    desc: string;
    url: string;
    span: string;
};
export interface InteractiveBentoGalleryProps {
    mediaItems: MediaItem[];
    title: string;
    description: string;
}
export declare function InteractiveBentoGallery({ mediaItems, title, description }: InteractiveBentoGalleryProps): import("react/jsx-runtime").JSX.Element;
export default InteractiveBentoGallery;
//# sourceMappingURL=component.d.ts.map