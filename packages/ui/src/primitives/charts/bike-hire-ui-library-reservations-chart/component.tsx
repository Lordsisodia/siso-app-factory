import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

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

export const ReservationsChart: React.FC<ReservationsChartProps> = ({
  data,
  title = 'Reservations Overview',
  dataKeys,
  periodButtons,
  height = 300,
  className = ''
}) => {
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

  return (
    <Card className={`col-span-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        {periodButtons && periodButtons.length > 0 && (
          <div className="flex items-center space-x-2">
            {periodButtons.map((btn, index) => (
              <button
                key={index}
                onClick={btn.onClick}
                className={`text-xs px-2 py-1 rounded-full ${
                  btn.active
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="pb-4">
        <div style={{ height: `${height}px` }}>
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  fontSize={12}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickMargin={10}
                  fontSize={12}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                {dataKeys.map(({ key }) => (
                  <Area
                    key={key}
                    type="monotone"
                    dataKey={key}
                    name={key}
                    stroke={`var(--color-${key})`}
                    fill={`var(--color-${key})`}
                    fillOpacity={0.2}
                  />
                ))}
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationsChart;
