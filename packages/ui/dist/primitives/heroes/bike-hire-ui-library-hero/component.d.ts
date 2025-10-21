import React from 'react';
export interface HeroImage {
    url: string;
    alt: string;
}
export interface HeroButton {
    label: string;
    href: string;
    variant?: 'primary' | 'secondary';
}
export interface HeroProps {
    images: HeroImage[];
    badge?: string;
    heading: string;
    subheading: string;
    buttons?: HeroButton[];
    autoPlayInterval?: number;
    showIndicators?: boolean;
    className?: string;
}
export declare const Hero: React.FC<HeroProps>;
export default Hero;
//# sourceMappingURL=component.d.ts.map