import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
export const SkeletonLoader = ({ variant = 'card', count = 1, className = '', children }) => {
    const renderSkeleton = () => {
        switch (variant) {
            case 'card':
                return (_jsx("div", { className: `bg-white rounded-lg shadow-md p-4 ${className}`, children: _jsxs("div", { className: "animate-pulse space-y-4", children: [_jsx("div", { className: "h-48 bg-muted rounded-md" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-4 bg-muted rounded w-3/4" }), _jsx("div", { className: "h-4 bg-muted rounded w-1/2" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("div", { className: "h-8 bg-muted rounded w-20" }), _jsx("div", { className: "h-8 bg-muted rounded w-24" })] })] }) }));
            case 'list':
                return (_jsx("div", { className: `bg-white rounded-lg p-4 ${className}`, children: _jsxs("div", { className: "animate-pulse flex space-x-4", children: [_jsx("div", { className: "rounded-full bg-muted h-12 w-12 flex-shrink-0" }), _jsxs("div", { className: "flex-1 space-y-2 py-1", children: [_jsx("div", { className: "h-4 bg-muted rounded w-3/4" }), _jsx("div", { className: "h-4 bg-muted rounded w-5/6" })] })] }) }));
            case 'detail':
                return (_jsx("div", { className: `${className}`, children: _jsxs("div", { className: "animate-pulse space-y-6", children: [_jsx("div", { className: "h-96 bg-muted rounded-lg" }), _jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "h-8 bg-muted rounded w-1/2" }), _jsx("div", { className: "h-4 bg-muted rounded w-3/4" }), _jsx("div", { className: "h-4 bg-muted rounded w-2/3" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsx("div", { className: "h-20 bg-muted rounded" }), _jsx("div", { className: "h-20 bg-muted rounded" })] })] }) }));
            case 'text':
                return (_jsxs("div", { className: `animate-pulse space-y-2 ${className}`, children: [_jsx("div", { className: "h-4 bg-muted rounded w-full" }), _jsx("div", { className: "h-4 bg-muted rounded w-5/6" }), _jsx("div", { className: "h-4 bg-muted rounded w-4/6" })] }));
            case 'avatar':
                return (_jsx("div", { className: `animate-pulse ${className}`, children: _jsx("div", { className: "rounded-full bg-muted h-12 w-12" }) }));
            case 'custom':
                return children || null;
            default:
                return null;
        }
    };
    return (_jsx(_Fragment, { children: Array.from({ length: count }).map((_, index) => (_jsx("div", { children: renderSkeleton() }, index))) }));
};
export default SkeletonLoader;
//# sourceMappingURL=component.js.map