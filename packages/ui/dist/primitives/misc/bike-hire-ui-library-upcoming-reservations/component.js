import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarDays, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
export const UpcomingReservations = ({ reservations, title = 'Upcoming Reservations', onViewAll, viewAllText = 'View All', maxItems, onReservationClick, className = '' }) => {
    const displayReservations = maxItems ? reservations.slice(0, maxItems) : reservations;
    const getStatusBadge = (status) => {
        const variants = {
            upcoming: 'bg-blue-100 text-blue-600',
            active: 'bg-green-100 text-green-600',
            completed: 'bg-gray-100 text-gray-600',
            cancelled: 'bg-red-100 text-red-600'
        };
        return variants[status] || 'bg-gray-100 text-gray-600';
    };
    return (_jsxs(Card, { className: `col-span-full lg:col-span-2 ${className}`, children: [_jsxs(CardHeader, { className: "pb-2 flex flex-row items-center justify-between", children: [_jsx(CardTitle, { className: "text-base font-medium", children: title }), onViewAll && (_jsx("button", { onClick: onViewAll, className: "text-xs text-primary font-medium hover:underline", children: viewAllText }))] }), _jsx(CardContent, { children: displayReservations.map(reservation => (_jsxs("div", { className: "flex items-start p-3 rounded-lg hover:bg-accent/50 transition-colors mb-3 cursor-pointer", onClick: () => onReservationClick?.(reservation), children: [_jsx("div", { className: "p-2 rounded-full mr-3 bg-primary/10 text-primary", children: _jsx(CalendarDays, { className: "h-5 w-5" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("p", { className: "text-sm font-medium", children: reservation.customerName }), _jsx(Badge, { className: `text-xs ${getStatusBadge(reservation.status)}`, children: reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1) })] }), _jsx("p", { className: "text-xs text-muted-foreground", children: reservation.productName }), _jsxs("div", { className: "flex items-center mt-1 text-xs text-muted-foreground", children: [_jsx("span", { children: reservation.startDate }), _jsx("span", { className: "mx-2", children: "\u2192" }), _jsx("span", { children: reservation.endDate })] })] }), _jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })] }, reservation.id))) })] }));
};
export default UpcomingReservations;
//# sourceMappingURL=component.js.map