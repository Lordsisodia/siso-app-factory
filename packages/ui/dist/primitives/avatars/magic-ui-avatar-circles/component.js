/* eslint-disable @next/next/no-img-element */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
export const AvatarCircles = ({ numPeople, className, avatarUrls, }) => {
    return (_jsxs("div", { className: cn("z-10 flex -space-x-4 rtl:space-x-reverse", className), children: [avatarUrls.map((url, index) => (_jsx("a", { href: url.profileUrl, target: "_blank", rel: "noopener noreferrer", children: _jsx("img", { className: "h-10 w-10 rounded-full border-2 border-white dark:border-gray-800", src: url.imageUrl, width: 40, height: 40, alt: `Avatar ${index + 1}` }, index) }, index))), (numPeople ?? 0) > 0 && (_jsxs("a", { className: "flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black", href: "", children: ["+", numPeople] }))] }));
};
//# sourceMappingURL=component.js.map