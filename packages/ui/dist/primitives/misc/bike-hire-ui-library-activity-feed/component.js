import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
export const ActivityFeed = ({ activities, title = 'Recent Activity', getActivityColor, getActivityIcon, onViewAll, viewAllText = 'View All Activity', maxItems, className = '' }) => {
    const displayActivities = maxItems ? activities.slice(0, maxItems) : activities;
    const defaultGetColor = (type) => {
        const colors = {
            booking: 'bg-blue-100 text-blue-600',
            return: 'bg-green-100 text-green-600',
            user: 'bg-purple-100 text-purple-600',
            payment: 'bg-amber-100 text-amber-600',
        };
        return colors[type] || 'bg-gray-100 text-gray-600';
    };
    const colorFn = getActivityColor || defaultGetColor;
    return (_jsxs(Card, { className: `col-span-full lg:col-span-1 ${className}`, children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-base font-medium", children: title }) }), _jsxs(CardContent, { className: "px-2", children: [_jsx("div", { className: "space-y-2", children: displayActivities.map(activity => (_jsxs("div", { className: "flex items-start p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer", children: [_jsx("div", { className: `p-2 rounded-full mr-3 ${colorFn(activity.type)}`, children: activity.icon || getActivityIcon?.(activity.type) || (_jsx("div", { className: "h-5 w-5 flex items-center justify-center", children: _jsx("div", { className: "h-2 w-2 rounded-full bg-current" }) })) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium", children: activity.title }), _jsx("p", { className: "text-xs text-muted-foreground truncate", children: activity.description }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: activity.time })] }), _jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })] }, activity.id))) }), onViewAll && (_jsx("div", { className: "pt-3 mt-2 text-center border-t", children: _jsx("button", { onClick: onViewAll, className: "text-xs text-primary font-medium hover:underline", children: viewAllText }) }))] })] }));
};
export default ActivityFeed;
//# sourceMappingURL=component.js.map