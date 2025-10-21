import React from "react";
interface ScrollVelocityRowProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    baseVelocity?: number;
    direction?: 1 | -1;
}
export declare const wrap: (min: number, max: number, v: number) => number;
export declare function ScrollVelocityContainer({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
export declare function ScrollVelocityRow(props: ScrollVelocityRowProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map