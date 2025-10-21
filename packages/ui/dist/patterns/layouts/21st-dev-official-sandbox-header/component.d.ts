import { SandboxStatus } from "../hooks/use-sandbox";
interface SandboxHeaderProps {
    sandboxId: string | null | undefined;
    sandboxName?: string;
    username?: string;
    status: SandboxStatus;
    showEditName?: boolean;
    onNameChange?: (newName: string) => void;
    customBackUrl?: string;
    customBackLabel?: string;
    customBackAction?: () => void;
    customNextUrl?: string;
    customNextLabel?: string;
    customNextIcon?: React.ReactNode;
    customNextAction?: () => void;
    hideNext?: boolean;
    isNextLoading?: boolean;
    isBackLoading?: boolean;
    showBetaBadge?: boolean;
}
export declare function SandboxHeader({ sandboxId, sandboxName, username, status, showEditName, onNameChange, customBackUrl, customBackLabel, customBackAction, customNextUrl, customNextLabel, customNextIcon, customNextAction, hideNext, isNextLoading, isBackLoading, showBetaBadge, }: SandboxHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map