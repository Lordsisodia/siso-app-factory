import React from 'react';
export interface QuickLink {
    label: string;
    href: string;
}
export interface ContactInfo {
    address?: string;
    phone?: string;
    email?: string;
}
export interface SocialLinks {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    [key: string]: string | undefined;
}
export interface FooterProps {
    brandName?: string;
    brandDescription?: string;
    quickLinks?: QuickLink[];
    contactInfo?: ContactInfo;
    socialLinks?: SocialLinks;
    showNewsletter?: boolean;
    onNewsletterSubmit?: (email: string) => void;
    className?: string;
}
export declare const Footer: React.FC<FooterProps>;
export default Footer;
//# sourceMappingURL=component.d.ts.map