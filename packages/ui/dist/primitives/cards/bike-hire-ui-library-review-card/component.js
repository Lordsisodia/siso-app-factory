import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { User } from 'lucide-react';
import { ReviewStars } from '../ReviewStars';
export const ReviewCard = ({ review, className = '', showAvatar = true, avatarUrl }) => {
    const createdAt = new Date(review.created_at);
    const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });
    return (_jsxs(Card, { className: `border-border/40 ${className}`, children: [_jsxs(CardContent, { className: "pt-6 pb-2", children: [_jsxs("div", { className: "flex justify-between items-start mb-4", children: [_jsxs("div", { className: "flex items-center", children: [showAvatar && (_jsx("div", { className: "h-9 w-9 rounded-full bg-secondary flex items-center justify-center mr-2 overflow-hidden", children: avatarUrl ? (_jsx("img", { src: avatarUrl, alt: review.user_name, className: "w-full h-full object-cover" })) : (_jsx(User, { className: "h-5 w-5 text-secondary-foreground" })) })), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-sm", children: review.user_name }), _jsx(ReviewStars, { rating: review.rating, size: "sm" })] })] }), _jsx("span", { className: "text-xs text-muted-foreground", children: timeAgo })] }), review.comment && (_jsx("div", { className: "text-sm text-foreground/90 mt-2", children: _jsx("p", { children: review.comment }) }))] }), _jsx(CardFooter, { className: "pt-0 pb-4", children: _jsx("div", { className: "w-full flex justify-between items-center", children: _jsx("div", { className: "text-xs text-muted-foreground", children: new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        }).format(createdAt) }) }) })] }));
};
export default ReviewCard;
//# sourceMappingURL=component.js.map