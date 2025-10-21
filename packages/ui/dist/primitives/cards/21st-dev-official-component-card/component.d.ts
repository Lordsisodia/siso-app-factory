interface ComponentCardProps {
    id: string;
    name: string;
    description?: string;
    previewUrl?: string;
    author?: {
        username: string;
        avatarUrl?: string;
    };
    category?: string;
    votes?: number;
    className?: string;
}
export declare function ComponentCard({ id, name, description, previewUrl, author, category, votes, className, }: ComponentCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map