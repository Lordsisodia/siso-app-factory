import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
export function UrlInput({ form, isLoading, onFetch }) {
    const extractUrl = (input) => {
        // Try to match URL in installation command
        const urlMatch = input.match(/add\s+"?(https?:\/\/[^"\s]+)"?/);
        return urlMatch ? urlMatch[1] : input;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const inputValue = form.getValues("url") || "";
        const url = extractUrl(inputValue);
        if (!url)
            return;
        await onFetch(url);
    };
    return (_jsx("div", { className: "flex flex-col items-center justify-center min-h-[calc(100vh-65px)] px-4", children: _jsxs("form", { onSubmit: handleSubmit, className: "w-full max-w-lg space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-center block text-lg font-semibold", children: "Import Component" }), _jsx("p", { className: "text-sm text-muted-foreground text-center max-w-md mx-auto", children: "Paste a URL to the component JSON file or use the full installation command to import your component" })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [_jsx(Input, { ...form.register("url"), placeholder: "https://ui.aceternity.com/registry/sparkles.json", className: "flex-1", disabled: isLoading }), _jsx(Button, { type: "submit", disabled: isLoading, className: "sm:w-24", children: isLoading ? (_jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" })) : ("Fetch") })] })] }) }));
}
//# sourceMappingURL=component.js.map