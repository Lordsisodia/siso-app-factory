import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const DEFAULT_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800';
export const ImageWithFallback = ({ src, alt, fallback = DEFAULT_FALLBACK_IMAGE, className, showSkeleton = true, ...rest }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const handleLoad = () => {
        setIsLoading(false);
    };
    const handleError = (e) => {
        setIsLoading(false);
        setError(true);
        e.currentTarget.src = fallback;
    };
    return (_jsxs("div", { className: "relative", children: [isLoading && showSkeleton && (_jsx("div", { className: `absolute inset-0 ${className} bg-muted animate-pulse` })), _jsx("img", { src: src, alt: alt, onLoad: handleLoad, onError: handleError, className: `${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`, loading: "lazy", ...rest })] }));
};
export default ImageWithFallback;
//# sourceMappingURL=component.js.map