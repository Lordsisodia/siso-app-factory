import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ComponentCard } from "@/components/features/list-card/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ComponentCardSkeleton } from "@/components/ui/skeletons";
import { getDemosAction } from "@/lib/api/demos";
import { useClerkSupabaseClient } from "@/lib/clerk";
import { transformDemoResult } from "@/lib/utils/transformData";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
export function AddRegistryModal({ isOpen, onClose, onAddFrom21Registry, }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isInstalling, setIsInstalling] = useState(false);
    const supabase = useClerkSupabaseClient();
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const shadcnDemosQuery = useQuery({
        queryKey: ["shadcn-demos"],
        queryFn: async () => {
            const { data, error } = await supabase.rpc("get_user_profile_demo_list", {
                p_user_id: "user_shadcn",
                p_include_private: false,
            });
            if (error)
                throw error;
            return data.map(transformDemoResult);
        },
        staleTime: 30 * 1000,
    });
    console.log("shadcnDemosQuery", shadcnDemosQuery.data);
    const registrySearchQuery = useQuery({
        queryKey: ["registryModalSearch", searchTerm],
        queryFn: async () => {
            if (!searchTerm.trim()) {
                return null;
            }
            try {
                let exactSearchResults = await getDemosAction({
                    searchQuery: searchTerm,
                });
                exactSearchResults = exactSearchResults.map((result) => {
                    return {
                        ...result,
                        component_data: result.components,
                        user_data: result.components?.users_components_user_idTousers,
                    };
                });
                console.log("exactSearchResults", exactSearchResults);
                const { data: searchResults, error } = await supabase.functions.invoke("search_demos_ai_oai_extended", {
                    body: {
                        search: searchTerm,
                        match_threshold: 0.33,
                    },
                });
                if (error)
                    throw error;
                if (!searchResults || !Array.isArray(searchResults)) {
                    console.warn("Search results are not an array or undefined", searchResults);
                    return [];
                }
                const transformedResults = exactSearchResults
                    .concat(searchResults)
                    .map((result) => {
                    const componentData = result.component_data;
                    const userData = result.user_data;
                    console.log("componentData", componentData);
                    if (!componentData || !userData) {
                        console.warn("Missing component or user data in search result", result);
                        return null;
                    }
                    const componentWithUser = {
                        ...componentData,
                        user: userData,
                    };
                    const demoComponent = {
                        bundle_hash: null,
                        bundle_html_url: null,
                        compiled_css: result.compiled_css || "",
                        component_id: componentData.id,
                        created_at: result.created_at || null,
                        demo_code: result.demo_code || "",
                        demo_dependencies: result.demo_dependencies || "",
                        demo_direct_registry_dependencies: result.demo_direct_registry_dependencies || {},
                        demo_slug: result.demo_slug || "default",
                        id: result.id,
                        name: result.name || "Default",
                        preview_url: result.preview_url,
                        user: userData,
                        user_id: userData.id,
                        video_url: result.video_url,
                        view_count: result.view_count || 0,
                        bookmarks_count: result.bookmarks_count || 0,
                        component: componentWithUser,
                        tags: result.tags || [],
                        embedding: null,
                        embedding_oai: null,
                        fts: null,
                        pro_preview_image_url: null,
                        updated_at: result.updated_at || null,
                    };
                    return demoComponent;
                })
                    .filter((item) => item !== null);
                return transformedResults;
            }
            catch (err) {
                console.error("Error fetching registry search results:", err);
                throw err;
            }
        },
        enabled: !!searchTerm.trim(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
    const handleSelectComponent = async (component) => {
        setIsInstalling(true);
        try {
            const username = component.user.username;
            const componentSlug = component.component.component_slug;
            const jsonUrl = `https://21st.dev/r/${username}/${componentSlug}`;
            await onAddFrom21Registry(jsonUrl);
        }
        catch (error) {
            console.error("Error adding component from registry:", error);
        }
        finally {
            setIsInstalling(false);
            onClose();
        }
    };
    const sortedShadcnDemos = shadcnDemosQuery.data
        ? [...shadcnDemosQuery.data].sort((a, b) => {
            const downloadsA = a.component?.likes_count || 0;
            const downloadsB = b.component?.likes_count || 0;
            return downloadsB - downloadsA;
        })
        : [];
    const sortedRegistryResults = registrySearchQuery.data ?? [];
    // ? [...registrySearchQuery.data].sort((a, b) => {
    //     const downloadsA = a.component?.likes_count || 0
    //     const downloadsB = b.component?.likes_count || 0
    //     return downloadsB - downloadsA
    //   })
    // : []
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "sm:max-w-[600px]", children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Add from 21st Registry" }), _jsx(DialogDescription, { children: "Search for components in the 21st.dev registry or select from our featured components." })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsx(Input, { placeholder: "Search components...", value: searchTerm, onChange: handleSearchChange }), _jsx("div", { className: "h-96 border rounded-md p-2 overflow-y-auto relative", children: isInstalling ? (_jsxs("div", { className: "absolute inset-0 bg-background flex flex-col items-center justify-center z-10 rounded-md", children: [_jsx("div", { className: "max-w-xs max-h-xs", children: _jsx(LoadingSpinner, {}) }), _jsx("p", { className: "mt-4 text-sm text-muted-foreground", children: "Installing component..." })] })) : (_jsxs(_Fragment, { children: [searchTerm.trim() && registrySearchQuery.isLoading && (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 p-4", children: [...Array(4)].map((_, i) => (_jsx(ComponentCardSkeleton, {}, i))) })), searchTerm.trim() && registrySearchQuery.error && (_jsx("p", { className: "text-sm text-destructive p-4 text-center", children: "Error searching components." })), searchTerm.trim() &&
                                        registrySearchQuery.data &&
                                        registrySearchQuery.data.length === 0 && (_jsxs("p", { className: "text-sm text-muted-foreground p-4 text-center", children: ["No components found for \"", searchTerm, "\"."] })), searchTerm.trim() &&
                                        registrySearchQuery.data &&
                                        registrySearchQuery.data.length > 0 && (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 p-4", children: sortedRegistryResults.map((component) => (_jsx(ComponentCard, { demo: component, onClick: () => handleSelectComponent(component), hideUser: true, hideVotes: true }, component.id))) })), !searchTerm.trim() && shadcnDemosQuery.isLoading && (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 p-4", children: [...Array(4)].map((_, i) => (_jsx(ComponentCardSkeleton, {}, i))) })), !searchTerm.trim() && shadcnDemosQuery.error && (_jsx("p", { className: "text-sm text-destructive p-4 text-center", children: "Error loading featured components." })), !searchTerm.trim() &&
                                        shadcnDemosQuery.data &&
                                        shadcnDemosQuery.data.length === 0 && (_jsx("p", { className: "text-sm text-muted-foreground p-4 text-center", children: "No featured components available." })), !searchTerm.trim() &&
                                        shadcnDemosQuery.data &&
                                        shadcnDemosQuery.data.length > 0 && (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 p-4", children: sortedShadcnDemos.map((component) => (_jsx(ComponentCard, { demo: component, onClick: () => handleSelectComponent(component), hideUser: true, hideVotes: true }, component.id))) })), !searchTerm.trim() &&
                                        !shadcnDemosQuery.isLoading &&
                                        !shadcnDemosQuery.error &&
                                        (!shadcnDemosQuery.data ||
                                            shadcnDemosQuery.data.length === 0) && (_jsx("p", { className: "text-sm text-muted-foreground p-4 text-center", children: "Browse featured components or enter a search term to find components." }))] })) })] }), _jsx(DialogFooter, { children: _jsx(Button, { variant: "outline", onClick: onClose, children: "Close" }) })] }) }));
}
//# sourceMappingURL=component.js.map