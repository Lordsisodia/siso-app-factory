import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

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

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  change,
  trend,
  iconColor = 'bg-primary/10 text-primary',
  className = ''
}) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
            {change && (
              <p className={`text-xs font-medium mt-2 flex items-center ${
                trend === 'up'
                  ? 'text-green-500'
                  : trend === 'down'
                    ? 'text-red-500'
                    : 'text-gray-500'
              }`}>
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {change}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${iconColor}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
