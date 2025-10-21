import { ExtendedDemoWithComponent } from "@/lib/utils/transformData";
interface DemosTableProps {
    demos: ExtendedDemoWithComponent[];
    onEdit?: (demo: ExtendedDemoWithComponent) => void;
    onOpenSandbox?: (shortSandboxId: string) => void;
    onUpdateVisibility?: (componentId: number, isPrivate: boolean) => Promise<void>;
    isOwnProfile?: boolean;
}
export declare function DemosTable({ demos, onEdit, onOpenSandbox, onUpdateVisibility, isOwnProfile, }: DemosTableProps): import("react/jsx-runtime").JSX.Element;
export declare const ComponentsTable: typeof DemosTable;
export {};
//# sourceMappingURL=component.d.ts.map