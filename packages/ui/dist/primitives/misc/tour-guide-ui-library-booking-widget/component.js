"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/*
<ai_context>
Enhanced Booking Widget - Premium Brand Design
Implements rose/red, yellow, black, white color scheme with glassmorphism.
Features enhanced visual hierarchy, micro-interactions, and conversion-optimized design.
Matches the Mallorca Activities brand guidelines.
</ai_context>
*/
import { useState, useEffect } from "react";
import { Calendar, Users, Clock, Heart, Share2, Sparkles, Shield, CheckCircle, Minus, Plus, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getActivityAvailabilityAction } from "@/actions/db/availability-actions";
import { useCurrencyConversion } from "@/lib/hooks/use-currency-conversion";
import WeatherWidget from "@/components/weather/weather-widget";
// Enhanced glassmorphism card component with brand styling
function GlassmorphismCard({ children, className = "", variant = "default" }) {
    const variants = {
        default: "rounded-xl border border-white/10 bg-black/40 backdrop-blur-lg shadow-xl",
        elevated: "rounded-xl border border-rose-500/20 bg-gradient-to-br from-black/60 to-rose-950/40 backdrop-blur-lg shadow-2xl shadow-rose-500/10",
        nested: "rounded-lg border border-white/5 bg-black/20 backdrop-blur-sm"
    };
    return _jsx("div", { className: `${variants[variant]} ${className}`, children: children });
}
// Premium price display component
function PriceDisplay({ price, label, highlight = false }) {
    return (_jsxs("div", { className: cn("flex items-baseline gap-2", highlight && "animate-pulse"), children: [_jsxs("span", { className: cn("text-3xl font-black tracking-tight", highlight
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent"
                    : "text-white"), children: ["\u20AC", price] }), _jsx("span", { className: "text-sm font-medium text-white/70", children: label })] }));
}
export default function BookingWidget({ activity }) {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const [availableDates, setAvailableDates] = useState([]);
    const [loading, setLoading] = useState(true);
    // Currency conversion hook
    const { formatPrice } = useCurrencyConversion();
    // Get pricing from database - handle both string and numeric values
    const adultPricing = activity.pricing?.find(p => p.priceType === "adult");
    const childPricing = activity.pricing?.find(p => p.priceType === "child");
    const basePrice = adultPricing
        ? parseFloat(String(adultPricing.basePrice))
        : 0;
    const childPrice = childPricing
        ? parseFloat(String(childPricing.basePrice))
        : basePrice * 0.8;
    const totalParticipants = adults + children;
    const totalPrice = basePrice * adults + childPrice * children;
    // Load real availability data
    useEffect(() => {
        async function loadAvailability() {
            setLoading(true);
            try {
                const result = await getActivityAvailabilityAction(activity.id, 7);
                if (result.isSuccess) {
                    setAvailableDates(result.data);
                    // Auto-select first available date
                    const firstAvailable = result.data.find(d => d.available);
                    if (firstAvailable && !selectedDate) {
                        setSelectedDate(firstAvailable.date);
                    }
                }
            }
            catch (error) {
                console.error("Error loading availability:", error);
            }
            finally {
                setLoading(false);
            }
        }
        loadAvailability();
    }, [activity.id, selectedDate]);
    // Get available times for selected date
    const getAvailableTimesForDate = (date) => {
        const dateData = availableDates.find(d => d.date === date);
        return dateData?.timeSlots || [];
    };
    const availableTimes = getAvailableTimesForDate(selectedDate);
    const handleBooking = () => {
        const params = new URLSearchParams({
            adults: adults.toString(),
            children: children.toString(),
            date: selectedDate,
            time: selectedTime
        });
        window.location.href = `/book/${activity.id}/select?${params.toString()}`;
    };
    const canBook = selectedDate &&
        selectedTime &&
        totalParticipants > 0 &&
        totalParticipants <= activity.maxParticipants;
    // Sticky scroll detection
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsSticky(scrollY > 600);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (_jsx("div", { className: `transition-all duration-300 ${isSticky ? "fixed right-4 top-4 z-50 w-96 max-w-[90vw]" : "relative"}`, children: _jsxs(GlassmorphismCard, { variant: "elevated", className: `relative overflow-hidden p-6 ${isSticky ? "border-yellow-400/20 shadow-2xl" : ""}`, children: [_jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-yellow-500/5" }), isSticky && (_jsx("div", { className: "absolute -top-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500" })), _jsxs("div", { className: "relative mb-6", children: [_jsxs("div", { className: "mb-4 flex items-start justify-between", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(PriceDisplay, { price: basePrice, label: "per adult", highlight: true }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "size-4 fill-yellow-400 text-yellow-400" }), _jsx("span", { className: "text-sm font-bold text-white", children: "4.9" }), _jsx("span", { className: "text-xs text-white/60", children: "(127 reviews)" })] }), activity.spotsLeft && activity.spotsLeft <= 5 && (_jsxs(Badge, { className: "animate-pulse border-rose-500/50 bg-gradient-to-r from-rose-500/30 to-red-600/30 font-bold text-rose-200 shadow-lg", children: [_jsx(Award, { className: "mr-1 size-3" }), "Only ", activity.spotsLeft, " left!"] }))] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", className: cn("border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10", isWishlisted &&
                                                "border-rose-500/50 bg-rose-500/20 text-rose-300 shadow-lg shadow-rose-500/20"), onClick: () => setIsWishlisted(!isWishlisted), children: _jsx(Heart, { className: cn("size-4 transition-all", isWishlisted && "scale-110 fill-current") }) }), _jsx(Button, { variant: "outline", size: "sm", className: "border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10", children: _jsx(Share2, { className: "size-4" }) })] })] }), _jsx(GlassmorphismCard, { variant: "nested", className: "p-3", children: _jsxs("div", { className: "flex flex-wrap gap-4 text-xs", children: [_jsxs("div", { className: "flex items-center gap-1.5 text-emerald-400", children: [_jsx(Shield, { className: "size-3" }), _jsx("span", { className: "font-medium", children: "Instant confirmation" })] }), _jsxs("div", { className: "flex items-center gap-1.5 text-blue-400", children: [_jsx(CheckCircle, { className: "size-3" }), _jsx("span", { className: "font-medium", children: "Free cancellation" })] }), _jsxs("div", { className: "flex items-center gap-1.5 text-yellow-400", children: [_jsx(Sparkles, { className: "size-3" }), _jsx("span", { className: "font-medium", children: "Best price guarantee" })] })] }) })] }), activity.weatherDependent && (_jsx("div", { className: "mb-6", children: _jsx(WeatherWidget, { location: activity.location, activityType: activity.category.toLowerCase(), isWeatherDependent: activity.weatherDependent, className: "w-full", showSuitability: true }) })), _jsxs("div", { className: "mb-6 space-y-4", children: [_jsxs("h3", { className: "flex items-center gap-2 text-lg font-bold text-white", children: [_jsx("div", { className: "rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 p-2", children: _jsx(Calendar, { className: "size-4 text-white" }) }), "Select Date"] }), loading ? (_jsx("div", { className: "flex items-center justify-center py-8", children: _jsx("div", { className: "size-8 animate-spin rounded-full border-b-2 border-yellow-400" }) })) : (_jsx("div", { className: "grid grid-cols-2 gap-3", children: availableDates.slice(0, 6).map(day => (_jsxs("button", { disabled: !day.available, className: cn("relative rounded-xl border p-4 text-sm font-bold transition-all duration-300 hover:scale-[1.02]", selectedDate === day.date
                                    ? "border-yellow-400 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-black shadow-lg shadow-yellow-400/30"
                                    : day.available
                                        ? "border-white/20 bg-gradient-to-br from-white/5 to-white/10 text-white hover:border-rose-400/50 hover:bg-gradient-to-br hover:from-rose-500/10 hover:to-yellow-500/10"
                                        : "cursor-not-allowed border-white/5 text-white/30 opacity-50"), onClick: () => day.available && setSelectedDate(day.date), children: [day.popular && day.available && (_jsx("div", { className: "absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 px-2 py-1 text-xs font-bold text-white shadow-lg", children: "Popular" })), day.display] }, day.date))) }))] }), selectedDate && (_jsxs("div", { className: "mb-6 space-y-4", children: [_jsxs("h3", { className: "flex items-center gap-2 text-lg font-bold text-white", children: [_jsx("div", { className: "rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 p-2", children: _jsx(Clock, { className: "size-4 text-white" }) }), "Select Time"] }), _jsx("div", { className: "grid grid-cols-3 gap-2", children: availableTimes.map(timeSlot => (_jsxs("button", { disabled: timeSlot.status === "full" ||
                                    timeSlot.status === "cancelled" ||
                                    timeSlot.availableSpots < totalParticipants, className: cn("relative rounded-lg border p-3 text-sm font-bold transition-all duration-300 hover:scale-[1.02]", selectedTime === timeSlot.time
                                    ? "border-yellow-400 bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-400/20"
                                    : timeSlot.status === "available" ||
                                        (timeSlot.status === "limited" &&
                                            timeSlot.availableSpots >= totalParticipants)
                                        ? "border-white/20 bg-gradient-to-br from-white/5 to-white/10 text-white hover:border-rose-400/50 hover:bg-gradient-to-br hover:from-rose-500/10 hover:to-yellow-500/10"
                                        : "cursor-not-allowed border-white/5 text-white/30 opacity-50"), onClick: () => {
                                    if (timeSlot.status !== "full" &&
                                        timeSlot.status !== "cancelled" &&
                                        timeSlot.availableSpots >= totalParticipants) {
                                        setSelectedTime(timeSlot.time);
                                    }
                                }, children: [timeSlot.isPopular && timeSlot.status !== "full" && (_jsx("div", { className: "absolute -right-1 -top-1 size-2 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 shadow-lg" })), _jsxs("div", { className: "text-center", children: [_jsx("div", { children: timeSlot.time }), timeSlot.status === "limited" && (_jsxs("div", { className: "mt-1 text-xs text-yellow-400", children: [timeSlot.availableSpots, " left"] })), timeSlot.status === "full" && (_jsx("div", { className: "mt-1 text-xs text-red-400", children: "Full" }))] })] }, timeSlot.time))) })] })), _jsxs("div", { className: "mb-6 space-y-4", children: [_jsxs("h3", { className: "flex items-center gap-2 text-lg font-bold text-white", children: [_jsx("div", { className: "rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 p-2", children: _jsx(Users, { className: "size-4 text-white" }) }), "Participants"] }), _jsx(GlassmorphismCard, { variant: "nested", className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-bold text-white", children: "Adults" }), _jsxs("p", { className: "text-sm text-white/60", children: ["Ages 8+ \u2022 \u20AC", basePrice, " each"] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { variant: "outline", size: "icon", className: "size-10 border-white/20 bg-white/5 text-white transition-all duration-300 hover:scale-110 hover:border-rose-400/50 hover:bg-rose-500/20 disabled:opacity-50 disabled:hover:scale-100", onClick: () => setAdults(Math.max(1, adults - 1)), disabled: adults <= 1, children: _jsx(Minus, { className: "size-4" }) }), _jsx("span", { className: "w-10 text-center text-xl font-black text-white", children: adults }), _jsx(Button, { variant: "outline", size: "icon", className: "size-10 border-white/20 bg-white/5 text-white transition-all duration-300 hover:scale-110 hover:border-rose-400/50 hover:bg-rose-500/20 disabled:opacity-50 disabled:hover:scale-100", onClick: () => setAdults(Math.min(activity.maxParticipants - children, adults + 1)), disabled: totalParticipants >= activity.maxParticipants, children: _jsx(Plus, { className: "size-4" }) })] })] }) }), _jsx(GlassmorphismCard, { variant: "nested", className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "font-bold text-white", children: "Children" }), _jsxs("p", { className: "text-sm text-white/60", children: ["Ages 6-7 \u2022 \u20AC", childPrice.toFixed(0), " each"] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { variant: "outline", size: "icon", className: "size-10 border-white/20 bg-white/5 text-white transition-all duration-300 hover:scale-110 hover:border-rose-400/50 hover:bg-rose-500/20 disabled:opacity-50 disabled:hover:scale-100", onClick: () => setChildren(Math.max(0, children - 1)), disabled: children <= 0, children: _jsx(Minus, { className: "size-4" }) }), _jsx("span", { className: "w-10 text-center text-xl font-black text-white", children: children }), _jsx(Button, { variant: "outline", size: "icon", className: "size-10 border-white/20 bg-white/5 text-white transition-all duration-300 hover:scale-110 hover:border-rose-400/50 hover:bg-rose-500/20 disabled:opacity-50 disabled:hover:scale-100", onClick: () => setChildren(Math.min(activity.maxParticipants - adults, children + 1)), disabled: totalParticipants >= activity.maxParticipants, children: _jsx(Plus, { className: "size-4" }) })] })] }) })] }), totalParticipants > 0 && (_jsx(GlassmorphismCard, { variant: "nested", className: "mb-6 overflow-hidden", children: _jsxs("div", { className: "bg-gradient-to-r from-rose-500/10 to-yellow-500/10 p-4", children: [_jsx("h4", { className: "mb-3 font-bold text-white", children: "Price Breakdown" }), _jsxs("div", { className: "space-y-2", children: [adults > 0 && (_jsxs("div", { className: "flex justify-between text-sm", children: [_jsxs("span", { className: "text-white/80", children: ["Adults \u00D7 ", adults] }), _jsxs("span", { className: "font-bold text-white", children: ["\u20AC", (basePrice * adults).toFixed(2)] })] })), children > 0 && (_jsxs("div", { className: "flex justify-between text-sm", children: [_jsxs("span", { className: "text-white/80", children: ["Children \u00D7 ", children] }), _jsxs("span", { className: "font-bold text-white", children: ["\u20AC", (childPrice * children).toFixed(2)] })] })), _jsx("div", { className: "border-t border-white/20 pt-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-lg font-bold text-white", children: "Total" }), _jsxs("span", { className: "bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-2xl font-black text-transparent", children: ["\u20AC", totalPrice.toFixed(2)] })] }) })] })] }) })), _jsxs(Button, { onClick: handleBooking, disabled: !canBook, className: cn("group relative h-14 w-full overflow-hidden text-lg font-black transition-all duration-500", canBook
                        ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-black hover:scale-[1.02] hover:from-yellow-300 hover:via-yellow-400 hover:to-amber-400 hover:shadow-2xl hover:shadow-yellow-400/30"
                        : "cursor-not-allowed bg-gray-700 text-gray-400"), children: [_jsx("div", { className: "absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" }), canBook ? (_jsxs(_Fragment, { children: [_jsx(Sparkles, { className: "mr-2 size-5 animate-pulse" }), "Book This Adventure - \u20AC", totalPrice.toFixed(2)] })) : ("Select Date & Time to Continue")] }), _jsxs("div", { className: "mt-6 space-y-3 text-center", children: [_jsxs("div", { className: "flex justify-center gap-6 text-xs text-white/70", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(CheckCircle, { className: "size-3 text-emerald-400" }), _jsx("span", { children: "Free cancellation up to 24h" })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Shield, { className: "size-3 text-blue-400" }), _jsx("span", { children: "Instant mobile tickets" })] })] }), _jsx("div", { className: "text-xs text-white/50", children: "Secure payment \u2022 No hidden fees \u2022 Book with confidence" })] })] }) }));
}
//# sourceMappingURL=component.js.map