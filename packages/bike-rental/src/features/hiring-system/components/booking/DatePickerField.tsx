
import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@siso/ui/lib/utils';
import { Label } from '@siso/ui';
import { Button } from '@siso/ui';
import { Calendar } from '@siso/ui';
import { Popover, PopoverContent, PopoverTrigger } from '@siso/ui';

interface DatePickerFieldProps {
  id: string;
  label: string;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  minDate?: Date;
  className?: string;
  disabledDates?: (date: Date) => boolean;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  id,
  label,
  date,
  setDate,
  minDate,
  className,
  disabledDates
}) => {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal mt-2",
              !date && "text-muted-foreground"
            )}
            id={id}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Select date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            disabled={(currentDate) => {
              // First apply the standard min date check
              if (minDate ? currentDate < minDate : currentDate < new Date()) {
                return true;
              }
              // Then apply any custom disabled dates check
              return disabledDates ? disabledDates(currentDate) : false;
            }}
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerField;
