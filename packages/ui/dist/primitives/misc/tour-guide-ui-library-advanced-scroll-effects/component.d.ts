interface ParallaxTextProps {
    children: React.ReactNode;
    speed?: number;
    className?: string;
}
export declare function ParallaxText({ children, speed, className }: ParallaxTextProps): import("react/jsx-runtime").JSX.Element;
interface ScrollRevealProps {
    children: React.ReactNode;
    direction?: "up" | "down" | "left" | "right";
    distance?: number;
    duration?: number;
    delay?: number;
    className?: string;
}
export declare function ScrollReveal({ children, direction, distance, duration, delay, className }: ScrollRevealProps): import("react/jsx-runtime").JSX.Element;
export declare function StorytellingSection(): import("react/jsx-runtime").JSX.Element;
interface MorphingShapeProps {
    size?: number;
    colors?: string[];
    duration?: number;
}
export declare function MorphingShape({ size, colors, duration }: MorphingShapeProps): import("react/jsx-runtime").JSX.Element;
export declare function ScrollProgressIndicator(): import("react/jsx-runtime").JSX.Element;
interface InfiniteScrollProps {
    items: string[];
    speed?: number;
    direction?: "left" | "right";
    className?: string;
}
export declare function InfiniteScroll({ items, speed, direction, className }: InfiniteScrollProps): import("react/jsx-runtime").JSX.Element;
export declare function ScrollSnap(): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map