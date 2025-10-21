import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @next/next/no-img-element */
import { Suspense } from "react";
import { enrichTweet } from "react-tweet";
import { getTweet } from "react-tweet/api";
import { cn } from "@/lib/utils";
const Twitter = ({ className, ...props }) => (_jsx("svg", { stroke: "currentColor", fill: "currentColor", strokeWidth: "0", viewBox: "0 0 24 24", height: "1em", width: "1em", xmlns: "http://www.w3.org/2000/svg", className: className, ...props, children: _jsxs("g", { children: [_jsx("path", { fill: "none", d: "M0 0h24v24H0z" }), _jsx("path", { d: "M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" })] }) }));
const Verified = ({ className, ...props }) => (_jsx("svg", { "aria-label": "Verified Account", viewBox: "0 0 24 24", className: className, ...props, children: _jsx("g", { fill: "currentColor", children: _jsx("path", { d: "M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" }) }) }));
export const truncate = (str, length) => {
    if (!str || str.length <= length)
        return str;
    return `${str.slice(0, length - 3)}...`;
};
const Skeleton = ({ className, ...props }) => {
    return (_jsx("div", { className: cn("bg-primary/10 rounded-md", className), ...props }));
};
export const TweetSkeleton = ({ className, ...props }) => (_jsxs("div", { className: cn("flex size-full max-h-max min-w-72 flex-col gap-2 rounded-lg border p-4", className), ...props, children: [_jsxs("div", { className: "flex flex-row gap-2", children: [_jsx(Skeleton, { className: "size-10 shrink-0 rounded-full" }), _jsx(Skeleton, { className: "h-10 w-full" })] }), _jsx(Skeleton, { className: "h-20 w-full" })] }));
export const TweetNotFound = ({ className, ...props }) => (_jsx("div", { className: cn("flex size-full flex-col items-center justify-center gap-2 rounded-lg border p-4", className), ...props, children: _jsx("h3", { children: "Tweet not found" }) }));
export const TweetHeader = ({ tweet }) => (_jsxs("div", { className: "flex flex-row justify-between tracking-tight", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("a", { href: tweet.user.url, target: "_blank", rel: "noreferrer", children: _jsx("img", { title: `Profile picture of ${tweet.user.name}`, alt: tweet.user.screen_name, height: 48, width: 48, src: tweet.user.profile_image_url_https, className: "overflow-hidden rounded-full border border-transparent" }) }), _jsxs("div", { children: [_jsxs("a", { href: tweet.user.url, target: "_blank", rel: "noreferrer", className: "flex items-center font-semibold whitespace-nowrap", children: [truncate(tweet.user.name, 20), tweet.user.verified ||
                                    (tweet.user.is_blue_verified && (_jsx(Verified, { className: "ml-1 inline size-4 text-blue-500" })))] }), _jsx("div", { className: "flex items-center space-x-1", children: _jsxs("a", { href: tweet.user.url, target: "_blank", rel: "noreferrer", className: "text-sm text-gray-500 transition-all duration-75", children: ["@", truncate(tweet.user.screen_name, 16)] }) })] })] }), _jsxs("a", { href: tweet.url, target: "_blank", rel: "noreferrer", children: [_jsx("span", { className: "sr-only", children: "Link to tweet" }), _jsx(Twitter, { className: "size-5 items-start text-[#3BA9EE] transition-all ease-in-out hover:scale-105" })] })] }));
export const TweetBody = ({ tweet }) => (_jsx("div", { className: "leading-normal tracking-tighter break-words", children: tweet.entities.map((entity, idx) => {
        switch (entity.type) {
            case "url":
            case "symbol":
            case "hashtag":
            case "mention":
                return (_jsx("a", { href: entity.href, target: "_blank", rel: "noopener noreferrer", className: "text-sm font-normal text-gray-500", children: _jsx("span", { children: entity.text }) }, idx));
            case "text":
                return (_jsx("span", { className: "text-sm font-normal", dangerouslySetInnerHTML: { __html: entity.text } }, idx));
        }
    }) }));
export const TweetMedia = ({ tweet }) => {
    if (!tweet.video && !tweet.photos)
        return null;
    return (_jsxs("div", { className: "flex flex-1 items-center justify-center", children: [tweet.video && (_jsxs("video", { poster: tweet.video.poster, autoPlay: true, loop: true, muted: true, playsInline: true, className: "rounded-xl border shadow-sm", children: [_jsx("source", { src: tweet.video.variants[0].src, type: "video/mp4" }), "Your browser does not support the video tag."] })), tweet.photos && (_jsxs("div", { className: "relative flex transform-gpu snap-x snap-mandatory gap-4 overflow-x-auto", children: [_jsx("div", { className: "shrink-0 snap-center sm:w-2" }), tweet.photos.map((photo) => (_jsx("img", { src: photo.url, width: photo.width, height: photo.height, title: "Photo by " + tweet.user.name, alt: tweet.text, className: "h-64 w-5/6 shrink-0 snap-center snap-always rounded-xl border object-cover shadow-sm" }, photo.url))), _jsx("div", { className: "shrink-0 snap-center sm:w-2" })] })), !tweet.video &&
                !tweet.photos &&
                // @ts-expect-error package doesn't have type definitions
                tweet?.card?.binding_values?.thumbnail_image_large?.image_value.url && (_jsx("img", { src: 
                // @ts-expect-error package doesn't have type definitions
                tweet.card.binding_values.thumbnail_image_large.image_value.url, className: "h-64 rounded-xl border object-cover shadow-sm", alt: tweet.text }))] }));
};
export const MagicTweet = ({ tweet, className, ...props }) => {
    const enrichedTweet = enrichTweet(tweet);
    return (_jsxs("div", { className: cn("relative flex h-fit w-full max-w-lg flex-col gap-2 overflow-hidden rounded-lg border p-4 backdrop-blur-md", className), ...props, children: [_jsx(TweetHeader, { tweet: enrichedTweet }), _jsx(TweetBody, { tweet: enrichedTweet }), _jsx(TweetMedia, { tweet: enrichedTweet })] }));
};
/**
 * TweetCard (Server Side Only)
 */
export const TweetCard = async ({ id, components, fallback = _jsx(TweetSkeleton, {}), onError, ...props }) => {
    const tweet = id
        ? await getTweet(id).catch((err) => {
            if (onError) {
                onError(err);
            }
            else {
                console.error(err);
            }
        })
        : undefined;
    if (!tweet) {
        const NotFound = components?.TweetNotFound || TweetNotFound;
        return _jsx(NotFound, { ...props });
    }
    return (_jsx(Suspense, { fallback: fallback, children: _jsx(MagicTweet, { tweet: tweet, ...props }) }));
};
//# sourceMappingURL=component.js.map