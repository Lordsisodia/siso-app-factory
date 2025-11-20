import React, { useState, useEffect } from 'react';
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

export interface UnavailablePeriod {
  id?: string;
  startDate: string;
  endDate: string;
  reason: string;
}

export interface ProductAvailabilityManagerProps {
  productId: string;
  productName: string;
  fetchUnavailablePeriods: (productId: string) => Promise<UnavailablePeriod[]>;
  onMarkUnavailable: (productId: string, start: Date, end: Date, reason: string) => Promise<void>;
  onRemovePeriod?: (periodId: string) => Promise<void>;
  reasonOptions?: string[];
  customReasonLabel?: string;
  className?: string;
}

export const ProductAvailabilityManager: React.FC<ProductAvailabilityManagerProps> = ({
  productId,
  productName,
  fetchUnavailablePeriods,
  onMarkUnavailable,
  onRemovePeriod,
  reasonOptions = ['maintenance', 'repair', 'reserved', 'other'],
  customReasonLabel = 'Custom Reason',
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [unavailablePeriods, setUnavailablePeriods] = useState<UnavailablePeriod[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
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
    } catch (error) {
      console.error('Error loading availability:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddUnavailability = async () => {
    if (!startDate || !endDate) return;

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
    } catch (error) {
      console.error('Error marking unavailable:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDateDisabled = (date: Date) => {
    return unavailablePeriods.some(period => {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      return date >= start && date <= end;
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Availability Management: {productName}</CardTitle>
        <CardDescription>Manage when this product is unavailable for booking</CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex justify-center my-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* List of unavailable periods */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">Unavailable Periods</h3>
              {unavailablePeriods.length === 0 ? (
                <p className="text-sm text-muted-foreground">No unavailable periods.</p>
              ) : (
                <div className="space-y-2">
                  {unavailablePeriods.map((period, index) => (
                    <div
                      key={period.id || index}
                      className="flex items-center justify-between p-2 bg-secondary rounded-md"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {format(new Date(period.startDate), 'MMM dd, yyyy')} - {format(new Date(period.endDate), 'MMM dd, yyyy')}
                        </p>
                        <p className="text-xs text-muted-foreground">Reason: {period.reason}</p>
                      </div>
                      {onRemovePeriod && period.id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => onRemovePeriod(period.id!)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form to add new period */}
            <div className="border rounded-md p-4">
              <h3 className="text-sm font-semibold mb-4">Add Unavailable Period</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Date */}
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date() || isDateDisabled(date)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, 'PPP') : 'Select date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) =>
                          (startDate ? date < startDate : date < new Date()) || isDateDisabled(date)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Reason */}
                <div className="space-y-2 md:col-span-2">
                  <Label>Reason</Label>
                  <Select value={reason} onValueChange={setReason}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {reasonOptions.map(opt => (
                        <SelectItem key={opt} value={opt}>
                          {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {reason === 'other' && (
                  <div className="space-y-2 md:col-span-2">
                    <Label>{customReasonLabel}</Label>
                    <Input
                      placeholder="Enter reason"
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                    />
                  </div>
                )}

                <Button
                  className="mt-2 md:col-span-2"
                  onClick={handleAddUnavailability}
                  disabled={isSubmitting || !startDate || !endDate || (reason === 'other' && !customReason)}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Mark As Unavailable'
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductAvailabilityManager;
