import { FormStep } from "@/types/global";
export interface ParsedCodeData {
    dependencies: Record<string, string>;
    demoDependencies: Record<string, string>;
    directRegistryDependencyImports: string[];
    componentNames: string[];
    demoComponentNames: string[];
}
interface PublishComponentFormProps {
    mode?: "full" | "add-demo";
    existingComponent?: any;
    initialStep?: FormStep;
    initialCode?: string;
    initialTailwindConfig?: string | null;
    initialGlobalCss?: string | null;
}
export default function PublishComponentForm({ mode, existingComponent, initialStep, initialCode, initialTailwindConfig, initialGlobalCss, }: PublishComponentFormProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map