"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { importMediaFromUrlAction } from "@/actions/db/media-actions";
import { Link2 } from "lucide-react";
export function MediaImport({ onImportComplete, activityId, className, buttonText = "Import Media" }) {
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!url) {
            setError("Please enter a URL");
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const result = await importMediaFromUrlAction(url, title, activityId);
            if (result.isSuccess && result.data) {
                onImportComplete?.(result.data);
                setUrl("");
                setTitle("");
            }
            else {
                setError(result.message);
            }
        }
        catch (err) {
            setError("Import failed. Please check the URL and try again.");
            console.error(err);
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("form", { onSubmit: handleSubmit, className: className, children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { children: _jsx(Input, { type: "url", placeholder: "Enter media URL (Pixabay, Unsplash, etc.)", value: url, onChange: e => setUrl(e.target.value), className: "border-gray-700 bg-gray-800 text-white", required: true }) }), _jsx("div", { children: _jsx(Input, { type: "text", placeholder: "Title (optional)", value: title, onChange: e => setTitle(e.target.value), className: "border-gray-700 bg-gray-800 text-white" }) }), _jsx(Button, { type: "submit", disabled: isLoading || !url, className: "w-full bg-gray-800 text-white hover:bg-gray-700", children: isLoading ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "size-4 animate-spin rounded-full border-2 border-gray-700 border-t-orange-500" }), _jsx("span", { children: "Importing..." })] })) : (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Link2, { className: "size-4" }), _jsx("span", { children: buttonText })] })) }), error && _jsx("div", { className: "mt-2 text-sm text-red-500", children: error })] }) }));
}
//# sourceMappingURL=component.js.map