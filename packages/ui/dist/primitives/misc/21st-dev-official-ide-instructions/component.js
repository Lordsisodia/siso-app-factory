"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "@/components/ui/code";
import { Icons } from "@/components/icons";
import { CursorDark } from "@/components/icons/cursor-dark";
import Image from "next/image";
import { Copy, Check, RefreshCw, AlertTriangle, Hammer } from "lucide-react";
import { useState } from "react";
import { getInstallCommand, getMcpConfigJson, } from "@/lib/config/magic-mcp";
import { toast } from "sonner";
export function IdeInstructions({ apiKey, selectedOS }) {
    const [copied, setCopied] = useState(false);
    const [copiedCommand, setCopiedCommand] = useState(false);
    const [copiedApiKey, setCopiedApiKey] = useState(false);
    const [copiedConfig, setCopiedConfig] = useState(false);
    const [activeTab, setActiveTab] = useState("cursor");
    const command = apiKey
        ? getInstallCommand(activeTab, apiKey.key, selectedOS)
        : "";
    const handleCopy = async () => {
        if (!apiKey)
            return;
        try {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
        catch (err) {
            console.error("Failed to copy:", err);
        }
    };
    const handleCopyCommand = async () => {
        if (!apiKey)
            return;
        try {
            await navigator.clipboard.writeText(getInstallCommand(activeTab, apiKey.key, selectedOS));
            setCopiedCommand(true);
            setTimeout(() => setCopiedCommand(false), 2000);
        }
        catch (err) {
            console.error("Failed to copy command:", err);
        }
    };
    const handleCopyApiKey = async () => {
        if (!apiKey)
            return;
        try {
            await navigator.clipboard.writeText(apiKey.key);
            setCopiedApiKey(true);
            setTimeout(() => setCopiedApiKey(false), 2000);
        }
        catch (err) {
            console.error("Failed to copy API key:", err);
        }
    };
    const handleCopyConfig = async () => {
        if (!apiKey)
            return;
        try {
            const config = getMcpConfigJson(apiKey.key, selectedOS);
            await navigator.clipboard.writeText(config);
            setCopiedConfig(true);
            toast.success("Configuration copied to clipboard");
            setTimeout(() => setCopiedConfig(false), 2000);
        }
        catch (err) {
            console.error("Failed to copy config:", err);
            toast.error("Failed to copy configuration");
        }
    };
    const getMaskedApiKey = (key) => {
        return key
            .split("")
            .map(() => "•")
            .join("");
    };
    return (_jsx("div", { className: "space-y-4", children: _jsxs(Tabs, { defaultValue: "cursor", className: "space-y-4", onValueChange: (value) => setActiveTab(value), children: [_jsxs(TabsList, { className: "min-h-[56px] rounded-md p-0.5 h-auto flex-wrap gap-2 sm:h-[56px] w-full sm:w-auto", children: [_jsxs(TabsTrigger, { value: "cursor", className: "flex flex-col items-center justify-center min-h-[52px] text-[12px] w-full sm:w-auto px-4", children: [_jsx("div", { className: "bg-black rounded-md flex items-center justify-center p-1 mb-1", children: _jsx(CursorDark, { className: "h-4 w-4" }) }), _jsx("span", { children: "Cursor" })] }), _jsxs(TabsTrigger, { value: "windsurf", className: "flex flex-col items-center justify-center min-h-[52px] text-[12px] w-full sm:w-auto px-4", children: [_jsx(Icons.windsurfTealLogo, { className: "h-6 w-10 mb-1" }), _jsx("span", { children: "Windsurf" })] }), _jsxs(TabsTrigger, { value: "cline", className: "flex flex-col items-center justify-center min-h-[52px] text-[12px] w-full sm:w-auto px-4", children: [_jsxs("div", { className: "flex items-center justify-center gap-2 mb-1", children: [_jsx(Icons.vscode, { className: "w-5 h-5" }), _jsx("span", { className: "text-sm text-neutral-400", children: "+" }), _jsx("div", { className: "flex items-center justify-center bg-gradient-to-b from-[#0E0F0F] to-[#0C0C0C] overflow-hidden rounded border border-white/10 w-[24px] h-[24px]", children: _jsx(Image, { src: "https://avatars.githubusercontent.com/u/184127137?s=200&v=4", alt: "Cline", width: 24, height: 24, className: "mix-blend-difference" }) })] }), _jsx("span", { children: "VSCode + Cline" })] })] }), _jsx(TabsContent, { value: "cursor", children: _jsx("div", { className: "space-y-4", children: _jsx("div", { className: "space-y-6", children: _jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "1" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Run Installation Command" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "Run this command in your terminal:" }), _jsxs("div", { className: "bg-muted rounded-md flex items-center w-full group relative", children: [_jsx("input", { type: "text", readOnly: true, value: getInstallCommand(activeTab, apiKey?.key || "", selectedOS), className: "bg-transparent px-3 py-2 text-xs w-full font-mono focus:outline-none overflow-x-auto" }), _jsx("button", { className: "flex items-center gap-1.5 px-2 py-1 hover:bg-primary/10 rounded-md transition-colors shrink-0 mr-1", onClick: handleCopy, children: copied ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "h-3.5 w-3.5 text-green-500" }), _jsx("span", { className: "text-xs text-green-500", children: "Copied!" })] })) : (_jsxs(_Fragment, { children: [_jsx(Copy, { className: "h-3.5 w-3.5" }), _jsx("span", { className: "text-xs", children: "Copy" })] })) })] })] })] })] }) }) }) }) }), _jsx(TabsContent, { value: "windsurf", children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "rounded-md border border-yellow-500/20 bg-yellow-500/10 p-3", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-yellow-500 mt-0.5" }), _jsxs("div", { className: "text-sm text-yellow-500 flex-1", children: ["Note: MCP is only available in Windsurf Next (Beta)", " "] }), _jsx("a", { href: "https://codeium.com/windsurf/download-next", target: "_blank", rel: "noopener noreferrer", className: "text-sm text-yellow-500 underline hover:text-yellow-400", children: "Download Windsurf Next" })] }) }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "1" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Open MCP Configuration" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "Find the toolbar above the Cascade input:" }), _jsx(Image, { src: "https://mintlify.s3.us-west-1.amazonaws.com/codeium/assets/windsurf/cascade/evergreen-toolbar-mcp.png", alt: "Windsurf MCP toolbar", className: "rounded-xl border my-2 w-full mix-blend-difference", width: 600, height: 128 }), _jsxs("div", { className: "space-y-1.5", children: [_jsx("div", { className: "flex items-center gap-2", children: _jsxs("span", { className: "flex items-center gap-1", children: ["1. Click the hammer", " ", _jsx("span", { className: "text-xs bg-primary/10 rounded-md p-1", children: _jsx(Hammer, { className: "h-3.5 w-3.5 text-primary" }) }), "icon"] }) }), _jsx("div", { className: "flex items-center gap-2", children: _jsx("span", { children: "2. Click \"Configure\" button" }) }), _jsx("p", { className: "mt-1", children: "This will open:" }), _jsx(Code, { className: "text-primary bg-muted px-2 py-0.5 rounded text-xs break-all", code: "~/.codeium/windsurf-next/mcp_config.json" })] })] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "2" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Add Magic MCP Configuration" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2 w-full max-w-[600px]", children: [_jsx("p", { children: "Add the following configuration to your MCP config file:" }), apiKey ? (_jsxs("div", { className: "relative", children: [_jsx(Code, { code: getMcpConfigJson(apiKey.key, selectedOS), language: "json", className: "overflow-x-auto bg-muted", display: "block" }), _jsx("button", { className: "absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 hover:bg-primary/10 rounded-md transition-colors", onClick: handleCopyConfig, children: copiedConfig ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "h-3.5 w-3.5 text-green-500" }), _jsx("span", { className: "text-xs text-green-500", children: "Copied!" })] })) : (_jsxs(_Fragment, { children: [_jsx(Copy, { className: "h-3.5 w-3.5" }), _jsx("span", { className: "text-xs", children: "Copy" })] })) })] })) : (_jsx("div", { className: "rounded-md border bg-muted/50 px-4 py-3 text-sm text-muted-foreground", children: "Generate an API key first" }))] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "3" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Refresh MCP Servers" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "After saving the configuration:" }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(RefreshCw, { className: "h-3.5 w-3.5 text-primary" }), _jsx("span", { children: "Click \"Refresh\" in the MCP toolbar" })] }), _jsx("p", { className: "text-muted-foreground mt-2", children: "The toolbar should now show Magic MCP server as available" })] })] })] })] })] })] }) }), _jsx(TabsContent, { value: "cline", children: _jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "space-y-6", children: [_jsxs(Tabs, { defaultValue: "auto", children: [_jsxs(TabsList, { className: "rounded-md h-7 p-0.5", children: [_jsx(TabsTrigger, { value: "auto", className: "text-xs h-6", children: "Auto" }), _jsx(TabsTrigger, { value: "manual", className: "text-xs h-6", children: "Manual" })] }), _jsx(TabsContent, { value: "auto", className: "mt-4", children: _jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "1" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Run Installation Command" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "Run this command in your terminal:" }), _jsxs("div", { className: "bg-muted rounded-md flex items-center w-full group relative", children: [_jsx("input", { type: "text", readOnly: true, value: getInstallCommand(activeTab, apiKey?.key || "", selectedOS), className: "bg-transparent px-3 py-2 text-xs w-full font-mono focus:outline-none overflow-x-auto" }), _jsx("button", { className: "flex items-center gap-1.5 px-2 py-1 hover:bg-primary/10 rounded-md transition-colors shrink-0 mr-1", onClick: handleCopyCommand, children: copiedCommand ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "h-3.5 w-3.5 text-green-500" }), _jsx("span", { className: "text-xs text-green-500", children: "Copied!" })] })) : (_jsxs(_Fragment, { children: [_jsx(Copy, { className: "h-3.5 w-3.5" }), _jsx("span", { className: "text-xs", children: "Copy" })] })) })] })] })] })] }) }) }), _jsx(TabsContent, { value: "manual", className: "mt-4", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "1" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Open MCP Server Panel" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "In the Cline extension, locate and click the MCP Server tab." }), _jsx(Image, { src: "/cline-first-step.png", alt: "Cline MCP Server Panel", width: 0, height: 0, sizes: "100vw", className: "rounded-lg border w-full h-auto mix-blend-difference" })] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "2" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Configure MCP Server" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "Click the \"Configure MCP Servers\" button and add this configuration:" }), _jsx(Code, { language: "json", className: "overflow-x-auto bg-muted text-xs", code: getMcpConfigJson(apiKey?.key || "YOUR_API_KEY", selectedOS) }), _jsx("button", { className: "flex items-center gap-1.5 px-2 py-1 hover:bg-primary/10 rounded-md transition-colors mt-2", onClick: handleCopyConfig, children: copiedConfig ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "h-3.5 w-3.5 text-green-500" }), _jsx("span", { className: "text-xs text-green-500", children: "Copied!" })] })) : (_jsxs(_Fragment, { children: [_jsx(Copy, { className: "h-3.5 w-3.5" }), _jsx("span", { className: "text-xs", children: "Copy" })] })) }), _jsxs("div", { className: "space-y-1.5 mt-3", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(Check, { className: "h-3.5 w-3.5 text-green-500" }), _jsx("span", { children: "Save the configuration" })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(RefreshCw, { className: "h-3.5 w-3.5 text-primary" }), _jsx("span", { children: "Cline will automatically detect the changes and start the MCP server" })] })] })] })] })] })] }) })] }), _jsx("div", { className: "mt-4 rounded-md border border-yellow-500/20 bg-yellow-500/10 p-3 max-w-[600px]", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-yellow-500 mt-0.5" }), _jsx("div", { className: "text-sm text-yellow-500", children: "Note: MCP server list errors can be safely ignored. Cline's MCP integration is in beta and we're working on improvements." })] }) })] }) }) })] }) }));
}
//# sourceMappingURL=component.js.map