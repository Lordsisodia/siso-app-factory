interface BlogPost {
    id: string;
    title: string;
    slug: string;
    status: "published" | "draft";
    author: string;
    publishedAt: string | null;
    views: number;
    category: string;
    tags: string[];
    excerpt: string;
}
interface BlogManagementProps {
    initialData: BlogPost[];
}
export default function BlogManagement({ initialData }: BlogManagementProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map