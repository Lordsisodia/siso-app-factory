"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Layers } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const CollectionCard = React.memo(function CollectionCard({ collection, onPreviewClick, }) {
    const collectionUrl = `/c/${collection.slug}`;
    const handleClick = (e) => {
        if (onPreviewClick) {
            e.preventDefault();
            onPreviewClick(collection);
            return;
        }
        if (e.metaKey || e.ctrlKey) {
            e.preventDefault();
            window.open(collectionUrl, "_blank");
            toast.success(`${collection.name} was opened in a new tab`);
        }
        else {
            window.location.href = collectionUrl;
        }
    };
    return (_jsx("div", { className: "p-[1px]", children: _jsxs("div", { className: "block cursor-pointer", onClick: handleClick, children: [_jsx("div", { className: "relative aspect-[16/10] mb-3", children: _jsx("div", { className: "absolute inset-0", children: _jsx("div", { className: "relative w-full h-full rounded-lg shadow-base overflow-hidden", children: _jsx("img", { src: collection.cover_url || "/placeholder.svg", alt: collection.name, className: "w-full h-full object-cover rounded-lg", onError: (e) => {
                                    const target = e.target;
                                    target.src = "/placeholder.svg";
                                } }) }) }) }), _jsxs("div", { className: "flex items-center space-x-3", children: [_jsxs(Avatar, { className: "h-8 w-8 shadow-base", children: [_jsx(AvatarImage, { src: collection.user_data?.display_image_url ||
                                        collection.user_data?.image_url ||
                                        "/placeholder.svg", alt: collection.user_data?.display_name ||
                                        collection.user_data?.name ||
                                        "" }), _jsx(AvatarFallback, { children: (collection.user_data?.display_name?.[0] ||
                                        collection.user_data?.name?.[0] ||
                                        "").toUpperCase() })] }), _jsxs("div", { className: "flex items-center justify-between flex-grow min-w-0", children: [_jsx("div", { className: "min-w-0 flex-1", children: _jsx("h3", { className: "text-sm font-medium truncate", children: collection.name }) }), _jsxs("div", { className: "flex items-center gap-1 text-sm text-muted-foreground ml-3", children: [_jsx(Layers, { size: 16, className: "text-foreground" }), _jsx("span", { children: collection.components_count })] })] })] })] }) }));
});
//# sourceMappingURL=component.js.map