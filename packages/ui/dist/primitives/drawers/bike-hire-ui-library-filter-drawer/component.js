import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, } from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
export const FilterDrawer = ({ isOpen, setIsOpen, filterGroups, onFilterChange, onApply, onReset, applyButtonText = 'Apply Filters', resetButtonText = 'Reset', title = 'Filter Options' }) => {
    const handleApply = () => {
        if (onApply) {
            onApply();
        }
        setIsOpen(false);
    };
    const handleReset = () => {
        if (onReset) {
            onReset();
        }
    };
    return (_jsx(Drawer, { open: isOpen, onOpenChange: setIsOpen, children: _jsxs(DrawerContent, { children: [_jsx(DrawerHeader, { children: _jsx(DrawerTitle, { children: title }) }), _jsx("div", { className: "px-4 py-2 max-h-[60vh] overflow-y-auto", children: _jsx("div", { className: "space-y-6", children: filterGroups.map((group) => (_jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-3", children: group.title }), _jsx("div", { className: "space-y-2", children: group.options.map((option) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: option.id, checked: option.checked, onCheckedChange: (checked) => onFilterChange(group.id, option.value, checked) }), _jsx(Label, { htmlFor: option.id, className: "text-sm font-normal cursor-pointer", children: option.label })] }, option.id))) })] }, group.id))) }) }), _jsxs(DrawerFooter, { children: [_jsxs("div", { className: "flex gap-2 w-full", children: [onReset && (_jsx(Button, { variant: "outline", onClick: handleReset, className: "flex-1", children: resetButtonText })), _jsx(Button, { onClick: handleApply, className: "flex-1", children: applyButtonText })] }), _jsx(DrawerClose, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "w-full", children: "Cancel" }) })] })] }) }));
};
export default FilterDrawer;
//# sourceMappingURL=component.js.map