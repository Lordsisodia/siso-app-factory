import { ParsedCodeData } from "../publish-layout";
export declare const ResolveUnknownDependenciesAlertForm: ({ unknownDependencies, onDependenciesResolved, onBack, }: {
    unknownDependencies: {
        slugWithUsername: string;
        registry: string;
        isDemoDependency: boolean;
    }[];
    onDependenciesResolved: (deps: {
        username: string;
        slug: string;
        registry: string;
        isDemoDependency: boolean;
    }[]) => void;
    onBack: () => void;
}) => import("react/jsx-runtime").JSX.Element;
export declare const CodeGuidelinesAlert: () => import("react/jsx-runtime").JSX.Element;
export declare const DemoComponentGuidelinesAlert: ({ mainComponentName, componentSlug, registryToPublish, }: {
    mainComponentName: string;
    componentSlug: string;
    registryToPublish: string;
}) => import("react/jsx-runtime").JSX.Element;
export declare const DebugInfoDisplay: ({ componentNames, demoComponentNames, dependencies, demoDependencies, }: ParsedCodeData & {
    unknownDependencies: {
        slugWithUsername: string;
        isDemoDependency: boolean;
    }[];
}) => import("react/jsx-runtime").JSX.Element;
export declare const TailwindGuidelinesAlert: () => import("react/jsx-runtime").JSX.Element;
export declare const GlobalStylesGuidelinesAlert: () => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=component.d.ts.map