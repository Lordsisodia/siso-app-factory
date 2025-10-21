import { DemoWithComponent, SortOption } from "@/types/global";
interface BaseListProps {
    className?: string;
    skeletonCount?: number;
    initialData?: DemoWithComponent[];
}
interface MainListProps extends BaseListProps {
    type: "main";
    sortBy: SortOption;
    tagSlug?: string;
}
interface TagListProps extends BaseListProps {
    type: "tag";
    tagSlug: string;
    sortBy: SortOption;
}
interface UserListProps extends BaseListProps {
    type: "user";
    userId: string;
    tab: "published" | "hunted" | "demos" | "liked";
}
interface SearchListProps extends BaseListProps {
    type: "search";
    query: string;
    sortBy: SortOption;
}
interface CollectionListProps extends BaseListProps {
    type: "collection";
    collectionId: string;
    sortBy: SortOption;
}
type ComponentsListProps = MainListProps | TagListProps | UserListProps | SearchListProps | CollectionListProps;
export declare function ComponentsList({ className, skeletonCount, initialData, ...props }: ComponentsListProps): import("react/jsx-runtime").JSX.Element;
export default ComponentsList;
//# sourceMappingURL=component.d.ts.map