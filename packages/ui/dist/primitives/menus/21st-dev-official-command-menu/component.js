"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useQuery } from "@tanstack/react-query";
import { Video, Home, Plus, Download, Code, FileText, User, Settings, } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, } from "@/components/ui/command";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useSidebarVisibility } from "@/hooks/use-sidebar-visibility";
import { Logo } from "@/components/ui/logo";
import { categories } from "@/lib/navigation";
import { trackEvent, AMPLITUDE_EVENTS } from "@/lib/amplitude";
import { useClerkSupabaseClient } from "@/lib/clerk";
import { cn } from "@/lib/utils";
import { getComponentInstallPrompt } from "@/lib/prompts";
import { resolveRegistryDependencyTree } from "@/lib/queries.server";
import fetchFileTextContent from "@/lib/utils/fetchFileTextContent";
import { useUserProfile } from "@/components/hooks/use-user-profile";
import { PROMPT_TYPES } from "@/types/global";
import { Icons } from "../icons";
import { CategoryPreviewImage } from "@/components/features/categories/category-preview-image";
import { CategoryVideoPreview } from "@/components/features/categories/category-video-preview";
import { sidebarOpenAtom } from "@/components/features/main-page/main-layout";
const commandSearchQueryAtom = atomWithStorage("commandMenuSearch", "");
// Custom CommandItem wrapper with responsive padding
const ResponsiveCommandItem = ({ className, ...props }) => (_jsx(CommandItem, { className: cn("md:py-1.5 py-3", className), ...props }));
const useKeyboardShortcuts = ({ selectedComponent, setIsCopying, setOpen, handleGeneratePrompt, }) => {
    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);
    useEffect(() => {
        const keyDownHandler = (e) => {
            if (e.key === "x" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                handleGeneratePrompt();
            }
        };
        document.addEventListener("keydown", keyDownHandler);
        return () => document.removeEventListener("keydown", keyDownHandler);
    }, [selectedComponent]);
    const handleKeyDown = async (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "c" && selectedComponent) {
            e.preventDefault();
            try {
                setIsCopying(true);
                const response = await fetch(selectedComponent.component.code);
                const code = await response.text();
                await navigator.clipboard.writeText(code);
                trackEvent(AMPLITUDE_EVENTS.COPY_CODE, {
                    componentId: selectedComponent.id,
                    componentName: selectedComponent.name,
                    copySource: "command-menu",
                });
            }
            catch (err) {
                console.error("Failed to copy code:", err);
                toast.error("Failed to copy code");
            }
            finally {
                setTimeout(() => {
                    setIsCopying(false);
                    toast("Copied to clipboard");
                }, 1000);
            }
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [selectedComponent]);
};
export function CommandMenu() {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useAtom(commandSearchQueryAtom);
    const [value, setValue] = useState("");
    const [showEditProfile, setShowEditProfile] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const supabase = useClerkSupabaseClient();
    const { user: dbUser, clerkUser: user, isLoading } = useUserProfile();
    const [, setSidebarOpen] = useAtom(sidebarOpenAtom);
    const shouldShowSidebar = useSidebarVisibility();
    const { data: components, isLoading: isComponentsLoading } = useQuery({
        queryKey: ["command-menu-components", searchQuery],
        queryFn: async () => {
            if (!searchQuery)
                return [];
            try {
                const { data: searchResults, error } = await supabase.functions.invoke("ai-search-oai", {
                    body: {
                        search: searchQuery,
                        match_threshold: 0.33,
                        limit: 5,
                    },
                });
                if (error)
                    throw new Error(error.message);
                if (!searchResults || !Array.isArray(searchResults)) {
                    console.warn("Invalid search results format:", searchResults);
                    return [];
                }
                return searchResults.map((result) => ({
                    ...result,
                    component: {
                        ...result.component_data,
                        user: result.user_data,
                    },
                    tags: [],
                }));
            }
            catch (err) {
                console.error("Search error:", err);
                return [];
            }
        },
    });
    const { data: users } = useQuery({
        queryKey: ["command-menu-users", searchQuery],
        queryFn: async () => {
            if (!searchQuery)
                return [];
            const { data: searchResults, error } = await supabase
                .from("users")
                .select("*")
                .ilike("username", `%${searchQuery}%`)
                .limit(5);
            if (error)
                throw new Error(error.message);
            return searchResults;
        },
        refetchOnWindowFocus: false,
        retry: false,
    });
    const filteredCategories = useMemo(() => {
        if (!searchQuery)
            return categories;
        return categories
            .map((category) => ({
            ...category,
            items: category.items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())),
        }))
            .filter((category) => category.items.length > 0);
    }, [categories, searchQuery]);
    const selectedComponent = useMemo(() => {
        if (!value.startsWith("component-"))
            return null;
        const [userId, componentSlug, demoName] = value
            .replace("component-", "")
            .split("/");
        return components?.find((c) => c.user_id === userId &&
            c.component.component_slug === componentSlug &&
            c.name === demoName);
    }, [components, value]);
    const selectedCategory = useMemo(() => {
        if (!value.startsWith("category-"))
            return null;
        return filteredCategories
            .flatMap((category) => category.items)
            .find((item) => `category-${item.title}` === value);
    }, [filteredCategories, value]);
    const { data: categoryPreview } = useQuery({
        queryKey: ["category-preview", selectedCategory?.demoId],
        queryFn: async () => {
            if (!selectedCategory?.demoId)
                return null;
            const { data: preview, error } = await supabase.rpc("get_section_previews", {
                p_demo_ids: [selectedCategory.demoId],
            });
            if (error)
                throw error;
            return preview?.[0] || null;
        },
        enabled: !!selectedCategory?.demoId,
    });
    const handleOpenChange = (open) => {
        setOpen(open);
        if (!open) {
            setSearchQuery("");
            setValue("");
        }
    };
    const [isCopying, setIsCopying] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const handleGeneratePrompt = async () => {
        if (!selectedComponent)
            return;
        setIsGenerating(true);
        try {
            const componentAndDemoCodePromises = [
                fetchFileTextContent(selectedComponent.component.code),
                fetchFileTextContent(selectedComponent.demo_code),
                selectedComponent.component.tailwind_config_extension
                    ? fetchFileTextContent(selectedComponent.component.tailwind_config_extension)
                    : Promise.resolve({ data: null, error: null }),
                selectedComponent.component.compiled_css
                    ? fetchFileTextContent(selectedComponent.component.compiled_css)
                    : Promise.resolve({ data: null, error: null }),
            ];
            const [codeResult, demoResult, tailwindConfigResult, globalCssResult, registryDependenciesResult,] = await Promise.all([
                ...componentAndDemoCodePromises,
                resolveRegistryDependencyTree({
                    supabase: supabase,
                    sourceDependencySlugs: [
                        `${selectedComponent.component.user.username}/${selectedComponent.component.component_slug}`,
                    ],
                    withDemoDependencies: false,
                }),
            ]);
            if (codeResult?.error ||
                demoResult?.error ||
                tailwindConfigResult?.error ||
                globalCssResult?.error) {
                throw new Error("Failed to fetch component files");
            }
            const registryDependenciesData = registryDependenciesResult?.data;
            const registryDependenciesFiles = Object.fromEntries(Object.entries(registryDependenciesData.filesWithRegistry).map(([key, value]) => [key, value.code]));
            const prompt = getComponentInstallPrompt({
                promptType: PROMPT_TYPES.EXTENDED,
                codeFileName: selectedComponent.component.code.split("/").slice(-1)[0],
                demoCodeFileName: selectedComponent.demo_code.split("/").slice(-1)[0],
                code: codeResult.data,
                demoCode: demoResult.data,
                registryDependencies: registryDependenciesFiles,
                npmDependencies: (selectedComponent.component.dependencies ??
                    {}),
                npmDependenciesOfRegistryDependencies: registryDependenciesData.npmDependencies,
                tailwindConfig: tailwindConfigResult.data,
                globalCss: globalCssResult.data,
            });
            await navigator.clipboard.writeText(prompt);
            toast.dismiss("ai-prompt");
            toast.success("AI prompt copied to clipboard");
            trackEvent(AMPLITUDE_EVENTS.COPY_AI_PROMPT, {
                componentId: selectedComponent.id,
                componentName: selectedComponent.name,
                promptType: PROMPT_TYPES.EXTENDED,
            });
        }
        catch (err) {
            console.error("Failed to copy AI prompt:", err);
            toast.dismiss("ai-prompt");
            toast.error("Failed to generate AI prompt");
        }
        finally {
            setIsGenerating(false);
        }
    };
    const handleOpen = () => {
        if (value.startsWith("component-") && selectedComponent) {
            router.push(`/${selectedComponent.component.user.username}/${selectedComponent.component.component_slug}/${selectedComponent.demo_slug || "default"}`);
        }
        else if (value.startsWith("category-")) {
            const category = filteredCategories
                .flatMap((category) => category.items)
                .find((item) => `category-${item.title}` === value);
            if (category) {
                router.push(category.href);
                trackEvent(AMPLITUDE_EVENTS.VIEW_SIDEBAR_SECTION, {
                    itemTitle: category.title,
                    path: category.href,
                });
            }
        }
        setSearchQuery("");
        setValue("");
        setOpen(false);
    };
    useKeyboardShortcuts({
        selectedComponent,
        setIsCopying,
        setOpen,
        handleGeneratePrompt,
    });
    return (_jsx(Dialog, { open: open, onOpenChange: handleOpenChange, children: _jsxs(DialogContent, { className: "p-0 max-w-3xl h-[450px] md:h-[470px] overflow-hidden", hideCloseButton: true, children: [_jsx(DialogTitle, { className: "sr-only", children: "Command Menu" }), _jsx(DialogDescription, { className: "sr-only", children: "Search and navigate through components and categories using keyboard shortcuts" }), _jsxs(Command, { value: value, onValueChange: setValue, className: "h-full flex flex-col", shouldFilter: false, children: [_jsx(CommandInput, { value: searchQuery, onValueChange: setSearchQuery, placeholder: "Search components or categories...", className: "h-11 w-full" }), _jsxs("div", { className: "flex flex-1 min-h-0", children: [_jsxs(CommandList, { className: "w-full md:w-1/2 border-r overflow-y-auto", children: [searchQuery && (_jsx(CommandGroup, { heading: "Search", children: _jsxs(ResponsiveCommandItem, { value: `search-${searchQuery}`, onSelect: () => {
                                                    router.push(`/q/${encodeURIComponent(searchQuery)}`);
                                                    setSearchQuery("");
                                                    setValue("");
                                                    setOpen(false);
                                                }, className: "flex items-center gap-2", children: [_jsx(Icons.search, { className: "h-4 w-4" }), _jsxs("span", { children: ["Search for \"", searchQuery, "\""] })] }) })), filteredCategories.length > 0 && (_jsx(CommandGroup, { heading: "Categories", children: filteredCategories.map((category) => category.items.map((item) => (_jsxs(ResponsiveCommandItem, { value: `category-${item.title}`, onSelect: () => {
                                                    router.push(item.href);
                                                    setSearchQuery("");
                                                    setValue("");
                                                    setOpen(false);
                                                    trackEvent(AMPLITUDE_EVENTS.VIEW_SIDEBAR_SECTION, {
                                                        categoryTitle: category.title,
                                                        itemTitle: item.title,
                                                        path: item.href,
                                                    });
                                                }, className: "flex items-center gap-2 whitespace-nowrap overflow-hidden", children: [_jsx(category.icon, { className: "h-4 w-4 min-w-4 min-h-4 max-w-4 max-h-4" }), _jsx("span", { className: "truncate flex-shrink-0", children: item.title }), _jsxs("span", { className: "text-xs text-muted-foreground truncate ml-1", children: ["in ", category.title] })] }, item.title)))) })), _jsx(CommandSeparator, {}), (!searchQuery ||
                                            ["view profile", "edit profile"].some((text) => text.includes(searchQuery.toLowerCase()))) && (_jsxs(_Fragment, { children: [_jsxs(CommandGroup, { heading: "Profile", children: [(!searchQuery ||
                                                            "view profile".includes(searchQuery.toLowerCase())) && (_jsxs(ResponsiveCommandItem, { value: "profile-view", onSelect: () => {
                                                                if (dbUser?.display_username) {
                                                                    router.push(`/${dbUser.display_username}`);
                                                                }
                                                                else if (user?.externalAccounts?.[0]?.username) {
                                                                    router.push(`/${dbUser?.username}`);
                                                                }
                                                                setSearchQuery("");
                                                                setValue("");
                                                                setOpen(false);
                                                            }, className: "flex items-center gap-2", children: [_jsx(User, { className: "h-4 w-4" }), _jsx("span", { children: "View Profile" })] })), (!searchQuery ||
                                                            "edit profile".includes(searchQuery.toLowerCase())) && (_jsxs(ResponsiveCommandItem, { value: "profile-edit", onSelect: () => {
                                                                setShowEditProfile(true);
                                                                setSearchQuery("");
                                                                setValue("");
                                                                setOpen(false);
                                                            }, className: "flex items-center gap-2", children: [_jsx(Settings, { className: "h-4 w-4" }), _jsx("span", { children: "Edit Profile" })] }))] }), _jsx(CommandSeparator, {})] })), (!searchQuery ||
                                            [
                                                ...(pathname !== "/" ? ["go home"] : []),
                                                "publish component",
                                                "import registry",
                                                "api docs keys",
                                                "terms service",
                                                "toggle theme",
                                                "subscription",
                                                ...(shouldShowSidebar ? ["toggle sidebar"] : []),
                                            ].some((text) => text.includes(searchQuery.toLowerCase()))) && (_jsxs(_Fragment, { children: [_jsxs(CommandGroup, { heading: "Quick Actions", children: [(!searchQuery ||
                                                            "go home".includes(searchQuery.toLowerCase())) &&
                                                            pathname !== "/" && (_jsxs(ResponsiveCommandItem, { value: "action-home", onSelect: () => {
                                                                router.push("/");
                                                                setSearchQuery("");
                                                                setValue("");
                                                                setOpen(false);
                                                            }, className: "flex items-center gap-2", children: [_jsx(Home, { className: "h-4 w-4" }), _jsx("span", { children: "Go Home" })] })), (!searchQuery ||
                                                            "publish component".includes(searchQuery.toLowerCase())) && (_jsxs(ResponsiveCommandItem, { value: "action-publish", onSelect: () => {
                                                                router.push("/publish");
                                                                setSearchQuery("");
                                                                setValue("");
                                                                setOpen(false);
                                                            }, className: "flex items-center gap-2", children: [_jsx(Plus, { className: "h-4 w-4" }), _jsx("span", { children: "Publish Component" })] })), (!searchQuery ||
                                                            "import registry".includes(searchQuery.toLowerCase())) && (_jsxs(ResponsiveCommandItem, { value: "action-import", onSelect: () => {
                                                                router.push("/import");
                                                                setSearchQuery("");
                                                                setValue("");
                                                                setOpen(false);
                                                            }, className: "flex items-center gap-2", children: [_jsx(Download, { className: "h-4 w-4" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: "Import from Registry" }), _jsx(Badge, { variant: "secondary", className: "h-5 text-[11px] tracking-wide font-medium uppercase px-1.5 py-0 leading-none", children: "beta" })] })] })), (!searchQuery ||
                                                            "api docs keys".includes(searchQuery.toLowerCase())) && (_jsxs(ResponsiveCommandItem, { value: "action-api", onSelect: () => {
                                                                router.push("/api-access");
                                                                setSearchQuery("");
                                                                setValue("");
                                                                setOpen(false);
                                                            }, className: "flex items-center gap-2", children: [_jsx(Code, { className: "h-4 w-4" }), _jsx("span", { children: "API Docs & Keys" })] })), (!searchQuery ||
                                                            "terms service".includes(searchQuery.toLowerCase())) && (_jsxs(ResponsiveCommandItem, { value: "action-terms", onSelect: () => {
                                                                window.open("/terms", "_blank");
                                                                setSearchQuery("");
                                                                setValue("");
                                                                setOpen(false);
                                                            }, className: "flex items-center gap-2", children: [_jsx(FileText, { className: "h-4 w-4" }), _jsx("span", { children: "Terms of Service" })] })), (!searchQuery ||
                                                            "toggle theme".includes(searchQuery.toLowerCase())) && (_jsxs(ResponsiveCommandItem, { value: "action-theme", onSelect: () => {
                                                                document.documentElement.classList.toggle("dark");
                                                                document.documentElement.classList.toggle("light");
                                                                setSearchQuery("");
                                                                setValue("");
                                                                setOpen(false);
                                                            }, className: "flex items-center gap-2", children: [_jsx(Icons.sun, { className: "h-4 w-4 dark:hidden" }), _jsx(Icons.moon, { className: "h-4 w-4 hidden dark:block" }), _jsx("span", { children: "Toggle Theme" })] })), (!searchQuery ||
                                                            "subscription".includes(searchQuery.toLowerCase())) && (_jsxs(ResponsiveCommandItem, { value: "action-subscription", onSelect: () => {
                                                                router.push("/subscription");
                                                                setSearchQuery("");
                                                                setValue("");
                                                                setOpen(false);
                                                            }, className: "flex items-center gap-2", children: [_jsx(Icons.creditCard, { className: "h-4 w-4" }), _jsx("span", { children: "Subscription" })] })), (!searchQuery ||
                                                            "toggle sidebar".includes(searchQuery.toLowerCase())) &&
                                                            shouldShowSidebar && (_jsxs(ResponsiveCommandItem, { value: "action-sidebar", onSelect: () => {
                                                                setSidebarOpen((prev) => !prev);
                                                                setSearchQuery("");
                                                                setValue("");
                                                                setOpen(false);
                                                            }, className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Icons.sidebar, { className: "h-4 w-4" }), _jsx("span", { children: "Toggle Sidebar" })] }), _jsx("kbd", { className: "pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-sans text-[11px] leading-none opacity-100 flex", children: "S" })] }))] }), _jsx(CommandSeparator, {})] })), (!searchQuery ||
                                            ["twitter", "discord", "github"].some((text) => text.includes(searchQuery.toLowerCase()))) && (_jsxs(_Fragment, { children: [_jsxs(CommandGroup, { heading: "Social", children: [(!searchQuery ||
                                                            "twitter".includes(searchQuery.toLowerCase())) && (_jsxs(ResponsiveCommandItem, { value: "social-twitter", onSelect: () => {
                                                                window.open("https://x.com/serafimcloud", "_blank");
                                                                setSearchQuery("");
                                                                setValue("");
                                                                setOpen(false);
                                                            }, className: "flex items-center gap-2", children: [_jsx("div", { className: "flex items-center justify-center w-4", children: _jsx(Icons.twitter, { className: "h-3 w-3" }) }), _jsx("span", { children: "Twitter" })] })), (!searchQuery ||
                                                            "discord".includes(searchQuery.toLowerCase())) && (_jsxs(ResponsiveCommandItem, { value: "social-discord", onSelect: () => {
                                                                window.open("https://discord.gg/Qx4rFunHfm", "_blank");
                                                                setSearchQuery("");
                                                                setValue("");
                                                                setOpen(false);
                                                            }, className: "flex items-center gap-2", children: [_jsx(Icons.discord, { className: "h-4 w-4" }), _jsx("span", { children: "Discord" })] })), (!searchQuery ||
                                                            "github".includes(searchQuery.toLowerCase())) && (_jsxs(ResponsiveCommandItem, { value: "social-github", onSelect: () => {
                                                                window.open("https://github.com/serafimcloud/21st", "_blank");
                                                                setSearchQuery("");
                                                                setValue("");
                                                                setOpen(false);
                                                            }, className: "flex items-center gap-2", children: [_jsx(Icons.gitHub, { className: "h-4 w-4" }), _jsx("span", { children: "GitHub" })] }))] }), _jsx(CommandSeparator, {})] })), searchQuery &&
                                            !isComponentsLoading &&
                                            components &&
                                            components.length > 0 && (_jsx(_Fragment, { children: _jsx(CommandGroup, { heading: "Quick Results", children: components.map((component) => (_jsx(ResponsiveCommandItem, { value: `component-${component?.user_id}/${component?.component?.component_slug}/${component?.name}`, onSelect: handleOpen, className: "flex items-center gap-2", children: _jsxs("div", { className: "flex-1 min-w-0 flex items-center gap-2", children: [_jsx("span", { className: "truncate", children: component?.name === "Default"
                                                                    ? component?.component?.name
                                                                    : `${component?.component?.name} - ${component?.name}` }), _jsxs("span", { className: "text-xs text-muted-foreground whitespace-nowrap", children: ["by ", component?.component?.user?.username] })] }) }, `${component?.component?.name}-${component?.name}`))) }) })), searchQuery &&
                                            !isComponentsLoading &&
                                            (!components || components.length === 0) && (_jsx(CommandEmpty, { children: "Nothing found." })), users && users.length > 0 && (_jsxs(_Fragment, { children: [_jsx(CommandSeparator, {}), _jsx(CommandGroup, { heading: "Users", children: users.map((user) => (_jsxs(ResponsiveCommandItem, { value: `user-${user.username}`, onSelect: () => {
                                                            router.push(`/${user.username}`);
                                                            setSearchQuery("");
                                                            setValue("");
                                                            setOpen(false);
                                                        }, className: "flex items-center gap-2", children: [_jsx("div", { className: "w-6 h-6 rounded-full overflow-hidden relative", children: _jsx(Image, { src: user.image_url || "/default-avatar.png", alt: user.username || "User Avatar", fill: true, className: "object-cover" }) }), _jsx("span", { className: "truncate", children: user.name || user.username }), _jsx("span", { className: "text-xs text-muted-foreground", children: user.username })] }, user.id))) })] }))] }), _jsxs("div", { className: "hidden md:flex w-1/2 p-4 pb-14 overflow-y-auto items-center justify-center", children: [selectedComponent && selectedComponent.preview_url && (_jsxs("div", { className: "p-4 w-full", children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: selectedComponent.name }), _jsx("p", { className: "text-sm text-muted-foreground mb-4 line-clamp-2", children: selectedComponent.component.description }), _jsx("div", { className: "relative aspect-video rounded-md overflow-hidden", children: _jsx(Image, { src: selectedComponent.preview_url, alt: `Preview of ${selectedComponent.name}`, fill: true, className: "object-cover" }) })] })), selectedCategory && categoryPreview && (_jsxs("div", { className: "p-4 w-full", children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: selectedCategory.title }), _jsxs("div", { className: "relative aspect-[4/3] group", children: [_jsx("div", { className: "absolute inset-0 rounded-lg overflow-hidden", children: _jsxs("div", { className: "relative w-full h-full", children: [_jsx("div", { className: "absolute inset-0", style: { margin: "-1px" }, children: _jsx(CategoryPreviewImage, { src: categoryPreview.preview_url || "/placeholder.svg", alt: selectedCategory.title, fallbackSrc: "/placeholder.svg", className: "w-full h-full object-cover" }) }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-foreground/0 to-foreground/5" }), categoryPreview.video_url && (_jsx("div", { className: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: _jsx(CategoryVideoPreview, { videoUrl: categoryPreview.video_url }) }))] }) }), categoryPreview.video_url && (_jsx("div", { className: "absolute top-2 left-2 z-20 bg-background/90 backdrop-blur rounded-sm px-2 py-1 pointer-events-none", children: _jsx(Video, { className: "h-4 w-4 text-foreground" }) }))] })] }))] })] }), _jsxs("div", { className: "border-t border-border h-10 pl-4 pr-3 flex items-center justify-between bg-background text-sm text-muted-foreground", children: [_jsxs("div", { className: "flex items-center gap-2 group hover:cursor-pointer", children: [_jsxs("div", { className: "relative w-3 h-3", children: [_jsx("div", { className: "absolute inset-0 transition-all duration-500 \n                  group-hover:opacity-0 group-hover:scale-90", children: _jsx(Logo, { position: "flex", className: "w-3 h-3 !left-0 !top-0" }) }), _jsx("div", { className: "absolute inset-0 opacity-0 transition-all duration-500 transform\n                  group-hover:opacity-100 group-hover:scale-100 origin-center", children: _jsxs("div", { className: "relative w-full h-full", children: [_jsx("span", { className: "absolute inset-0 text-[0.75rem] flex items-center justify-center\n                      animate-in zoom-in-95 duration-300", style: {
                                                                    animationFillMode: "forwards",
                                                                    transform: "translateY(-0.5px)",
                                                                }, children: "\u2764\uFE0F" }), _jsx("div", { className: "absolute inset-0 rounded-full bg-pink-500/20 animate-ping-slow \n                      group-hover:opacity-100 opacity-0 transition-opacity duration-300" }), _jsx("div", { className: "absolute inset-0 rounded-full bg-pink-500/10\n                      group-hover:animate-scale-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" })] }) })] }), _jsx("span", { className: "text-sm font-medium transition-colors duration-300 group-hover:text-primary", children: "21st.dev" })] }), _jsxs("div", { className: "flex items-center", children: [selectedComponent?.component.code && (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex items-center gap-2", children: _jsxs("div", { className: cn("flex items-center gap-2", isGenerating && "text-muted-foreground/70"), children: [isGenerating && (_jsx("div", { className: "h-[6px] w-[6px] rounded-full bg-emerald-400 animate-pulse" })), _jsxs("button", { onClick: handleGeneratePrompt, disabled: isGenerating, className: "hover:bg-accent px-2 py-1 rounded-md flex items-center gap-2", children: [_jsx("span", { children: isGenerating ? "Generating..." : "Copy Prompt" }), !isGenerating && (_jsxs("kbd", { className: "pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-sans text-[11px] leading-none opacity-100 flex", children: [_jsx("span", { className: "text-[11px] leading-none font-sans", children: navigator?.platform
                                                                                    ?.toLowerCase()
                                                                                    ?.includes("mac")
                                                                                    ? "⌘"
                                                                                    : "Ctrl" }), _jsx("span", { className: "text-[11px] leading-none font-sans", children: "X" })] }))] })] }) }), _jsx("div", { className: "mx-2 h-4 w-[1px] bg-border" }), _jsx("div", { className: "flex items-center gap-2", children: _jsxs("div", { className: cn("flex items-center gap-2", isCopying && "text-muted-foreground/70"), children: [isCopying && (_jsx("div", { className: "h-[6px] w-[6px] rounded-full bg-emerald-400 animate-pulse" })), _jsxs("button", { onClick: async () => {
                                                                    try {
                                                                        setIsCopying(true);
                                                                        const response = await fetch(selectedComponent.component.code);
                                                                        const code = await response.text();
                                                                        await navigator.clipboard.writeText(code);
                                                                        trackEvent(AMPLITUDE_EVENTS.COPY_CODE, {
                                                                            componentId: selectedComponent.id,
                                                                            componentName: selectedComponent.name,
                                                                            copySource: "command-menu",
                                                                        });
                                                                    }
                                                                    catch (err) {
                                                                        console.error("Failed to copy code:", err);
                                                                        toast.error("Failed to copy code");
                                                                    }
                                                                    finally {
                                                                        setTimeout(() => {
                                                                            setIsCopying(false);
                                                                            toast("Copied to clipboard");
                                                                        }, 1000);
                                                                    }
                                                                }, className: "hover:bg-accent px-2 py-1 rounded-md flex items-center gap-2", children: [_jsx("span", { children: isCopying ? "Copying..." : "Copy Code" }), !isCopying && (_jsxs("kbd", { className: "pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-sans  text-[11px] leading-none  opacity-100 flex", children: [_jsx("span", { className: "text-[11px] leading-none font-sans", children: navigator?.platform
                                                                                    ?.toLowerCase()
                                                                                    ?.includes("mac")
                                                                                    ? "⌘"
                                                                                    : "Ctrl" }), "C"] }))] })] }) }), _jsx("div", { className: "mx-2 h-4 w-[1px] bg-border" })] })), _jsxs("button", { onClick: handleOpen, className: "flex items-center gap-2 hover:bg-accent px-2 py-1 rounded-md", children: [_jsxs("div", { className: "relative w-24 h-5", children: [_jsx("span", { className: cn("absolute inset-0 transition-all duration-200 flex items-end justify-end whitespace-nowrap", value.startsWith("search-")
                                                                ? "translate-y-2 opacity-0"
                                                                : value.startsWith("social-")
                                                                    ? "translate-y-2 opacity-0"
                                                                    : value === "action-theme"
                                                                        ? "translate-y-2 opacity-0"
                                                                        : "translate-y-0 opacity-100"), children: "Open" }), _jsx("span", { className: cn("absolute inset-0 transition-all duration-200 flex items-center justify-end whitespace-nowrap", value.startsWith("search-")
                                                                ? "translate-y-0 opacity-100"
                                                                : "-translate-y-2 opacity-0"), children: "Search" }), _jsx("span", { className: cn("absolute inset-0 transition-all duration-200 flex items-center justify-end whitespace-nowrap", value.startsWith("social-")
                                                                ? "translate-y-0 opacity-100"
                                                                : "-translate-y-2 opacity-0"), children: "Go to website" }), _jsx("span", { className: cn("absolute inset-0 transition-all duration-200 flex items-center justify-end whitespace-nowrap", value === "action-theme"
                                                                ? "translate-y-0 opacity-100"
                                                                : "-translate-y-2 opacity-0"), children: "Toggle theme" })] }), _jsx("kbd", { className: "pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[11px] leading-none font-sans opacity-100 flex", children: _jsx(Icons.enter, { className: "h-2.5 w-2.5" }) })] })] })] })] })] }) }));
}
//# sourceMappingURL=component.js.map