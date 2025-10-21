import { PromptType } from "@/types/global";
import { PromptRule } from "@/types/prompt-rules";
interface PromptOptionBase {
    type: "option";
    id: string;
    label: string;
    description: string;
    action: "copy" | "open";
    icon: React.ReactElement;
}
interface PromptSeparator {
    type: "separator";
    id: string;
}
type PromptOption = PromptOptionBase | PromptSeparator;
export declare const promptOptions: PromptOption[];
export type { PromptOption, PromptOptionBase };
export declare const getComponentInstallPrompt: ({ promptType, codeFileName, demoCodeFileName, code, demoCode, registryDependencies, npmDependencies, npmDependenciesOfRegistryDependencies, tailwindConfig, globalCss, promptRule, userAdditionalContext, indexCss, }: {
    promptType: PromptType;
    codeFileName: string;
    demoCodeFileName: string;
    code: string;
    demoCode: string;
    npmDependencies: Record<string, string>;
    registryDependencies: Record<string, string>;
    npmDependenciesOfRegistryDependencies: Record<string, string>;
    tailwindConfig?: string;
    globalCss?: string;
    promptRule?: PromptRule;
    userAdditionalContext?: string;
    indexCss?: string;
}) => string;
//# sourceMappingURL=component.d.ts.map