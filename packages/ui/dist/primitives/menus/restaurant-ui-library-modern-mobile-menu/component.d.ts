import React from "react";
export type IconComponentType = React.ElementType<{
    className?: string;
}>;
export interface InteractiveMenuItem {
    label: string;
    icon: IconComponentType;
}
export interface InteractiveMenuProps {
    items?: InteractiveMenuItem[];
    accentColor?: string;
    className?: string;
}
export declare function InteractiveMenu({ items, accentColor, className }: InteractiveMenuProps): import("react/jsx-runtime").JSX.Element;
export default InteractiveMenu;
//# sourceMappingURL=component.d.ts.map