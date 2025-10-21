import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TemplatesListSEO } from "@/components/features/templates/templates-list-seo";
import { BASE_KEYWORDS, SITE_NAME, SITE_SLOGAN } from "@/lib/constants";
export const metadata = {
    title: `shadcn/ui Templates Collection | ${SITE_NAME} - ${SITE_SLOGAN}`,
    description: "Collection of crafted website templates built with shadcn/ui components, Framer Motion animations and Tailwind CSS by design engineers.",
    openGraph: {
        title: `shadcn/ui Templates Collection | ${SITE_NAME} - ${SITE_SLOGAN}`,
        description: "Collection of crafted website templates built with shadcn/ui components, Framer Motion animations and Tailwind CSS by design engineers.",
        type: "website",
    },
    keywords: [
        ...BASE_KEYWORDS,
        "website templates",
        "shadcn templates",
        "shadcn/ui templates",
        "shadcn/ui",
        "Framer Motion",
        "Tailwind CSS",
        "React components"
    ],
};
export default function TemplatesPage() {
    return (_jsxs("div", { className: "container mx-auto px-4 py-12 max-w-7xl", children: [_jsxs(Link, { href: "/", className: "inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8", children: [_jsx(ArrowLeft, { size: 20 }), _jsx("span", { children: "Back to 21st.dev" })] }), _jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-4xl font-bold mb-4", children: "shadcn/ui Templates" }), _jsx("p", { className: "text-xl text-muted-foreground", children: "Collection of crafted website templates built with shadcn/ui components, Framer Motion animations and Tailwind CSS by design engineers." })] }), _jsx(TemplatesListSEO, {})] }));
}
//# sourceMappingURL=component.js.map