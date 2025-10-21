import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { motion } from "motion/react";
import { Video } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPrice } from "@/lib/utils";
import { TemplateVideoPreview } from "./template-video-preview";
import { useMediaQuery } from "@/hooks/use-media-query";
export const TemplateCard = React.memo(function TemplateCard({ template, onPreviewClick, }) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const handleClick = React.useCallback(() => {
        if (isDesktop) {
            onPreviewClick?.(template);
        }
        else {
            window.open(template.payment_url || "#", "_blank");
        }
    }, [template, onPreviewClick, isDesktop]);
    return (_jsxs(motion.div, { className: "group relative p-[1px] cursor-pointer", onClick: handleClick, children: [_jsxs("div", { className: "relative aspect-[16/10] mb-3 group", children: [_jsx("div", { className: "absolute inset-0", children: _jsxs("div", { className: "relative w-full h-full rounded-lg shadow-base overflow-hidden", children: [_jsx("div", { className: "absolute inset-0", children: _jsx(Image, { src: template.preview_url, alt: template.name, fill: true, className: "object-cover rounded-lg", onError: (e) => {
                                            const target = e.target;
                                            target.src = "/placeholder.svg";
                                        }, priority: true }) }), _jsx("div", { className: "absolute inset-0 rounded-lg" }), template.video_url && (_jsx("div", { className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: _jsx(TemplateVideoPreview, { template: template }) }))] }) }), template.video_url && (_jsx("div", { className: "absolute top-2 left-2 z-20 bg-background/90 backdrop-blur rounded-sm px-2 py-1 pointer-events-none", "data-video-icon": `${template.id}`, children: _jsx(Video, { size: 16, className: "text-foreground" }) }))] }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs(Avatar, { className: "h-8 w-8 shadow-base", children: [_jsx(AvatarImage, { src: template.user_data.display_image_url ||
                                    template.user_data.image_url ||
                                    "/placeholder.svg", alt: template.user_data.display_name || template.user_data.name || "" }), _jsx(AvatarFallback, { children: (template.user_data.display_name?.[0] ||
                                    template.user_data.name?.[0] ||
                                    "").toUpperCase() })] }), _jsxs("div", { className: "flex items-center justify-between flex-grow min-w-0", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h3", { className: "text-sm font-medium truncate", children: template.name }), _jsx("p", { className: "text-xs text-muted-foreground truncate", children: template.user_data.display_name || template.user_data.name })] }), _jsx("div", { className: "text-sm font-medium ml-3", children: template.price > 0 ? formatPrice(template.price) : "Free" })] })] })] }));
});
//# sourceMappingURL=component.js.map