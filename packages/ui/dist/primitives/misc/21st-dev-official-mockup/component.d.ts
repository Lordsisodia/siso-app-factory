import React from "react";
import { type VariantProps } from "class-variance-authority";
declare const mockupVariants: any;
export interface MockupProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof mockupVariants> {
}
declare const Mockup: React.ForwardRefExoticComponent<MockupProps & React.RefAttributes<HTMLDivElement>>;
declare const frameVariants: any;
export interface MockupFrameProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof frameVariants> {
}
declare const MockupFrame: React.ForwardRefExoticComponent<MockupFrameProps & React.RefAttributes<HTMLDivElement>>;
export { Mockup, MockupFrame };
//# sourceMappingURL=component.d.ts.map