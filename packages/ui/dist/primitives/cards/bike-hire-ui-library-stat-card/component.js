import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from '@/components/ui/card';
export const StatCard = ({ title, value, icon, description, change, trend, iconColor = 'bg-primary/10 text-primary', className = '' }) => {
    return (_jsx(Card, { className: `overflow-hidden ${className}`, children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-muted-foreground", children: title }), _jsx("h3", { className: "text-2xl font-bold mt-1", children: value }), description && (_jsx("p", { className: "text-xs text-muted-foreground mt-1", children: description })), change && (_jsxs("p", { className: `text-xs font-medium mt-2 flex items-center ${trend === 'up'
                                    ? 'text-green-500'
                                    : trend === 'down'
                                        ? 'text-red-500'
                                        : 'text-gray-500'}`, children: [trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•', " ", change] }))] }), _jsx("div", { className: `p-3 rounded-full ${iconColor}`, children: icon })] }) }) }));
};
export default StatCard;
//# sourceMappingURL=component.js.map