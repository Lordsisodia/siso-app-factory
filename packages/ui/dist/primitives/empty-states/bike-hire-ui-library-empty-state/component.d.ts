import React from 'react';
export interface EmptyStateProps {
    icon?: React.ReactNode;
    heading: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
        variant?: 'default' | 'outline' | 'ghost' | 'destructive';
    };
    className?: string;
}
export declare const EmptyState: React.FC<EmptyStateProps>;
export default EmptyState;
//# sourceMappingURL=component.d.ts.map