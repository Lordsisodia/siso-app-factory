"use client";
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Icons } from "@/components/icons";
import { CursorDark } from "@/components/icons/cursor-dark";
import Image from "next/image";
export function SelectIdeStep({ onSelect }) {
    // Add keyboard shortcuts for number keys
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "1") {
                e.preventDefault();
                onSelect("cursor");
            }
            else if (e.key === "2") {
                e.preventDefault();
                onSelect("cline");
            }
            else if (e.key === "3") {
                e.preventDefault();
                onSelect("windsurf");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onSelect]);
    const renderHotkeyHint = (hotkey) => {
        return (_jsxs(Button, { className: "mt-2 pr-1.5", variant: "outline", children: ["Press", _jsxs("kbd", { className: "pointer-events-none h-5 w-5 justify-center select-none items-center gap-1 rounded border-muted-foreground/40 bg-foreground/10 px-1.5 ml-1.5 font-sans text-[11px] text-foreground leading-none opacity-100 flex", children: [" ", hotkey] })] }));
    };
    return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] space-y-8 px-4", children: [_jsxs("div", { className: "space-y-4 max-w-2xl text-center", children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Select Your IDE" }), _jsx("p", { className: "text-lg text-muted-foreground", children: "Choose the IDE you want to use with Magic MCP" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl z-10", children: [_jsxs(Button, { variant: "outline", className: "h-auto py-6 px-4 flex flex-col items-center gap-4 hover:bg-primary/5 group bg-background", onClick: () => onSelect("cursor"), children: [_jsx("div", { className: "bg-black rounded-md flex items-center justify-center p-2", children: _jsx(CursorDark, { className: "h-10 w-10" }) }), _jsx("div", { className: "text-center", children: _jsx("h3", { className: "font-medium text-lg", children: "Cursor" }) }), renderHotkeyHint("1")] }), _jsxs(Button, { variant: "outline", className: "h-auto py-6 px-4 flex flex-col items-center gap-4 hover:bg-primary/5 group", onClick: () => onSelect("cline"), children: [_jsxs("div", { className: "flex items-center justify-center gap-3", children: [_jsx(Icons.vscode, { className: "w-9 h-9 mr-1" }), _jsx("span", { className: "text-sm text-muted-foreground", children: "+" }), _jsx("div", { className: "flex items-center gap-2 bg-gradient-to-b from-[#0E0F0F] to-[#0C0C0C] overflow-hidden rounded-xl border border-white/10 w-[53px] h-[53px]", children: _jsx(Image, { src: "https://avatars.githubusercontent.com/u/184127137?s=200&v=4", alt: "Cline", width: 53, height: 53, className: "mix-blend-hard-light" }) })] }), _jsx("div", { className: "text-center", children: _jsx("h3", { className: "font-medium text-lg", children: "VS Code + Cline" }) }), renderHotkeyHint("2")] }), _jsxs(Button, { variant: "outline", className: "h-auto py-6 px-4 flex flex-col items-center gap-4 hover:bg-primary/5 group", onClick: () => onSelect("windsurf"), children: [_jsx("div", { className: "flex items-center justify-center", children: _jsx(Icons.windsurfTealLogo, { className: "w-14 h-14" }) }), _jsx("div", { className: "text-center", children: _jsx("h3", { className: "font-medium text-lg", children: "Windsurf" }) }), renderHotkeyHint("3")] })] })] }));
}
//# sourceMappingURL=component.js.map