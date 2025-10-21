"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from "react";
import bg from "./bolt-bg-1.png";
import text from "./bolt-text.png";
const BoltBannerContent = memo(function BoltBannerContent() {
    return (_jsx("a", { href: "https://hackathon.dev", target: "_blank", className: "h-[110px] rounded-lg z-50 border-b border-border bg-muted transition-[left] duration-200 ease-in-out", children: _jsxs("div", { className: "flex items-center justify-center relative h-[100px]", children: [_jsx("img", { className: "w-full h-[110px] rounded-lg object-cover absolute top-0 left-0", src: bg.src, alt: "Bolt Banner" }), _jsx("img", { className: "w-[200px] h-[105px] object-contain absolute top-[59%] -translate-y-1/2 left-1/2 -translate-x-1/2 ", src: text.src, alt: "Bolt Banner" })] }) }));
});
export function BoltBanner() {
    return _jsx(BoltBannerContent, {});
}
//# sourceMappingURL=component.js.map