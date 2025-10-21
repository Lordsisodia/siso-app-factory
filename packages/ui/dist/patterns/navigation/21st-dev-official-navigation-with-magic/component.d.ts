export type NavigationItem = {
    title: string;
    href: string;
    isNew?: boolean;
    demoId?: number;
    demosCount?: number;
    externalLink?: boolean;
};
export type NavigationCategory = {
    title: string;
    icon: any;
    items: NavigationItem[];
    isNew?: boolean;
};
export declare function useFilteredNavigation(): NavigationCategory[];
//# sourceMappingURL=component.d.ts.map