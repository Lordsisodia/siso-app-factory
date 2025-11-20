import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { DatePickerField } from '../../booking/DatePickerField';
import { UserInfoForm } from '../../forms/UserInfoForm';
import { ReservationSummary } from '../../cards/ReservationSummary';

export interface BookingModalProps<T = any> {
  product: T | null;
  isOpen: boolean;
  onClose: () => void;
  productImage: string;
  productTitle: string;
  productSubtitle?: string;
  dailyRate: number;
  onSubmit: (data: BookingData) => Promise<void>;
  checkAvailability?: (productId: string, startDate: Date, endDate: Date) => Promise<boolean>;
  getUnavailableDates?: (productId: string) => Promise<Array<{ startDate: string; endDate: string }>>;
  requireAuth?: boolean;
  onAuthRequired?: () => void;
  currency?: string;
}

export interface BookingData {
  product: any;
  startDate: Date;
  endDate: Date;
  name: string;
  email: string;
  phone: string;
  totalPrice: number;
}

export function BookingModal<T = any>({
  product,
  isOpen,
  onClose,
  productImage,
  productTitle,
  productSubtitle,
  dailyRate,
  onSubmit,
  checkAvailability,
  getUnavailableDates,
  requireAuth = false,
  onAuthRequired,
  currency = '$'
}: BookingModalProps<T>) {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [unavailableDates, setUnavailableDates] = useState<Array<{ startDate: string; endDate: string }>>([]);

  // Load unavailable dates
  useEffect(() => {
    if (product && isOpen && getUnavailableDates) {
      const loadDates = async () => {
        try {
          const dates = await getUnavailableDates((product as any).id);
          setUnavailableDates(dates);
        } catch (error) {
          console.error('Error loading unavailable dates:', error);
        }
      };
      loadDates();
    }
  }, [product, isOpen, getUnavailableDates]);

  // Check availability when dates change
  useEffect(() => {
    if (product && startDate && endDate && checkAvailability) {
      const check = async () => {
        setIsCheckingAvailability(true);
        try {
          const available = await checkAvailability((product as any).id, startDate, endDate);
          setIsAvailable(available);
        } catch (error) {
          console.error('Error checking availability:', error);
          setIsAvailable(false);
        } finally {
          setIsCheckingAvailability(false);
        }
      };
      check();
    }
  }, [product, startDate, endDate, checkAvailability]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product || !startDate || !endDate || !name || !email || !phone) {
      return;
    }

    if (requireAuth && onAuthRequired) {
      onAuthRequired();
      return;
    }

    setIsLoading(true);

    try {
      const totalPrice = calculateTotalPrice();

      await onSubmit({
        product,
        startDate,
        endDate,
        name,
        email,
        phone,
        totalPrice
      });

      onClose();
      resetForm();
    } catch (error) {
      console.error('Error submitting booking:', error);
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
    if (!startDate || !endDate) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return dailyRate * (days > 0 ? days : 1);
  };

  const isDateUnavailable = (date: Date) => {
    return unavailableDates.some(period => {
      const periodStart = new Date(period.startDate);
      const periodEnd = new Date(period.endDate);
      return date >= periodStart && date <= periodEnd;
    });
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        {/* Product Image Header */}
        <div className="h-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10" />
          <img
            src={productImage}
            alt={productTitle}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-6 z-20">
            <h3 className="text-white text-xl font-semibold">{productTitle}</h3>
            {productSubtitle && (
              <p className="text-white/90 text-sm">{productSubtitle}</p>
            )}
            <p className="text-white/90 text-sm">{currency}{dailyRate} per day</p>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <DatePickerField
                id="startDate"
                label="Pick-up Date"
                date={startDate}
                setDate={setStartDate}
                className="col-span-2 sm:col-span-1"
                disabledDates={isDateUnavailable}
                required
              />

              <DatePickerField
                id="endDate"
                label="Return Date"
                date={endDate}
                setDate={setEndDate}
                minDate={startDate}
                className="col-span-2 sm:col-span-1"
                disabledDates={isDateUnavailable}
                required
              />

              {!isAvailable && (
                <Alert variant="destructive" className="col-span-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Not Available</AlertTitle>
                  <AlertDescription>
                    This product is not available for the selected dates. Please choose different dates.
                  </AlertDescription>
                </Alert>
              )}

              <UserInfoForm
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
              />
            </div>

            {startDate && endDate && (
              <ReservationSummary
                startDate={startDate}
                endDate={endDate}
                pricePerDay={dailyRate}
                currency={currency}
              />
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
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
              >
                {isLoading ? "Processing..." : isCheckingAvailability ? "Checking..." : "Confirm Booking"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BookingModal;
