"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
export function CTA() {
    return (_jsx("div", { className: "w-full py-20 lg:py-40", children: _jsx("div", { className: "container mx-auto", children: _jsxs("div", { className: "flex flex-col text-center bg-muted rounded-md p-4 lg:p-14 gap-8 items-center", children: [_jsx("div", { children: _jsx(Badge, { children: "Get started" }) }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("h3", { className: "text-3xl md:text-5xl tracking-tighter max-w-xl font-regular", children: "Try our platform today!" }), _jsx("p", { className: "text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl", children: "Managing a small business today is already tough. Avoid further complications by ditching outdated, tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever." })] }), _jsxs("div", { className: "flex flex-row gap-4", children: [_jsxs(Button, { className: "gap-4", variant: "outline", children: ["Jump on a call ", _jsx(PhoneCall, { className: "w-4 h-4" })] }), _jsxs(Button, { className: "gap-4", children: ["Sign up here ", _jsx(MoveRight, { className: "w-4 h-4" })] })] })] }) }) }));
}
//# sourceMappingURL=component.js.map