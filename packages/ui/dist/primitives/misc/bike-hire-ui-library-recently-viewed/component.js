import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { ProductCarousel } from '../../carousel/ProductCarousel';
import { Clock } from 'lucide-react';
export function RecentlyViewed({ renderItem, storageKey = 'recentlyViewedProducts', title = 'Recently Viewed', icon, backgroundColor = 'bg-muted/50', maxItems = 6, className = '' }) {
    const [recentProducts, setRecentProducts] = useState([]);
    useEffect(() => {
        const loadRecent = () => {
            try {
                const recent = JSON.parse(localStorage.getItem(storageKey) || '[]');
                setRecentProducts(recent.slice(0, maxItems));
            }
            catch (error) {
                console.error('Error loading recently viewed:', error);
                setRecentProducts([]);
            }
        };
        loadRecent();
        // Listen for storage changes
        const handleStorageChange = (e) => {
            if (e.key === storageKey) {
                loadRecent();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [storageKey, maxItems]);
    if (recentProducts.length === 0) {
        return null;
    }
    return (_jsx("section", { className: `py-16 ${backgroundColor} ${className}`, children: _jsxs("div", { className: "container mx-auto px-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-8", children: [icon || _jsx(Clock, { className: "h-6 w-6 text-primary" }), _jsx("h2", { className: "text-3xl font-bold", children: title })] }), _jsx(ProductCarousel, { products: recentProducts, renderItem: renderItem, itemsPerSlide: { sm: 1, md: 2, lg: 3 } })] }) }));
}
export default RecentlyViewed;
//# sourceMappingURL=component.js.map