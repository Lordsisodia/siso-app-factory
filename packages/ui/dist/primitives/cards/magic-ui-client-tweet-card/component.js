"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useTweet } from "react-tweet";
import { MagicTweet, TweetNotFound, TweetSkeleton, } from "@/registry/magicui/tweet-card";
export const ClientTweetCard = ({ id, apiUrl, fallback = _jsx(TweetSkeleton, {}), components, fetchOptions, onError, ...props }) => {
    const { data, error, isLoading } = useTweet(id, apiUrl, fetchOptions);
    if (isLoading)
        return fallback;
    if (error || !data) {
        const NotFound = components?.TweetNotFound || TweetNotFound;
        return _jsx(NotFound, { error: onError ? onError(error) : error });
    }
    return _jsx(MagicTweet, { tweet: data, ...props });
};
//# sourceMappingURL=component.js.map