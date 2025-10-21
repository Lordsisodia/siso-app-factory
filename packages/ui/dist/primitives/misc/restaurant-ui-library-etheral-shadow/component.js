"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useId, useRef } from "react";
import { animate, useMotionValue } from "framer-motion";
const mapRange = (value, fromLow, fromHigh, toLow, toHigh) => {
    if (fromLow === fromHigh)
        return toLow;
    const percentage = (value - fromLow) / (fromHigh - fromLow);
    return toLow + percentage * (toHigh - toLow);
};
const useInstanceId = () => {
    const id = useId().replace(/:/g, "");
    return `shadowoverlay-${id}`;
};
export function Component({ sizing = "fill", color = "rgba(128, 128, 128, 1)", animation, noise, style, className, }) {
    const id = useInstanceId();
    const animationEnabled = !!animation && animation.scale > 0;
    const feColorMatrixRef = useRef(null);
    const hueRotateMotionValue = useMotionValue(180);
    const hueRotateAnimation = useRef(null);
    const displacementScale = animation ? mapRange(animation.scale, 1, 100, 20, 100) : 0;
    const animationDuration = animation ? mapRange(animation.speed, 1, 100, 1000, 50) : 1;
    useEffect(() => {
        if (!animationEnabled || !feColorMatrixRef.current) {
            return;
        }
        hueRotateAnimation.current?.stop();
        hueRotateMotionValue.set(0);
        hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
            duration: animationDuration / 25,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            onUpdate: (value) => {
                feColorMatrixRef.current?.setAttribute("values", String(value));
            },
        });
        return () => {
            hueRotateAnimation.current?.stop();
        };
    }, [animationEnabled, animationDuration, hueRotateMotionValue]);
    return (_jsxs("div", { className: className, style: {
            overflow: "hidden",
            position: "relative",
            width: "100%",
            height: "100%",
            ...style,
        }, children: [_jsxs("div", { style: {
                    position: "absolute",
                    inset: -displacementScale,
                    filter: animationEnabled ? `url(#${id}) blur(4px)` : "none",
                }, children: [animationEnabled && (_jsx("svg", { style: { position: "absolute" }, children: _jsx("defs", { children: _jsxs("filter", { id: id, children: [_jsx("feTurbulence", { result: "undulation", numOctaves: "2", baseFrequency: `${mapRange(animation.scale, 0, 100, 0.001, 0.0005)},${mapRange(animation.scale, 0, 100, 0.004, 0.002)}`, seed: "0", type: "turbulence" }), _jsx("feColorMatrix", { ref: feColorMatrixRef, in: "undulation", type: "hueRotate", values: "180" }), _jsx("feColorMatrix", { in: "dist", result: "circulation", type: "matrix", values: "4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0" }), _jsx("feDisplacementMap", { in: "SourceGraphic", in2: "circulation", scale: displacementScale, result: "dist" }), _jsx("feDisplacementMap", { in: "dist", in2: "undulation", scale: displacementScale, result: "output" })] }) }) })), _jsx("div", { style: {
                            backgroundColor: color,
                            maskImage: "url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')",
                            maskSize: sizing === "stretch" ? "100% 100%" : "cover",
                            maskRepeat: "no-repeat",
                            maskPosition: "center",
                            width: "100%",
                            height: "100%",
                        } })] }), _jsx("div", { className: "pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center", children: _jsx("h1", { className: "text-center text-6xl font-bold text-foreground md:text-7xl lg:text-8xl", children: "Etheral Shadows" }) }), noise && noise.opacity > 0 && (_jsx("div", { style: {
                    position: "absolute",
                    inset: 0,
                    backgroundImage: "url('https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png')",
                    backgroundSize: noise.scale * 200,
                    backgroundRepeat: "repeat",
                    opacity: noise.opacity / 2,
                } }))] }));
}
//# sourceMappingURL=component.js.map