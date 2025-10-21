import React from 'react';
export interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    description?: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    iconColor?: string;
    className?: string;
}
export declare const StatCard: React.FC<StatCardProps>;
export default StatCard;
//# sourceMappingURL=component.d.ts.map