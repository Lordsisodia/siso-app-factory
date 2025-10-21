interface VideoSource {
    cloudinaryId: string;
    title: string;
    directUrl?: string;
}
interface VideoCarouselProps {
    videos: VideoSource[];
    autoRotate?: boolean;
    rotationInterval?: number;
    showControls?: boolean;
    showIndicators?: boolean;
    className?: string;
    overlayText?: React.ReactNode;
}
export declare function VideoCarousel({ videos, autoRotate, rotationInterval, // 8 seconds default
showControls, showIndicators, className, overlayText }: VideoCarouselProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=component.d.ts.map