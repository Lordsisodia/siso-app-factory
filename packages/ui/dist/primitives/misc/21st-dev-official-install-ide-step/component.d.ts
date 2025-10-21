import { IdeOption, OsType } from "@/app/magic/onboarding/page.client";
import { ApiKey } from "@/types/global";
interface InstallIdeStepProps {
    apiKey: ApiKey | null;
    selectedIde: IdeOption;
    osType: OsType;
    onComplete: (action: "next" | "troubleshooting") => void;
    onGenerateApiKey?: () => Promise<void>;
}
export declare function InstallIdeStep({ apiKey, selectedIde, osType, onComplete, onGenerateApiKey, }: InstallIdeStepProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map