import { type ValidIcon } from "dicons";
import type { ReactNode } from "react";
export interface ShineBorderProps {
    borderRadius?: number;
    borderWidth?: number;
    duration?: number;
    color?: string | string[];
    className?: string;
    children: React.ReactNode;
}
declare function ShineBorder({ borderRadius, borderWidth, duration, color, className, children, }: ShineBorderProps): import("react/jsx-runtime").JSX.Element;
export interface TimelineEventConfig {
    label: string;
    message: string;
    icon: {
        name: ValidIcon;
        textColor: string;
        borderColor: string;
    };
}
export declare function TimelineContainer({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function TimelineEvent({ label, message, icon, isLast }: TimelineEventConfig & {
    isLast?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export declare function Timeline(): import("react/jsx-runtime").JSX.Element;
export { ShineBorder };
//# sourceMappingURL=component.d.ts.map