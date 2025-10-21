import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { CarouselControls } from '../CarouselControls';
export function ProductCarousel({ products, renderItem, itemsPerSlide = { sm: 1, md: 2, lg: 3 }, loop = true, showControls = true, className = '' }) {
    const getBasisClass = () => {
        const mdBasis = itemsPerSlide.md ? `md:basis-1/${itemsPerSlide.md}` : 'md:basis-1/2';
        const lgBasis = itemsPerSlide.lg ? `lg:basis-1/${itemsPerSlide.lg}` : 'lg:basis-1/3';
        return `${mdBasis} ${lgBasis}`;
    };
    return (_jsx("div", { className: className, children: _jsxs(Carousel, { opts: {
                align: "start",
                loop: loop,
            }, className: "w-full", children: [_jsx(CarouselContent, { className: "-ml-4", children: products.map((product, index) => (_jsx(CarouselItem, { className: `pl-4 ${getBasisClass()}`, children: renderItem(product) }, index))) }), showControls && _jsx(CarouselControls, {})] }) }));
}
export default ProductCarousel;
//# sourceMappingURL=component.js.map