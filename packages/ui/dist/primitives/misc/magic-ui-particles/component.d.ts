import React, { ComponentPropsWithoutRef } from "react";
interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
    className?: string;
    quantity?: number;
    staticity?: number;
    ease?: number;
    size?: number;
    refresh?: boolean;
    color?: string;
    vx?: number;
    vy?: number;
}
export declare const Particles: React.FC<ParticlesProps>;
export {};
//# sourceMappingURL=component.d.ts.map