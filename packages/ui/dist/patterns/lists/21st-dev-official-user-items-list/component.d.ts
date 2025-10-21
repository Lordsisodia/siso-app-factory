type UserTab = "components" | "demos" | "bookmarks" | "purchased_bundles";
interface UserItemsListProps {
    className?: string;
    skeletonCount?: number;
    userId: string;
    tab: UserTab;
    isOwnProfile: boolean;
}
export declare function UserItemsList({ className, skeletonCount, userId, tab, isOwnProfile, }: UserItemsListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map