"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
export function TroubleshootingStep({ selectedIde, osType, previousStep, onComplete, }) {
    const [latestVersion, setLatestVersion] = useState("0.0.34");
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
    // Add keyboard shortcut for Enter key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                onComplete(previousStep);
            }
            if (e.key.toLowerCase() === "c") {
                e.preventDefault();
                window.open("https://discord.gg/Qx4rFunHfm", "_blank");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onComplete, previousStep]);
    // Common issues for all IDEs
    const commonIssues = [
        {
            problem: "Client closed",
            solutions: [
                `Go to MCP config and use explicit version number: npx -y @21st-dev/magic@${latestVersion} instead of latest`,
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
    // OS-specific issues
    const osIssues = {
        windows: [
            {
                problem: "Command parsing errors on Windows",
                solutions: [
                    "Ensure you include C:\\Windows\\System32\\cmd.exe /c before the npx command",
                    "Check for proper escaping of quotes in your command",
                    "Try closing and reopening your IDE after adding the MCP server",
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
        ],
        mac: [
            {
                problem: "Request timed out error on Mac",
                solutions: [
                    "Check your internet connection",
                    "Try running the command directly in terminal to see specific errors",
                    "Restart your IDE",
                ],
            },
        ],
    };
    // IDE-specific issues
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
    const currentOsIssues = osType === "windows" ? osIssues.windows : osIssues.mac;
    const currentIdeIssues = ideIssues[selectedIde];
    return (_jsxs("div", { className: "flex flex-col space-y-8 px-4 max-w-[700px] mx-auto w-full z-10", children: [_jsxs("div", { className: "space-y-4 max-w-2xl", children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Troubleshooting" }), _jsxs("p", { className: "text-lg text-muted-foreground", children: ["Common issues and solutions for", " ", selectedIde === "cursor"
                                ? "Cursor"
                                : selectedIde === "windsurf"
                                    ? "Windsurf"
                                    : "Cline", " ", "on ", osType === "windows" ? "Windows" : "Mac"] })] }), _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-lg font-medium mb-4", children: "Common Issues" }), _jsx("div", { className: "space-y-4", children: commonIssues.map((issue, index) => (_jsxs("div", { className: "rounded-md border bg-card p-4", children: [_jsx("p", { className: "font-medium mb-2", children: issue.problem }), _jsx("ul", { className: "list-disc pl-5 text-sm text-muted-foreground space-y-1", children: issue.solutions.map((solution, sIndex) => (_jsx("li", { children: solution }, sIndex))) })] }, index))) })] }), _jsxs("div", { children: [_jsxs("h4", { className: "text-lg font-medium mb-4", children: [osType === "windows" ? "Windows" : "Mac", "-Specific Issues"] }), _jsx("div", { className: "space-y-4", children: currentOsIssues.map((issue, index) => (_jsxs("div", { className: "rounded-md border bg-card p-4", children: [_jsx("p", { className: "font-medium mb-2", children: issue.problem }), _jsx("ul", { className: "list-disc pl-5 text-sm text-muted-foreground space-y-1", children: issue.solutions.map((solution, sIndex) => (_jsx("li", { children: solution }, sIndex))) })] }, index))) })] }), _jsxs("div", { children: [_jsxs("h4", { className: "text-lg font-medium mb-4", children: [selectedIde === "cursor"
                                        ? "Cursor"
                                        : selectedIde === "windsurf"
                                            ? "Windsurf"
                                            : "Cline", "-Specific Issues"] }), _jsx("div", { className: "space-y-4", children: currentIdeIssues.map((issue, index) => (_jsxs("div", { className: "rounded-md border bg-card p-4", children: [_jsx("p", { className: "font-medium mb-2", children: issue.problem }), _jsx("ul", { className: "list-disc pl-5 text-sm text-muted-foreground space-y-1", children: issue.solutions.map((solution, sIndex) => (_jsx("li", { children: solution }, sIndex))) })] }, index))) })] })] }), _jsx("div", { className: "sticky bottom-5 w-full pt-8 pb-4", children: _jsxs("div", { className: "flex justify-center w-full gap-4", children: [_jsxs(Button, { onClick: () => onComplete(previousStep), className: "p-1.5", children: [_jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }), "Back to", " ", previousStep === "install-ide"
                                    ? "installation"
                                    : "component creation", _jsx("kbd", { className: "pointer-events-none h-5 w-5 justify-center select-none items-center gap-1 rounded border-muted-foreground/40 bg-muted-foreground/20 px-1.5 ml-1.5 font-sans text-[11px] text-kbd leading-none opacity-100 flex", children: _jsx(Icons.enter, { className: "h-2.5 w-2.5" }) })] }), _jsxs(Button, { onClick: () => window.open("https://discord.gg/Qx4rFunHfm", "_blank"), variant: "outline", className: "pr-1.5", children: [_jsx(Icons.discord, { className: "h-4 w-4 mr-2" }), "Ask community", _jsx("kbd", { className: "pointer-events-none h-5 w-5 justify-center select-none items-center gap-1 rounded border-muted-foreground/40 bg-foreground/10 px-1.5 ml-1.5 font-sans text-[11px] text-foreground leading-none opacity-100 flex", children: "C" })] })] }) })] }));
}
//# sourceMappingURL=component.js.map