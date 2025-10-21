"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import dynamic from "next/dynamic";
import { Suspense } from "react";
// Dynamic import for Leaflet map with SSR disabled and loading state
const LeafletMapDynamic = dynamic(() => import("@/components/ui/leaflet-map"), {
    ssr: false,
    loading: () => (_jsx("div", { className: "flex h-64 w-full items-center justify-center rounded-lg border border-gray-700 bg-gray-800", children: _jsxs("div", { className: "flex items-center gap-3 text-gray-400", children: [_jsx("div", { className: "size-6 animate-spin rounded-full border-2 border-gray-600 border-t-orange-500" }), _jsx("span", { className: "text-sm font-medium", children: "Loading interactive map..." })] }) }))
});
export default function DynamicLeafletMap({ className = "", ...props }) {
    return (_jsx(Suspense, { fallback: _jsx("div", { className: `flex h-64 w-full items-center justify-center rounded-lg border border-gray-700 bg-gray-800 ${className}`, children: _jsxs("div", { className: "flex items-center gap-3 text-gray-400", children: [_jsx("div", { className: "size-6 animate-spin rounded-full border-2 border-gray-600 border-t-orange-500" }), _jsx("span", { className: "text-sm font-medium", children: "Loading map..." })] }) }), children: _jsx(LeafletMapDynamic, { className: className, ...props }) }));
}
//# sourceMappingURL=component.js.map