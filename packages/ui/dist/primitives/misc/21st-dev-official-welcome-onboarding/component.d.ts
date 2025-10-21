interface WelcomeOnboardingProps {
    onComplete?: () => void;
    steps?: OnboardingStep[];
    autoOpen?: boolean;
}
interface OnboardingStep {
    title: string;
    description: string;
}
export declare function WelcomeOnboarding({ onComplete, steps, autoOpen, }: WelcomeOnboardingProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=component.d.ts.map