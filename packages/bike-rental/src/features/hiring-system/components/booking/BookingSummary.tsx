
import React from 'react';

interface BookingSummaryProps {
  startDate?: Date;
  endDate?: Date;
  dailyRate: number;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  startDate,
  endDate,
  dailyRate
}) => {
  if (!startDate || !endDate) return null;

  const calculateTotalPrice = () => {
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return dailyRate * (days > 0 ? days : 1);
  };

  const calculateDays = () => {
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="bg-secondary p-4 rounded-lg mb-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-muted-foreground">Total Price</p>
          <p className="text-xl font-semibold">${calculateTotalPrice()}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Duration</p>
          <p className="text-lg">
            {calculateDays()} days
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
