import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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

export const DatePickerField: React.FC<DatePickerFieldProps> = ({
  id,
  label,
  date,
  setDate,
  minDate,
  maxDate,
  className,
  disabledDates,
  placeholder = 'Select date',
  required = false,
  error
}) => {
  return (
    <div className={className}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal mt-2",
              !date && "text-muted-foreground",
              error && "border-destructive"
            )}
            id={id}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            disabled={(currentDate) => {
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
            }}
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  );
};

export default DatePickerField;
