import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import UploadIcon from "@/components/icons/upload";
import { cn } from "@/lib/utils";
import { useTemplateMediaUpload } from "../hooks/use-template-media-upload";
export function TemplateDetailsForm({ form, onNameChange, }) {
    const { resolvedTheme } = useTheme();
    const isDarkTheme = resolvedTheme === "dark";
    const previewImageDataUrl = form.watch("preview_image_data_url");
    const previewVideoDataUrl = form.watch("preview_video_data_url");
    const { isDragging, fileInputRef, handleFileChange, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, handleClick, } = useTemplateMediaUpload(form);
    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = "image/*";
            fileInputRef.current.onchange = (e) => handleFileChange(e, "image");
            handleClick();
        }
    };
    const handleVideoClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = "video/mp4,video/quicktime";
            fileInputRef.current.onchange = (e) => handleFileChange(e, "video");
            handleClick();
        }
    };
    const handleVideoRemove = () => {
        const videoUrl = form.getValues("preview_video_data_url");
        if (videoUrl && videoUrl.startsWith("blob:")) {
            URL.revokeObjectURL(videoUrl);
        }
        form.setValue("preview_video_data_url", undefined);
        form.setValue("preview_video_file", undefined);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("input", { type: "file", ref: fileInputRef, className: "hidden", accept: "image/*,video/mp4,video/quicktime" }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "name", children: ["Name ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsx(Input, { id: "name", placeholder: "Enter template name", ...field, onChange: (e) => onNameChange(e.target.value) })) }), _jsx("p", { className: "text-xs text-muted-foreground", role: "region", "aria-live": "polite", children: "A descriptive name for your template" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "template_slug", children: ["Template Slug ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(FormField, { control: form.control, name: "template_slug", render: ({ field }) => (_jsx(Input, { id: "template_slug", placeholder: "my-awesome-template", ...field })) }), _jsx("p", { className: "text-xs text-muted-foreground", role: "region", "aria-live": "polite", children: "A unique URL-friendly identifier for your template" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "description", children: ["Description ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(FormField, { control: form.control, name: "description", render: ({ field }) => (_jsx(Textarea, { id: "description", placeholder: "Describe your template", ...field })) }), _jsx("p", { className: "text-xs text-muted-foreground", role: "region", "aria-live": "polite", children: "A detailed description of your template and its features" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "preview", children: ["Preview Image ", _jsx("span", { className: "text-destructive", children: "*" })] }), !previewImageDataUrl ? (_jsxs("div", { className: cn("flex flex-col !justify-between w-full border border-dashed bg-background rounded-md p-8 text-center cursor-pointer hover:border-gray-400 transition-colors relative", isDragging && "ring-2 ring-primary ring-offset-2"), onDragEnter: (e) => handleDragEnter(e), onDragLeave: (e) => handleDragLeave(e), onDragOver: (e) => handleDragOver(e), onDrop: (e) => handleDrop(e, "image"), onClick: handleImageClick, children: [_jsx(UploadIcon, {}), _jsx("p", { className: "mt-2 text-xs font-medium", children: "Click to upload or drag and drop" }), _jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "PNG, JPEG (max. 5MB)" })] })) : (_jsxs("div", { className: cn("w-full border rounded-md p-2 flex items-center gap-2 relative", isDarkTheme ? "border-gray-600" : "border-gray-300"), children: [_jsx("div", { className: "w-40 h-32 relative", children: _jsx("img", { src: previewImageDataUrl, alt: "Preview", style: {
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }, className: "rounded-sm border shadow-sm" }) }), _jsx("div", { className: "flex flex-col items-start", children: _jsx("div", { className: "flex flex-col gap-2", children: _jsx(Button, { variant: "outline", onClick: handleImageClick, children: "Change" }) }) })] })), _jsx("p", { className: "text-xs text-muted-foreground", role: "region", "aria-live": "polite", children: "A high-quality preview image that showcases your template" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "video", children: "Preview Video" }), !previewVideoDataUrl ? (_jsxs("div", { className: cn("flex flex-col !justify-between w-full border border-dashed bg-background rounded-md p-8 text-center cursor-pointer hover:border-gray-400 transition-colors relative", isDragging && "ring-2 ring-primary ring-offset-2"), onDragEnter: (e) => handleDragEnter(e), onDragLeave: (e) => handleDragLeave(e), onDragOver: (e) => handleDragOver(e), onDrop: (e) => handleDrop(e, "video"), onClick: handleVideoClick, children: [_jsx(UploadIcon, {}), _jsx("p", { className: "mt-2 text-xs font-medium", children: "Click to upload or drag and drop" }), _jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "MOV, MP4 (max. 50MB)" })] })) : (_jsxs("div", { className: cn("w-full border rounded-md p-2 flex items-center gap-2 relative", isDarkTheme ? "border-gray-600" : "border-gray-300"), children: [_jsx("div", { className: "w-40 h-32 relative", children: _jsx("video", { src: previewVideoDataUrl, controls: true, style: {
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }, className: "rounded-sm border shadow-sm" }) }), _jsx("div", { className: "flex flex-col items-start", children: _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Button, { variant: "outline", onClick: handleVideoClick, children: "Change Video" }), _jsx(Button, { variant: "outline", onClick: handleVideoRemove, children: "Remove Video" })] }) })] })), _jsx("p", { className: "text-xs text-muted-foreground", role: "region", "aria-live": "polite", children: "A short video demonstrating your template's features and interactions" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "website_preview_url", children: ["Demo URL ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(FormField, { control: form.control, name: "website_preview_url", render: ({ field }) => (_jsx(Input, { id: "website_preview_url", placeholder: "https://example.com", ...field })) }), _jsx("p", { className: "text-xs text-muted-foreground", role: "region", "aria-live": "polite", children: "A live preview URL where users can see your template in action" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "payment_url", children: ["Payment URL ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(FormField, { control: form.control, name: "payment_url", render: ({ field }) => (_jsx(Input, { id: "payment_url", placeholder: "https://example.com/buy", ...field })) }), _jsx("p", { className: "text-xs text-muted-foreground", role: "region", "aria-live": "polite", children: "The URL where users can purchase or download your template" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "price", children: ["Price ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(FormField, { control: form.control, name: "price", render: ({ field }) => (_jsx(Input, { id: "price", type: "number", min: "0", step: "1", placeholder: "49", ...field, onChange: (e) => field.onChange(Number(e.target.value)) })) }), _jsx("p", { className: "text-xs text-muted-foreground", role: "region", "aria-live": "polite", children: "Set the price in USD (use 0 for free templates)" })] })] }));
}
//# sourceMappingURL=component.js.map