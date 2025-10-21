import { LucideIcon } from "lucide-react";
interface Tab {
    title: string;
    icon: LucideIcon;
    type?: never;
}
interface Separator {
    type: "separator";
    title?: never;
    icon?: never;
}
type TabItem = Tab | Separator;
interface ExpandableTabsProps {
    tabs: TabItem[];
    className?: string;
    activeColor?: string;
    onChange?: (index: number | null) => void;
}
export declare function ExpandableTabs({ tabs, className, activeColor, onChange, }: ExpandableTabsProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map