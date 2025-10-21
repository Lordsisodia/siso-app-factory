import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @next/next/no-img-element */
import React, { useId } from "react";
import { Label } from "@/components/ui/label";
import { useVideoDropzone } from "../../hooks/use-video-dropzone";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import UploadIcon from "@/components/icons/upload";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useAvailableTags } from "@/lib/queries";
import MultipleSelector from "@/components/ui/multiselect";
import { makeSlugFromName } from "../../hooks/use-is-check-slug-available";
export const DemoDetailsForm = ({ form, demoIndex, mode, }) => {
    const { resolvedTheme } = useTheme();
    const isDarkTheme = resolvedTheme === "dark";
    const previewImageDataUrl = form.watch(`demos.${demoIndex}.preview_image_data_url`);
    const { data: availableTags = [] } = useAvailableTags();
    const tagsId = useId();
    const previewImageId = useId();
    const previewVideoId = useId();
    const demoNameId = useId();
    React.useEffect(() => {
        if (mode === "full" &&
            demoIndex === 0 &&
            !form.getValues(`demos.${demoIndex}.demo_slug`)) {
            form.setValue(`demos.${demoIndex}.demo_slug`, "default");
            if (!form.getValues("component_slug")) {
                const currentName = form.getValues(`demos.${demoIndex}.name`);
                if (!currentName) {
                    handleDemoNameChange("Default");
                }
            }
        }
    }, [demoIndex, form, mode]);
    // Convert tags to MultipleSelector options format
    const tagOptions = availableTags.map((tag) => ({
        value: tag.slug,
        label: tag.name,
    }));
    const { previewVideoDataUrl, isProcessingVideo, isVideoDragActive, getVideoRootProps, getVideoInputProps, removeVideo, openFileDialog, } = useVideoDropzone({ form, demoIndex });
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File is too large. Maximum size is 5 MB.");
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target?.result;
                form.setValue(`demos.${demoIndex}.preview_image_data_url`, dataUrl);
            };
            form.setValue(`demos.${demoIndex}.preview_image_file`, file);
            reader.readAsDataURL(file);
        }
    };
    const { getRootProps: getImageRootProps, getInputProps: getImageInputProps, isDragActive: isImageDragActive, } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                handleFileChange({ target: { files: acceptedFiles } });
            }
        },
        accept: {
            "image/jpeg": [],
            "image/png": [],
        },
        multiple: false,
    });
    const handleDemoNameChange = (name) => {
        const currentDemoSlug = form.getValues(`demos.${demoIndex}.demo_slug`);
        const shouldKeepCurrentSlug = mode === "full" && demoIndex === 0 && currentDemoSlug === "default";
        const demoSlug = shouldKeepCurrentSlug ? "default" : makeSlugFromName(name);
        form.setValue(`demos.${demoIndex}.name`, name);
        form.setValue(`demos.${demoIndex}.demo_slug`, demoSlug);
    };
    return (_jsx("div", { className: "flex flex-col gap-4 w-full", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: tagsId, children: ["Tags ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx("div", { children: _jsx(MultipleSelector, { value: form.watch(`demos.${demoIndex}.tags`)?.map((tag) => ({
                                    value: tag.slug,
                                    label: tag.name,
                                })), onChange: (options) => {
                                    form.setValue(`demos.${demoIndex}.tags`, options.map((option) => ({
                                        name: option.label,
                                        slug: option.value,
                                    })));
                                }, defaultOptions: tagOptions, options: tagOptions, placeholder: "Search tags...", creatable: true, emptyIndicator: _jsx("p", { className: "text-center text-sm", children: "No tags found" }), onSearchSync: (search) => {
                                    if (!search)
                                        return tagOptions;
                                    return tagOptions.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()) ||
                                        option.value.toLowerCase().includes(search.toLowerCase()));
                                } }) }), _jsx("p", { className: "text-xs text-muted-foreground", role: "region", "aria-live": "polite", children: "Add tags to help others discover your component" }), form.formState.errors.demos?.[demoIndex]?.tags && (_jsx("p", { className: "text-xs text-destructive mt-1", children: form.formState.errors.demos[demoIndex]?.tags?.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: previewImageId, children: ["Cover Image ", _jsx("span", { className: "text-destructive", children: "*" })] }), !previewImageDataUrl ? (_jsxs("div", { ...getImageRootProps(), className: cn("flex flex-col !justify-between w-full border border-dashed bg-background rounded-md p-8 text-center cursor-pointer hover:border-gray-400 transition-colors relative", form.formState.errors.demos?.[demoIndex]
                                ?.preview_image_data_url && "border-destructive"), children: [_jsx("input", { ...getImageInputProps(), id: previewImageId }), _jsx(UploadIcon, {}), _jsxs("p", { className: "mt-2 text-xs font-medium", children: ["Click to upload\u00A0", _jsx("span", { className: "text-muted-foreground font-normal", children: "or drag and drop" })] }), _jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "PNG, JPEG (max. 5MB)" }), isImageDragActive && (_jsx("div", { className: "absolute inset-0 bg-background bg-opacity-90 flex items-center justify-center rounded-md", children: _jsx("p", { className: "text-xs text-muted-foreground", children: "Drop image here" }) }))] })) : (_jsxs("div", { ...getImageRootProps(), className: cn("w-full border rounded-md p-2 flex items-center gap-2 relative", isDarkTheme ? "border-gray-600" : "border-gray-300", form.formState.errors.demos?.[demoIndex]
                                ?.preview_image_data_url && "border-destructive"), children: [_jsx("input", { ...getImageInputProps(), id: previewImageId }), _jsx("div", { className: "w-40 h-32 relative", children: _jsx("img", { src: previewImageDataUrl, alt: "Preview", style: {
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }, className: "rounded-sm border shadow-sm" }) }), _jsx("div", { className: "flex flex-col items-start", children: _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Button, { variant: "outline", onClick: (e) => {
                                                    e.stopPropagation();
                                                    const input = document.createElement("input");
                                                    input.type = "file";
                                                    input.accept = "image/jpeg, image/png";
                                                    input.onchange = (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            handleFileChange({
                                                                target: { files: [file] },
                                                            });
                                                        }
                                                    };
                                                    input.click();
                                                }, children: "Change cover" }), _jsx("div", { className: "h-px bg-border w-full" }), _jsx("span", { className: "text-sm text-muted-foreground self-center", children: "or drop it here" })] }) }), isImageDragActive && (_jsx("div", { className: "absolute inset-0 bg-background bg-opacity-90 flex items-center justify-center", children: _jsx("p", { className: "text-xs text-muted-foreground", children: "Drop new image here" }) }))] })), _jsx("p", { className: "text-xs text-muted-foreground", role: "region", "aria-live": "polite", children: "A preview image that represents your component (1200x900 recommended)" }), form.formState.errors.demos?.[demoIndex]?.preview_image_data_url && (_jsx("p", { className: "text-xs text-destructive mt-1", children: form.formState.errors.demos[demoIndex]?.preview_image_data_url
                                ?.message })), form.formState.errors.demos?.[demoIndex]?.preview_image_file && (_jsx("p", { className: "text-xs text-destructive mt-1", children: form.formState.errors.demos[demoIndex]?.preview_image_file
                                ?.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: previewVideoId, children: "Video Preview" }), _jsx("span", { className: "text-xs text-muted-foreground", children: "Optional" })] }), !previewVideoDataUrl ? (_jsxs("div", { ...getVideoRootProps(), className: `flex flex-col !justify-between w-full border border-dashed bg-background rounded-md p-8 text-center cursor-pointer hover:border-gray-400 transition-colors relative`, children: [_jsx("input", { ...getVideoInputProps(), id: previewVideoId }), _jsx(UploadIcon, {}), _jsxs("p", { className: "mt-2 text-xs font-medium", children: ["Click to upload\u00A0", _jsx("span", { className: "text-muted-foreground font-normal", children: "or drag and drop" })] }), _jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "MOV, MP4 (max. 50MB)" }), isProcessingVideo && (_jsx("div", { className: "absolute inset-0 bg-background bg-opacity-90 flex items-center justify-center rounded-md", children: _jsx("p", { className: "text-xs text-muted-foreground", children: "Processing video..." }) })), isVideoDragActive && (_jsx("div", { className: "absolute inset-0 bg-background bg-opacity-90 flex items-center justify-center rounded-md", children: _jsx("p", { className: "text-xs text-muted-foreground", children: "Drop video here" }) }))] })) : (_jsxs("div", { className: cn("w-full border rounded-md p-2 flex items-center gap-2 relative", isDarkTheme ? "border-gray-600" : "border-gray-300"), children: [_jsx("div", { className: "w-40 h-32 relative", children: _jsx("video", { src: previewVideoDataUrl || "", controls: true, style: {
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }, className: "rounded-sm border shadow-sm" }) }), _jsx("div", { className: "flex flex-col items-start", children: _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Button, { variant: "outline", onClick: openFileDialog, children: "Change video" }), _jsx(Button, { variant: "outline", onClick: removeVideo, children: "Remove video" })] }) })] })), _jsx("p", { className: "text-xs text-muted-foreground", role: "region", "aria-live": "polite", children: "A short video demonstrating animation or interaction with your component" })] })] }) }));
};
//# sourceMappingURL=component.js.map