import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Star } from 'lucide-react';
const ReviewStars = ({ rating, maxRating = 5, size = 'md', className = '', showEmpty = true }) => {
    // Determine star size
    const starSize = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-5 w-5'
    }[size];
    return (_jsx("div", { className: `flex items-center ${className}`, children: [...Array(maxRating)].map((_, index) => {
            const starFilled = index < Math.floor(rating);
            const starHalf = !starFilled && index < Math.ceil(rating) && rating % 1 !== 0;
            return (_jsxs("span", { className: "relative", children: [(showEmpty || starFilled || starHalf) && (_jsx(Star, { className: `${starSize} ${starFilled || starHalf
                            ? 'text-yellow-400'
                            : 'text-gray-200'}`, fill: starFilled ? 'currentColor' : 'none' })), starHalf && (_jsx("span", { className: "absolute top-0 left-0 overflow-hidden", style: { width: '50%' }, children: _jsx(Star, { className: `${starSize} text-yellow-400`, fill: "currentColor" }) }))] }, index));
        }) }));
};
export default ReviewStars;
//# sourceMappingURL=component.js.map