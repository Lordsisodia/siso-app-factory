"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
export function TroubleshootingSection({ selectedOS = "mac", selectedIde = "cursor", }) {
    const [os, setOs] = useState(selectedOS);
    const [latestVersion, setLatestVersion] = useState("0.0.34");
    // Fetch latest version from npm registry
    useEffect(() => {
        async function fetchLatestVersion() {
            try {
                const response = await fetch("https://registry.npmjs.org/@21st-dev/magic");
                const data = await response.json();
                if (data && data["dist-tags"] && data["dist-tags"].latest) {
                    setLatestVersion(data["dist-tags"].latest);
                }
            }
            catch (error) {
                console.error("Failed to fetch latest version", error);
            }
        }
        fetchLatestVersion();
    }, []);
    // Log the selectedIde value to debug
    useEffect(() => {
        console.log("TroubleshootingSection received selectedIde:", selectedIde);
    }, [selectedIde]);
    const commonIssues = [
        {
            problem: "Client closed",
            solutions: [
                `Go to MCP configuration`,
                `Use explicit version number: "npx -y @21st-dev/magic@${latestVersion}" instead of "@latest"`,
            ],
        },
        {
            problem: "No tools found error",
            solutions: [
                "Update npm to the latest version: npm install -g npm@latest",
                "Restart your IDE after adding the MCP server",
                "Make sure your API key is correctly entered in the configuration",
                "Check internet connection and firewall settings",
            ],
        },
        {
            problem: "Magic Agent doesn't respond to commands",
            solutions: [
                "Try using /21 instead of /ui in your IDE's chat",
                "Ensure you're in agent mode, not regular chat mode",
                "Verify that the MCP server shows a green status light",
                "Try restarting your IDE",
            ],
        },
    ];
    const windowsIssues = [
        {
            problem: "Command parsing errors on Windows",
            solutions: [
                "Ensure you include C:\\Windows\\System32\\cmd.exe /c before the npx command",
                "Check for proper escaping of quotes in your command",
                "Try closing and reopening Cursor after adding the MCP server",
            ],
        },
        {
            problem: "Timeout waiting for EverythingProvider error",
            solutions: [
                "Update npm to the latest version: npm install -g npm@latest",
                "Check your internet connection",
                "Temporarily disable firewall or antivirus to test",
            ],
        },
    ];
    const macIssues = [
        {
            problem: "Request timed out error on Mac",
            solutions: [
                "Check your internet connection",
                "Try running the command directly in terminal to see specific errors",
                "Restart your IDE",
            ],
        },
    ];
    const ideIssues = {
        cursor: [
            {
                problem: "Cursor crashes after adding MCP",
                solutions: [
                    "Update Cursor to the latest version",
                    "Try reinstalling the MCP with the correct command",
                    "Delete and recreate the MCP configuration",
                ],
            },
        ],
        windsurf: [
            {
                problem: "Conflicts with existing MCPs in Windsurf",
                solutions: [
                    "Remove all existing Magic MCP entries from your configuration",
                    "Use the specific Windsurf installation command",
                    "Check your mcp_config.json file for duplicate entries",
                ],
            },
            {
                problem: "Magic Agent doesn't respond in Windsurf",
                solutions: [
                    "Magic MCP only works with Windsurf Next beta",
                    "Ensure you're using the latest version of Windsurf Next",
                ],
            },
        ],
        cline: [
            {
                problem: "MCP server list errors in Cline",
                solutions: [
                    "These errors can safely be ignored and don't affect functionality in Cline",
                    "The MCP integration with Cline is still in beta and these messages are normal",
                ],
            },
        ],
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(Tabs, { value: os, onValueChange: (value) => setOs(value), className: "w-full", children: _jsxs(TabsList, { className: "grid grid-cols-2 mb-4 rounded-md h-7 p-0.5 w-[200px]", children: [_jsx(TabsTrigger, { className: "text-xs h-6", value: "mac", children: "Mac OS" }), _jsx(TabsTrigger, { className: "text-xs h-6", value: "windows", children: "Windows" })] }) }), _jsxs("div", { children: [_jsx("h4", { className: "text-lg font-medium mb-2", children: "Common Issues" }), _jsx("div", { className: "space-y-4", children: commonIssues.map((issue, index) => (_jsxs("div", { className: "rounded-md border bg-card p-3", children: [_jsx("p", { className: "font-medium mb-2", children: issue.problem }), _jsx("ul", { className: "list-disc pl-5 text-sm text-muted-foreground space-y-1", children: issue.solutions.map((solution, sIndex) => (_jsx("li", { children: solution }, sIndex))) })] }, index))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-lg font-medium mb-2", children: os === "windows" ? "Windows-Specific Issues" : "Mac-Specific Issues" }), _jsx("div", { className: "space-y-4", children: (os === "windows" ? windowsIssues : macIssues).map((issue, index) => (_jsxs("div", { className: "rounded-md border bg-card p-3", children: [_jsx("p", { className: "font-medium mb-2", children: issue.problem }), _jsx("ul", { className: "list-disc pl-5 text-sm text-muted-foreground space-y-1", children: issue.solutions.map((solution, sIndex) => (_jsx("li", { children: solution }, sIndex))) })] }, index))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-lg font-medium mb-2", children: "IDE-Specific Issues" }), _jsxs(Tabs, { defaultValue: selectedIde, className: "w-full", children: [_jsxs(TabsList, { className: "grid grid-cols-3 mb-4 rounded-md h-7 p-0.5", children: [_jsx(TabsTrigger, { className: "text-xs h-6", value: "cursor", children: "Cursor" }), _jsx(TabsTrigger, { className: "text-xs h-6", value: "windsurf", children: "Windsurf" }), _jsx(TabsTrigger, { className: "text-xs h-6", value: "cline", children: "Cline" })] }), Object.entries(ideIssues).map(([ide, issues]) => (_jsx(TabsContent, { value: ide, className: "space-y-4", children: issues.map((issue, index) => (_jsxs("div", { className: "rounded-md border bg-card p-3", children: [_jsx("p", { className: "font-medium mb-2", children: issue.problem }), _jsx("ul", { className: "list-disc pl-5 text-sm text-muted-foreground space-y-1", children: issue.solutions.map((solution, sIndex) => (_jsx("li", { children: solution }, sIndex))) })] }, index))) }, ide)))] })] })] }));
}
//# sourceMappingURL=component.js.map