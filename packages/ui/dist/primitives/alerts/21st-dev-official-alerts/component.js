import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { Code } from "@/components/ui/code";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
const pageStyles = {
    container: "flex justify-end items-start w-full h-full p-6",
    wrapper: cn("bg-background/95", "rounded-xl border border-border/40", "dark:bg-background/95 dark:border-border/30", "relative", "w-full", "flex flex-col", "max-h-[calc(100vh-10rem)]", "h-fit"),
    header: cn("p-6 pb-4", "border-b border-border/40 dark:border-border/30", "bg-background", "rounded-t-xl", "flex flex-col gap-1.5"),
    headerTitle: cn("text-sm font-medium", "text-muted-foreground", "uppercase tracking-wider"),
    headerMain: cn("text-2xl font-semibold tracking-tight", "text-foreground", "flex items-center gap-2"),
    icon: cn("w-6 h-6", "text-foreground/80 dark:text-foreground/90"),
    content: cn("p-6 pt-4", "space-y-5 leading-relaxed", "text-[0.95rem]", "text-foreground/90 dark:text-foreground/85", "overflow-y-auto"),
    list: {
        container: "space-y-4 mt-2",
        ordered: "list-decimal pl-5 space-y-3.5",
        unordered: cn("list-disc pl-5 mt-2 space-y-2.5", "marker:text-foreground/70 dark:marker:text-foreground/60"),
        item: "pl-1.5",
    },
    code: {
        block: cn("my-2.5 text-[0.9rem]", "bg-secondary/50 dark:bg-secondary/40", "border border-border/50", "rounded-md p-3", "text-foreground/90 dark:text-foreground/90"),
        inline: cn("text-[0.9rem] px-1.5 py-0.5 rounded", "bg-secondary/50 dark:bg-secondary/40", "border border-border/50", "text-foreground/90 dark:text-foreground/90"),
    },
    form: {
        field: "flex flex-col space-y-1.5",
        label: cn("text-sm font-medium", "text-foreground/80 dark:text-foreground/90"),
        error: cn("text-sm font-medium", "text-destructive dark:text-destructive/90"),
    },
    actions: {
        container: "absolute flex gap-2 bottom-3 right-3 z-50 h-[36px]",
    },
};
export const ResolveUnknownDependenciesAlertForm = ({ unknownDependencies, onDependenciesResolved, onBack, }) => {
    const [errors, setErrors] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const resolvedDependencies = [];
        const newErrors = {};
        unknownDependencies.forEach(({ slugWithUsername, registry, isDemoDependency }) => {
            const value = formData.get(slugWithUsername);
            const appHost = new URL(process.env.NEXT_PUBLIC_APP_URL).host;
            if (!value?.includes(appHost)) {
                newErrors[slugWithUsername] = "Please enter a valid URL";
                return;
            }
            const cleanedValue = value
                .replace(`${appHost}/`, "")
                .replace("https://", "")
                .split("/")
                .slice(0, 2)
                .join("/");
            const [username, slug] = cleanedValue.split("/");
            if (!username || !slug) {
                newErrors[slugWithUsername] = "Couldn't resolve the username";
                return;
            }
            resolvedDependencies.push({
                username,
                slug,
                registry,
                isDemoDependency,
            });
        });
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            onDependenciesResolved(resolvedDependencies);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col space-y-6 flex-1", children: [_jsx("div", { className: "space-y-4 overflow-y-auto px-1.5 py-1.5 -mx-1.5 -my-1.5", children: unknownDependencies.map(({ slugWithUsername, registry }) => (_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { children: ["Enter the link to", " ", _jsxs("span", { className: "font-semibold", children: [registry ? `${registry}/` : "", slugWithUsername] })] }), _jsx(Input, { name: slugWithUsername, placeholder: 'e.g. "https://21st.dev/shadcn/button"', className: "w-full" }), errors[slugWithUsername] && (_jsx("p", { className: "text-sm text-destructive", children: errors[slugWithUsername] }))] }, slugWithUsername))) }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Button, { type: "button", variant: "outline", size: "icon", onClick: onBack, children: _jsx(ChevronLeft, { className: "h-4 w-4" }) }), _jsx(Button, { type: "submit", children: "Continue" })] })] }));
};
export const CodeGuidelinesAlert = () => {
    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, transition: { duration: 0.3 }, className: pageStyles.container, children: _jsxs("div", { className: pageStyles.wrapper, children: [_jsxs("div", { className: pageStyles.header, children: [_jsx("span", { className: pageStyles.headerTitle, children: "Development Guide" }), _jsx("h2", { className: pageStyles.headerMain, children: "Component Code" })] }), _jsx("div", { className: pageStyles.content, children: _jsxs("ol", { className: pageStyles.list.ordered, children: [_jsxs("li", { children: ["Using dependencies:", _jsxs("ul", { className: pageStyles.list.unordered, children: [_jsx("li", { children: "You can use any dependencies from npm; we import them automatically." }), _jsx("li", { children: "To import existing components from our registry, paste a direct link to the component." })] })] }), _jsxs("li", { children: ["React, TypeScript & Tailwind compatibility:", _jsxs("ul", { className: pageStyles.list.unordered, children: [_jsx("li", { children: "React client-side components are fully supported. Be sure to import React:" }), _jsx(Code, { display: "block", code: '"use client" \n\nimport * as React from "react"' }), _jsx("li", { children: "TypeScript is fully supported" }), _jsx("li", { children: "Tailwind is fully supported" }), _jsxs("li", { children: ["By default, we use default", " ", _jsx(Code, { code: "tailwind.config.ts", language: "pseudo" }), " and", " ", _jsx(Code, { code: "global.css", language: "pseudo" }), " from", " ", _jsx(Code, { code: "shadcn/ui", language: "pseudo" }), " \u2013 you can extend them later"] })] })] }), _jsxs("li", { children: ["Next.js & server components compatibility:", _jsxs("ul", { className: pageStyles.list.unordered, children: [_jsx("li", { children: "Next.js is partially supported." }), _jsx("li", { children: "React server components are not supported yet." }), _jsxs("li", { children: ["While we emulate browser-side Next.js functions, we do not support Next.js completely. Make sure your code works in our environment; if it doesn't, contact", " ", _jsx(Link, { className: "font-semibold", href: "https://x.com/serafimcloud", target: "_blank", children: "@serafimcloud" }), " ", "on X"] })] })] })] }) })] }) }));
};
export const DemoComponentGuidelinesAlert = ({ mainComponentName, componentSlug, registryToPublish, }) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, transition: { duration: 0.3 }, className: pageStyles.container, children: _jsxs("div", { className: pageStyles.wrapper, children: [_jsxs("div", { className: pageStyles.header, children: [_jsx("span", { className: pageStyles.headerTitle, children: "Preview Guide" }), _jsx("h2", { className: pageStyles.headerMain, children: "Demo Code" })] }), _jsx("div", { className: pageStyles.content, children: _jsxs("ol", { className: pageStyles.list.ordered, children: [_jsxs("li", { children: ["How to import:", _jsxs("ul", { className: pageStyles.list.unordered, children: [_jsxs("li", { children: ["Import your component with curly braces from", " ", _jsx(Code, { code: `@/components/${registryToPublish}`, language: "pseudo" }), " ", "path:", _jsx(Code, { display: "block", code: `import { ${mainComponentName ?? "MyComponent"} } from "@/components/${registryToPublish}/${componentSlug}"` })] }), _jsxs("li", { children: ["Import any existing component from our registry by its slug:", _jsx(Code, { display: "block", code: `import { Button } from "@/components/ui/button"` }), "We'll ask you to specify the registry URL of the component later"] }), _jsxs("li", { children: ["You can use any dependencies from npm, e.g.:", _jsx(Code, { display: "block", code: `import { LucideIcon } from "lucide-react"` })] })] })] }), _jsxs("li", { children: ["Demo structure:", _jsxs("ul", { className: pageStyles.list.unordered, children: [_jsx("li", { children: "The demo code should demonstrate the usage and appearance of the component." }), _jsxs("li", { children: ["You can create multiple component demo variants. Export all demo variants you want to display on the page using curly braces:", _jsx(Code, { display: "block", code: "export { DemoVariant1, DemoVariant2 }" })] }), _jsxs("li", { children: ["Be sure to import React if you use it in the demo code:", _jsx(Code, { display: "block", code: 'import * as React from "react"' })] })] })] })] }) })] }) }));
export const DebugInfoDisplay = ({ componentNames, demoComponentNames, dependencies, demoDependencies, }) => (_jsxs(_Fragment, { children: [_jsxs("div", { className: "w-full", children: [_jsx(Label, { children: "Component names" }), _jsx(Textarea, { value: componentNames?.join(", "), readOnly: true, className: "mt-1 w-full bg-gray-100" })] }), _jsxs("div", { className: "w-full", children: [_jsx(Label, { children: "Demo component name" }), _jsx(Input, { value: demoComponentNames?.join(", "), readOnly: true, className: "mt-1 w-full bg-gray-100" })] }), _jsxs("div", { className: "w-full", children: [_jsx(Label, { children: "Component dependencies" }), _jsx(Textarea, { value: Object.entries(dependencies ?? {})
                        .map(([key, value]) => `${key}: ${value}`)
                        .join("\n"), readOnly: true, className: "mt-1 w-full bg-gray-100" })] }), _jsxs("div", { className: "w-full", children: [_jsx(Label, { children: "Demo dependencies" }), _jsx(Textarea, { value: Object.entries(demoDependencies ?? {})
                        .map(([key, value]) => `${key}: ${value}`)
                        .join("\n"), readOnly: true, className: "mt-1 w-full bg-gray-100" })] })] }));
