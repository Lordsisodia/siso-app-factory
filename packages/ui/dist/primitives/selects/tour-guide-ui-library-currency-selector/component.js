"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCurrencyConversion } from "@/lib/hooks/use-currency-conversion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
export function CurrencySelector() {
    const { selectedCurrency, setCurrency, loading } = useCurrencyConversion();
    const currencies = [
        { code: "EUR", name: "Euro", flag: "🇪🇺" },
        { code: "USD", name: "US Dollar", flag: "🇺🇸" },
        { code: "GBP", name: "British Pound", flag: "🇬🇧" }
    ];
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "sm", className: "border-orange-500/30 bg-orange-500/10 text-white hover:bg-orange-500/20", disabled: loading, children: [currencies.find(c => c.code === selectedCurrency)?.flag, " ", selectedCurrency, _jsx(ChevronDown, { className: "ml-1 size-3" })] }) }), _jsx(DropdownMenuContent, { align: "end", className: "border-orange-500/30 bg-gray-900", children: currencies.map(currency => (_jsxs(DropdownMenuItem, { onClick: () => setCurrency(currency.code), className: "cursor-pointer text-white hover:bg-orange-500/20", children: [_jsx("span", { className: "mr-2", children: currency.flag }), currency.code, " - ", currency.name] }, currency.code))) })] }));
}
//# sourceMappingURL=component.js.map