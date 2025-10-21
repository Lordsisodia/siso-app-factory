import { Database } from "@/types/supabase";
type DatabaseAuthor = Database["public"]["Functions"]["get_active_authors_with_top_components"]["Returns"][0];
interface DesignEngineerCardProps {
    author: DatabaseAuthor;
}
export declare function DesignEngineerCard({ author }: DesignEngineerCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map