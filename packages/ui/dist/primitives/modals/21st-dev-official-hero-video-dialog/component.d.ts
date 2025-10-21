type AnimationStyle = "from-bottom" | "from-center" | "from-top" | "from-left" | "from-right" | "fade" | "top-in-bottom-out" | "left-in-right-out";
interface HeroVideoProps {
    animationStyle?: AnimationStyle;
    videoSrc: string;
    thumbnailSrc: string;
    thumbnailAlt?: string;
    className?: string;
}
export declare function HeroVideoDialog({ animationStyle, videoSrc, thumbnailSrc, thumbnailAlt, className, }: HeroVideoProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map