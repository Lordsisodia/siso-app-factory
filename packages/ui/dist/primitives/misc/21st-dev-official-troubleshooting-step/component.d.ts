import { IdeOption, OsType } from "@/app/magic/onboarding/page.client";
import { OnboardingStep } from "@/app/magic/onboarding/page.client";
interface TroubleshootingStepProps {
    selectedIde: IdeOption;
    osType: OsType;
    previousStep: OnboardingStep;
    onComplete: (returnToStep: OnboardingStep) => void;
}
export declare function TroubleshootingStep({ selectedIde, osType, previousStep, onComplete, }: TroubleshootingStepProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map