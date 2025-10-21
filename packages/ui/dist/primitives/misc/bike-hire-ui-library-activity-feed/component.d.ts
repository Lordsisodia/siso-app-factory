import React from 'react';
export interface ActivityItem {
    id: string | number;
    title: string;
    description: string;
    time: string;
    type: string;
    icon?: React.ReactNode;
}
export interface ActivityFeedProps {
    activities: ActivityItem[];
    title?: string;
    getActivityColor?: (type: string) => string;
    getActivityIcon?: (type: string) => React.ReactNode;
    onViewAll?: () => void;
    viewAllText?: string;
    maxItems?: number;
    className?: string;
}
export declare const ActivityFeed: React.FC<ActivityFeedProps>;
export default ActivityFeed;
//# sourceMappingURL=component.d.ts.map