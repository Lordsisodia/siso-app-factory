import React from 'react';

export interface AdditionalFee {
  label: string;
  amount: number;
}

export interface ReservationSummaryProps {
  startDate?: Date;
  endDate?: Date;
  pricePerDay: number;
  currency?: string;
  calculateTotal?: (days: number, pricePerDay: number) => number;
  additionalFees?: AdditionalFee[];
  showDuration?: boolean;
  className?: string;
}

export const ReservationSummary: React.FC<ReservationSummaryProps> = ({
  startDate,
  endDate,
  pricePerDay,
  currency = '$',
  calculateTotal,
  additionalFees = [],
  showDuration = true,
  className = ''
}) => {
  if (!startDate || !endDate) return null;

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

  return (
    <div className={`bg-secondary p-4 rounded-lg ${className}`}>
      <div className="space-y-3">
        {/* Duration */}
        {showDuration && (
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="text-lg font-medium">{calculateDays()} days</p>
          </div>
        )}

        {/* Daily Rate */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Daily Rate</p>
          <p className="font-medium">{currency}{pricePerDay}</p>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Subtotal ({calculateDays()} days)</p>
          <p className="font-medium">{currency}{subtotal}</p>
        </div>

        {/* Additional Fees */}
        {additionalFees.map((fee, index) => (
          <div key={index} className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{fee.label}</p>
            <p className="font-medium">{currency}{fee.amount}</p>
          </div>
        ))}

        {/* Total */}
        {additionalFees.length > 0 && (
          <div className="border-t pt-3">
            <div className="flex justify-between items-center font-semibold">
              <p>Total</p>
              <p className="text-xl text-primary">{currency}{grandTotal}</p>
            </div>
          </div>
        )}

        {!additionalFees.length && (
          <div className="border-t pt-3">
            <div className="flex justify-between items-center font-semibold">
              <p>Total Price</p>
              <p className="text-xl text-primary">{currency}{subtotal}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationSummary;
