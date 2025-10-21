"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Code } from "@/components/ui/code";
import { PROMPT_TYPES } from "@/types/global";
export function ApiDocs() {
    const promptTypeValues = Object.values(PROMPT_TYPES);
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-sm font-medium", children: "Authentication" }), _jsx(Code, { code: "x-api-key: your_api_key_here", language: "bash", display: "block", fontSize: "sm" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-sm font-medium", children: "Search API" }), _jsx("h3", { className: "text-sm font-medium text-muted-foreground", children: "Request" }), _jsx(Code, { code: `// POST /api/search
{
  "search": "hero section",  // Required: search query
  "page": 1,                // Optional: page number (default: 1)
  "per_page": 20           // Optional: results per page (default: 20)
}`, language: "json", display: "block", fontSize: "sm" }), _jsx("h3", { className: "text-sm font-medium text-muted-foreground", children: "Success Response" }), _jsx(Code, { code: `{
  "results": [{
    "name": "Default",
    "preview_url": "https://cdn.21st.dev/...",
    "video_url": "https://cdn.21st.dev/...",
    "demo_id": 123,              // Use this ID for prompt generation
    "component_data": {
      "name": "Animated hero",
      "description": "Animated hero with text and two shadcn/ui buttons",
      "code": "https://cdn.21st.dev/...",
      "install_command": "pnpm dlx shadcn@latest add \"https://21st.dev/r/...\""
    },
    "component_user_data": {
      "name": "serafim",
      "username": "serafimcloud", 
      "image_url": "https://img.clerk.com/..."
    },
    "usage_count": 1621
  }],
  "metadata": {
    "plan": "free",           // Current API plan
    "requests_remaining": 80,  // Remaining API requests
    "pagination": {
      "total": 45,            // Total number of results
      "page": 1,              // Current page
      "per_page": 20,         // Results per page
      "total_pages": 3        // Total number of pages
    }
  }
}`, language: "json", display: "block", fontSize: "sm" }), _jsx("h3", { className: "text-sm font-medium text-muted-foreground", children: "Error Responses" }), _jsx(Code, { code: `// 401 Unauthorized
{
  "error": "API key is required"
}
// or
{
  "error": "Invalid API key"
}

// 400 Bad Request
{
  "error": "Search query is required"
}

// 500 Internal Server Error
{
  "error": "Internal server error",
  "details": "Error message details"
}`, language: "json", display: "block", fontSize: "sm" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-sm font-medium", children: "Generate Prompt API" }), _jsx("h3", { className: "text-sm font-medium text-muted-foreground", children: "Request" }), _jsx(Code, { code: `// POST /api/prompts
{
  "prompt_type": "basic",    // Required: one of ${JSON.stringify(promptTypeValues)}
  "demo_id": "123"          // Required: demo ID from search results
}`, language: "json", display: "block", fontSize: "sm" }), _jsx("h3", { className: "text-sm font-medium text-muted-foreground", children: "Success Response" }), _jsx(Code, { code: `{
  "prompt": "Copy-paste this component to /components/ui folder:\\n\`\`\`tsx\\ncomponent.tsx\\n// Component code here...\\n\\ndemo.tsx\\n// Demo code here...\\n\`\`\`\\n"
}`, language: "json", display: "block", fontSize: "sm" }), _jsx("h3", { className: "text-sm font-medium text-muted-foreground", children: "Error Responses" }), _jsx(Code, { code: `// 401 Unauthorized
{
  "error": "API key is required"
}
// or
{
  "error": "Invalid API key"
}

// 400 Bad Request
{
  "error": "prompt_type and demo_id are required"
}
// or
{
  "error": "Demo or component code is missing"
}

// 404 Not Found
{
  "error": "Demo not found"
}
// or
{
  "error": "Component data not found"
}

// 500 Internal Server Error
{
  "error": "Internal server error",
  "details": "Error message details"
}`, language: "json", display: "block", fontSize: "sm" })] })] }));
}
//# sourceMappingURL=component.js.map