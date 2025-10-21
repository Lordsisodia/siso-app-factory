import React from 'react';
export interface Stat {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    description?: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    iconColor?: string;
}
export interface StatsGridProps {
    stats: Stat[];
    columns?: 2 | 3 | 4;
    className?: string;
}
export declare const StatsGrid: React.FC<StatsGridProps>;
export default StatsGrid;
//# sourceMappingURL=component.d.ts.map