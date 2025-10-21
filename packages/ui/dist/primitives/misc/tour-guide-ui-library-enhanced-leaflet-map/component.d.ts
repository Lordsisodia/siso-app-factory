import { ActivityWithDetails } from "@/actions/db/activities-actions";
import "leaflet/dist/leaflet.css";
interface EnhancedLeafletMapProps {
    activities: ActivityWithDetails[];
    height?: string;
    className?: string;
    showLegend?: boolean;
}
export declare function EnhancedLeafletMap({ activities, height, className, showLegend }: EnhancedLeafletMapProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map