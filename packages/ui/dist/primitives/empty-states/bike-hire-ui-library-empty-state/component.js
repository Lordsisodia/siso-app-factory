import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '@/components/ui/button';
export const EmptyState = ({ icon, heading, description, action, className = '' }) => {
    return (_jsxs("div", { className: `flex flex-col items-center justify-center p-12 text-center ${className}`, children: [icon && (_jsx("div", { className: "mb-6 text-muted-foreground", children: icon })), _jsx("h2", { className: "text-2xl font-bold mb-2", children: heading }), description && (_jsx("p", { className: "text-muted-foreground mb-6 max-w-md", children: description })), action && (_jsx(Button, { onClick: action.onClick, variant: action.variant || 'default', children: action.label }))] }));
};
export default EmptyState;
//# sourceMappingURL=component.js.map