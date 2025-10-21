"use client";
import { useState, useEffect } from "react";
export function useCurrencyConversion() {
    const [rates, setRates] = useState(null);
    const [selectedCurrency, setSelectedCurrency] = useState("EUR");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function fetchRates() {
            setLoading(true);
            try {
                // Free API: exchangerate-api.com
                const response = await fetch(`https://api.exchangerate-api.com/v4/latest/EUR`);
                const data = await response.json();
                setRates({
                    EUR: 1,
                    USD: data.rates.USD,
                    GBP: data.rates.GBP
                });
            }
            catch (error) {
                console.error("Failed to fetch exchange rates:", error);
                // Fallback rates
                setRates({ EUR: 1, USD: 1.1, GBP: 0.85 });
            }
            finally {
                setLoading(false);
            }
        }
        fetchRates();
        // Update rates every hour
        const interval = setInterval(fetchRates, 3600000);
        return () => clearInterval(interval);
    }, []);
    const convertPrice = (eurPrice) => {
        if (!rates)
            return eurPrice;
        return eurPrice * rates[selectedCurrency];
    };
    const formatPrice = (price) => {
        const convertedPrice = convertPrice(price);
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: selectedCurrency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(convertedPrice);
    };
    return {
        rates,
        selectedCurrency,
        convertPrice,
        formatPrice,
        setCurrency: setSelectedCurrency,
        loading
    };
}
//# sourceMappingURL=component.js.map