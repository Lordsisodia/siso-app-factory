import React from 'react';
export interface ProcessStep {
    icon: React.ReactNode;
    title: string;
    description: string;
}
export interface ProcessStepsProps {
    badge?: string;
    heading: string;
    description?: string;
    steps: ProcessStep[];
    ctaButton?: {
        label: string;
        href: string;
    };
    columns?: number;
    className?: string;
}
export declare const ProcessSteps: React.FC<ProcessStepsProps>;
export default ProcessSteps;
//# sourceMappingURL=component.d.ts.map