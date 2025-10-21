import { type EnrichedTweet, type TweetProps } from "react-tweet";
import { type Tweet } from "react-tweet/api";
export declare const truncate: (str: string | null, length: number) => string | null;
export declare const TweetSkeleton: ({ className, ...props }: {
    className?: string;
    [key: string]: unknown;
}) => import("react/jsx-runtime").JSX.Element;
export declare const TweetNotFound: ({ className, ...props }: {
    className?: string;
    [key: string]: unknown;
}) => import("react/jsx-runtime").JSX.Element;
export declare const TweetHeader: ({ tweet }: {
    tweet: EnrichedTweet;
}) => import("react/jsx-runtime").JSX.Element;
export declare const TweetBody: ({ tweet }: {
    tweet: EnrichedTweet;
}) => import("react/jsx-runtime").JSX.Element;
export declare const TweetMedia: ({ tweet }: {
    tweet: EnrichedTweet;
}) => import("react/jsx-runtime").JSX.Element | null;
export declare const MagicTweet: ({ tweet, className, ...props }: {
    tweet: Tweet;
    className?: string;
}) => import("react/jsx-runtime").JSX.Element;
/**
 * TweetCard (Server Side Only)
 */
export declare const TweetCard: ({ id, components, fallback, onError, ...props }: TweetProps & {
    className?: string;
}) => Promise<import("react/jsx-runtime").JSX.Element>;
//# sourceMappingURL=component.d.ts.map