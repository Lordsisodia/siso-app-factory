"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from "react";
import { Video } from "lucide-react";
import Link from "next/link";
import CategoryPreviewImage from "./category-preview-image";
import CategoryVideoPreview from "./category-video-preview";
export const CategoryCard = memo(function CategoryCard({ category, }) {
    const categoryUrl = `/s/${category.tag_slug}`;
    return (_jsx("div", { className: "p-[1px]", children: _jsxs(Link, { href: categoryUrl, className: "block cursor-pointer", children: [_jsxs("div", { className: "relative aspect-[4/3] mb-3 group", children: [_jsx("div", { className: "absolute inset-0", children: _jsxs("div", { className: "relative w-full h-full rounded-lg shadow-base overflow-hidden", children: [_jsx(CategoryPreviewImage, { src: category.preview_url || "/placeholder.svg", alt: category.tag_name || "", fallbackSrc: "/placeholder.svg", className: "w-full h-full object-cover rounded-lg" }), _jsx("div", { className: "absolute inset-0 rounded-lg" }), category.video_url && (_jsx("div", { className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: _jsx(CategoryVideoPreview, { videoUrl: category.video_url }) }))] }) }), category.video_url && (_jsx("div", { className: "absolute top-2 left-2 z-20 bg-background/90 backdrop-blur rounded-sm px-2 py-1 pointer-events-none", children: _jsx(Video, { size: 16, className: "text-foreground" }) }))] }), _jsx("h2", { className: "text-sm font-medium text-foreground", children: category.tag_name })] }) }));
});
//# sourceMappingURL=component.js.map