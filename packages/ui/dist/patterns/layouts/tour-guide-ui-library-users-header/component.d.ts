interface UserStats {
    total: number;
    active: number;
    inactive: number;
    premium: number;
    newThisMonth: number;
    totalBookings: number;
}
interface UsersHeaderProps {
    stats?: UserStats;
}
export default function UsersHeader({ stats }: UsersHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map