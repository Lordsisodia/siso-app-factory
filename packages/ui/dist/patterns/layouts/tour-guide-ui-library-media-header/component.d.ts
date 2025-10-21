interface MediaStats {
    totalFiles: number;
    totalSize: string;
    images: number;
    videos: number;
    recentUploads: number;
    storageUsed: number;
}
interface MediaHeaderProps {
    stats: MediaStats;
}
export default function MediaHeader({ stats }: MediaHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map