export const TailwindGuidelinesAlert = () => {
    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, transition: { duration: 0.3 }, className: pageStyles.container, children: _jsxs("div", { className: pageStyles.wrapper, children: [_jsxs("div", { className: pageStyles.header, children: [_jsx("span", { className: pageStyles.headerTitle, children: "Configuration Guide" }), _jsx("h2", { className: pageStyles.headerMain, children: "Tailwind Settings" })] }), _jsx("div", { className: pageStyles.content, children: _jsxs("ol", { className: pageStyles.list.ordered, children: [_jsxs("li", { children: ["Extending Tailwind configuration:", _jsxs("ul", { className: pageStyles.list.unordered, children: [_jsx("li", { children: "Use shadcn/ui format to extend the configuration" }), _jsx("li", { children: "Add only the styles that your component needs" })] })] }), _jsxs("li", { children: ["Configuration example:", _jsx(Code, { display: "block", code: `/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
}` })] })] }) })] }) }));
};
export const GlobalStylesGuidelinesAlert = () => {
    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, transition: { duration: 0.3 }, className: pageStyles.container, children: _jsxs("div", { className: pageStyles.wrapper, children: [_jsxs("div", { className: pageStyles.header, children: [_jsx("span", { className: pageStyles.headerTitle, children: "Styling Guide" }), _jsx("h2", { className: pageStyles.headerMain, children: "Global CSS" })] }), _jsx("div", { className: pageStyles.content, children: _jsxs("ol", { className: pageStyles.list.ordered, children: [_jsxs("li", { children: ["CSS Variables:", _jsxs("ul", { className: pageStyles.list.unordered, children: [_jsx("li", { children: "Define CSS variables in :root for light theme" }), _jsx("li", { children: "Use .dark class for dark theme variables" })] })] }), _jsxs("li", { children: ["globals.css example:", _jsx(Code, { display: "block", code: `@layer base {
  :root {
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}` })] })] }) })] }) }));
};
//# sourceMappingURL=component.js.map