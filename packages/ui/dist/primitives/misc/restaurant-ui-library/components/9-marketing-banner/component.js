'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { X } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { Button } from '@/components/2-ordering-system/checkout-buttons/button';
import { cn } from '@/lib/utils';
const bannerVariants = cva('relative overflow-hidden rounded-md border shadow-lg text-sm', {
    variants: {
        variant: {
            default: 'bg-muted/40 border-muted/80',
            success: 'bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-800 dark:text-green-100',
            warning: 'bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-100',
            info: 'bg-blue-50 border-blue-200 text-blue-900 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-100',
            premium: 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 text-purple-900 dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-800 dark:text-purple-100',
            gradient: 'bg-slate-50 border-slate-200 text-slate-900 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100',
        },
        size: {
            default: 'py-1.5 px-2.5',
            sm: 'text-xs py-1 px-2',
            lg: 'text-lg py-4 px-6',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});
export function Banner({ variant = 'default', size = 'default', title, description, icon, showShade = false, show, onHide, action, closable = false, className, autoHide, ...props }) {
    React.useEffect(() => {
        if (autoHide) {
            const timer = setTimeout(() => {
                onHide?.();
            }, autoHide);
            return () => clearTimeout(timer);
        }
    }, [autoHide, onHide]);
    if (!show)
        return null;
    return (_jsxs("div", { className: cn(bannerVariants({ variant, size }), className), role: variant === 'warning' || variant === 'default' ? 'alert' : 'status', ...props, children: [showShade && (_jsx("div", { className: "absolute inset-0 -z-10 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" })), _jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsxs("div", { className: "flex min-w-0 flex-1 items-center gap-3", children: [icon && _jsx("div", { className: "flex-shrink-0", children: icon }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("div", { className: "flex flex-wrap items-center", children: _jsx("p", { className: "truncate font-semibold", children: title }) }), description && _jsx("p", { className: "text-xs opacity-80", children: description })] })] }), _jsxs("div", { className: "flex flex-shrink-0 items-center gap-2", children: [action, closable && (_jsx(Button, { onClick: onHide, size: "icon", variant: "ghost", children: _jsx(X, {}) }))] })] })] }));
}
//# sourceMappingURL=component.js.map