import { jsx as _jsx } from "react/jsx-runtime";
import { StatCard } from '../../cards/StatCard';
export const StatsGrid = ({ stats, columns = 4, className = '' }) => {
    const gridCols = {
        2: 'sm:grid-cols-2 lg:grid-cols-2',
        3: 'sm:grid-cols-2 lg:grid-cols-3',
        4: 'sm:grid-cols-2 lg:grid-cols-4'
    }[columns];
    return (_jsx("div", { className: `grid grid-cols-1 ${gridCols} gap-6 ${className}`, children: stats.map((stat, index) => (_jsx(StatCard, { title: stat.title, value: stat.value, icon: stat.icon, description: stat.description, change: stat.change, trend: stat.trend, iconColor: stat.iconColor }, index))) }));
};
export default StatsGrid;
//# sourceMappingURL=component.js.map