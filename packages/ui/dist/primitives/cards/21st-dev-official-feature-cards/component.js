import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from "lucide-react";
export function FeatureCards({ title, features }) {
    return (_jsxs("div", { className: "w-full border rounded-lg p-4 mt-auto text-start", children: [_jsx("h4", { className: "text-sm font-medium mb-4", children: title }), _jsx("div", { className: "space-y-4", children: features.map((feature, index) => (_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Check, { size: 16, className: "text-green-500 shrink-0 mt-0.5" }), _jsxs("div", { className: "flex flex-col gap-0.5", children: [_jsx("span", { className: "text-sm", children: feature.title }), _jsx("span", { className: "text-xs text-muted-foreground", children: feature.description })] })] }, index))) })] }));
}
//# sourceMappingURL=component.js.map