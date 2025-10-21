"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
export default function ComponentPreviewImage({ src, alt, fallbackSrc, className, }) {
    const [imgSrc, setImgSrc] = useState(src);
    const [isPlaceholder, setIsPlaceholder] = useState(src === fallbackSrc);
    useEffect(() => {
        setImgSrc(src);
        setIsPlaceholder(src === fallbackSrc);
    }, [src, fallbackSrc]);
    return (_jsx("img", { src: imgSrc, alt: alt, className: className, onError: () => {
            setImgSrc(fallbackSrc);
            setIsPlaceholder(true);
        }, style: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            backgroundColor: isPlaceholder ? "transparent" : "",
        } }));
}
//# sourceMappingURL=component.js.map