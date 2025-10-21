import React from 'react';
export interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
}
export interface FeatureGridProps {
    badge?: string;
    heading: string;
    description?: string;
    features: Feature[];
    columns?: 2 | 3 | 4;
    backgroundColor?: 'primary' | 'secondary' | 'background';
    className?: string;
}
export declare const FeatureGrid: React.FC<FeatureGridProps>;
export default FeatureGrid;
//# sourceMappingURL=component.d.ts.map