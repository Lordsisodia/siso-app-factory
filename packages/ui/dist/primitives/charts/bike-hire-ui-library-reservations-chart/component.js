import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, } from 'recharts';
export const ReservationsChart = ({ data, title = 'Reservations Overview', dataKeys, periodButtons, height = 300, className = '' }) => {
    // Create chart config from dataKeys
    const chartConfig = dataKeys.reduce((config, { key, label, color }) => ({
        ...config,
        [key]: {
            label,
            theme: {
                light: color,
                dark: color,
            },
        },
    }), {});
    return (_jsxs(Card, { className: `col-span-full ${className}`, children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between pb-2", children: [_jsx(CardTitle, { className: "text-base font-medium", children: title }), periodButtons && periodButtons.length > 0 && (_jsx("div", { className: "flex items-center space-x-2", children: periodButtons.map((btn, index) => (_jsx("button", { onClick: btn.onClick, className: `text-xs px-2 py-1 rounded-full ${btn.active
                                ? 'bg-primary/10 text-primary'
                                : 'text-muted-foreground hover:bg-muted'}`, children: btn.label }, index))) }))] }), _jsx(CardContent, { className: "pb-4", children: _jsx("div", { style: { height: `${height}px` }, children: _jsx(ChartContainer, { config: chartConfig, children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: data, margin: { top: 5, right: 5, left: 5, bottom: 5 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", strokeOpacity: 0.2, vertical: false }), _jsx(XAxis, { dataKey: "name", axisLine: false, tickLine: false, tickMargin: 10, fontSize: 12 }), _jsx(YAxis, { axisLine: false, tickLine: false, tickMargin: 10, fontSize: 12 }), _jsx(ChartTooltip, { content: _jsx(ChartTooltipContent, {}) }), dataKeys.map(({ key }) => (_jsx(Area, { type: "monotone", dataKey: key, name: key, stroke: `var(--color-${key})`, fill: `var(--color-${key})`, fillOpacity: 0.2 }, key))), _jsx(ChartLegend, { content: _jsx(ChartLegendContent, {}) })] }) }) }) }) })] }));
};
export default ReservationsChart;
//# sourceMappingURL=component.js.map