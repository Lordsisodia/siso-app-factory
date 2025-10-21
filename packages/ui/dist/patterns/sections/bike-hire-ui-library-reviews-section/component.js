import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReviewsList } from '../ReviewsList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SpecsGrid } from '../../grids/SpecsGrid';
export const ReviewsSection = ({ productId, fetchReviews, fetchAverageRating, specs, showSpecsTab = false, specsTitle = 'Specifications', className = '' }) => {
    if (!productId) {
        console.error('ReviewsSection requires productId prop');
        return null;
    }
    return (_jsx("div", { className: `mt-8 ${className}`, children: _jsxs(Tabs, { defaultValue: "reviews", className: "w-full", children: [_jsxs(TabsList, { className: "mb-6", children: [_jsx(TabsTrigger, { value: "reviews", children: "Reviews" }), showSpecsTab && specs && _jsx(TabsTrigger, { value: "specs", children: "Specifications" })] }), _jsx(TabsContent, { value: "reviews", children: _jsx(ReviewsList, { productId: productId, fetchReviews: fetchReviews, fetchAverageRating: fetchAverageRating }) }), showSpecsTab && specs && (_jsx(TabsContent, { value: "specs", children: _jsx(SpecsGrid, { title: specsTitle, specs: specs, cardClassName: "bg-muted/30" }) }))] }) }));
};
export default ReviewsSection;
//# sourceMappingURL=component.js.map