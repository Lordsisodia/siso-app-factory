import { TestimonialAuthor } from "@/components/7-social-proof/review-cards/testimonial-card";
interface TestimonialsSectionProps {
    title: string;
    description: string;
    testimonials: Array<{
        author: TestimonialAuthor;
        text: string;
        href?: string;
    }>;
    className?: string;
}
export declare function TestimonialsSection({ title, description, testimonials, className, }: TestimonialsSectionProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map