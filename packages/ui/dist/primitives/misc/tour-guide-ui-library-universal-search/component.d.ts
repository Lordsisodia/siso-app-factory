interface SearchResult {
    id: string;
    type: "activity" | "user" | "review" | "booking";
    title: string;
    description: string;
    category?: string;
    status?: string;
    rating?: number;
    date?: string;
    relevance: number;
}
interface UniversalSearchProps {
    onResultClick?: (result: SearchResult) => void;
}
export default function UniversalSearch({ onResultClick }: UniversalSearchProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map