export interface Gallery4Item {
    id: string;
    title: string;
    description: string;
    href: string;
    image: string;
}
export interface Gallery4Props {
    title?: string;
    description?: string;
    items: Gallery4Item[];
}
declare const Gallery4: ({ title, description, items, }: Gallery4Props) => import("react/jsx-runtime").JSX.Element;
export { Gallery4 };
//# sourceMappingURL=component.d.ts.map