import { ComponentPropsWithoutRef, ReactNode } from "react";
interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
    children: ReactNode;
    className?: string;
}
interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
    name: string;
    className: string;
    background: ReactNode;
    Icon: React.ElementType;
    description: string;
    href: string;
    cta: string;
}
declare const BentoGrid: ({ children, className, ...props }: BentoGridProps) => import("react/jsx-runtime").JSX.Element;
declare const BentoCard: ({ name, className, background, Icon, description, href, cta, ...props }: BentoCardProps) => import("react/jsx-runtime").JSX.Element;
export { BentoCard, BentoGrid };
//# sourceMappingURL=component.d.ts.map