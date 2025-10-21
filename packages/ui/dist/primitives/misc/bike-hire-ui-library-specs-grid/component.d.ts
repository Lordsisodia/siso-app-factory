import React from 'react';
export interface Spec {
    icon?: React.ReactNode;
    label: string;
    value: string | number;
}
export interface SpecsGridProps {
    specs: Spec[];
    columns?: 2 | 3 | 4;
    title?: string;
    cardClassName?: string;
    className?: string;
}
export declare const SpecsGrid: React.FC<SpecsGridProps>;
export default SpecsGrid;
//# sourceMappingURL=component.d.ts.map