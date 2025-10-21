interface HeroPillProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactNode;
    text: string;
    className?: string;
    /**
     * @default true
     */
    animate?: boolean;
}
export declare function HeroPill({ icon, text, className, animate, ...props }: HeroPillProps): import("react/jsx-runtime").JSX.Element;
export declare function StarIcon(): import("react/jsx-runtime").JSX.Element;
export declare function HeroPillDemo(): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map