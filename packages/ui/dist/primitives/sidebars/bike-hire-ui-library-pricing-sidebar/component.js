import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
export const PricingSidebar = ({ price, priceLabel = 'per day', currency = '$', additionalFees = [], onBook, bookButtonText = 'Check Availability', disclaimer, sticky = true, className = '' }) => {
    const total = price + additionalFees.reduce((sum, fee) => sum + fee.amount, 0);
    return (_jsxs(Card, { className: `p-6 ${sticky ? 'sticky top-20' : ''} ${className}`, children: [_jsx("h3", { className: "text-xl font-semibold mb-4", children: "Ready to Book?" }), _jsxs("div", { className: "space-y-4 mb-6", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: "Daily Rate" }), _jsxs("span", { className: "font-medium", children: [currency, price] })] }), additionalFees.map((fee, index) => (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-muted-foreground", children: fee.label }), _jsxs("span", { className: "font-medium", children: [currency, fee.amount] })] }, index))), _jsxs("div", { className: "border-t pt-2", children: [_jsxs("div", { className: "flex justify-between font-semibold", children: [_jsx("span", { children: "Starting From" }), _jsxs("span", { className: "text-primary", children: [currency, total, "/", priceLabel] })] }), disclaimer && (_jsx("p", { className: "text-xs text-muted-foreground mt-1", children: disclaimer }))] })] }), _jsxs(Button, { className: "w-full", onClick: onBook, children: [_jsx(Calendar, { className: "w-4 h-4 mr-2" }), bookButtonText] })] }));
};
export default PricingSidebar;
//# sourceMappingURL=component.js.map