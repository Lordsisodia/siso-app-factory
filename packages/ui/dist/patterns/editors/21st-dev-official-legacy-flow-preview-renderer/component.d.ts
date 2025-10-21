import { SandpackProviderProps } from "@codesandbox/sandpack-react";
import { Component, Demo, Tag, User } from "@/types/global";
interface LegacyFlowPreviewRendererProps {
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
export declare function LegacyFlowPreviewRenderer({ providerProps, component, code, demoCode, demoComponentNames, registryDependencies, tailwindConfig, globalCss, demo, css, shellCode, allDependencies, }: LegacyFlowPreviewRendererProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map