import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { UserAvatar } from "@/components/ui/user-avatar";
import Link from "next/link";
export function CollectionHeader({ collection }) {
    return (_jsxs("div", { className: "mb-8", children: [_jsx("h1", { className: "text-3xl font-bold mb-2", children: collection.name }), collection.description && (_jsx("p", { className: "text-muted-foreground", children: collection.description })), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx("span", { className: "text-sm text-muted-foreground", children: "Created by" }), _jsx("div", { className: "flex items-center gap-2", children: _jsxs(Link, { href: `/${collection.user_data?.display_username || collection.user_data?.username}`, className: "text-sm font-medium pl-1 pr-2 py-1 rounded-md hover:bg-muted transition-colors flex items-center gap-2", children: [_jsx(UserAvatar, { user: collection.user_data, src: collection.user_data?.display_image_url ||
                                        collection.user_data?.image_url, alt: collection.user_data?.display_name ||
                                        collection.user_data?.name ||
                                        "Unknown", size: 24, isClickable: true, skipLink: true }), collection.user_data?.display_name ||
                                    collection.user_data?.name ||
                                    "Unknown"] }) })] })] }));
}
//# sourceMappingURL=component.js.map