import React from 'react';
export interface SkeletonLoaderProps {
    variant?: 'card' | 'list' | 'detail' | 'text' | 'avatar' | 'custom';
    count?: number;
    className?: string;
    children?: React.ReactNode;
}
export declare const SkeletonLoader: React.FC<SkeletonLoaderProps>;
export default SkeletonLoader;
//# sourceMappingURL=component.d.ts.map