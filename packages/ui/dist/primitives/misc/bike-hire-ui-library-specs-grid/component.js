import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const SpecsGrid = ({ specs, columns = 3, title, cardClassName = 'bg-muted/30', className = '' }) => {
    const gridCols = {
        2: 'grid-cols-2',
        3: 'grid-cols-2 md:grid-cols-3',
        4: 'grid-cols-2 md:grid-cols-4'
    }[columns];
    return (_jsxs("div", { className: className, children: [title && (_jsx("h2", { className: "text-2xl font-semibold mb-4", children: title })), _jsx("div", { className: `grid ${gridCols} gap-4`, children: specs.map((spec, index) => (_jsxs("div", { className: `${cardClassName} p-4 rounded-lg`, children: [spec.icon && (_jsx("div", { className: "mb-2", children: spec.icon })), _jsx("h3", { className: "text-sm font-medium text-muted-foreground", children: spec.label }), _jsx("p", { className: "font-medium text-lg", children: spec.value })] }, index))) })] }));
};
export default SpecsGrid;
//# sourceMappingURL=component.js.map