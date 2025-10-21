import { ApiKey } from "@/types/global";
export declare const magicOnboardingCompletedAtom: any;
export declare function useMagicOnboardingState(userId: string | null): {
    magicOnboardingCompleted: any;
};
interface OnboardingServerWrapperProps {
    initialApiKey: ApiKey | null;
    userId: string | null;
}
export declare function OnboardingServerWrapper({ initialApiKey, userId, }: OnboardingServerWrapperProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map