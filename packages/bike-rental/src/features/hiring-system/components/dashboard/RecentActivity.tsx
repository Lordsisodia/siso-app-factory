
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@siso/ui';
import { CalendarClock, ChevronRight, User } from 'lucide-react';

interface ActivityItem {
  id: number;
  title: string;
  description: string;
  time: string;
  type: 'booking' | 'return' | 'user' | 'payment';
}

const activities: ActivityItem[] = [
  {
    id: 1,
    title: 'New Booking',
    description: 'John Smith booked Tesla Model S',
    time: '2 hours ago',
    type: 'booking'
  },
  {
    id: 2,
    title: 'Car Returned',
    description: 'Ferrari F8 Tributo returned by Emma Wilson',
    time: '5 hours ago',
    type: 'return'
  },
  {
    id: 3,
    title: 'New Customer',
    description: 'David Johnson created an account',
    time: '1 day ago',
    type: 'user'
  },
  {
    id: 4,
    title: 'Payment Received',
    description: 'Michael Brown paid $1,250 for Lamborghini rental',
    time: '2 days ago',
    type: 'payment'
  },
];

const ActivityIcon: React.FC<{ type: ActivityItem['type'] }> = ({ type }) => {
  switch (type) {
    case 'booking':
    case 'return':
      return <CalendarClock className="h-5 w-5" />;
    case 'user':
      return <User className="h-5 w-5" />;
    case 'payment':
      return <div className="text-sm font-bold">$</div>;
    default:
      return <div className="h-2 w-2 rounded-full bg-current" />;
  }
};

const getActivityColor = (type: ActivityItem['type']) => {
  switch (type) {
    case 'booking':
      return 'bg-blue-100 text-blue-600';
    case 'return':
      return 'bg-green-100 text-green-600';
    case 'user':
      return 'bg-purple-100 text-purple-600';
    case 'payment':
      return 'bg-amber-100 text-amber-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

const RecentActivity: React.FC = () => {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-2">
          {activities.map(activity => (
            <div
              key={activity.id}
              className="flex items-start p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div className={`p-2 rounded-full mr-3 ${getActivityColor(activity.type)}`}>
                <ActivityIcon type={activity.type} />
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
        <div className="pt-3 mt-2 text-center border-t">
          <button className="text-xs text-primary font-medium hover:underline">
            View All Activity
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
