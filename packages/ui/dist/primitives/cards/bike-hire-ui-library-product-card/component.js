import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from 'lucide-react';
import { ReviewStars } from '../../reviews/ReviewStars';
import { Link } from 'react-router-dom';
export function ProductCard({ product, imageUrl, title, subtitle, dailyRate, currency = '$', priceLabel = 'day', specs, rating, detailsLink, onBookNow, onFavoriteToggle, isFavorited = false, showFavorite = true, className = '' }) {
    const [favorited, setFavorited] = React.useState(isFavorited);
    const toggleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const newFavorited = !favorited;
        setFavorited(newFavorited);
        if (onFavoriteToggle) {
            onFavoriteToggle(product, newFavorited);
        }
    };
    return (_jsxs(Card, { className: `bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`, children: [_jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [_jsxs("div", { children: [_jsx(CardTitle, { className: "text-2xl font-bold tracking-tight", children: title }), subtitle && (_jsx(CardDescription, { className: "text-sm text-muted-foreground", children: subtitle }))] }), showFavorite && (_jsx("button", { onClick: toggleFavorite, className: "p-2 rounded-full hover:bg-muted transition-colors", children: _jsx(Heart, { size: 20, className: `transition-colors ${favorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}` }) }))] }), _jsxs("div", { className: "relative", children: [_jsx("img", { src: imageUrl, alt: title, className: "aspect-video w-full rounded-md object-cover", loading: "lazy" }), _jsxs(Badge, { className: "absolute top-2 left-2 bg-secondary text-secondary-foreground", children: [currency, dailyRate, "/", priceLabel] })] }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: specs.map((spec, index) => (_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium leading-none", children: spec.label }), _jsx("p", { className: "text-muted-foreground", children: spec.value })] }, index))) }) }), _jsxs(CardFooter, { className: "flex justify-between items-center", children: [rating !== undefined && _jsx(ReviewStars, { rating: rating }), _jsxs("div", { className: "space-x-2 ml-auto", children: [detailsLink && (_jsx(Link, { to: detailsLink, children: _jsx(Button, { variant: "outline", children: "Details" }) })), _jsx(Button, { onClick: () => onBookNow(product), children: "Book Now" })] })] })] }));
}
export default ProductCard;
//# sourceMappingURL=component.js.map