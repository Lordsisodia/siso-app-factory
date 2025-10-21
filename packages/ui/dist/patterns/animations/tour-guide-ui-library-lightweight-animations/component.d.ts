export declare function useInViewport(options?: {}): {
    ref: import("react").RefObject<HTMLDivElement>;
    isInView: boolean;
};
interface LightAnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    animation?: "fade-up" | "fade-in" | "scale" | "slide-left" | "slide-right";
}
export declare function LightAnimatedSection({ children, className, delay, animation }: LightAnimatedSectionProps): import("react/jsx-runtime").JSX.Element;
export declare function LightHoverCard({ children, className, hoverEffect }: {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: "lift" | "scale" | "glow" | "none";
}): import("react/jsx-runtime").JSX.Element;
export declare function LightActivityCard({ children, className }: {
    children: React.ReactNode;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function ScrollReveal({ children, className, direction, distance }: {
    children: React.ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right";
    distance?: string;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map