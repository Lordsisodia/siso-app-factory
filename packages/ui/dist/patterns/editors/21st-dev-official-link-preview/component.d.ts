import React from "react";
type LinkPreviewProps = {
    children: React.ReactNode;
    url: string;
    className?: string;
    width?: number;
    height?: number;
    quality?: number;
    layout?: string;
    objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
} & ({
    isStatic: true;
    imageSrc: string;
} | {
    isStatic?: false;
    imageSrc?: never;
});
export declare const LinkPreview: ({ children, url, className, width, height, quality, layout, objectFit, isStatic, imageSrc, }: LinkPreviewProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map