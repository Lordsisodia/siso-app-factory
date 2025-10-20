
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@siso/ui';
import { CalendarDays, ChevronRight } from 'lucide-react';

interface Booking {
  id: number;
  customer: string;
  car: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
}

const bookings: Booking[] = [
  {
    id: 101,
    customer: 'Emma Wilson',
    car: 'Tesla Model S',
    startDate: '24 Aug 2023',
    endDate: '29 Aug 2023',
    status: 'upcoming'
  },
  {
    id: 102,
    customer: 'Michael Davis',
    car: 'BMW X5',
    startDate: '01 Sep 2023',
    endDate: '05 Sep 2023',
    status: 'upcoming'
  },
  {
    id: 103,
    customer: 'Sarah Johnson',
    car: 'Mercedes G-Wagon',
    startDate: '08 Sep 2023',
    endDate: '12 Sep 2023',
    status: 'upcoming'
  }
];

const UpcomingBookings: React.FC = () => {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">Upcoming Bookings</CardTitle>
        <button className="text-xs text-primary font-medium hover:underline">
          View All
        </button>
      </CardHeader>
      <CardContent>
        {bookings.map(booking => (
          <div
            key={booking.id}
            className="flex items-start p-3 rounded-lg hover:bg-accent/50 transition-colors mb-3 cursor-pointer"
          >
            <div className="p-2 rounded-full mr-3 bg-primary/10 text-primary">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm font-medium">{booking.customer}</p>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                  Upcoming
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{booking.car}</p>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <span>{booking.startDate}</span>
                <span className="mx-2">→</span>
                <span>{booking.endDate}</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingBookings;
