/*
<ai_context>
This server component provides a tailwind indicator for the app in dev mode.
</ai_context>
*/
"use server";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export async function TailwindIndicator() {
    // Don't show in production
    if (process.env.NODE_ENV === "production")
        return null;
    return (_jsxs("div", { className: "fixed bottom-12 left-3 z-50 flex size-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white", children: [_jsx("div", { className: "block sm:hidden", children: "xs" }), _jsx("div", { className: "hidden sm:block md:hidden", children: "sm" }), _jsx("div", { className: "hidden md:block lg:hidden", children: "md" }), _jsx("div", { className: "hidden lg:block xl:hidden", children: "lg" }), _jsx("div", { className: "hidden xl:block 2xl:hidden", children: "xl" }), _jsx("div", { className: "hidden 2xl:block", children: "2xl" })] }));
}
//# sourceMappingURL=component.js.map