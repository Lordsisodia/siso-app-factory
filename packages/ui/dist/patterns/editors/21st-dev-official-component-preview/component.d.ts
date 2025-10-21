import { Component, Demo, Tag, User } from "@/types/global";
import { ComponentAccessState } from "@/hooks/use-component-access";
export declare function ComponentPagePreview({ component, code, demoCode, dependencies, demoDependencies, demoComponentNames, registryDependencies, npmDependenciesOfRegistryDependencies, tailwindConfig, globalCss, canEdit, setIsEditDialogOpen, demo, compiledCss, showPaywall, accessState, tailwind4IndexCss, }: {
    component: Component & {
        user: User;
    } & {
        tags: Tag[];
    };
    code: string;
    demoCode: string;
    dependencies: Record<string, string>;
    demoDependencies: Record<string, string>;
    demoComponentNames: string[];
    registryDependencies: Record<string, string>;
    npmDependenciesOfRegistryDependencies: Record<string, string>;
    tailwindConfig?: string;
    tailwind4IndexCss?: string;
    globalCss?: string;
    compiledCss?: string | null;
    canEdit: boolean;
    setIsEditDialogOpen: (value: boolean) => void;
    demo: Demo;
    showPaywall: boolean;
    accessState: ComponentAccessState;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=component.d.ts.map