import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, ImagePlus, X, Loader2, Upload, LoaderCircle, } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useImageUpload } from "@/hooks/use-image-upload";
const profileFormSchema = z.object({
    display_name: z.string().min(2).max(50),
    use_custom_username: z.boolean().default(false),
    display_username: z
        .string()
        .min(2)
        .max(30)
        .regex(/^[a-zA-Z0-9_-]+$/, {
        message: "Username can only contain letters, numbers, underscores, and hyphens",
    })
        .optional(),
    display_image_url: z.string().url().optional().nullable(),
    bio: z.string().max(180).optional(),
    website_url: z.string().optional(),
    github_url: z.string().optional(),
    twitter_url: z.string().optional(),
});
const CLERK_ACCOUNT_URL = process.env.NODE_ENV === "development"
    ? "https://wanted-titmouse-48.accounts.dev/user"
    : "https://accounts.21st.dev/user";
export function EditProfileDialog({ isOpen, setIsOpen, user, onUpdate, }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingUsername, setIsCheckingUsername] = useState(false);
    const [isUsernameValid, setIsUsernameValid] = useState(null);
    const { previewUrl, isDragging, fileInputRef, handleThumbnailClick, handleFileChange, handleDragEnter, handleDragLeave, handleDragOver, handleDrop, } = useImageUpload();
    console.log("Initial user data:", user);
    const form = useForm({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            display_name: user.display_name || user.name || "",
            use_custom_username: !!user.display_username,
            display_username: user.display_username || user.username,
            display_image_url: user.display_image_url || user.image_url || "",
            bio: user.bio || "",
            website_url: user.website_url?.replace(/^https?:\/\//, "") || "",
            github_url: user.github_url?.replace(/^https?:\/\//, "") || "",
            twitter_url: user.twitter_url?.replace(/^https?:\/\//, "") || "",
        },
    });
    const useCustomUsername = form.watch("use_custom_username");
    const checkUsername = async (username) => {
        if (!username) {
            setIsUsernameValid(null);
            return;
        }
        setIsCheckingUsername(true);
        try {
            const response = await fetch("/api/user/profile/check-username", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ display_username: username }),
            });
            const result = await response.json();
            setIsUsernameValid(!result.exists);
        }
        catch (error) {
            console.error("Error checking username:", error);
            setIsUsernameValid(null);
        }
        finally {
            setIsCheckingUsername(false);
        }
    };
    async function onSubmit(data) {
        setIsLoading(true);
        try {
            console.log("Submitting data:", data);
            // Clean up empty strings
            const cleanData = {
                ...data,
                display_username: data.use_custom_username
                    ? data.display_username
                    : null,
                bio: data.bio || null,
                website_url: data.website_url || null,
                github_url: data.github_url || null,
                twitter_url: data.twitter_url || null,
                display_image_url: previewUrl || data.display_image_url || null,
            };
            const response = await fetch("/api/user/profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cleanData),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || "Failed to update profile");
            }
            toast.success("Profile updated successfully");
            onUpdate();
            setIsOpen(false);
        }
        catch (error) {
            console.error("Update error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to update profile");
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isOpen && (e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, form, onSubmit]);
    return (_jsx(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: _jsxs(DialogContent, { className: cn("flex flex-col gap-0 p-0 sm:max-w-lg h-[85vh]", isDragging && "ring-2 ring-primary ring-offset-2"), onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, onDragOver: handleDragOver, onDrop: async (e) => {
                const base64String = await handleDrop(e);
                if (base64String) {
                    form.setValue("display_image_url", base64String);
                }
            }, children: [isDragging && (_jsx("div", { className: "absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm", children: _jsxs("div", { className: "flex flex-col items-center gap-2 text-muted-foreground", children: [_jsx(Upload, { className: "h-8 w-8" }), _jsx("p", { children: "Drop image here to update avatar" })] }) })), _jsxs("div", { className: "flex flex-col h-full", children: [_jsx(DialogHeader, { className: "flex-none border-b border-border", children: _jsx(DialogTitle, { className: "px-6 py-4 text-base", children: "Edit profile" }) }), _jsx(ScrollArea, { className: "flex-1 px-6", children: _jsx("div", { className: "py-6 px-1", children: _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(UserAvatar, { src: previewUrl ||
                                                            form.getValues("display_image_url") ||
                                                            undefined, alt: form.getValues("display_name"), size: 80 }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsxs(Button, { type: "button", variant: "outline", onClick: handleThumbnailClick, className: "h-9", children: [_jsx(ImagePlus, { className: "mr-2 h-4 w-4" }), "Change avatar"] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Or drag and drop an image anywhere" })] }), _jsx("input", { type: "file", ref: fileInputRef, onChange: async (e) => {
                                                            const base64String = await handleFileChange(e);
                                                            if (base64String) {
                                                                form.setValue("display_image_url", base64String);
                                                            }
                                                        }, className: "hidden", accept: "image/*" })] }), _jsx(FormField, { control: form.control, name: "display_name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Display Name" }), _jsx(FormControl, { children: _jsx(Input, { ...field }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "display_username", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: useCustomUsername ? "Username" : "GitHub Username" }), _jsx(FormControl, { children: _jsxs("div", { className: "relative", children: [_jsx(Input, { ...field, value: useCustomUsername ? field.value : user.username, readOnly: !useCustomUsername, className: cn("pr-10", !useCustomUsername &&
                                                                            "bg-muted text-muted-foreground"), onChange: (e) => {
                                                                            field.onChange(e);
                                                                            checkUsername(e.target.value);
                                                                        } }), useCustomUsername && (_jsxs("div", { className: "absolute inset-y-0 right-0 flex items-center pr-3", children: [isCheckingUsername && (_jsx(Loader2, { className: "h-4 w-4 animate-spin text-muted-foreground" })), !isCheckingUsername &&
                                                                                isUsernameValid === true && (_jsx(Check, { className: "h-4 w-4 text-green-500" })), !isCheckingUsername &&
                                                                                isUsernameValid === false && (_jsx(X, { className: "h-4 w-4 text-red-500" }))] }))] }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "use_custom_username", render: ({ field }) => (_jsxs(FormItem, { className: "flex flex-row items-start space-x-3 space-y-0", children: [_jsx(FormControl, { children: _jsx(Checkbox, { checked: field.value, onCheckedChange: field.onChange }) }), _jsx("div", { className: "space-y-1 leading-none", children: _jsx(FormLabel, { children: "Use different username" }) })] })) }), _jsx(FormField, { control: form.control, name: "bio", render: ({ field: { value, ...field } }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Bio" }), _jsx(FormControl, { children: _jsx(Textarea, { ...field, value: value ?? "", placeholder: "Tell us about yourself", className: "resize-none", maxLength: 180 }) }), _jsxs(FormDescription, { children: [180 - (value?.length || 0), " characters remaining"] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "website_url", render: ({ field: { value, ...field } }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Website" }), _jsx(FormControl, { children: _jsxs("div", { className: "flex rounded-lg shadow-sm shadow-black/5", children: [_jsx("span", { className: "inline-flex items-center rounded-s-lg border border-input bg-background px-3 text-sm text-muted-foreground", children: "https://" }), _jsx(Input, { ...field, value: value ?? "", className: "z-10 -ms-px rounded-s-none shadow-none", placeholder: "yourwebsite.com" })] }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "github_url", render: ({ field: { value, ...field } }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "GitHub URL" }), _jsx(FormControl, { children: _jsxs("div", { className: "flex rounded-lg shadow-sm shadow-black/5", children: [_jsx("span", { className: "inline-flex items-center rounded-s-lg border border-input bg-background px-3 text-sm text-muted-foreground", children: "https://" }), _jsx(Input, { ...field, value: value ?? "", className: "z-10 -ms-px rounded-s-none shadow-none", placeholder: "github.com/username" })] }) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "twitter_url", render: ({ field: { value, ...field } }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Twitter URL" }), _jsx(FormControl, { children: _jsxs("div", { className: "flex rounded-lg shadow-sm shadow-black/5", children: [_jsx("span", { className: "inline-flex items-center rounded-s-lg border border-input bg-background px-3 text-sm text-muted-foreground", children: "https://" }), _jsx(Input, { ...field, value: value ?? "", className: "z-10 -ms-px rounded-s-none shadow-none", placeholder: "twitter.com/username" })] }) }), _jsx(FormMessage, {})] })) })] }) }) }) }), _jsx(DialogFooter, { className: "flex-none border-t border-border px-6 py-4", children: _jsxs("div", { className: "flex w-full items-center justify-between", children: [_jsx(Button, { variant: "link", className: "h-auto p-0 text-sm text-muted-foreground hover:text-primary", onClick: () => {
                                            window.open(CLERK_ACCOUNT_URL, "_blank");
                                        }, children: "Edit GitHub connection \u2192" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setIsOpen(false), children: "Cancel" }), _jsx(Button, { onClick: form.handleSubmit(onSubmit), disabled: isLoading, className: "relative transition-all duration-200", children: _jsxs("div", { className: "flex items-center justify-center gap-2", children: [isLoading && (_jsx(LoaderCircle, { className: "animate-spin", "aria-hidden": "true", "h-4": true, "w-4": true })), "Save"] }) })] })] }) })] })] }) }));
}
//# sourceMappingURL=component.js.map