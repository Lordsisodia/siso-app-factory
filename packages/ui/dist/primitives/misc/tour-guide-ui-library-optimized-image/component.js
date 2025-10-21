"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { cn } from "@/lib/utils";
/**
 * OptimizedImage component
 * Renders an optimized image using either Cloudinary (preferred) or fallbacks to standard URLs
 */
export function OptimizedImage({ src, alt, width, height, className, priority = false, cloudinaryId, fill = false, sizes = "100vw", quality = 80, loading }) {
    // If we have a Cloudinary ID, use the Cloudinary component for best optimization
    if (cloudinaryId) {
        return (_jsx(CldImage, { src: cloudinaryId, alt: alt, width: width, height: height, className: cn("object-cover", className), priority: priority, fill: fill, sizes: sizes, loading: loading }));
    }
    // If we have a regular URL (could be Cloudinary or other source)
    return (_jsx(Image, { src: src, alt: alt, width: width, height: height, className: cn("object-cover", className), priority: priority, fill: fill, sizes: sizes, quality: quality, loading: loading }));
}
//# sourceMappingURL=component.js.map