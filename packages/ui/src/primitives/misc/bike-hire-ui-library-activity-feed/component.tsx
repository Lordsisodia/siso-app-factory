import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

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

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  title = 'Recent Activity',
  getActivityColor,
  getActivityIcon,
  onViewAll,
  viewAllText = 'View All Activity',
  maxItems,
  className = ''
}) => {
  const displayActivities = maxItems ? activities.slice(0, maxItems) : activities;

  const defaultGetColor = (type: string) => {
    const colors: Record<string, string> = {
      booking: 'bg-blue-100 text-blue-600',
      return: 'bg-green-100 text-green-600',
      user: 'bg-purple-100 text-purple-600',
      payment: 'bg-amber-100 text-amber-600',
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  };

  const colorFn = getActivityColor || defaultGetColor;

  return (
    <Card className={`col-span-full lg:col-span-1 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-2">
          {displayActivities.map(activity => (
            <div
              key={activity.id}
              className="flex items-start p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className={`p-2 rounded-full mr-3 ${colorFn(activity.type)}`}>
                {activity.icon || getActivityIcon?.(activity.type) || (
                  <div className="h-5 w-5 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-current" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
        {onViewAll && (
          <div className="pt-3 mt-2 text-center border-t">
            <button
              onClick={onViewAll}
              className="text-xs text-primary font-medium hover:underline"
            >
              {viewAllText}
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
