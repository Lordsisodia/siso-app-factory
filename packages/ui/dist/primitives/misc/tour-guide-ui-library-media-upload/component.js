"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadMediaAction } from "@/actions/db/media-actions";
import { OptimizedImage } from "./optimized-image";
import { OptimizedVideo } from "./optimized-video";
export function MediaUpload({ onUploadComplete, className, maxSize = 10, // 10MB default
accept = "image/*,video/*", activityId, buttonText = "Upload Media" }) {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(null);
    const [fileType, setFileType] = useState(null);
    const fileInputRef = useRef(null);
    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            setError(`File size exceeds ${maxSize}MB limit`);
            return;
        }
        // Set preview
        const fileUrl = URL.createObjectURL(file);
        setPreview(fileUrl);
        setFileType(file.type.startsWith("image/") ? "image" : "video");
        // Upload file
        setIsUploading(true);
        setError(null);
        try {
            const result = await uploadMediaAction(file, activityId);
            if (result.isSuccess && result.data) {
                onUploadComplete?.(result.data);
            }
            else {
                setError(result.message);
            }
        }
        catch (err) {
            setError("Upload failed. Please try again.");
            console.error(err);
        }
        finally {
            setIsUploading(false);
        }
    };
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };
    const clearPreview = () => {
        setPreview(null);
        setFileType(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    return (_jsxs("div", { className: cn("flex flex-col items-center gap-4", className), children: [_jsx("input", { ref: fileInputRef, type: "file", accept: accept, onChange: handleFileChange, className: "hidden" }), !preview && (_jsx(Button, { onClick: handleButtonClick, disabled: isUploading, className: "bg-gray-800 text-white hover:bg-gray-700", children: isUploading ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "size-4 animate-spin rounded-full border-2 border-gray-700 border-t-orange-500" }), _jsx("span", { children: "Uploading..." })] })) : (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Upload, { className: "size-4" }), _jsx("span", { children: buttonText })] })) })), error && _jsx("div", { className: "mt-2 text-sm text-red-500", children: error }), preview && (_jsxs("div", { className: "relative mt-4 overflow-hidden rounded-md border border-gray-700", children: [_jsx("button", { onClick: clearPreview, className: "absolute right-2 top-2 z-10 rounded-full bg-gray-900/70 p-1", children: _jsx(X, { className: "size-4 text-white" }) }), fileType === "image" && (_jsx(OptimizedImage, { src: preview, alt: "Uploaded image", width: 300, height: 200, className: "rounded-md" })), fileType === "video" && (_jsx(OptimizedVideo, { src: preview, width: 300, height: 200, controls: true, className: "rounded-md" }))] }))] }));
}
//# sourceMappingURL=component.js.map