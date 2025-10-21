export interface SortableColumn {
    key: string;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: any) => React.ReactNode;
    width?: string;
}
export interface SortableTableProps<T> {
    columns: SortableColumn[];
    data: T[];
    defaultSort?: {
        key: string;
        direction: "asc" | "desc";
    };
    className?: string;
    rowClassName?: (row: T) => string;
    onRowClick?: (row: T) => void;
}
export default function SortableTable<T extends Record<string, any>>({ columns, data, defaultSort, className, rowClassName, onRowClick }: SortableTableProps<T>): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=component.d.ts.map