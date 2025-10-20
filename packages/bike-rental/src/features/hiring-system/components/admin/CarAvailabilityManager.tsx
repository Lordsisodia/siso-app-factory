
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@siso/ui';
import { Button } from '@siso/ui';
import { CalendarIcon, Loader2, X } from 'lucide-react';
import { Label } from '@siso/ui';
import { Input } from '@siso/ui';
import { useToast } from '@siso/ui/hooks/use-toast';
import { getCarAvailabilityCalendar, markCarUnavailable } from '../../utils/carUtils';
import { Popover, PopoverContent, PopoverTrigger } from '@siso/ui';
import { Calendar } from '@siso/ui';
import { format } from 'date-fns';
import { cn } from '@siso/ui/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@siso/ui';

interface CarAvailabilityManagerProps {
  carId: string;
  carName: string;
}

const CarAvailabilityManager: React.FC<CarAvailabilityManagerProps> = ({ carId, carName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [unavailablePeriods, setUnavailablePeriods] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [reason, setReason] = useState('maintenance');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadAvailability = async () => {
      setIsLoading(true);
      try {
        const data = await getCarAvailabilityCalendar(carId, new Date(), 6);
        setUnavailablePeriods(data);
      } catch (error) {
        console.error('Error loading car availability:', error);
        toast({
          title: 'Error',
          description: 'Could not load car availability data',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadAvailability();
  }, [carId, toast]);

  const handleAddUnavailability = async () => {
    if (!startDate || !endDate || !reason) {
      toast({
        title: 'Missing information',
        description: 'Please provide all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await markCarUnavailable(carId, startDate, endDate, reason);

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Car availability updated successfully',
        });

        // Refresh availability data
        const data = await getCarAvailabilityCalendar(carId, new Date(), 6);
        setUnavailablePeriods(data);

        // Reset form
        setStartDate(undefined);
        setEndDate(undefined);
        setReason('maintenance');
      } else {
        throw new Error('Failed to update car availability');
      }
    } catch (error) {
      console.error('Error updating car availability:', error);
      toast({
        title: 'Error',
        description: 'Could not update car availability',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDateDisabled = (date: Date) => {
    return unavailablePeriods.some(period => {
      const periodStart = new Date(period.startDate);
      const periodEnd = new Date(period.endDate);
      return date >= periodStart && date <= periodEnd;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability Management: {carName}</CardTitle>
        <CardDescription>Manage when this car is unavailable for booking</CardDescription>
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
                <p className="text-sm text-muted-foreground">No unavailable periods found.</p>
              ) : (
                <div className="space-y-2">
                  {unavailablePeriods.map((period, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-secondary rounded-md"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {format(new Date(period.startDate), 'MMM dd, yyyy')} - {format(new Date(period.endDate), 'MMM dd, yyyy')}
                        </p>
                        <p className="text-xs text-muted-foreground">Reason: {period.reason}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form to add new unavailable period */}
            <div className="border rounded-md p-4">
              <h3 className="text-sm font-semibold mb-4">Add Unavailable Period</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Date */}
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
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
                        {startDate ? format(startDate, 'PPP') : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        disabled={(date) => date < new Date() || isDateDisabled(date)}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
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
                        {endDate ? format(endDate, 'PPP') : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) =>
                          (startDate ? date < startDate : date < new Date()) ||
                          isDateDisabled(date)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Reason */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Select value={reason} onValueChange={setReason}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="repair">Repair</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {reason === 'other' && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="customReason">Custom Reason</Label>
                    <Input
                      id="customReason"
                      placeholder="Enter reason"
                      value={reason === 'other' ? '' : reason}
                      onChange={(e) => setReason(e.target.value)}
                    />
                  </div>
                )}

                <Button
                  className="mt-2 md:col-span-2"
                  onClick={handleAddUnavailability}
                  disabled={isSubmitting || !startDate || !endDate}
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

export default CarAvailabilityManager;
