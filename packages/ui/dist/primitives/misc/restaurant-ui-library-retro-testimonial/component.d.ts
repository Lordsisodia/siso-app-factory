import * as React from "react";
import { type ImageProps } from "next/image";
export interface Testimonial {
    name: string;
    designation: string;
    description: string;
    profileImage: string;
}
interface CarouselProps {
    items: React.ReactElement<TestimonialCardProps>[];
    initialScroll?: number;
}
export declare const Carousel: ({ items, initialScroll }: CarouselProps) => import("react/jsx-runtime").JSX.Element;
export interface TestimonialCardProps {
    testimonial: Testimonial;
    index: number;
    layout?: boolean;
    onCardClose?: () => void;
    backgroundImage?: string;
}
export declare const TestimonialCard: ({ testimonial, index, layout, onCardClose, backgroundImage, }: TestimonialCardProps) => import("react/jsx-runtime").JSX.Element;
export declare const ProfileImage: ({ className, alt, ...rest }: ImageProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map