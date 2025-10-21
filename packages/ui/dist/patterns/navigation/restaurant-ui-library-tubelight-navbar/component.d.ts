import { LucideIcon } from "lucide-react";
interface NavItem {
    name: string;
    url: string;
    icon: LucideIcon;
}
interface NavBarProps {
    items: NavItem[];
    className?: string;
}
export declare function NavBar({ items, className }: NavBarProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map