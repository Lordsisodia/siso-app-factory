import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export interface Reservation {
  id: string | number;
  customerName: string;
  productName: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
}

export interface UpcomingReservationsProps {
  reservations: Reservation[];
  title?: string;
  onViewAll?: () => void;
  viewAllText?: string;
  maxItems?: number;
  onReservationClick?: (reservation: Reservation) => void;
  className?: string;
}

export const UpcomingReservations: React.FC<UpcomingReservationsProps> = ({
  reservations,
  title = 'Upcoming Reservations',
  onViewAll,
  viewAllText = 'View All',
  maxItems,
  onReservationClick,
  className = ''
}) => {
  const displayReservations = maxItems ? reservations.slice(0, maxItems) : reservations;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      upcoming: 'bg-blue-100 text-blue-600',
      active: 'bg-green-100 text-green-600',
      completed: 'bg-gray-100 text-gray-600',
      cancelled: 'bg-red-100 text-red-600'
    };
    return variants[status] || 'bg-gray-100 text-gray-600';
  };

  return (
    <Card className={`col-span-full lg:col-span-2 ${className}`}>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs text-primary font-medium hover:underline"
          >
            {viewAllText}
          </button>
        )}
      </CardHeader>
      <CardContent>
        {displayReservations.map(reservation => (
          <div
            key={reservation.id}
            className="flex items-start p-3 rounded-lg hover:bg-accent/50 transition-colors mb-3 cursor-pointer"
            onClick={() => onReservationClick?.(reservation)}
          >
            <div className="p-2 rounded-full mr-3 bg-primary/10 text-primary">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm font-medium">{reservation.customerName}</p>
                <Badge className={`text-xs ${getStatusBadge(reservation.status)}`}>
                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{reservation.productName}</p>
              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                <span>{reservation.startDate}</span>
                <span className="mx-2">→</span>
                <span>{reservation.endDate}</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingReservations;
