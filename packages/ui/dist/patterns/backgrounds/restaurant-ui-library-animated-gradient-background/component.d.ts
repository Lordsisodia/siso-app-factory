import React from 'react';
interface AnimatedGradientBackgroundProps {
    /**
     * Initial size of the radial gradient, defining the starting width.
     * @default 110
     */
    startingGap?: number;
    /**
     * Enables or disables the breathing animation effect.
     * @default false
     */
    Breathing?: boolean;
    /**
     * Array of colors to use in the radial gradient.
     * Each color corresponds to a stop percentage in `gradientStops`.
     * @default ["#0A0A0A", "#2979FF", "#FF80AB", "#FF6D00", "#FFD600", "#00E676", "#3D5AFE"]
     */
    gradientColors?: string[];
    /**
     * Array of percentage stops corresponding to each color in `gradientColors`.
     * The values should range between 0 and 100.
     * @default [35, 50, 60, 70, 80, 90, 100]
     */
    gradientStops?: number[];
    /**
     * Speed of the breathing animation.
     * Lower values result in slower animation.
     * @default 0.02
     */
    animationSpeed?: number;
    /**
     * Maximum range for the breathing animation in percentage points.
     * Determines how much the gradient "breathes" by expanding and contracting.
     * @default 5
     */
    breathingRange?: number;
    /**
     * Additional inline styles for the gradient container.
     * @default {}
     */
    containerStyle?: React.CSSProperties;
    /**
     * Additional class names for the gradient container.
     * @default ""
     */
    containerClassName?: string;
    /**
     * Additional top offset for the gradient container form the top to have a more flexible control over the gradient.
     * @default 0
     */
    topOffset?: number;
}
/**
 * AnimatedGradientBackground
 *
 * This component renders a customizable animated radial gradient background with a subtle breathing effect.
 * It uses `framer-motion` for an entrance animation and raw CSS gradients for the dynamic background.
 *
 *
 * @param {AnimatedGradientBackgroundProps} props - Props for configuring the gradient animation.
 * @returns JSX.Element
 */
declare const AnimatedGradientBackground: React.FC<AnimatedGradientBackgroundProps>;
export default AnimatedGradientBackground;
//# sourceMappingURL=component.d.ts.map