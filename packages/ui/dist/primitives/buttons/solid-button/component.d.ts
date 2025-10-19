import * as React from 'react';
export interface SolidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}
/**
 * SolidButton - Standard filled button with solid background
 *
 * Perfect for primary CTAs, submit actions, and important user actions.
 * High contrast, attention-grabbing design.
 */
export declare const SolidButton: React.ForwardRefExoticComponent<SolidButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=component.d.ts.map