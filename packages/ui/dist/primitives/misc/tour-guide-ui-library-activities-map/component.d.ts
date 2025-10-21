import "leaflet/dist/leaflet.css";
interface ActivityForMap {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    category: string;
    location: string;
    latitude: number;
    longitude: number;
    avgRating: number;
    totalReviews: number;
    durationMinutes: number;
    maxParticipants: number;
    images: Array<{
        imageUrl: string;
        altText: string;
        isPrimary: boolean;
    }>;
    pricing: Array<{
        basePrice: string;
        priceType: string;
        isActive: boolean;
    }>;
}
interface ActivitiesMapProps {
    activities: ActivityForMap[];
    height?: string;
    className?: string;
    showLegend?: boolean;
}
export default function ActivitiesMap({ activities, height, className, showLegend }: ActivitiesMapProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=component.d.ts.map