import { type VariantProps } from "class-variance-authority";
declare const codeVariants: any;
interface CodeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof VariantProps<typeof codeVariants>>, VariantProps<typeof codeVariants> {
    code: string;
    fontSize?: "xs" | "sm" | "md" | "lg";
    language?: string;
    background?: string;
}
declare const Code: {
    ({ code, language, display, fontSize, className, background, style, ...props }: CodeProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export { Code };
//# sourceMappingURL=component.d.ts.map