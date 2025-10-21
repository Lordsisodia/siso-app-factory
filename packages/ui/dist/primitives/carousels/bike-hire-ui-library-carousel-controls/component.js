import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
export const CarouselControls = ({ className = '', buttonClassName = '' }) => {
    return (_jsxs("div", { className: `flex justify-center mt-8 space-x-4 ${className}`, children: [_jsx(CarouselPrevious, { className: `relative static left-0 translate-y-0 -translate-x-0 ${buttonClassName}` }), _jsx(CarouselNext, { className: `relative static right-0 translate-y-0 -translate-x-0 ${buttonClassName}` })] }));
};
export default CarouselControls;
//# sourceMappingURL=component.js.map