import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
export const DatePickerField = ({ id, label, date, setDate, minDate, maxDate, className, disabledDates, placeholder = 'Select date', required = false, error }) => {
    return (_jsxs("div", { className: className, children: [_jsxs(Label, { htmlFor: id, children: [label, required && _jsx("span", { className: "text-destructive ml-1", children: "*" })] }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: cn("w-full justify-start text-left font-normal mt-2", !date && "text-muted-foreground", error && "border-destructive"), id: id, children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), date ? format(date, "PPP") : _jsx("span", { children: placeholder })] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: _jsx(Calendar, { mode: "single", selected: date, onSelect: setDate, initialFocus: true, disabled: (currentDate) => {
                                // Apply min date check
                                if (minDate && currentDate < minDate) {
                                    return true;
                                }
                                // Apply max date check
                                if (maxDate && currentDate > maxDate) {
                                    return true;
                                }
                                // Apply custom disabled dates check
                                return disabledDates ? disabledDates(currentDate) : false;
                            }, className: "pointer-events-auto" }) })] }), error && (_jsx("p", { className: "text-sm text-destructive mt-1", children: error }))] }));
};
export default DatePickerField;
//# sourceMappingURL=component.js.map