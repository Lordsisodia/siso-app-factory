import { ApiKey } from "@/types/global";
interface OnboardingProps {
    apiKey: ApiKey | null;
    setApiKey: (key: ApiKey | null) => void;
    userId: string | null;
    showWelcome?: boolean;
    onWelcomeComplete?: () => void;
    allStepsCompleted?: boolean;
}
export declare function Onboarding({ apiKey, setApiKey, userId, showWelcome, onWelcomeComplete, allStepsCompleted, }: OnboardingProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map