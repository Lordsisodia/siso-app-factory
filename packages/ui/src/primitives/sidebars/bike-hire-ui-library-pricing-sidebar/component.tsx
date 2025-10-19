import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export interface AdditionalFee {
  label: string;
  amount: number;
}

export interface PricingSidebarProps {
  price: number;
  priceLabel?: string;
  currency?: string;
  additionalFees?: AdditionalFee[];
  onBook: () => void;
  bookButtonText?: string;
  disclaimer?: string;
  sticky?: boolean;
  className?: string;
}

export const PricingSidebar: React.FC<PricingSidebarProps> = ({
  price,
  priceLabel = 'per day',
  currency = '$',
  additionalFees = [],
  onBook,
  bookButtonText = 'Check Availability',
  disclaimer,
  sticky = true,
  className = ''
}) => {
  const total = price + additionalFees.reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <Card className={`p-6 ${sticky ? 'sticky top-20' : ''} ${className}`}>
      <h3 className="text-xl font-semibold mb-4">Ready to Book?</h3>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Daily Rate</span>
          <span className="font-medium">{currency}{price}</span>
        </div>

        {additionalFees.map((fee, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-muted-foreground">{fee.label}</span>
            <span className="font-medium">{currency}{fee.amount}</span>
          </div>
        ))}

        <div className="border-t pt-2">
          <div className="flex justify-between font-semibold">
            <span>Starting From</span>
            <span className="text-primary">{currency}{total}/{priceLabel}</span>
          </div>
          {disclaimer && (
            <p className="text-xs text-muted-foreground mt-1">
              {disclaimer}
            </p>
          )}
        </div>
      </div>

      <Button
        className="w-full"
        onClick={onBook}
      >
        <Calendar className="w-4 h-4 mr-2" />
        {bookButtonText}
      </Button>
    </Card>
  );
};

export default PricingSidebar;
