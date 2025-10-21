import React from 'react';
export interface ChartDataPoint {
    name: string;
    [key: string]: string | number;
}
export interface ReservationsChartProps {
    data: ChartDataPoint[];
    title?: string;
    dataKeys: Array<{
        key: string;
        label: string;
        color: string;
    }>;
    periodButtons?: Array<{
        label: string;
        value: string;
        active?: boolean;
        onClick: () => void;
    }>;
    height?: number;
    className?: string;
}
export declare const ReservationsChart: React.FC<ReservationsChartProps>;
export default ReservationsChart;
//# sourceMappingURL=component.d.ts.map