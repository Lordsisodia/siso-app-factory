
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@siso/ui';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@siso/ui';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { month: 'Jan', bookings: 25, revenue: 1200 },
  { month: 'Feb', bookings: 30, revenue: 1500 },
  { month: 'Mar', bookings: 35, revenue: 1800 },
  { month: 'Apr', bookings: 40, revenue: 2000 },
  { month: 'May', bookings: 50, revenue: 2500 },
  { month: 'Jun', bookings: 45, revenue: 2300 },
  { month: 'Jul', bookings: 55, revenue: 2800 },
  { month: 'Aug', bookings: 60, revenue: 3000 },
];

const chartConfig = {
  bookings: {
    label: 'Bookings',
    theme: {
      light: '#3b82f6',
      dark: '#60a5fa',
    },
  },
  revenue: {
    label: 'Revenue ($00s)',
    theme: {
      light: '#10b981',
      dark: '#34d399',
    },
  },
};

const BookingsChart: React.FC = () => {
  return (
    <Card className="col-span-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Bookings Overview</CardTitle>
        <div className="flex items-center space-x-2">
          <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            Weekly
          </button>
          <button className="text-xs text-muted-foreground px-2 py-1 rounded-full">
            Monthly
          </button>
          <button className="text-xs text-muted-foreground px-2 py-1 rounded-full">
            Yearly
          </button>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[300px]">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} vertical={false} />
                <XAxis
                  dataKey="month"
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
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="bookings"
                  name="bookings"
                  stackId="1"
                  stroke="var(--color-bookings)"
                  fill="var(--color-bookings)"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="revenue"
                  stackId="2"
                  stroke="var(--color-revenue)"
                  fill="var(--color-revenue)"
                  fillOpacity={0.2}
                />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingsChart;
