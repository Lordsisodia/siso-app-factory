"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import { Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { LoadingDialog } from "@/components/ui/loading-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { ComponentForm } from "@/components/features/studio/publish/components/forms/component-form";
import { DemoDetailsForm } from "@/components/features/studio/publish/components/forms/demo-form";
import { formSchema, } from "@/components/features/studio/publish/config/utils";
import { useComponentData } from "@/components/features/studio/publish/hooks/use-component-data";
import { useSubmitComponent } from "@/components/features/studio/publish/hooks/use-submit-component";
import { usePublishAs } from "@/components/features/publish/hooks/use-publish-as";
import { editSandbox } from "@/components/features/studio/sandbox/api";
import { useFileSystem } from "@/components/features/studio/sandbox/hooks/use-file-system";
import { useSandbox } from "@/components/features/studio/sandbox/hooks/use-sandbox";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
const PublishPage = ({ submitHandlerRef, }) => {
    const params = useParams();
    const sandboxId = params.sandboxId;
    const urlUsername = params.username;
    const { previewURL, sandboxRef, reconnectSandbox, connectedShellId, sandboxConnectionHash, serverSandbox, sandboxStatus, } = useSandbox({
        sandboxId,
    });
    const router = useRouter();
    const { resolvedTheme } = useTheme();
    // Fetch component data if sandbox is linked to a component
    const { isLoading: isComponentDataLoading, formData: componentFormData } = useComponentData(serverSandbox?.component_id ?? null);
    const { generateRegistry, bundleDemo, updateComponentNameAndImport, optimizeComponentAndDemo, } = useFileSystem({
        sandboxRef: sandboxRef,
        reconnectSandbox: reconnectSandbox,
        sandboxConnectionHash: sandboxConnectionHash,
    });
    const { user } = useUser();
    const { isLoaded: isClerkUserLoaded } = useUser();
    const [openAccordion, setOpenAccordion] = useState([
        "component-info",
        "demo-0",
    ]);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: serverSandbox?.name || "",
            component_slug: "",
            registry: "ui",
            description: "",
            license: "",
            website_url: "",
            is_public: false,
            publish_as_username: user?.username ?? undefined,
            unknown_dependencies: [],
            direct_registry_dependencies: [],
            code: ``,
            demos: [
                {
                    name: "Default Demo",
                    demo_code: ``,
                    demo_slug: "default",
                    tags: [],
                    preview_image_data_url: "",
                    preview_image_file: undefined,
                    preview_video_data_url: "",
                    preview_video_file: undefined,
                    demo_direct_registry_dependencies: [],
                    demo_dependencies: {},
                },
            ],
        },
    });
    // Prefill form with component data if available
    useEffect(() => {
        if (componentFormData) {
            const { code, demos, ...rest } = componentFormData;
            form.reset({
                ...rest,
                code: "",
                demos: (demos || []).map((demo, i) => ({
                    ...demo,
                    demo_code: "",
                })),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [componentFormData]);
    const { user: publishAsUser, isLoading: isPublishAsLoading } = usePublishAs({
        username: urlUsername,
    });
    const { isSubmitting, isLoadingDialogOpen, publishProgress, isSuccessDialogOpen, createdDemoSlug, submitComponent, setIsSuccessDialogOpen, } = useSubmitComponent();
    const prevNameRef = useRef("");
    const debouncedUpdateName = useRef(debounce(async (newName) => {
        if (!sandboxId)
            return;
        try {
            if (newName !== prevNameRef.current) {
                console.log(`Updating sandbox name from "${prevNameRef.current}" to "${newName}"`);
                prevNameRef.current = newName;
                await editSandbox(sandboxId, { name: newName });
                console.log("Updated sandbox name in database");
            }
        }
        catch (error) {
            console.error("Failed to update sandbox name in database:", error);
        }
    }, 800)).current;
    useEffect(() => {
        prevNameRef.current = form.getValues("name") || serverSandbox?.name || "";
    }, [serverSandbox?.name, form, componentFormData]);
    useEffect(() => {
        const subscription = form.watch((value, { name: fieldName }) => {
            if (fieldName === "name" && typeof value.name === "string") {
                const newName = value.name;
                if (newName !== prevNameRef.current) {
                    console.log(`Name field changed, scheduling update to: "${newName}"`);
                    debouncedUpdateName(newName);
                }
            }
        });
        return () => {
            debouncedUpdateName.cancel();
            subscription.unsubscribe();
        };
    }, [form, debouncedUpdateName]);
    const handleAccordionChange = useCallback((value) => {
        setOpenAccordion(value);
    }, []);
    const handleSubmit = (event) => {
        event?.preventDefault();
        if (!isClerkUserLoaded || isPublishAsLoading) {
            console.warn("User data is still loading. Aborting submission.");
            toast.info("User data is loading, please wait...");
            return;
        }
        let finalPublishUser = null;
        if (publishAsUser?.id) {
            finalPublishUser = {
                id: publishAsUser.id,
                username: publishAsUser.username || undefined,
            };
        }
        else if (user?.id) {
            finalPublishUser = { id: user.id, username: user.username || undefined };
        }
        if (!finalPublishUser) {
            console.error("Cannot determine user to publish as.");
            toast.error("Cannot determine user to publish as. Please ensure you are logged in.");
            return;
        }
        const currentSandbox = serverSandbox;
        form.handleSubmit(() => {
            const formData = form.getValues(); // Because formData from params cannot handle File object
            console.log("Form data is valid:", formData);
            if (!currentSandbox?.id) {
                console.error("Sandbox data is missing.", currentSandbox);
                toast.error("Sandbox data is missing. Cannot submit.");
                return;
            }
            const data = {
                ...formData,
                website_url: formData.website_url || "",
            };
            submitComponent({
                data,
                publishAsUser: finalPublishUser,
                generateRegistry,
                bundleDemo,
                updateComponentNameAndImport,
                optimizeComponentAndDemo,
                sandboxId: currentSandbox.id,
                reconnectSandbox,
            });
        }, (errors) => {
            console.error("Form validation errors:", errors);
            toast.error("Please fill all the required fields");
        })(event);
    };
    const watchedComponentFields = form.watch([
        "description",
        "name",
        "component_slug",
    ]);
    const isComponentInfoComplete = useCallback(() => {
        const [description, name, component_slug] = watchedComponentFields;
        return !!description && !!name && !!component_slug;
    }, [watchedComponentFields]);
    const isDemoComplete = (demo) => demo.name && demo.tags?.length > 0 && demo.preview_image_data_url;
    submitHandlerRef.current = handleSubmit;
    useEffect(() => {
        if (isSuccessDialogOpen) {
            const usernameToUse = publishAsUser?.username || user?.username;
            const componentSlugValue = form.getValues("component_slug");
            const demoSlugToUse = createdDemoSlug || "default";
            if (usernameToUse && componentSlugValue) {
                router.push(`/studio/${usernameToUse}?publishSuccess=true&componentSlug=${componentSlugValue}&username=${usernameToUse}&demoSlug=${demoSlugToUse}`);
                console.log(`Redirecting to /${usernameToUse}?publishSuccess=true&componentSlug=${componentSlugValue}&username=${usernameToUse}&demoSlug=${demoSlugToUse}`);
            }
            else {
                console.warn("Could not determine redirect path for success dialog. Missing username or component slug.");
                toast.error("Successfully published, but could not redirect to success page.");
            }
            setIsSuccessDialogOpen(false);
        }
    }, [
        isSuccessDialogOpen,
        publishAsUser,
        user,
        form,
        createdDemoSlug,
        router,
        setIsSuccessDialogOpen,
    ]);
    if (isComponentDataLoading || (!serverSandbox?.id && !componentFormData)) {
        return (_jsx("div", { className: "flex flex-col h-[calc(100vh-56px)] w-full", children: _jsxs("div", { className: "flex h-full", children: [_jsx("div", { className: "border-r pointer-events-none transition-[width] duration-300 max-h-screen overflow-y-auto w-1/3 p-4", children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-10 w-full rounded-md" }), _jsxs("div", { className: "space-y-4 pt-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-1/3 mb-1" }), _jsx(Skeleton, { className: "h-10 w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-1/3 mb-1" }), _jsx(Skeleton, { className: "h-10 w-full" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-1/3 mb-1" }), _jsx(Skeleton, { className: "h-20 w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-1/3 mb-1" }), _jsx(Skeleton, { className: "h-10 w-full" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-10 w-full rounded-md" }), _jsxs("div", { className: "space-y-4 pt-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-1/3 mb-1" }), _jsx(Skeleton, { className: "h-10 w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-1/3 mb-1" }), _jsx(Skeleton, { className: "h-10 w-full" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Skeleton, { className: "h-4 w-1/3 mb-1" }), _jsx(Skeleton, { className: "h-32 w-full" })] })] })] })] }) }), _jsx("div", { className: "w-2/3 h-full bg-muted flex items-center justify-center", children: _jsx(Skeleton, { className: "w-full h-full" }) })] }) }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(Form, { ...form, children: _jsx("div", { className: "flex flex-col h-[calc(100vh-3.5rem)] w-full", children: _jsxs("div", { className: "flex flex-1 min-h-0", children: [_jsx("div", { className: "border-r transition-[width] duration-300 max-h-full overflow-y-auto w-1/3", children: _jsx("div", { className: "w-full flex flex-col gap-4 overflow-y-auto p-4", children: _jsx("div", { className: "space-y-4 p-[2px]", children: _jsxs(Accordion, { type: "multiple", value: openAccordion, onValueChange: handleAccordionChange, className: "w-full", children: [_jsxs(AccordionItem, { value: "component-info", children: [_jsx(AccordionTrigger, { className: "py-2 text-[15px] leading-6 hover:no-underline hover:bg-muted/50 rounded-md data-[state=open]:rounded-b-none transition-all duration-200 ease-in-out -mx-2 px-2", children: _jsxs("div", { className: "flex items-center gap-2", children: ["Component info", _jsxs(Badge, { variant: "outline", className: cn("gap-1.5 text-xs font-medium", isComponentInfoComplete()
                                                                            ? "border-emerald-500/20"
                                                                            : "border-amber-500/20"), children: [_jsx("span", { className: cn("size-1.5 rounded-full", isComponentInfoComplete()
                                                                                    ? "bg-emerald-500"
                                                                                    : "bg-amber-500"), "aria-hidden": "true" }), isComponentInfoComplete()
                                                                                ? "Complete"
                                                                                : "Required"] })] }) }), _jsx(AccordionContent, { className: "text-muted-foreground pt-4", children: _jsx("div", { className: "text-foreground", children: _jsx(ComponentForm, { form: form, status: sandboxStatus, handleSubmit: handleSubmit, isSubmitting: isSubmitting, hotkeysEnabled: !isSuccessDialogOpen }) }) })] }), form.getValues().demos?.map((demo, index) => (_jsxs(AccordionItem, { value: `demo-${index}`, className: "bg-background border-none group", children: [_jsx(AccordionTrigger, { className: "py-2 text-[15px] leading-6 hover:no-underline hover:bg-muted/50 rounded-md data-[state=open]:rounded-b-none transition-all duration-200 ease-in-out -mx-2 px-2", children: _jsxs("div", { className: "flex items-center gap-2 w-full", children: [_jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0 overflow-hidden", children: [_jsx("div", { className: "truncate flex-shrink min-w-0", children: index === 0 && !demo.name
                                                                                    ? "Default Demo"
                                                                                    : demo.name || `Demo ${index + 1}` }), _jsxs(Badge, { variant: "outline", className: cn("gap-1.5 text-xs font-medium shrink-0", isDemoComplete(demo)
                                                                                    ? "border-emerald-500/20"
                                                                                    : "border-amber-500/20"), children: [_jsx("span", { className: cn("size-1.5 rounded-full", isDemoComplete(demo)
                                                                                            ? "bg-emerald-500"
                                                                                            : "bg-amber-500"), "aria-hidden": "true" }), isDemoComplete(demo) ? "Complete" : "Required"] })] }), form.getValues().demos.length > 1 && (_jsx(Button, { variant: "ghost", size: "icon", className: "opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 ml-auto mr-1 shrink-0", onClick: (e) => {
                                                                            e.stopPropagation();
                                                                            console.log("Delete demo:", index);
                                                                            toast.info(`Demo deletion for index ${index} not implemented yet.`);
                                                                        }, children: _jsx(Trash2, { className: "h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" }) }))] }) }), _jsx(AccordionContent, { className: "pt-4", children: _jsx("div", { className: "text-foreground space-y-4", children: _jsx(DemoDetailsForm, { form: form, demoIndex: index }) }) })] }, index)))] }) }) }) }), previewURL && (_jsx("iframe", { src: `${previewURL}?theme=${resolvedTheme}` || "", className: "w-2/3 h-full" }))] }) }) }), _jsx(LoadingDialog, { isOpen: isLoadingDialogOpen, message: publishProgress })] }));
};
export default PublishPage;
//# sourceMappingURL=component.js.map