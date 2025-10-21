import React from 'react';
export interface FilterOption {
    id: string;
    label: string;
    value: string;
    checked?: boolean;
}
export interface FilterGroup {
    id: string;
    title: string;
    options: FilterOption[];
    type?: 'checkbox' | 'radio';
}
export interface FilterDrawerProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    filterGroups: FilterGroup[];
    onFilterChange: (groupId: string, optionValue: string, checked: boolean) => void;
    onApply?: () => void;
    onReset?: () => void;
    applyButtonText?: string;
    resetButtonText?: string;
    title?: string;
}
export declare const FilterDrawer: React.FC<FilterDrawerProps>;
export default FilterDrawer;
//# sourceMappingURL=component.d.ts.map