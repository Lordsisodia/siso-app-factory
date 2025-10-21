export interface TestimonialAuthor {
    name: string;
    handle: string;
    avatar: string;
}
export interface TestimonialCardProps {
    author: TestimonialAuthor;
    text: string;
    href?: string;
    className?: string;
}
export declare function TestimonialCard({ author, text, href, className, }: TestimonialCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=component.d.ts.map