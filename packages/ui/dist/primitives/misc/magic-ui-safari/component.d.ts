import type { HTMLAttributes } from "react";
type SafariMode = "default" | "simple";
export interface SafariProps extends HTMLAttributes<HTMLDivElement> {
    url?: string;
    imageSrc?: string;
    videoSrc?: string;
    mode?: SafariMode;
}
export declare function Safari({ imageSrc, videoSrc, url, mode, className, style, ...props }: SafariProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map