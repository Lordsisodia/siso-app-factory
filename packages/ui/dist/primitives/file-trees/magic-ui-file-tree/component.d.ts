import React from "react";
type TreeViewElement = {
    id: string;
    name: string;
    isSelectable?: boolean;
    children?: TreeViewElement[];
};
declare const Tree: React.ForwardRefExoticComponent<{
    initialSelectedId?: string;
    indicator?: boolean;
    elements?: TreeViewElement[];
    initialExpandedItems?: string[];
    openIcon?: React.ReactNode;
    closeIcon?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const Folder: React.ForwardRefExoticComponent<any>;
declare const File: React.ForwardRefExoticComponent<{
    value: string;
    handleSelect?: (id: string) => void;
    isSelectable?: boolean;
    isSelect?: boolean;
    fileIcon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
declare const CollapseButton: React.ForwardRefExoticComponent<{
    elements: TreeViewElement[];
    expandAll?: boolean;
} & React.HTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
export { CollapseButton, File, Folder, Tree, type TreeViewElement };
//# sourceMappingURL=component.d.ts.map