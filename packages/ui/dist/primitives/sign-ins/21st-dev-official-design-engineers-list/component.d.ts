import { Database } from "@/types/supabase";
type DatabaseAuthor = Database["public"]["Functions"]["get_active_authors_with_top_components"]["Returns"][0];
interface DesignEngineersListProps {
    className?: string;
    initialData?: DatabaseAuthor[];
}
export declare function DesignEngineersList({ className, initialData, }: DesignEngineersListProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map