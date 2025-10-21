import React from 'react';
export interface PageHeroProps {
    heading: string;
    description?: string;
    badge?: string;
    backgroundPattern?: 'grid' | 'dots' | 'waves' | 'none';
    backgroundColor?: string;
    className?: string;
}
export declare const PageHero: React.FC<PageHeroProps>;
export default PageHero;
//# sourceMappingURL=component.d.ts.map