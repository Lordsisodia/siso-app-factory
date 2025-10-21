interface VisibilityToggleProps {
    isPrivate: boolean;
    onToggle?: (isPrivate: boolean) => Promise<void>;
    disabled?: boolean;
    readonly?: boolean;
}
export declare function VisibilityToggle({ isPrivate, onToggle, disabled, readonly, }: VisibilityToggleProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map