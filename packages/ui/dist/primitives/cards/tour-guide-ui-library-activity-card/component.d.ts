interface ActivityCardProps {
    id: string;
    title: string;
    shortDescription: string;
    category: string;
    location: string;
    duration: number;
    maxParticipants: number;
    price: number;
    currency: string;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    imageAlt: string;
    availableToday?: boolean;
    featured?: boolean;
    spotsLeft?: number;
    className?: string;
}
export default function ActivityCard({ id, title, shortDescription, category, location, duration, maxParticipants, price, currency, rating, reviewCount, imageUrl, imageAlt, availableToday, featured, spotsLeft, className }: ActivityCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map