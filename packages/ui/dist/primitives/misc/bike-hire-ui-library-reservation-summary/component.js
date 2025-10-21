import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ReservationSummary = ({ startDate, endDate, pricePerDay, currency = '$', calculateTotal, additionalFees = [], showDuration = true, className = '' }) => {
    if (!startDate || !endDate)
        return null;
    const calculateDays = () => {
        return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    };
    const calculatePrice = () => {
        const days = calculateDays();
        if (calculateTotal) {
            return calculateTotal(days, pricePerDay);
        }
        return pricePerDay * (days > 0 ? days : 1);
    };
    const additionalFeesTotal = additionalFees.reduce((sum, fee) => sum + fee.amount, 0);
    const subtotal = calculatePrice();
    const grandTotal = subtotal + additionalFeesTotal;
    return (_jsx("div", { className: `bg-secondary p-4 rounded-lg ${className}`, children: _jsxs("div", { className: "space-y-3", children: [showDuration && (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Duration" }), _jsxs("p", { className: "text-lg font-medium", children: [calculateDays(), " days"] })] })), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Daily Rate" }), _jsxs("p", { className: "font-medium", children: [currency, pricePerDay] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("p", { className: "text-sm text-muted-foreground", children: ["Subtotal (", calculateDays(), " days)"] }), _jsxs("p", { className: "font-medium", children: [currency, subtotal] })] }), additionalFees.map((fee, index) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: fee.label }), _jsxs("p", { className: "font-medium", children: [currency, fee.amount] })] }, index))), additionalFees.length > 0 && (_jsx("div", { className: "border-t pt-3", children: _jsxs("div", { className: "flex justify-between items-center font-semibold", children: [_jsx("p", { children: "Total" }), _jsxs("p", { className: "text-xl text-primary", children: [currency, grandTotal] })] }) })), !additionalFees.length && (_jsx("div", { className: "border-t pt-3", children: _jsxs("div", { className: "flex justify-between items-center font-semibold", children: [_jsx("p", { children: "Total Price" }), _jsxs("p", { className: "text-xl text-primary", children: [currency, subtotal] })] }) }))] }) }));
};
export default ReservationSummary;
//# sourceMappingURL=component.js.map