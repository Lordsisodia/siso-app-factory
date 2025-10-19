import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../../utils/cn';
/**
 * SolidButton - Standard filled button with solid background
 *
 * Perfect for primary CTAs, submit actions, and important user actions.
 * High contrast, attention-grabbing design.
 */
export const SolidButton = React.forwardRef(({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (_jsx("button", { ref: ref, className: cn(
        // Base styles
        'inline-flex items-center justify-center rounded-md font-medium transition-all', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2', 'disabled:pointer-events-none disabled:opacity-50', 'active:scale-95', 
        // Variant styles
        {
            'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500': variant === 'primary',
            'bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-gray-500': variant === 'secondary',
            'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500': variant === 'danger',
            'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500': variant === 'success'
        }, 
        // Size styles
        {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-base': size === 'md',
            'h-12 px-6 text-lg': size === 'lg'
        }, className), ...props, children: children }));
});
SolidButton.displayName = 'SolidButton';
//# sourceMappingURL=component.js.map