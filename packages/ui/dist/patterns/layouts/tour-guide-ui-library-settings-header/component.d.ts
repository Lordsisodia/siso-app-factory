interface SystemStats {
    activeSettings: number;
    recentChanges: number;
    systemHealth: number;
    lastBackup: string;
    totalUsers: number;
    storageUsed: number;
}
interface SettingsHeaderProps {
    stats: SystemStats;
}
export default function SettingsHeader({ stats }: SettingsHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map