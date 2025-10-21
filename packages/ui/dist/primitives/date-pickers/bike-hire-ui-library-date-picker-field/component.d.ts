import React from 'react';
export interface DatePickerFieldProps {
    id: string;
    label: string;
    date: Date | undefined;
    setDate: (date: Date | undefined) => void;
    minDate?: Date;
    maxDate?: Date;
    className?: string;
    disabledDates?: (date: Date) => boolean;
    placeholder?: string;
    required?: boolean;
    error?: string;
}
export declare const DatePickerField: React.FC<DatePickerFieldProps>;
export default DatePickerField;
//# sourceMappingURL=component.d.ts.map