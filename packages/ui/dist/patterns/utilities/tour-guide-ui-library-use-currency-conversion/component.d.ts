interface ExchangeRates {
    EUR: number;
    USD: number;
    GBP: number;
}
interface CurrencyConversion {
    rates: ExchangeRates | null;
    selectedCurrency: keyof ExchangeRates;
    convertPrice: (eurPrice: number) => number;
    formatPrice: (price: number) => string;
    setCurrency: (currency: keyof ExchangeRates) => void;
    loading: boolean;
}
export declare function useCurrencyConversion(): CurrencyConversion;
export {};
//# sourceMappingURL=component.d.ts.map