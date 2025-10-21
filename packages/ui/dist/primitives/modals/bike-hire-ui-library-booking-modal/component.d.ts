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
    getUnavailableDates?: (productId: string) => Promise<Array<{
        startDate: string;
        endDate: string;
    }>>;
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
export declare function BookingModal<T = any>({ product, isOpen, onClose, productImage, productTitle, productSubtitle, dailyRate, onSubmit, checkAvailability, getUnavailableDates, requireAuth, onAuthRequired, currency }: BookingModalProps<T>): import("react/jsx-runtime").JSX.Element | null;
export default BookingModal;
//# sourceMappingURL=component.d.ts.map