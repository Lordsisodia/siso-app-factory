import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserAvatar } from "@/components/ui/user-avatar";
import { ComponentCard } from "../list-card/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tag as TagComponent } from "@/components/ui/tag";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip";
import { ArrowUpRight, Check, Copy, CalendarDays, Info, Binoculars, } from "lucide-react";
import { useClerkSupabaseClient } from "@/lib/clerk";
import { getLicenseBySlug } from "@/lib/licenses";
import { formatDate } from "@/lib/utils";
import { AMPLITUDE_EVENTS, trackEvent } from "@/lib/amplitude";
import { useHunterUser } from "@/lib/queries";
export const ComponentPageInfo = ({ component, }) => {
    if (!component) {
        return null;
    }
    const user = component.user;
    if (!user) {
        return null;
    }
    const supabase = useClerkSupabaseClient();
    const [copiedLibDependencies, setCopiedLibDependencies] = useState(false);
    const [copiedDependency, setCopiedDependency] = useState(null);
    const [isLibDepsHovered, setIsLibDepsHovered] = useState(false);
    const npmDependencies = (component.dependencies ?? {});
    const directRegistryDependencies = component.direct_registry_dependencies ?? [];
    const { data: dependencyComponents, isLoading: isLoadingDependencies } = useQuery({
        queryKey: [
            "directRegistryDependenciesComponents",
            directRegistryDependencies,
        ],
        queryFn: async () => {
            if (!directRegistryDependencies?.length) {
                return [];
            }
            const { data, error } = await supabase
                .from("components_with_username")
                .select("*")
                .or(directRegistryDependencies
                .map((d) => {
                const [username, slug] = d.split("/");
                return `and(username.eq."${username}",component_slug.eq."${slug}")`;
            })
                .join(","))
                .returns();
            if (error) {
                console.error("Error fetching dependency component:", error);
                throw error;
            }
            return data ?? [];
        },
        enabled: directRegistryDependencies?.length > 0,
        staleTime: 1000 * 60 * 15,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false,
    });
    const { data: hunterUser } = useHunterUser(component.hunter_username);
    const copyAllDependencies = () => {
        const dependenciesString = Object.entries({
            ...npmDependencies,
        })
            .map(([dep, version]) => `"${dep}": "${version}"`)
            .join(",\n");
        navigator?.clipboard?.writeText(`{\n${dependenciesString}\n}`);
        setCopiedLibDependencies(true);
        toast("Dependencies copied to clipboard");
        trackEvent(AMPLITUDE_EVENTS.COPY_ALL_DEPENDENCIES, {
            componentId: component.id,
            componentName: component.name,
            dependenciesCount: Object.keys(npmDependencies).length,
        });
        setTimeout(() => setCopiedLibDependencies(false), 2000);
    };
    const copySingleDependency = (dep, version) => {
        navigator?.clipboard?.writeText(`"${dep}": "${version}"`);
        setCopiedDependency(dep);
        toast("Dependency copied to clipboard");
        trackEvent(AMPLITUDE_EVENTS.COPY_DEPENDENCY, {
            componentId: component.id,
            componentName: component.name,
            dependency: dep,
            version,
        });
        setTimeout(() => setCopiedDependency(null), 2000);
    };
    const license = component.license ? getLicenseBySlug(component.license) : null;
    const handleNpmPackageClick = (packageName) => {
        trackEvent(AMPLITUDE_EVENTS.VIEW_ON_NPM, {
            componentId: component.id,
            componentName: component.name,
            packageName,
        });
        window.open(`https://www.npmjs.com/package/${packageName}`, "_blank");
    };
    return (_jsxs("div", { className: "text-sm overflow-y-auto max-h-[calc(100vh-100px)] bg-background dark:bg-[#151515] text-foreground", children: [_jsxs("div", { className: "p-4 space-y-3 bg-muted dark:bg-background", children: [component.name && (_jsx("div", { className: "flex items-center font-medium", children: _jsx("span", { children: component.name }) })), component.description && (_jsx("div", { className: "flex items-start", children: _jsx("span", { className: "whitespace-pre-wrap", children: component.description }) }))] }), _jsx(Separator, { className: "w-full" }), _jsxs("div", { className: "px-4 pt-2.5 pb-6 space-y-3", children: [user && (_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("span", { className: "text-muted-foreground", children: "Created by" }), _jsxs(HoverCard, { openDelay: 300, children: [_jsx(HoverCardTrigger, { asChild: true, children: _jsx("div", { className: "flex items-center justify-start hover:bg-accent rounded-md px-2 py-1 -mx-2 mr-auto", children: _jsxs(Link, { href: `/${user.display_username || user.username}`, className: "flex items-center", children: [_jsxs(Avatar, { className: "h-[22px] w-[22px]", children: [_jsx(AvatarImage, { src: user.display_image_url ||
                                                                    user.image_url ||
                                                                    "/placeholder.svg", alt: user.display_name || user.name || user.username || "" }), _jsx(AvatarFallback, { children: (user.display_name || user.name)?.[0]?.toUpperCase() ||
                                                                    "" })] }), _jsx("span", { className: "ml-1 font-medium", children: user.display_name || user.name || user.username })] }) }) }), _jsx(HoverCardContent, { align: "start", className: "w-[320px]", side: "bottom", children: _jsxs("div", { className: "flex gap-4", children: [_jsxs(Avatar, { className: "h-12 w-12", children: [_jsx(AvatarImage, { src: user.display_image_url ||
                                                                user.image_url ||
                                                                "/placeholder.svg", alt: user.display_name || user.name || user.username || "" }), _jsx(AvatarFallback, { children: (user.display_name || user.name)?.[0]?.toUpperCase() ||
                                                                "" })] }), _jsxs("div", { className: "space-y-1", children: [_jsx(Link, { href: `/${user.display_username || user.username}`, className: "hover:underline", children: _jsx("h4", { className: "text-sm font-semibold", children: user.display_name || user.name || user.username }) }), _jsx(Link, { href: `/${user.display_username || user.username}`, className: "hover:underline", children: _jsxs("p", { className: "text-sm text-muted-foreground", children: ["@", user.display_username || user.username] }) }), user.bio && (_jsx("p", { className: "text-xs text-muted-foreground whitespace-pre-wrap", children: user.bio })), user.created_at && (_jsxs("div", { className: "flex items-center pt-1", children: [!user.manually_added ? (_jsx(CalendarDays, { className: "mr-2 h-4 w-4 opacity-70" })) : (_jsx(Info, { className: "mr-2 h-4 w-4 opacity-70" })), _jsx("span", { className: "text-xs text-muted-foreground", children: user.manually_added
                                                                        ? `Created by 21st.dev`
                                                                        : `Joined ${formatDate(new Date(user.created_at))}` })] }))] })] }) })] })] })), hunterUser && (_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("span", { className: "text-muted-foreground", children: "Hunted by" }), _jsxs(HoverCard, { openDelay: 300, children: [_jsx(HoverCardTrigger, { asChild: true, children: _jsx("div", { className: "flex items-center justify-start hover:bg-accent rounded-md px-2 py-1 -mx-2 mr-auto", children: _jsxs(Link, { href: `/${hunterUser.display_username || hunterUser.username}`, className: "flex items-center", children: [_jsx(UserAvatar, { src: hunterUser.display_image_url ||
                                                            hunterUser.image_url ||
                                                            "/placeholder.svg", alt: hunterUser.display_name ||
                                                            hunterUser.name ||
                                                            hunterUser.username ||
                                                            "", size: 22, skipLink: true }), _jsx("span", { className: "ml-1 font-medium", children: hunterUser.display_name ||
                                                            hunterUser.name ||
                                                            hunterUser.username })] }) }) }), _jsx(HoverCardContent, { align: "start", className: "w-[320px]", side: "bottom", children: _jsxs("div", { className: "flex gap-4", children: [_jsxs(Avatar, { className: "h-12 w-12", children: [_jsx(AvatarImage, { src: hunterUser.display_image_url ||
                                                                hunterUser.image_url ||
                                                                "/placeholder.svg", alt: hunterUser.display_name ||
                                                                hunterUser.name ||
                                                                hunterUser.username ||
                                                                "" }), _jsx(AvatarFallback, { children: (hunterUser.display_name ||
                                                                hunterUser.name)?.[0]?.toUpperCase() || "" })] }), _jsxs("div", { className: "space-y-1", children: [_jsx(Link, { href: `/${hunterUser.display_username || hunterUser.username}`, className: "hover:underline", children: _jsx("h4", { className: "text-sm font-semibold", children: hunterUser.display_name ||
                                                                    hunterUser.name ||
                                                                    hunterUser.username }) }), _jsx(Link, { href: `/${hunterUser.display_username || hunterUser.username}`, className: "hover:underline", children: _jsxs("p", { className: "text-sm text-muted-foreground", children: ["@", hunterUser.display_username || hunterUser.username] }) }), hunterUser.bio && (_jsx("p", { className: "text-xs text-muted-foreground whitespace-pre-wrap", children: hunterUser.bio })), hunterUser.created_at && (_jsxs("div", { className: "flex items-center pt-1", children: [!hunterUser.manually_added ? (_jsx(CalendarDays, { className: "mr-2 h-4 w-4 opacity-70" })) : (_jsx(Binoculars, { className: "mr-2 h-4 w-4 opacity-70" })), _jsx("span", { className: "text-xs text-muted-foreground", children: hunterUser.manually_added
                                                                        ? `Component hunter`
                                                                        : `Joined ${formatDate(new Date(hunterUser.created_at))}` })] }))] })] }) })] })] })), component.registry && (_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("span", { className: "text-muted-foreground", children: "Registry" }), _jsx("div", { children: _jsx(Badge, { variant: "outline", children: component.registry }) })] })), component.website_url && (_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("span", { className: "text-muted-foreground", children: "Website" }), _jsxs("div", { className: "flex items-center justify-between group hover:bg-accent rounded-md p-1 -mx-2", children: [_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Link, { href: component.website_url.startsWith("http")
                                                        ? component.website_url
                                                        : `https://${component.website_url}`, target: "_blank", rel: "noopener noreferrer", onClick: (e) => e.stopPropagation(), children: _jsx("span", { className: "pl-1", children: (() => {
                                                            try {
                                                                const url = new URL(component.website_url.startsWith("http")
                                                                    ? component.website_url
                                                                    : `https://${component.website_url}`);
                                                                const domain = url.hostname.replace("www.", "");
                                                                const cleanPath = url.pathname?.slice(1).split("?")[0] || "";
                                                                const segments = cleanPath.split("/").filter(Boolean);
                                                                const formattedPath = segments.length > 0
                                                                    ? segments.length === 1
                                                                        ? segments[0]?.slice(0, 12)
                                                                        : segments
                                                                            .slice(0, 2)
                                                                            .map((s) => s.slice(0, 6))
                                                                            .join("/")
                                                                    : "";
                                                                return (_jsxs(_Fragment, { children: [domain, formattedPath && (_jsxs("span", { className: "text-muted-foreground", children: ["/", formattedPath, segments.length > 2 ||
                                                                                    (segments.length === 1 &&
                                                                                        (segments[0]?.length ?? 0) > 12) ||
                                                                                    (segments.length === 2 &&
                                                                                        ((segments[0]?.length ?? 0) > 6 ||
                                                                                            (segments[1]?.length ?? 0) > 6))
                                                                                    ? "..."
                                                                                    : ""] }))] }));
                                                            }
                                                            catch (e) {
                                                                return component.website_url;
                                                            }
                                                        })() }) }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Visit website" }) })] }), _jsx("div", { className: "flex items-center space-x-2 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity", children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Link, { href: component.website_url.startsWith("http")
                                                            ? component.website_url
                                                            : `https://${component.website_url}`, target: "_blank", rel: "noopener noreferrer", className: "hover:bg-accent-hover rounded relative overflow-hidden", onClick: (e) => e.stopPropagation(), children: _jsx("div", { className: "relative p-1 transition-all duration-300 ease-in-out hover:translate-x-[2px] hover:-translate-y-[2px]", children: _jsx(ArrowUpRight, { size: 16 }) }) }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "Visit website" }) })] }) })] })] })), component.tags && component.tags.length > 0 && (_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx("span", { className: "text-muted-foreground", children: "Tags" }), _jsx("div", { className: "flex flex-wrap gap-2", children: (component.tags ?? []).map((tag) => (_jsx(TagComponent, { slug: tag.slug, name: tag.name }, tag.slug))) })] })), Object.keys(npmDependencies).length > 0 && (_jsxs(_Fragment, { children: [_jsx(Separator, { className: "w-full !my-6" }), _jsxs("div", { className: "flex flex-col", onMouseEnter: () => setIsLibDepsHovered(true), onMouseLeave: () => setIsLibDepsHovered(false), children: [_jsxs("div", { className: "flex items-center mb-2 justify-between", children: [_jsx("span", { className: "text-muted-foreground w-full font-medium", children: "npm dependencies" }), _jsx("div", { className: "relative group cursor-pointer", onClick: copyAllDependencies, children: isLibDepsHovered &&
                                                    Object.keys(npmDependencies).length > 1 && (_jsx("span", { className: "whitespace-nowrap", children: copiedLibDependencies ? "Copied all!" : "Copy all" })) })] }), _jsx("div", { className: "pl-1/3 flex flex-col", children: Object.entries(npmDependencies).map(([dep, version]) => (_jsxs("div", { className: "flex items-center justify-between group hover:bg-accent rounded-md p-1 -mx-2", children: [_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("a", { href: `https://www.npmjs.com/package/${dep}`, target: "_blank", rel: "noopener noreferrer", onClick: () => handleNpmPackageClick(dep), children: _jsx("span", { className: "pl-1", children: dep }) }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "View on npmjs.com" }) })] }), _jsxs("div", { className: "flex items-center space-x-2 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity", children: [_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("a", { href: `https://www.npmjs.com/package/${dep}`, target: "_blank", rel: "noopener noreferrer", className: "hover:bg-accent-hover rounded relative overflow-hidden", onClick: (e) => e.stopPropagation(), children: _jsx("div", { className: "relative p-1 transition-all duration-300 ease-in-out hover:translate-x-[2px] hover:-translate-y-[2px]", children: _jsx(ArrowUpRight, { size: 16 }) }) }) }), _jsx(TooltipContent, { children: _jsx("p", { children: "View on npmjs.com" }) })] }), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx("button", { onClick: () => copySingleDependency(dep, version), className: "p-1 hover:bg-accent-hover rounded", children: copiedDependency === dep ? (_jsx(Check, { size: 16 })) : (_jsx(Copy, { size: 16 })) }) }), _jsx(TooltipContent, { children: _jsx("p", { children: copiedDependency === dep ? "Copied!" : "Copy" }) })] })] })] }, dep))) })] })] })), directRegistryDependencies.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Separator, { className: "w-full !my-6" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("div", { className: "flex items-center mb-2 justify-between", children: _jsx("span", { className: "text-muted-foreground w-full font-medium", children: "Registry dependencies:" }) }), _jsx("div", { className: "pl-1/3", children: isLoadingDependencies ? (_jsx("div", { className: "flex flex-col gap-4", children: [1, 2, 3].map((i) => (_jsx(ComponentCard, { isLoading: true }, i))) })) : dependencyComponents ? (_jsx("div", { className: "flex flex-col gap-4", children: dependencyComponents.map((component) => (_jsx(ComponentCard, { demo: component }, `${component.id}-${component.updated_at}`))) })) : (_jsx("span", { children: "Error loading registry dependencies" })) })] })] }))] })] }));
};
//# sourceMappingURL=component.js.map