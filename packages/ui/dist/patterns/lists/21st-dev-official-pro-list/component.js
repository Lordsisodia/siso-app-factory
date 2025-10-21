"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { UserAvatar } from "@/components/ui/user-avatar";
import { ProCardSkeleton } from "@/components/ui/skeletons";
import { useClerkSupabaseClient } from "@/lib/clerk";
export function ProList({ className }) {
    const supabaseWithAdminAccess = useClerkSupabaseClient();
    const { data: publishers, isLoading } = useQuery({
        queryKey: ["pro-publishers"],
        queryFn: async () => {
            const { data, error } = await supabaseWithAdminAccess.rpc("get_pro_publishers");
            if (error)
                throw error;
            if (!data)
                return [];
            const publishersWithImages = data.map((publisher) => ({
                ...publisher,
                image: publisher.pro_banner_url,
                paypal_email: null,
                role: null,
            }));
            return publishersWithImages;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });
    if (isLoading) {
        return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 list-none pb-10", children: Array(13)
                .fill(0)
                .map((_, index) => (_jsx(ProCardSkeleton, {}, index))) }));
    }
    return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 list-none pb-10", children: publishers?.map((publisher) => (_jsxs("div", { className: "p-[1px]", children: [_jsx(Link, { href: publisher.pro_referral_url, target: "_blank", rel: "noopener noreferrer", className: "block cursor-pointer", children: _jsx("div", { className: "relative aspect-[16/10] mb-3 group", children: _jsx("div", { className: "absolute inset-0", children: _jsxs("div", { className: "relative w-full h-full rounded-lg shadow-base overflow-hidden", children: [publisher.image ? (_jsx(Image, { src: publisher.image, alt: `${publisher.name || publisher.username}'s Pro Components`, fill: true, className: "object-cover object-top rounded-lg" })) : (_jsx("div", { className: "w-full h-full bg-gray-100 flex items-center justify-center rounded-lg", children: _jsx("span", { className: "text-gray-400", children: "No preview available" }) })), _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-foreground/0 to-foreground/5 rounded-lg" })] }) }) }) }), _jsxs("div", { className: "flex space-x-3 items-center", children: [_jsx(UserAvatar, { src: publisher.display_image_url ||
                                publisher.image_url ||
                                "/placeholder.svg", alt: publisher.display_name ||
                                publisher.name ||
                                publisher.username ||
                                "", size: 32, user: {
                                ...publisher,
                                is_partner: false,
                                bundles_fee: 0,
                                stripe_id: null,
                            }, isClickable: true }), _jsxs("div", { className: "flex items-center justify-between flex-grow min-w-0", children: [_jsx(Link, { href: publisher.pro_referral_url || "#", className: "block cursor-pointer min-w-0 flex-1 mr-3", children: _jsx("h2", { className: "text-sm font-medium text-foreground truncate", children: publisher.display_name ||
                                            publisher.name ||
                                            publisher.username }) }), _jsxs(Link, { target: "_blank", href: publisher.pro_referral_url, className: "text-xs text-muted-foreground whitespace-nowrap shrink-0 group/arrow", children: ["Open", " ", _jsx("span", { className: "inline-block transition-transform duration-200 group-hover:translate-x-[2px]", children: "\u2192" })] })] })] })] }, publisher.id))) }));
}
//# sourceMappingURL=component.js.map