
import React from 'react';
import { Card, CardContent } from '@siso/ui';
import { Calendar, Car, DollarSign, Users } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description, change, trend }) => {
  return (
    <Card className="overflow-hidden">
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
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Bookings"
        value="124"
        icon={<Calendar className="h-5 w-5" />}
        change="12% from last month"
        trend="up"
      />
      <StatCard
        title="Active Rentals"
        value="18"
        icon={<Car className="h-5 w-5" />}
        change="5% from last week"
        trend="up"
      />
      <StatCard
        title="Available Cars"
        value="27"
        icon={<Car className="h-5 w-5" />}
        description="Out of 45 total"
      />
      <StatCard
        title="Total Revenue"
        value="$28,459"
        icon={<DollarSign className="h-5 w-5" />}
        change="8% from last month"
        trend="up"
      />
    </div>
  );
};

export default DashboardStats;
