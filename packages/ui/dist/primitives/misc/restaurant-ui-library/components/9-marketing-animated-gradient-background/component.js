'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
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
const AnimatedGradientBackground = ({ startingGap = 125, Breathing = false, gradientColors = [
    '#0A0A0A',
    '#2979FF',
    '#FF80AB',
    '#FF6D00',
    '#FFD600',
    '#00E676',
    '#3D5AFE',
], gradientStops = [35, 50, 60, 70, 80, 90, 100], animationSpeed = 0.02, breathingRange = 5, containerStyle = {}, topOffset = 0, containerClassName = '', }) => {
    // Validation: Ensure gradientStops and gradientColors lengths match
    if (gradientColors.length !== gradientStops.length) {
        throw new Error(`GradientColors and GradientStops must have the same length.
    Received gradientColors length: ${gradientColors.length},
    gradientStops length: ${gradientStops.length}`);
    }
    const containerRef = useRef(null);
    useEffect(() => {
        let animationFrame;
        let width = startingGap;
        let directionWidth = 1;
        const animateGradient = () => {
            if (width >= startingGap + breathingRange)
                directionWidth = -1;
            if (width <= startingGap - breathingRange)
                directionWidth = 1;
            if (!Breathing)
                directionWidth = 0;
            width += directionWidth * animationSpeed;
            const gradientStopsString = gradientStops
                .map((stop, index) => `${gradientColors[index]} ${stop}%`)
                .join(', ');
            const gradient = `radial-gradient(${width}% ${width + topOffset}% at 50% 20%, ${gradientStopsString})`;
            if (containerRef.current) {
                containerRef.current.style.background = gradient;
            }
            animationFrame = requestAnimationFrame(animateGradient);
        };
        animationFrame = requestAnimationFrame(animateGradient);
        return () => cancelAnimationFrame(animationFrame); // Cleanup animation
    }, [
        startingGap,
        Breathing,
        gradientColors,
        gradientStops,
        animationSpeed,
        breathingRange,
        topOffset,
    ]);
    return (_jsx(motion.div, { initial: {
            opacity: 0,
            scale: 1.5,
        }, animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 2,
                ease: [0.25, 0.1, 0.25, 1], // Cubic bezier easing
            },
        }, className: `absolute inset-0 overflow-hidden ${containerClassName}`, children: _jsx("div", { ref: containerRef, style: containerStyle, className: 'absolute inset-0 transition-transform' }) }, 'animated-gradient-background'));
};
export default AnimatedGradientBackground;
//# sourceMappingURL=component.js.map