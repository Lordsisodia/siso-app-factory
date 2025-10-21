"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useMemo } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
const Beam = ({ width, x, delay, duration, }) => {
    const hue = Math.floor(Math.random() * 360);
    const ar = Math.floor(Math.random() * 10) + 1;
    return (_jsx(motion.div, { style: {
            "--x": `${x}`,
            "--width": `${width}`,
            "--aspect-ratio": `${ar}`,
            "--background": `linear-gradient(hsl(${hue} 80% 60%), transparent)`,
        }, className: `absolute top-0 left-[var(--x)] [aspect-ratio:1/var(--aspect-ratio)] [width:var(--width)] [background:var(--background)]`, initial: { y: "100cqmax", x: "-50%" }, animate: { y: "-100%", x: "-50%" }, transition: {
            duration,
            delay,
            repeat: Infinity,
            ease: "linear",
        } }));
};
export const WarpBackground = ({ children, perspective = 100, className, beamsPerSide = 3, beamSize = 5, beamDelayMax = 3, beamDelayMin = 0, beamDuration = 3, gridColor = "var(--border)", ...props }) => {
    const generateBeams = useCallback(() => {
        const beams = [];
        const cellsPerSide = Math.floor(100 / beamSize);
        const step = cellsPerSide / beamsPerSide;
        for (let i = 0; i < beamsPerSide; i++) {
            const x = Math.floor(i * step);
            const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin;
            beams.push({ x, delay });
        }
        return beams;
    }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin]);
    const topBeams = useMemo(() => generateBeams(), [generateBeams]);
    const rightBeams = useMemo(() => generateBeams(), [generateBeams]);
    const bottomBeams = useMemo(() => generateBeams(), [generateBeams]);
    const leftBeams = useMemo(() => generateBeams(), [generateBeams]);
    return (_jsxs("div", { className: cn("relative rounded border p-20", className), ...props, children: [_jsxs("div", { style: {
                    "--perspective": `${perspective}px`,
                    "--grid-color": gridColor,
                    "--beam-size": `${beamSize}%`,
                }, className: "[container-type:size] pointer-events-none absolute top-0 left-0 size-full overflow-hidden [clipPath:inset(0)] [perspective:var(--perspective)] [transform-style:preserve-3d]", children: [_jsx("div", { className: "[container-type:inline-size] absolute z-20 [height:100cqmax] [width:100cqi] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]", children: topBeams.map((beam, index) => (_jsx(Beam, { width: `${beamSize}%`, x: `${beam.x * beamSize}%`, delay: beam.delay, duration: beamDuration }, `top-${index}`))) }), _jsx("div", { className: "[container-type:inline-size] absolute top-full [height:100cqmax] [width:100cqi] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]", children: bottomBeams.map((beam, index) => (_jsx(Beam, { width: `${beamSize}%`, x: `${beam.x * beamSize}%`, delay: beam.delay, duration: beamDuration }, `bottom-${index}`))) }), _jsx("div", { className: "[container-type:inline-size] absolute top-0 left-0 [height:100cqmax] [width:100cqh] [transform-origin:0%_0%] [transform:rotate(90deg)_rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]", children: leftBeams.map((beam, index) => (_jsx(Beam, { width: `${beamSize}%`, x: `${beam.x * beamSize}%`, delay: beam.delay, duration: beamDuration }, `left-${index}`))) }), _jsx("div", { className: "[container-type:inline-size] absolute top-0 right-0 [height:100cqmax] [width:100cqh] [transform-origin:100%_0%] [transform:rotate(-90deg)_rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]", children: rightBeams.map((beam, index) => (_jsx(Beam, { width: `${beamSize}%`, x: `${beam.x * beamSize}%`, delay: beam.delay, duration: beamDuration }, `right-${index}`))) })] }), _jsx("div", { className: "relative", children: children })] }));
};
//# sourceMappingURL=component.js.map