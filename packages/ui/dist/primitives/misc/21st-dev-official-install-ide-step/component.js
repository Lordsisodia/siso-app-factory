"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Code } from "@/components/ui/code";
import { Copy, Check, AlertTriangle, RefreshCw, Hammer, } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getInstallCommand, getMcpConfigJson } from "@/lib/config/magic-mcp";
export function InstallIdeStep({ apiKey, selectedIde, osType, onComplete, onGenerateApiKey, }) {
    const [copied, setCopied] = useState(false);
    const [copiedConfig, setCopiedConfig] = useState(false);
    const [copiedApiKey, setCopiedApiKey] = useState(false);
    const [currentSubStep, setCurrentSubStep] = useState(1);
    const [clineState, setClineState] = useState("none");
    const firstCopyDone = useRef(false);
    // Add useEffect for auto-copy
    useEffect(() => {
        if (!apiKey || firstCopyDone.current)
            return;
        const autoCopy = () => {
            if (selectedIde === "cursor") {
                handleCopy();
            }
            else if (selectedIde === "cline") {
                if (clineState === "none") {
                    handleCopy();
                    setClineState("command");
                }
            }
            else if (selectedIde === "windsurf") {
                handleCopyConfig();
            }
            firstCopyDone.current = true;
        };
        autoCopy();
    }, [apiKey, selectedIde]);
    // Add useEffect for focus tracking
    useEffect(() => {
        const handleFocus = () => {
            if (selectedIde === "cline" && clineState === "command" && apiKey) {
                handleCopyApiKey();
                setClineState("api");
            }
        };
        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, [selectedIde, clineState, apiKey]);
    const command = apiKey
        ? getInstallCommand(selectedIde, apiKey.key, osType)
        : "";
    // Add keyboard shortcut for Enter key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                onComplete("next");
            }
            else if (e.code === "KeyH" &&
                !e.metaKey &&
                !e.ctrlKey &&
                !e.altKey &&
                !e.shiftKey) {
                e.preventDefault();
                onComplete("troubleshooting");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onComplete]);
    const handleCopy = () => {
        if (!apiKey)
            return;
        try {
            const textArea = document.createElement("textarea");
            textArea.value = command;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopied(true);
            toast.success("Command copied to clipboard");
            setTimeout(() => setCopied(false), 2000);
        }
        catch (err) {
            console.error("Failed to copy:", err);
        }
    };
    const handleCopyConfig = () => {
        if (!apiKey)
            return;
        try {
            const config = getMcpConfigJson(apiKey.key, osType);
            const textArea = document.createElement("textarea");
            textArea.value = config;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopiedConfig(true);
            toast.success("Configuration copied to clipboard");
            setTimeout(() => setCopiedConfig(false), 2000);
        }
        catch (err) {
            console.error("Failed to copy config:", err);
        }
    };
    const handleCopyApiKey = () => {
        if (!apiKey)
            return;
        try {
            const textArea = document.createElement("textarea");
            textArea.value = apiKey.key;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
            setCopiedApiKey(true);
            toast.success("API Key copied to clipboard");
            setTimeout(() => setCopiedApiKey(false), 2000);
        }
        catch (err) {
            console.error("Failed to copy API key:", err);
        }
    };
    const getIdeInstructions = () => {
        switch (selectedIde) {
            case "cursor":
                return (_jsx("div", { className: "space-y-6", children: _jsxs(Tabs, { defaultValue: "auto", children: [_jsxs(TabsList, { className: "rounded-md h-7 p-0.5", children: [_jsx(TabsTrigger, { value: "auto", className: "text-xs h-6", children: "Auto" }), _jsx(TabsTrigger, { value: "manual", className: "text-xs h-6", children: "Manual" })] }), _jsx(TabsContent, { value: "auto", className: "flex flex-col gap-4", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mt-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "1" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Run Installation Command" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "Run this command in your terminal:" }), _jsxs("div", { className: "bg-muted rounded-md flex items-center w-full group relative", children: [_jsx("input", { type: "text", readOnly: true, value: getInstallCommand(selectedIde, apiKey?.key || "", osType), className: "bg-transparent px-3 py-2 text-xs w-full font-mono focus:outline-none overflow-x-auto" }), _jsx("button", { className: "flex items-center gap-1.5 px-2 py-1 hover:bg-primary/10 rounded-md transition-colors shrink-0 mr-1", onClick: handleCopy, children: copied ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "h-3.5 w-3.5 text-green-500" }), _jsx("span", { className: "text-xs text-green-500", children: "Copied!" })] })) : (_jsxs(_Fragment, { children: [_jsx(Copy, { className: "h-3.5 w-3.5" }), _jsx("span", { className: "text-xs", children: "Copy" })] })) })] })] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "2" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium text-base sm:text-lg", children: "Verify Connection" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "Use keyboard shortcut to open settings:" }), _jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("kbd", { className: "pointer-events-none h-5 text-muted-foreground select-none items-center gap-1 rounded border bg-muted px-1.5 opacity-100 flex text-[11px] leading-none font-sans", children: osType === "windows" ? "Ctrl" : "⌘" }), "+", _jsx("kbd", { className: "pointer-events-none h-5 min-w-5 justify-center text-muted-foreground select-none items-center gap-1 rounded border bg-muted px-1.5 opacity-100 flex text-[13px] leading-none font-sans", children: "," })] }), _jsxs("span", { className: "text-xs", children: ["(", osType === "windows"
                                                                                    ? "Windows"
                                                                                    : osType === "mac"
                                                                                        ? "Mac"
                                                                                        : "Linux", ")"] })] }), _jsx("p", { className: "mt-2", children: "Navigate to:" }), _jsx("p", { className: "text-primary font-medium break-words text-sm sm:text-base", children: "Cursor \u2192 Full Settings \u2192 MCP" }), _jsxs("div", { className: "flex items-center gap-2 text-sm mt-4", children: [_jsx(Check, { className: "h-3.5 w-3.5 text-green-500" }), _jsx("span", { children: "Magic MCP should now be available in the server list" })] })] })] })] })] }) }), _jsx(TabsContent, { value: "manual", className: "mt-4", children: _jsx("div", { className: "text-sm text-muted-foreground space-y-4", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "1" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Open MCP Settings" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "Use keyboard shortcut to open settings:" }), _jsx("div", { className: "flex flex-wrap items-center gap-2", children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("kbd", { className: "pointer-events-none h-5 text-muted-foreground select-none items-center gap-1 rounded border bg-muted px-1.5 opacity-100 inline-flex text-[11px] leading-none font-sans", children: osType === "windows" ? "Ctrl" : "⌘" }), "+", _jsx("kbd", { className: "pointer-events-none h-5 min-w-5 justify-center text-muted-foreground select-none items-center gap-1 rounded border bg-muted px-1.5 opacity-100 inline-flex text-[13px] leading-none font-sans", children: "," })] }) }), _jsx("p", { className: "mt-2", children: "Navigate to:" }), _jsx("p", { className: "text-primary font-medium break-words text-sm sm:text-base", children: "Cursor \u2192 Full Settings \u2192 MCP" })] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "2" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Add MCP Server Configuration" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsxs("div", { className: "flex items-start gap-2.5 text-sm", children: [_jsx(Check, { className: "h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" }), _jsx("span", { children: "Click \"+ Add new global MCP server\" button" })] }), _jsxs("div", { className: "flex items-start gap-2.5 text-sm", children: [_jsx(Check, { className: "h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" }), _jsx("span", { children: "Copy paste this code into opened mcp.json" })] }), apiKey ? (_jsxs("div", { className: "relative", children: [_jsx(Code, { language: "json", className: "overflow-x-auto bg-muted", display: "block", code: getMcpConfigJson(apiKey.key, osType) }), _jsx("button", { className: "absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 hover:bg-primary/10 rounded-md transition-colors", onClick: handleCopyConfig, children: copiedConfig ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "h-3.5 w-3.5 text-green-500" }), _jsx("span", { className: "text-xs text-green-500", children: "Copied!" })] })) : (_jsxs(_Fragment, { children: [_jsx(Copy, { className: "h-3.5 w-3.5" }), _jsx("span", { className: "text-xs", children: "Copy" })] })) })] })) : (_jsx("div", { className: "rounded-md border bg-muted/50 px-4 py-3 text-sm text-muted-foreground", children: "Generate an API key first" })), _jsxs("div", { className: "flex items-start gap-2.5 text-sm", children: [_jsx(RefreshCw, { className: "h-4 w-4 text-primary mt-0.5 flex-shrink-0" }), _jsx("span", { children: "Cursor will automatically detect and initialize the MCP server" })] })] })] })] })] }) }) })] }) }));
            case "windsurf":
                return (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "rounded-md border border-yellow-500/20 bg-yellow-500/10 p-3", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-yellow-500 mt-0.5" }), _jsxs("div", { className: "text-sm text-yellow-500 flex-1", children: ["Note: MCP is only available in Windsurf Next (Beta)", " "] }), _jsx("a", { href: "https://codeium.com/windsurf/download-next", target: "_blank", rel: "noopener noreferrer", className: "text-sm text-yellow-500 underline hover:text-yellow-400", children: "Download Windsurf Next" })] }) }), _jsxs(Tabs, { defaultValue: "auto", children: [_jsxs(TabsList, { className: "rounded-md h-7 p-0.5", children: [_jsx(TabsTrigger, { value: "auto", className: "text-xs h-6", children: "Auto" }), _jsx(TabsTrigger, { value: "manual", className: "text-xs h-6", children: "Manual" })] }), _jsx(TabsContent, { value: "auto", className: "flex flex-col gap-4", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4 mt-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "1" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Run Installation Command" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "Run this command in your terminal:" }), _jsxs("div", { className: "bg-muted rounded-md flex items-center w-full group relative", children: [_jsx("input", { type: "text", readOnly: true, value: getInstallCommand(selectedIde, apiKey?.key || "", osType), className: "bg-transparent px-3 py-2 text-xs w-full font-mono focus:outline-none overflow-x-auto" }), _jsx("button", { className: "flex items-center gap-1.5 px-2 py-1 hover:bg-primary/10 rounded-md transition-colors shrink-0 mr-1", onClick: handleCopy, children: copied ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "h-3.5 w-3.5 text-green-500" }), _jsx("span", { className: "text-xs text-green-500", children: "Copied!" })] })) : (_jsxs(_Fragment, { children: [_jsx(Copy, { className: "h-3.5 w-3.5" }), _jsx("span", { className: "text-xs", children: "Copy" })] })) })] })] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "2" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Verify Connection" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "Find the toolbar above the Cascade input:" }), _jsx(Image, { src: "https://mintlify.s3.us-west-1.amazonaws.com/codeium/assets/windsurf/cascade/evergreen-toolbar-mcp.png", alt: "Windsurf MCP toolbar", className: "rounded-xl border my-2 w-full mix-blend-difference", width: 600, height: 128 }), _jsxs("div", { className: "flex items-center gap-2 text-sm mt-4", children: [_jsx(Check, { className: "h-3.5 w-3.5 text-green-500" }), _jsx("span", { children: "Magic MCP should now be available in the MCP server list" })] })] })] })] })] }) }), _jsx(TabsContent, { value: "manual", className: "mt-4", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "1" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Open MCP Configuration" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "Find the toolbar above the Cascade input:" }), _jsx(Image, { src: "https://mintlify.s3.us-west-1.amazonaws.com/codeium/assets/windsurf/cascade/evergreen-toolbar-mcp.png", alt: "Windsurf MCP toolbar", className: "rounded-xl border my-2 w-full mix-blend-difference", width: 600, height: 128 }), _jsxs("div", { className: "space-y-1.5", children: [_jsx("div", { className: "flex items-center gap-2", children: _jsxs("span", { className: "flex items-center gap-1", children: ["1. Click the hammer", " ", _jsx("span", { className: "text-xs bg-primary/10 rounded-md p-1", children: _jsx(Hammer, { className: "h-3.5 w-3.5 text-primary" }) }), "icon"] }) }), _jsx("div", { className: "flex items-center gap-2", children: _jsx("span", { children: "2. Click \"Configure\" button" }) }), _jsx("p", { className: "mt-1", children: "This will open:" }), _jsx(Code, { className: "text-primary bg-muted px-2 py-0.5 rounded text-xs break-all", code: "~/.codeium/windsurf-next/mcp_config.json" })] })] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "2" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Add Magic MCP Configuration" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2 w-full max-w-[600px]", children: [_jsx("p", { children: "Add the following configuration to your MCP config file:" }), apiKey ? (_jsxs("div", { className: "relative", children: [_jsx(Code, { language: "json", className: "overflow-x-auto bg-muted", display: "block", code: getMcpConfigJson(apiKey.key, osType) }), _jsx("button", { className: "absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 hover:bg-primary/10 rounded-md transition-colors", onClick: handleCopyConfig, children: copiedConfig ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "h-3.5 w-3.5 text-green-500" }), _jsx("span", { className: "text-xs text-green-500", children: "Copied!" })] })) : (_jsxs(_Fragment, { children: [_jsx(Copy, { className: "h-3.5 w-3.5" }), _jsx("span", { className: "text-xs", children: "Copy" })] })) })] })) : (_jsx("div", { className: "rounded-md border bg-muted/50 px-4 py-3 text-sm text-muted-foreground", children: "Generate an API key first" }))] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "3" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Refresh MCP Servers" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "After saving the configuration:" }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(RefreshCw, { className: "h-3.5 w-3.5 text-primary" }), _jsx("span", { children: "Click \"Refresh\" in the MCP toolbar" })] }), _jsx("p", { className: "text-muted-foreground mt-2", children: "The toolbar should now show Magic MCP server as available" })] })] })] })] })] }) })] })] }));
            case "cline":
                return (_jsxs("div", { className: "space-y-4", children: [_jsxs(Tabs, { defaultValue: "auto", children: [_jsxs(TabsList, { className: "rounded-md h-7 p-0.5", children: [_jsx(TabsTrigger, { value: "auto", className: "text-xs h-6", children: "Auto" }), _jsx(TabsTrigger, { value: "manual", className: "text-xs h-6", children: "Manual" })] }), _jsx(TabsContent, { value: "auto", className: "mt-4", children: _jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "1" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Run Installation Command" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "Run this command in your terminal:" }), _jsxs("div", { className: "bg-muted rounded-md flex items-center w-full group relative", children: [_jsx("input", { type: "text", readOnly: true, value: getInstallCommand(selectedIde, apiKey?.key || "", osType), className: "bg-transparent px-3 py-2 text-xs w-full font-mono focus:outline-none overflow-x-auto" }), _jsx("button", { className: "flex items-center gap-1.5 px-2 py-1 hover:bg-primary/10 rounded-md transition-colors shrink-0 mr-1", onClick: handleCopy, children: copied ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "h-3.5 w-3.5 text-green-500" }), _jsx("span", { className: "text-xs text-green-500", children: "Copied!" })] })) : (_jsxs(_Fragment, { children: [_jsx(Copy, { className: "h-3.5 w-3.5" }), _jsx("span", { className: "text-xs", children: "Copy" })] })) })] })] })] })] }) }) }), _jsx(TabsContent, { value: "manual", className: "mt-4", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "1" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Open MCP Server Panel" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "In the Cline extension, locate and click the MCP Server tab." }), _jsx(Image, { src: "/cline-first-step.png", alt: "Cline MCP Server Panel", width: 0, height: 0, sizes: "100vw", className: "rounded-lg border w-full h-auto mix-blend-difference" })] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("div", { className: "rounded-md bg-primary/10 p-1.5 text-primary h-7 w-7 flex items-center justify-center shrink-0", children: "2" }), _jsxs("div", { className: "space-y-3 w-full", children: [_jsx("h3", { className: "font-medium", children: "Configure MCP Server" }), _jsxs("div", { className: "text-sm text-muted-foreground space-y-2", children: [_jsx("p", { children: "Click the \"Configure MCP Servers\" button and add this configuration:" }), apiKey ? (_jsxs("div", { className: "relative", children: [_jsx(Code, { language: "json", className: "overflow-x-auto bg-muted", display: "block", code: getMcpConfigJson(apiKey.key, osType) }), _jsx("button", { className: "absolute top-2 right-2 flex items-center gap-1.5 px-2 py-1 hover:bg-primary/10 rounded-md transition-colors", onClick: handleCopyConfig, children: copiedConfig ? (_jsxs(_Fragment, { children: [_jsx(Check, { className: "h-3.5 w-3.5 text-green-500" }), _jsx("span", { className: "text-xs text-green-500", children: "Copied!" })] })) : (_jsxs(_Fragment, { children: [_jsx(Copy, { className: "h-3.5 w-3.5" }), _jsx("span", { className: "text-xs", children: "Copy" })] })) })] })) : (_jsx("div", { className: "rounded-md border bg-muted/50 px-4 py-3 text-sm text-muted-foreground", children: "Generate an API key first" })), _jsxs("div", { className: "space-y-1.5 mt-3", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(Check, { className: "h-3.5 w-3.5 text-green-500" }), _jsx("span", { children: "Save the configuration" })] }), _jsxs("div", { className: "flex items-center gap-2 text-sm", children: [_jsx(RefreshCw, { className: "h-3.5 w-3.5 text-primary" }), _jsx("span", { children: "Cline will automatically detect the changes and start the MCP server" })] })] })] })] })] })] }) })] }), _jsx("div", { className: "mt-4 rounded-md border border-yellow-500/20 bg-yellow-500/10 p-3", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-yellow-500 mt-0.5" }), _jsx("div", { className: "text-sm text-yellow-500", children: "Note: MCP server list errors can be safely ignored. Cline's MCP integration is in beta and we're working on improvements." })] }) })] }));
            default:
                return null;
        }
    };
    // Early in the component, we'll add a fallback UI for when API key is missing
    if (!apiKey) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 px-4", children: [_jsxs("div", { className: "space-y-4 max-w-2xl", children: [_jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "API Key Missing" }), _jsx("p", { className: "text-lg text-muted-foreground", children: "We couldn't find your API key, which is required to use Magic MCP." })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 items-center", children: [onGenerateApiKey && (_jsxs(Button, { onClick: onGenerateApiKey, className: "flex items-center gap-2", children: [_jsx(RefreshCw, { className: "h-4 w-4" }), "Generate API Key"] })), _jsxs(Button, { variant: "outline", onClick: () => onComplete("troubleshooting"), className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), "Go to Troubleshooting"] })] })] }));
    }
    return (_jsxs("div", { className: "flex flex-col space-y-8 px-4 max-w-[700px] mx-auto w-full", children: [_jsxs("div", { className: "space-y-4 max-w-2xl", children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Install Magic MCP" }), _jsxs("p", { className: "text-lg text-muted-foreground", children: ["Follow these steps to install Magic MCP in", " ", selectedIde === "cursor"
                                ? "Cursor"
                                : selectedIde === "windsurf"
                                    ? "Windsurf"
                                    : "Cline"] })] }), _jsx("div", { className: "bg-card rounded-lg max-w-3xl", children: getIdeInstructions() }), _jsx("div", { className: "sticky bottom-5 w-full pt-8 pb-4", children: _jsxs("div", { className: "flex justify-center w-full gap-2", children: [_jsxs(Button, { variant: "outline", onClick: () => onComplete("troubleshooting"), className: "pr-1.5", children: ["Need help?", _jsx("kbd", { className: "pointer-events-none h-5 w-5 justify-center select-none items-center gap-1 rounded border-muted-foreground/40 bg-foreground/10 px-1.5 ml-1.5 font-sans text-[11px] text-foreground leading-none opacity-100 flex", children: "H" })] }), _jsxs(Button, { className: "pr-1.5", onClick: () => onComplete("next"), children: ["Continue", _jsx("kbd", { className: "pointer-events-none h-5 w-5 justify-center select-none items-center gap-1 rounded border-muted-foreground/40 bg-muted-foreground/20 px-1.5 ml-1.5 font-sans text-[11px] text-kbd leading-none opacity-100 flex", children: _jsx(Icons.enter, { className: "h-2.5 w-2.5" }) })] })] }) })] }));
}
//# sourceMappingURL=component.js.map