interface ReplyProps {
    authorName: string;
    authorHandle: string;
    authorImage: string;
    content: string;
    isVerified?: boolean;
    timestamp: string;
}
interface XCardProps {
    link?: string;
    authorName?: string;
    authorHandle?: string;
    authorImage?: string;
    content?: string[];
    isVerified?: boolean;
    timestamp?: string;
    reply?: ReplyProps;
}
declare function XCard({ link, authorName, authorHandle, authorImage, content, isVerified, timestamp, reply, }: XCardProps): import("react/jsx-runtime").JSX.Element;
export { XCard };
//# sourceMappingURL=component.d.ts.map