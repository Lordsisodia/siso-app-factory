"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
<ai_context>
Activity location map component for activity detail pages.
Shows the meeting point location and provides directions.
Now connected to activities database.
</ai_context>
*/
import { MapPin, Navigation, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function ActivityLocationMap({ latitude, longitude, title, address }) {
    return (_jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2 text-white", children: [_jsx(MapPin, { className: "size-5 text-orange-500" }), "Meeting Point"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("p", { className: "text-gray-300", children: ["Meeting Point: ", title] }), _jsx("p", { className: "text-sm text-gray-400", children: address })] }), _jsx("div", { className: "space-y-2", children: _jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-400", children: [_jsx(Clock, { className: "size-4" }), _jsx("span", { children: "Arrive 15 minutes early" })] }) }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Button, { variant: "outline", className: "w-full border-gray-600 text-gray-300 hover:bg-gray-700", children: [_jsx(Navigation, { className: "mr-2 size-4" }), "Get Directions"] }), _jsxs(Button, { variant: "outline", className: "w-full border-gray-600 text-gray-300 hover:bg-gray-700", children: [_jsx(MapPin, { className: "mr-2 size-4" }), "View on Map"] })] }), _jsx("div", { className: "flex h-48 items-center justify-center rounded-lg bg-gray-700", children: _jsx("p", { className: "text-sm text-gray-400", children: "Interactive map coming soon" }) })] })] }));
}
//# sourceMappingURL=component.js.map