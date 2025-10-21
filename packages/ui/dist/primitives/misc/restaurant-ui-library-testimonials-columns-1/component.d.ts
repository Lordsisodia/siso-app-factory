export interface ColumnTestimonial {
    text: string;
    image: string;
    name: string;
    role: string;
}
export interface TestimonialsColumnProps {
    className?: string;
    testimonials: ColumnTestimonial[];
    duration?: number;
}
export declare function TestimonialsColumn({ className, testimonials, duration }: TestimonialsColumnProps): import("react/jsx-runtime").JSX.Element;
export interface TestimonialsColumnsShowcaseProps {
    testimonials: ColumnTestimonial[];
}
export declare function TestimonialsColumnsShowcase({ testimonials }: TestimonialsColumnsShowcaseProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=component.d.ts.map