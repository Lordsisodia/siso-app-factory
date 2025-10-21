import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import Image from "next/image";
import { Eye, Download } from "lucide-react";
import { motion } from "motion/react";
import { ComponentVideoPreview } from "../list-card/card-video";
export function DesignEngineerCard({ author }) {
    const totalViews = Number(author.total_views) || 0;
    const totalUsages = Number(author.total_usages) || 0;
    const totalDownloads = Number(author.total_downloads) || 0;
    const topComponents = (author.top_components || []);
    return (_jsx("div", { className: "block p-[1px]", children: _jsxs("div", { className: "group relative bg-background rounded-lg shadow-base p-6 overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background to-accent/10 group-hover:to-accent/20 transition-colors" }), _jsxs("div", { className: "relative flex flex-col lg:flex-row gap-6", children: [_jsx("div", { className: "w-full lg:w-1/2 relative z-10", children: _jsx(Link, { href: `/${author.display_username || author.username}`, className: "block", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "h-12 w-12 rounded-full shadow-base shrink-0", children: author.display_image_url || author.image_url ? (_jsx(Image, { src: author.display_image_url || author.image_url || "", alt: author.display_name ||
                                                    author.name ||
                                                    author.username ||
                                                    "", className: "h-12 w-12 rounded-full shadow-base object-cover", width: 48, height: 48 })) : (_jsx("div", { className: "h-12 w-12 rounded-full shadow-base bg-muted flex items-center justify-center", children: _jsx("span", { className: "text-lg font-medium", children: ((author.display_name ||
                                                        author.name ||
                                                        author.username ||
                                                        "?")?.[0] || "?").toUpperCase() }) })) }), _jsxs("div", { className: "flex flex-col flex-1", children: [_jsxs("div", { className: "space-y-1 mb-4", children: [_jsx("h2", { className: "font-semibold text-lg group-hover:text-primary transition-colors", children: author.display_name || author.name || author.username }), _jsx("p", { className: "text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]", children: author.bio ||
                                                                `@${author.display_username || author.username}` })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [_jsx(Eye, { className: "w-4 h-4" }), _jsxs("span", { className: "text-sm", children: [totalViews.toLocaleString(), " views"] })] }), _jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [_jsx(Download, { className: "w-4 h-4" }), _jsxs("span", { className: "text-sm", children: [(totalUsages + totalDownloads).toLocaleString(), " usages"] })] })] })] })] }) }) }), topComponents.length > 0 && (_jsx("div", { className: "w-full lg:w-1/2 relative min-h-[150px] flex justify-center", children: _jsx("div", { className: "absolute bottom-0 translate-y-12 translate-x-12 min-420:translate-x-0 lg:translate-x-5 flex items-end", children: topComponents.map((demo, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: {
                                        duration: 0.3,
                                        delay: 0.3 + index * 0.15,
                                        type: "spring",
                                        stiffness: 100,
                                    }, children: _jsx(Link, { href: `/${demo.component.user?.display_username || demo.component.user?.username}/${demo.component?.component_slug}/${demo.demo_slug || "default"}`, className: `
                        block
                        transition-all duration-300 ease-out
                        hover:z-10
                        hover:-translate-y-5
                        ${index === 0 ? "mr-[-110px]" : ""}
                        w-[240px]
                        relative
                      `, children: _jsx("div", { className: "relative aspect-[4/3] mb-3", children: _jsx("div", { className: "absolute inset-0", children: _jsxs("div", { className: "relative w-full h-full rounded-lg shadow-base overflow-hidden hover:z-10 group/card", children: [_jsx("div", { className: "absolute inset-0", children: _jsx(Image, { src: demo.preview_url || "/placeholder.svg", alt: demo.name || "", className: "object-cover", fill: true, sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw", priority: index === 0 }) }), demo.video_url && (_jsx("div", { className: "absolute inset-0", children: _jsx(ComponentVideoPreview, { component: demo, demo: demo }) })), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none opacity-100 group-hover/card:opacity-0 transition-opacity duration-300", children: _jsxs("div", { className: "absolute bottom-2 left-0 right-0 p-3", children: [_jsx("h3", { className: "text-white font-medium text-sm mb-0.5 line-clamp-1", children: demo.component?.name }), _jsxs("p", { className: "text-white/80 text-xs", children: [(demo.view_count || 0).toLocaleString(), " ", "views"] })] }) })] }) }) }) }) }, demo.id))) }) }))] })] }) }));
}
//# sourceMappingURL=component.js.map