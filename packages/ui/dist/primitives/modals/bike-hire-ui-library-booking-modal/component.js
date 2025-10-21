import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { DatePickerField } from '../../booking/DatePickerField';
import { UserInfoForm } from '../../forms/UserInfoForm';
import { ReservationSummary } from '../../cards/ReservationSummary';
export function BookingModal({ product, isOpen, onClose, productImage, productTitle, productSubtitle, dailyRate, onSubmit, checkAvailability, getUnavailableDates, requireAuth = false, onAuthRequired, currency = '$' }) {
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);
    const [unavailableDates, setUnavailableDates] = useState([]);
    // Load unavailable dates
    useEffect(() => {
        if (product && isOpen && getUnavailableDates) {
            const loadDates = async () => {
                try {
                    const dates = await getUnavailableDates(product.id);
                    setUnavailableDates(dates);
                }
                catch (error) {
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
                    const available = await checkAvailability(product.id, startDate, endDate);
                    setIsAvailable(available);
                }
                catch (error) {
                    console.error('Error checking availability:', error);
                    setIsAvailable(false);
                }
                finally {
                    setIsCheckingAvailability(false);
                }
            };
            check();
        }
    }, [product, startDate, endDate, checkAvailability]);
    const handleSubmit = async (e) => {
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
        }
        catch (error) {
            console.error('Error submitting booking:', error);
        }
        finally {
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
        if (!startDate || !endDate)
            return 0;
        const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        return dailyRate * (days > 0 ? days : 1);
    };
    const isDateUnavailable = (date) => {
        return unavailableDates.some(period => {
            const periodStart = new Date(period.startDate);
            const periodEnd = new Date(period.endDate);
            return date >= periodStart && date <= periodEnd;
        });
    };
    if (!product)
        return null;
    return (_jsx(Dialog, { open: isOpen, onOpenChange: onClose, children: _jsxs(DialogContent, { className: "sm:max-w-[500px] p-0 overflow-hidden", children: [_jsxs("div", { className: "h-40 relative overflow-hidden", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10" }), _jsx("img", { src: productImage, alt: productTitle, className: "w-full h-full object-cover" }), _jsxs("div", { className: "absolute bottom-4 left-6 z-20", children: [_jsx("h3", { className: "text-white text-xl font-semibold", children: productTitle }), productSubtitle && (_jsx("p", { className: "text-white/90 text-sm", children: productSubtitle })), _jsxs("p", { className: "text-white/90 text-sm", children: [currency, dailyRate, " per day"] })] })] }), _jsx("div", { className: "p-6", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { className: "grid grid-cols-2 gap-6 mb-6", children: [_jsx(DatePickerField, { id: "startDate", label: "Pick-up Date", date: startDate, setDate: setStartDate, className: "col-span-2 sm:col-span-1", disabledDates: isDateUnavailable, required: true }), _jsx(DatePickerField, { id: "endDate", label: "Return Date", date: endDate, setDate: setEndDate, minDate: startDate, className: "col-span-2 sm:col-span-1", disabledDates: isDateUnavailable, required: true }), !isAvailable && (_jsxs(Alert, { variant: "destructive", className: "col-span-2", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Not Available" }), _jsx(AlertDescription, { children: "This product is not available for the selected dates. Please choose different dates." })] })), _jsx(UserInfoForm, { name: name, setName: setName, email: email, setEmail: setEmail, phone: phone, setPhone: setPhone })] }), startDate && endDate && (_jsx(ReservationSummary, { startDate: startDate, endDate: endDate, pricePerDay: dailyRate, currency: currency })), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: onClose, disabled: isLoading, children: "Cancel" }), _jsx(Button, { type: "submit", disabled: isLoading ||
                                            isCheckingAvailability ||
                                            !isAvailable ||
                                            !startDate ||
                                            !endDate ||
                                            !name ||
                                            !email ||
                                            !phone, children: isLoading ? "Processing..." : isCheckingAvailability ? "Checking..." : "Confirm Booking" })] })] }) })] }) }));
}
export default BookingModal;
//# sourceMappingURL=component.js.map