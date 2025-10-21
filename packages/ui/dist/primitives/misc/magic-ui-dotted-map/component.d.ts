import * as React from "react";
interface Marker {
    lat: number;
    lng: number;
    size?: number;
}
export interface DottedMapProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
    mapSamples?: number;
    markers?: Marker[];
    dotColor?: string;
    markerColor?: string;
    dotRadius?: number;
    stagger?: boolean;
}
export declare function DottedMap({ width, height, mapSamples, markers, markerColor, dotRadius, stagger, className, style, }: DottedMapProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map