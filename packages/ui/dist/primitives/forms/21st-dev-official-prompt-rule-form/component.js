"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Code, Palette, FileText } from "lucide-react";
import { TagInput } from "emblor";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { createPromptRule, updatePromptRule } from "@/lib/queries";
import { useClerkSupabaseClient } from "@/lib/clerk";
const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    additional_context: z.string().optional(),
});
export function PromptRuleForm({ userId, promptRule, isEditing = false, }) {
    const router = useRouter();
    const supabase = useClerkSupabaseClient();
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Initialize with default values and explicit type casting
    const initialTechStack = Array.isArray(promptRule?.tech_stack)
        ? promptRule.tech_stack
        : [];
    const initialTheme = typeof promptRule?.theme === "object" && promptRule.theme !== null
        ? promptRule.theme
        : {};
    const initialTailwindConfig = typeof promptRule?.theme?.tailwindConfig === "string"
        ? promptRule.theme.tailwindConfig
        : "";
    const initialGlobalCss = typeof promptRule?.theme?.globalCss === "string"
        ? promptRule.theme.globalCss
        : "";
    const [techStack, setTechStack] = useState(initialTechStack);
    const [activeTagIndex, setActiveTagIndex] = useState(null);
    const [theme, setTheme] = useState(initialTheme);
    const [tailwindConfig, setTailwindConfig] = useState(initialTailwindConfig);
    const [globalCss, setGlobalCss] = useState(initialGlobalCss);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: typeof promptRule?.name === "string" ? promptRule.name : "",
            additional_context: typeof promptRule?.additional_context === "string"
                ? promptRule.additional_context
                : "",
        },
    });
    const handleTagsUpdate = (newTagsOrUpdater) => {
        const newTags = Array.isArray(newTagsOrUpdater) ? newTagsOrUpdater : [];
        const newTechStack = newTags
            .filter((tag) => typeof tag.text === "string" && tag.text.trim() !== "")
            .map((tag) => {
            const parts = tag.text.split(/\s*\((.*?)\)\s*/);
            return {
                name: parts[0]?.trim() || "",
                ...(parts[1] ? { version: parts[1].trim() } : {}),
            };
        });
        setTechStack(newTechStack);
    };
    const onSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            const formData = {
                name: values.name,
                tech_stack: techStack,
                theme: {
                    ...(promptRule?.theme || {}),
                    ...theme,
                    tailwindConfig: tailwindConfig || undefined,
                    globalCss: globalCss || undefined,
                },
                additional_context: values.additional_context,
            };
            if (isEditing && promptRule?.id) {
                await updatePromptRule(supabase, promptRule.id, formData);
                toast.success("Rule updated successfully");
            }
            else {
                await createPromptRule(supabase, userId, formData);
                toast.success("Rule created successfully");
            }
            router.push("/settings/rules");
            router.refresh();
        }
        catch (error) {
            console.error(error);
            toast.error(isEditing
                ? "Failed to update rule. Please try again."
                : "Failed to create rule. Please try again.");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-8", children: [_jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Rule Name" }), _jsx(FormControl, { children: _jsx(Input, { placeholder: "My Project Rules", ...field }) }), _jsx(FormDescription, { children: "A descriptive name for this set of rules" }), _jsx(FormMessage, {})] })) }), _jsxs(Tabs, { defaultValue: "context", className: "w-full", children: [_jsxs(TabsList, { className: "rounded-md h-7 p-0.5", children: [_jsxs(TabsTrigger, { value: "context", className: "text-xs h-6 flex items-center gap-1", children: [_jsx(FileText, { className: "h-4 w-4" }), "Context"] }), _jsxs(TabsTrigger, { value: "tech-stack", className: "text-xs h-6 flex items-center gap-1", children: [_jsx(Code, { className: "h-4 w-4" }), "Tech Stack"] }), _jsxs(TabsTrigger, { value: "theme", className: "text-xs h-6 flex items-center gap-1", children: [_jsx(Palette, { className: "h-4 w-4" }), "Theme"] })] }), _jsx(TabsContent, { value: "tech-stack", className: "space-y-4 mt-4", children: _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Tech Stack" }), _jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Add technologies used in your project to improve AI code generation" }), _jsxs("div", { className: "space-y-2", children: [_jsx(TagInput, { tags: techStack.map((tech) => ({
                                                    id: tech.name,
                                                    text: tech.version
                                                        ? `${tech.name} (${tech.version})`
                                                        : tech.name,
                                                })), setTags: handleTagsUpdate, placeholder: "Add technology (e.g., React v18, Next.js 14)", styleClasses: {
                                                    tagList: {
                                                        container: "gap-1",
                                                    },
                                                    input: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                                                    tag: {
                                                        body: "relative h-7 bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md font-medium text-xs ps-2 pe-7",
                                                        closeButton: "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
                                                    },
                                                }, activeTagIndex: activeTagIndex, setActiveTagIndex: setActiveTagIndex, inlineTags: false, inputFieldPosition: "top" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Format: \"Technology\" or \"Technology (version)\" - press Enter to add" })] })] }) }), _jsx(TabsContent, { value: "theme", className: "space-y-4 mt-4", children: _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "Theme Configuration" }), _jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Add your project's theme configuration to improve styling in generated code" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(FormLabel, { children: "Tailwind Config" }), _jsx(Textarea, { placeholder: "Paste your tailwind.config.js content here", className: "font-mono text-xs h-40", value: tailwindConfig, onChange: (e) => setTailwindConfig(e.target.value) }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "This helps AI understand your custom Tailwind configuration" })] }), _jsxs("div", { children: [_jsx(FormLabel, { children: "Global CSS" }), _jsx(Textarea, { placeholder: "Paste your global CSS content here", className: "font-mono text-xs h-40", value: globalCss, onChange: (e) => setGlobalCss(e.target.value) }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Add your global CSS to ensure consistent styling" })] })] })] }) }), _jsx(TabsContent, { value: "context", className: "space-y-4 mt-4", children: _jsx(FormField, { control: form.control, name: "additional_context", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Additional Context" }), _jsx(FormControl, { children: _jsx(Textarea, { placeholder: "Add any additional context or requirements for your project...", className: "h-40", ...field }) }), _jsx(FormDescription, { children: "Provide any additional information that would help the AI generate better code for your project" }), _jsx(FormMessage, {})] })) }) })] }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => router.push("/settings/rules"), children: "Cancel" }), _jsx(Button, { type: "submit", disabled: isSubmitting, children: isSubmitting
                                ? isEditing
                                    ? "Updating..."
                                    : "Creating..."
                                : isEditing
                                    ? "Update Rule"
                                    : "Create Rule" })] })] }) }));
}
//# sourceMappingURL=component.js.map