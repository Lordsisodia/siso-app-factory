import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Loader2, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
export const ProductAvailabilityManager = ({ productId, productName, fetchUnavailablePeriods, onMarkUnavailable, onRemovePeriod, reasonOptions = ['maintenance', 'repair', 'reserved', 'other'], customReasonLabel = 'Custom Reason', className = '' }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [unavailablePeriods, setUnavailablePeriods] = useState([]);
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);
    const [reason, setReason] = useState(reasonOptions[0]);
    const [customReason, setCustomReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        loadAvailability();
    }, [productId]);
    const loadAvailability = async () => {
        setIsLoading(true);
        try {
            const data = await fetchUnavailablePeriods(productId);
            setUnavailablePeriods(data);
        }
        catch (error) {
            console.error('Error loading availability:', error);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleAddUnavailability = async () => {
        if (!startDate || !endDate)
            return;
        setIsSubmitting(true);
        try {
            const finalReason = reason === 'other' ? customReason : reason;
            await onMarkUnavailable(productId, startDate, endDate, finalReason);
            await loadAvailability();
            // Reset form
            setStartDate(undefined);
            setEndDate(undefined);
            setReason(reasonOptions[0]);
            setCustomReason('');
        }
        catch (error) {
            console.error('Error marking unavailable:', error);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const isDateDisabled = (date) => {
        return unavailablePeriods.some(period => {
            const start = new Date(period.startDate);
            const end = new Date(period.endDate);
            return date >= start && date <= end;
        });
    };
    return (_jsxs(Card, { className: className, children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { children: ["Availability Management: ", productName] }), _jsx(CardDescription, { children: "Manage when this product is unavailable for booking" })] }), _jsx(CardContent, { children: isLoading ? (_jsx("div", { className: "flex justify-center my-8", children: _jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }) })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-sm font-semibold mb-2", children: "Unavailable Periods" }), unavailablePeriods.length === 0 ? (_jsx("p", { className: "text-sm text-muted-foreground", children: "No unavailable periods." })) : (_jsx("div", { className: "space-y-2", children: unavailablePeriods.map((period, index) => (_jsxs("div", { className: "flex items-center justify-between p-2 bg-secondary rounded-md", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-sm font-medium", children: [format(new Date(period.startDate), 'MMM dd, yyyy'), " - ", format(new Date(period.endDate), 'MMM dd, yyyy')] }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["Reason: ", period.reason] })] }), onRemovePeriod && period.id && (_jsx(Button, { variant: "ghost", size: "sm", className: "h-8 w-8 p-0", onClick: () => onRemovePeriod(period.id), children: _jsx(X, { className: "h-4 w-4" }) }))] }, period.id || index))) }))] }), _jsxs("div", { className: "border rounded-md p-4", children: [_jsx("h3", { className: "text-sm font-semibold mb-4", children: "Add Unavailable Period" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Start Date" }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: cn("w-full justify-start text-left", !startDate && "text-muted-foreground"), children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), startDate ? format(startDate, 'PPP') : 'Select date'] }) }), _jsx(PopoverContent, { className: "w-auto p-0", children: _jsx(Calendar, { mode: "single", selected: startDate, onSelect: setStartDate, disabled: (date) => date < new Date() || isDateDisabled(date) }) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "End Date" }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: cn("w-full justify-start text-left", !endDate && "text-muted-foreground"), children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), endDate ? format(endDate, 'PPP') : 'Select date'] }) }), _jsx(PopoverContent, { className: "w-auto p-0", children: _jsx(Calendar, { mode: "single", selected: endDate, onSelect: setEndDate, disabled: (date) => (startDate ? date < startDate : date < new Date()) || isDateDisabled(date) }) })] })] }), _jsxs("div", { className: "space-y-2 md:col-span-2", children: [_jsx(Label, { children: "Reason" }), _jsxs(Select, { value: reason, onValueChange: setReason, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: reasonOptions.map(opt => (_jsx(SelectItem, { value: opt, children: opt.charAt(0).toUpperCase() + opt.slice(1) }, opt))) })] })] }), reason === 'other' && (_jsxs("div", { className: "space-y-2 md:col-span-2", children: [_jsx(Label, { children: customReasonLabel }), _jsx(Input, { placeholder: "Enter reason", value: customReason, onChange: (e) => setCustomReason(e.target.value) })] })), _jsx(Button, { className: "mt-2 md:col-span-2", onClick: handleAddUnavailability, disabled: isSubmitting || !startDate || !endDate || (reason === 'other' && !customReason), children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Saving..."] })) : ('Mark As Unavailable') })] })] })] })) })] }));
};
export default ProductAvailabilityManager;
//# sourceMappingURL=component.js.map