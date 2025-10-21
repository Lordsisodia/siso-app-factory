interface BlogStats {
    totalPosts: number;
    published: number;
    drafts: number;
    totalViews: number;
    thisMonth: number;
    avgViews: number;
}
interface BlogHeaderProps {
    stats: BlogStats;
}
export default function BlogHeader({ stats }: BlogHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map