import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
/**
 * Utility to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
//# sourceMappingURL=cn.js.map