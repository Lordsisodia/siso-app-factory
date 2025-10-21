interface TextStyle {
    color?: string;
    fontSize?: string;
    gradient?: string;
}
interface ButtonStyle {
    backgroundColor?: string;
    color?: string;
    borderRadius?: string;
    hoverColor?: string;
    hoverForeground?: string;
    width?: string;
    outlined?: boolean;
    outlinePaddingAdjustment?: string;
    outlinedButtonBackgroundOnHover?: string;
}
interface SlideContent {
    title: string;
    image: string;
}
export interface DicedHeroSectionProps {
    topText: string;
    mainText: string;
    subMainText: string;
    buttonText: string;
    slides: SlideContent[];
    onMainButtonClick?: () => void;
    onGridImageHover?: (index: number) => void;
    onGridImageClick?: (index: number) => void;
    topTextStyle?: TextStyle;
    mainTextStyle?: TextStyle;
    subMainTextStyle?: TextStyle;
    buttonStyle?: ButtonStyle;
    componentBorderRadius?: string;
    backgroundColor?: string;
    separatorColor?: string;
    maxContentWidth?: string;
    mobileBreakpoint?: number;
    fontFamily?: string;
    isRTL?: boolean;
    className?: string;
}
export declare function DicedHeroSection({ topText, mainText, subMainText, buttonText, slides, onMainButtonClick, onGridImageHover, onGridImageClick, topTextStyle, mainTextStyle, subMainTextStyle, buttonStyle, componentBorderRadius, backgroundColor, separatorColor, maxContentWidth, mobileBreakpoint, fontFamily, isRTL, className, }: DicedHeroSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map