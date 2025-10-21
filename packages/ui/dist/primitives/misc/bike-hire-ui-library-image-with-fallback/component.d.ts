import React from 'react';
export interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: string;
    showSkeleton?: boolean;
}
export declare const ImageWithFallback: React.FC<ImageWithFallbackProps>;
export default ImageWithFallback;
//# sourceMappingURL=component.d.ts.map