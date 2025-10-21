import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, useAnimation } from "motion/react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ComponentDetailsForm } from "./forms/component-form";
import { Icons } from "@/components/icons";
import { LinkPreview } from "@/components/ui/link-preview";
import { Info, ArrowRight } from "lucide-react";
export function NameSlugStep({ form, isAdmin, publishAsUsername, publishAsUser, onContinue, onPublishAsChange, }) {
    const controls = useAnimation();
    const handleContinue = () => {
        // Save form values before continuing
        const formValues = form.getValues();
        form.reset(formValues);
        onContinue();
    };
    return (_jsxs("div", { className: "absolute inset-x-0 top-0 bg-background px-2 sm:px-4 md:px-0", children: [_jsx("div", { className: "z-[100] max-w-[800px] mx-auto mt-4 sm:mt-20 md:mt-20 mb-4 rounded-lg border border-border bg-background px-4 py-3 shadow-lg shadow-black/5", children: _jsx("div", { className: "flex gap-2", children: _jsxs("div", { className: "flex grow gap-3", children: [_jsx(Info, { className: "mt-0.5 shrink-0 text-blue-500", size: 16, strokeWidth: 2, "aria-hidden": "true" }), _jsxs("div", { className: "flex grow justify-between gap-12", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Components go through a review process before being featured." }), _jsxs("a", { href: "https://github.com/serafimcloud/21st?tab=readme-ov-file#review-process", target: "_blank", rel: "noopener noreferrer", className: "group whitespace-nowrap text-sm font-medium text-primary", children: ["Learn more", _jsx(ArrowRight, { className: "-mt-0.5 ms-1 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5", size: 16, strokeWidth: 2, "aria-hidden": "true" })] })] })] }) }) }), _jsx(Card, { className: "w-full max-w-[800px] mx-auto p-4 sm:p-6 md:p-8", children: _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 }, className: "flex flex-col justify-center w-full gap-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h2", { className: "text-2xl font-medium", children: "New component" }), _jsx(LinkPreview, { url: "https://www.youtube.com/watch?v=NXpSAnmleyE", imageSrc: "/tutorial-thumbnail.png", isStatic: true, width: 160, height: 90, children: _jsxs("div", { className: "flex items-center gap-1.5 rounded-full border\n                bg-background/50 px-2.5 h-8 text-xs font-medium \n                text-muted-foreground hover:text-accent-foreground \n                hover:border-accent-foreground/50 hover:bg-accent-foreground/10\n                hover:shadow-md", onMouseEnter: () => controls.start("animate"), onMouseLeave: () => controls.start("normal"), children: [_jsx("div", { className: "flex items-center justify-center", children: _jsx(Icons.clap, { size: 18, controls: controls }) }), "Watch Tutorial"] }) })] }), _jsxs("div", { className: "flex flex-col", children: [isAdmin && (_jsxs("div", { className: "flex flex-col gap-2 mb-4", children: [_jsx(Label, { htmlFor: "publish-as", className: "block text-sm font-medium", children: "Publish as (admin only)" }), _jsx(Input, { id: "publish-as", placeholder: "Enter username", value: publishAsUsername, onChange: (e) => onPublishAsChange(e.target.value) })] })), _jsx(ComponentDetailsForm, { form: form, isSlugReadOnly: false, publishAsUserId: publishAsUser?.id, placeholderName: "Button", isFirstStep: true }), _jsx(Button, { className: "mt-4", disabled: !form.watch("name") ||
                                        !form.watch("description") ||
                                        !form.watch("slug_available"), size: "lg", onClick: handleContinue, children: "Continue" })] })] }) })] }));
}
//# sourceMappingURL=component.js.map