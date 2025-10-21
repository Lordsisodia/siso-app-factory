import React from 'react';
export interface ContactInfoItem {
    icon: React.ReactNode;
    title: string;
    details: string | string[];
}
export interface ContactInfoGridProps {
    contacts: ContactInfoItem[];
    animated?: boolean;
    className?: string;
}
export declare const ContactInfoGrid: React.FC<ContactInfoGridProps>;
export default ContactInfoGrid;
//# sourceMappingURL=component.d.ts.map