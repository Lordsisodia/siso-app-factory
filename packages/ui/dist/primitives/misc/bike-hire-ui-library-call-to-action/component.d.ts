import React from 'react';
export interface CallToActionProps {
    heading: string;
    description?: string;
    buttonLabel: string;
    buttonHref: string;
    backgroundPattern?: 'grid' | 'dots' | 'none';
    backgroundColor?: string;
    className?: string;
}
export declare const CallToAction: React.FC<CallToActionProps>;
export default CallToAction;
//# sourceMappingURL=component.d.ts.map