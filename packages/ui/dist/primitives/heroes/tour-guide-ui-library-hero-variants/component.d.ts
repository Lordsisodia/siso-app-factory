interface HeroVideo {
    cloudinaryId: string;
    src: string;
    fallbackSrc: string;
    poster: string;
    alt: string;
    title: string;
}
interface HeroVariantsProps {
    heroVideos: HeroVideo[];
    onSearch?: (query: string) => void;
}
export declare function HeroVariants({ heroVideos, onSearch }: HeroVariantsProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map