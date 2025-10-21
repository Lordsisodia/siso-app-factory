import type React from "react";
type AnnotationAction = "highlight" | "underline" | "box" | "circle" | "strike-through" | "crossed-off" | "bracket";
interface HighlighterProps {
    children: React.ReactNode;
    action?: AnnotationAction;
    color?: string;
    strokeWidth?: number;
    animationDuration?: number;
    iterations?: number;
    padding?: number;
    multiline?: boolean;
    isView?: boolean;
}
export declare function Highlighter({ children, action, color, strokeWidth, animationDuration, iterations, padding, multiline, isView, }: HighlighterProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map