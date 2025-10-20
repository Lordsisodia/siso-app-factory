
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter } from '@siso/ui';
import { Button } from '@siso/ui';
import { Car } from '../../types';
import { useToast } from '../../hooks/use-toast';
import { createBooking } from '../../utils/dbUtils';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DatePickerField from './DatePickerField';
import UserInfoForm from './UserInfoForm';
import BookingSummary from './BookingSummary';
import { checkCarAvailability, getCarAvailabilityCalendar } from '../../utils/carUtils';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@siso/ui';

interface BookingModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ car, isOpen, onClose }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [unavailableDates, setUnavailableDates] = useState<Array<{ startDate: string; endDate: string; reason: string }>>([]);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Load availability calendar data when car changes
  useEffect(() => {
    if (car && isOpen) {
      const loadAvailabilityData = async () => {
        const calendar = await getCarAvailabilityCalendar(car.id);
        setUnavailableDates(calendar);
      };

      loadAvailabilityData();
    }
  }, [car, isOpen]);

  // Check availability when dates change
  useEffect(() => {
    if (car && startDate && endDate) {
      const checkAvailability = async () => {
        setIsCheckingAvailability(true);
        const result = await checkCarAvailability(car.id, startDate, endDate);
        setIsAvailable(result.success);
        setIsCheckingAvailability(false);

        if (!result.success) {
          toast({
            title: "Car not available",
            description: "The selected car is not available for these dates. Please choose different dates.",
            variant: "destructive",
          });
        }
      };

      checkAvailability();
    }
  }, [car, startDate, endDate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!car || !startDate || !endDate || !name || !email || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Final availability check before booking
    const available = await checkCarAvailability(car.id, startDate, endDate);
    if (!available) {
      toast({
        title: "Car not available",
        description: "This car is no longer available for the selected dates. Please choose different dates.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // If user is not logged in, redirect to auth page
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to complete your booking",
        });
        navigate('/auth', { state: { returnTo: window.location.pathname } });
        return;
      }

      // Calculate total price
      const totalPrice = calculateTotalPrice();

      // Create booking in database
      await createBooking(
        car.id,
        startDate,
        endDate,
        totalPrice,
        { name, email, phone }
      );

      toast({
        title: "Booking Confirmed",
        description: `Your booking for the ${car.brand} ${car.name} has been confirmed. Check your email for details.`,
      });

      // Reset form and close modal
      onClose();
      resetForm();

    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Booking failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setName('');
    setEmail('');
    setPhone('');
    setIsAvailable(true);
  };

  const calculateTotalPrice = () => {
    if (!car || !startDate || !endDate) return 0;

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return car.dailyRate * (days > 0 ? days : 1);
  };

  // Function to determine if a date should be disabled based on unavailability data
  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(period => {
      const periodStart = new Date(period.startDate);
      const periodEnd = new Date(period.endDate);
      return date >= periodStart && date <= periodEnd;
    });
  };

  if (!car) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden animate-scale-up">
        <div className="h-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10" />
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-6 z-20">
            <h3 className="text-white text-xl font-semibold">{car.brand} {car.name}</h3>
            <p className="text-white/90 text-sm">${car.dailyRate} per day</p>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6 mb-6">
              {/* Date picker fields */}
              <DatePickerField
                id="startDate"
                label="Pick-up Date"
                date={startDate}
                setDate={setStartDate}
                className="col-span-2 sm:col-span-1"
                disabledDates={isDateUnavailable}
              />

              <DatePickerField
                id="endDate"
                label="Return Date"
                date={endDate}
                setDate={setEndDate}
                minDate={startDate}
                className="col-span-2 sm:col-span-1"
                disabledDates={isDateUnavailable}
              />

              {/* Show warning if car isn't available */}
              {!isAvailable && (
                <Alert variant="destructive" className="col-span-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Not Available</AlertTitle>
                  <AlertDescription>
                    This car is not available for the selected dates. Please choose different dates.
                  </AlertDescription>
                </Alert>
              )}

              {/* User info form */}
              <UserInfoForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
              />
            </div>

            {/* Booking summary */}
            {startDate && endDate && (
              <BookingSummary
                startDate={startDate}
                endDate={endDate}
                dailyRate={car.dailyRate}
              />
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="mr-2"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  isLoading ||
                  isCheckingAvailability ||
                  !isAvailable ||
                  !startDate ||
                  !endDate ||
                  !name ||
                  !email ||
                  !phone
                }
                className="bg-primary text-primary-foreground"
              >
                {isLoading ? "Processing..." : isCheckingAvailability ? "Checking Availability..." : "Confirm Booking"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
