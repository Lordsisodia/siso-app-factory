"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
export function CategoryPreviewImage({ src, alt, fallbackSrc = "/placeholder.svg", className, }) {
    const [error, setError] = useState(false);
    return (_jsx("img", { src: error ? fallbackSrc : src, alt: alt, width: 400, height: 300, className: className, onError: () => setError(true) }));
}
export default CategoryPreviewImage;
//# sourceMappingURL=component.js.map