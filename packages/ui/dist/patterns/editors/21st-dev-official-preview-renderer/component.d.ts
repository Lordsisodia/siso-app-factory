import { SandpackProviderProps } from "@codesandbox/sandpack-react";
import { Component, Demo, Tag, User } from "@/types/global";
interface PreviewRendererProps {
    isDarkTheme: boolean;
    providerProps: SandpackProviderProps;
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
    globalCss?: string;
    demo: Demo;
    css: string | null;
    shellCode: string[];
    allDependencies: Record<string, string>;
}
export declare function PreviewRenderer({ isDarkTheme, providerProps, component, code, demoCode, dependencies, demoDependencies, demoComponentNames, registryDependencies, npmDependenciesOfRegistryDependencies, tailwindConfig, globalCss, demo, css, shellCode, allDependencies, }: PreviewRendererProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map