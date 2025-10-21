"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClerkSupabaseClient } from "@/lib/clerk";
import { usePublishAs } from "../hooks/use-publish-as";
import { makeSlugFromName } from "../hooks/use-is-check-slug-available";
import { useTemplateDraft } from "../hooks/use-template-draft";
import { useTemplateMediaUpload } from "../hooks/use-template-media-upload";
import { LoadingDialog } from "@/components/ui/loading-dialog";
import { useR2Upload } from "../hooks/use-r2-upload";
import { templateFormSchema } from "./schema";
import { TemplateDetailsForm } from "./template-details-form";
function PublishTemplateForm() {
    const { user } = useUser();
    const client = useClerkSupabaseClient();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [publishProgress, setPublishProgress] = useState("");
    const form = useForm({
        resolver: zodResolver(templateFormSchema),
        defaultValues: {
            name: "",
            template_slug: "",
            description: "",
            preview_url: "",
            website_preview_url: "",
            payment_url: "",
            price: 0,
            publish_as_username: user?.username || "",
        },
    });
    const { hasDraft, restoreDraft, clearDraft } = useTemplateDraft(form);
    const { uploadToStorage } = useTemplateMediaUpload(form);
    const { upload: uploadToR2ClientSide } = useR2Upload();
    const publishAsUsername = form.watch("publish_as_username") || "";
    const { isAdmin, user: publishAsUser } = usePublishAs({
        username: publishAsUsername,
    });
    const onSubmit = async (data) => {
        let effectiveUserId;
        let effectiveUsername;
        if (isAdmin && publishAsUsername && publishAsUser) {
            effectiveUserId = publishAsUser.id;
            effectiveUsername = publishAsUsername;
        }
        else if (user) {
            effectiveUserId = user.id;
            effectiveUsername = user.username || undefined;
        }
        if (!effectiveUserId || !effectiveUsername) {
            toast.error("No effective user found");
            return;
        }
        setIsSubmitting(true);
        setPublishProgress("Getting user data...");
        try {
            const { data: userData, error: userError } = await client
                .from("users")
                .select("id")
                .eq("username", effectiveUsername)
                .single();
            if (userError || !userData) {
                throw new Error("Failed to get user data");
            }
            const userUuid = userData.id;
            setPublishProgress("Uploading files...");
            const baseFolder = `${effectiveUserId}/${data.template_slug}`;
            let previewImageUrl = data.preview_url;
            let videoUrl = null;
            if (data.preview_image_file) {
                previewImageUrl = await uploadToStorage(data.preview_image_file, `${baseFolder}/preview${getFileExtension(data.preview_image_file)}`, data.preview_image_file.type);
            }
            if (data.preview_video_file) {
                try {
                    videoUrl = await uploadToR2ClientSide({
                        file: data.preview_video_file,
                        fileKey: `${baseFolder}/video.mp4`,
                        bucketName: "components-code",
                        contentType: "video/mp4",
                    });
                }
                catch (error) {
                    throw new Error("Failed to upload video");
                }
            }
            setPublishProgress("Creating template...");
            const { error } = await client.from("templates").insert({
                name: data.name,
                template_slug: data.template_slug,
                description: data.description,
                preview_url: previewImageUrl || "",
                video_url: videoUrl || null,
                website_preview_url: data.website_preview_url,
                payment_url: data.payment_url,
                price: data.price,
                user_id: userUuid,
                is_public: true,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                downloads_count: 0,
            });
            if (error) {
                throw error;
            }
            clearDraft();
            toast.success("Template published successfully");
            router.push("/?tab=templates");
        }
        catch (error) {
            toast.error(error instanceof Error ? error.message : "Error publishing template");
        }
        finally {
            setIsSubmitting(false);
            setPublishProgress("");
        }
    };
    const handleNameChange = (name) => {
        form.setValue("name", name);
        form.setValue("template_slug", makeSlugFromName(name));
    };
    const getFileExtension = (file) => {
        if (!file?.name)
            return "";
        const parts = file.name.split(".");
        return parts.length > 1 ? `.${parts[parts.length - 1]}` : "";
    };
    return (_jsxs("div", { className: "absolute inset-x-0 top-0 bg-background px-2 sm:px-4 md:px-0", children: [_jsx(Card, { className: "w-full max-w-[800px] mx-auto mt-4 sm:mt-20 p-4 sm:p-6 md:p-8 border-none mb-20 shadow-none", children: _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h2", { className: "text-2xl font-medium", children: "New template" }), hasDraft() && (_jsx(Button, { variant: "outline", onClick: () => {
                                                    restoreDraft();
                                                    toast.success("Draft restored");
                                                }, children: "Restore Draft" }))] }), isAdmin && (_jsxs("div", { className: "mb-6", children: [_jsx(Label, { htmlFor: "publish-as", children: "Publish as" }), _jsx(Input, { id: "publish-as", placeholder: "Enter username", value: publishAsUsername, onChange: (e) => form.setValue("publish_as_username", e.target.value) })] })), _jsx(TemplateDetailsForm, { form: form, onNameChange: handleNameChange })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: isSubmitting, size: "lg", children: "Publish Template" })] }) }) }), _jsx(LoadingDialog, { isOpen: isSubmitting, message: publishProgress })] }));
}
export { PublishTemplateForm };
//# sourceMappingURL=component.js.map