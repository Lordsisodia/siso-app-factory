import React from 'react';
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
export declare const UpcomingReservations: React.FC<UpcomingReservationsProps>;
export default UpcomingReservations;
//# sourceMappingURL=component.d.ts.map