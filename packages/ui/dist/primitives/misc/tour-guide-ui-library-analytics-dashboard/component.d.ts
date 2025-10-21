import { RevenueData, ActivityPerformance, UserAnalytics, BookingTrends } from "@/actions/db/analytics-actions";
interface AnalyticsDashboardProps {
    revenueData: RevenueData[];
    activityPerformance: ActivityPerformance[];
    userAnalytics?: UserAnalytics;
    bookingTrends?: BookingTrends;
}
export default function AnalyticsDashboard({ revenueData, activityPerformance, userAnalytics, bookingTrends }: AnalyticsDashboardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map