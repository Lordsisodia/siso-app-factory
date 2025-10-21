import React, { ReactNode } from "react";
export interface BaseParticle {
    element: HTMLElement | SVGSVGElement;
    left: number;
    size: number;
    top: number;
}
export interface BaseParticleOptions {
    particle?: string;
    size?: number;
}
export interface CoolParticle extends BaseParticle {
    direction: number;
    speedHorz: number;
    speedUp: number;
    spinSpeed: number;
    spinVal: number;
}
export interface CoolParticleOptions extends BaseParticleOptions {
    particleCount?: number;
    speedHorz?: number;
    speedUp?: number;
}
interface CoolModeProps {
    children: ReactNode;
    options?: CoolParticleOptions;
}
export declare const CoolMode: React.FC<CoolModeProps>;
export {};
//# sourceMappingURL=component.d.ts.map