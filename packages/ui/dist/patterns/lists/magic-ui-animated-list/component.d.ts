import React, { ComponentPropsWithoutRef } from "react";
export declare function AnimatedListItem({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
    children: React.ReactNode;
    delay?: number;
}
export declare const AnimatedList: React.MemoExoticComponent<({ children, className, delay, ...props }: AnimatedListProps) => import("react/jsx-runtime").JSX.Element>;
//# sourceMappingURL=component.d.ts.map