"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from "next/link";
import { MapPin, Facebook, Instagram, Twitter, Youtube, Music, Shield, Award, CheckCircle } from "lucide-react";
export default function PreferredFooter() {
    return (_jsxs("footer", { className: "relative bg-gradient-to-br from-gray-900 via-black to-gray-900", children: [_jsxs("div", { className: "absolute inset-0 opacity-5", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-amber-500/10" }), _jsx("div", { className: "absolute left-1/4 top-0 size-96 rounded-full bg-yellow-400/5 blur-3xl" }), _jsx("div", { className: "absolute bottom-0 right-1/4 size-96 rounded-full bg-white/5 blur-3xl" })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "border-b border-white/10 py-20", children: _jsx("div", { className: "mx-auto max-w-7xl px-4", children: _jsxs("div", { className: "grid gap-12 md:grid-cols-2 lg:grid-cols-4", children: [_jsxs("div", { className: "lg:col-span-1", children: [_jsxs("div", { className: "mb-8 flex items-center space-x-3", children: [_jsx("div", { className: "rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 p-3 shadow-lg shadow-yellow-400/20", children: _jsx(MapPin, { className: "size-7 font-bold text-black" }) }), _jsxs("div", { className: "text-xl font-bold", children: [_jsx("span", { className: "text-white", children: "WE" }), _jsx("span", { className: "text-yellow-400", children: " ARE " }), _jsx("span", { className: "text-white", children: "EXCURSIONS" })] })] }), _jsx("p", { className: "mb-8 leading-relaxed text-gray-300", children: "Your gateway to authentic Mallorca experiences. Discover the island's hidden gems with our carefully curated activities and expert local guides." }), _jsxs("div", { className: "space-y-6", children: [_jsx("h4", { className: "font-semibold text-yellow-400", children: "Follow Our Adventures" }), _jsx("div", { className: "flex space-x-4", children: [
                                                            {
                                                                name: "Facebook",
                                                                icon: Facebook,
                                                                href: "#",
                                                                color: "hover:bg-blue-600"
                                                            },
                                                            {
                                                                name: "Instagram",
                                                                icon: Instagram,
                                                                href: "#",
                                                                color: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500"
                                                            },
                                                            {
                                                                name: "Twitter",
                                                                icon: Twitter,
                                                                href: "#",
                                                                color: "hover:bg-sky-500"
                                                            },
                                                            {
                                                                name: "YouTube",
                                                                icon: Youtube,
                                                                href: "#",
                                                                color: "hover:bg-red-600"
                                                            },
                                                            {
                                                                name: "TikTok",
                                                                icon: Music,
                                                                href: "#",
                                                                color: "hover:bg-black"
                                                            }
                                                        ].map(social => (_jsx("a", { href: social.href, className: `group flex size-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`, "aria-label": `Follow us on ${social.name}`, children: _jsx(social.icon, { className: "size-5 text-white transition-transform duration-300 group-hover:scale-110" }) }, social.name))) })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "mb-8 text-lg font-bold text-yellow-400", children: "Activities" }), _jsx("ul", { className: "space-y-4", children: [
                                                    { label: "All Activities", href: "/activities" },
                                                    {
                                                        label: "Water Sports",
                                                        href: "/activities?category=water_sports"
                                                    },
                                                    {
                                                        label: "Land Adventures",
                                                        href: "/activities?category=land_adventures"
                                                    },
                                                    {
                                                        label: "Cultural Tours",
                                                        href: "/activities?category=cultural"
                                                    },
                                                    {
                                                        label: "Nightlife",
                                                        href: "/activities?category=nightlife"
                                                    },
                                                    {
                                                        label: "Featured Activities",
                                                        href: "/activities?featured=true"
                                                    },
                                                    {
                                                        label: "Family Friendly",
                                                        href: "/activities?family=true"
                                                    }
                                                ].map(link => (_jsx("li", { children: _jsx(Link, { href: link.href, className: "inline-block text-gray-300 transition-all duration-200 hover:translate-x-2 hover:text-yellow-400", children: link.label }) }, link.href))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "mb-8 text-lg font-bold text-yellow-400", children: "Company" }), _jsx("ul", { className: "space-y-4", children: [
                                                    { label: "About Us", href: "/about" },
                                                    { label: "Contact", href: "/contact" },
                                                    { label: "Pricing", href: "/pricing" },
                                                    { label: "My Bookings", href: "/bookings" },
                                                    { label: "Wishlist", href: "/wishlist" },
                                                    { label: "Gift Cards", href: "/gift-cards" },
                                                    { label: "Careers", href: "/careers" }
                                                ].map(link => (_jsx("li", { children: _jsx(Link, { href: link.href, className: "inline-block text-gray-300 transition-all duration-200 hover:translate-x-2 hover:text-yellow-400", children: link.label }) }, link.href))) })] }), _jsxs("div", { children: [_jsx("h4", { className: "mb-8 text-lg font-bold text-yellow-400", children: "Contact & Support" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "rounded-lg bg-yellow-400/10 p-2", children: _jsx(MapPin, { className: "size-5 text-yellow-400" }) }), _jsxs("div", { className: "text-gray-300", children: [_jsx("p", { className: "font-semibold text-white", children: "Palma de Mallorca" }), _jsx("p", { className: "text-sm", children: "Balearic Islands, Spain" })] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "rounded-lg bg-yellow-400/10 p-2", children: _jsx("span", { className: "text-yellow-400", children: "\uD83D\uDCDE" }) }), _jsx("a", { href: "tel:+34971123456", className: "font-medium text-gray-300 transition-colors hover:text-yellow-400", children: "+34 971 123 456" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "rounded-lg bg-yellow-400/10 p-2", children: _jsx("span", { className: "text-yellow-400", children: "\u2709\uFE0F" }) }), _jsx("a", { href: "mailto:hello@weareexcursions.com", className: "font-medium text-gray-300 transition-colors hover:text-yellow-400", children: "hello@weareexcursions.com" })] })] })] })] }) }) }), _jsx("div", { className: "py-8", children: _jsx("div", { className: "mx-auto max-w-7xl px-4", children: _jsxs("div", { className: "flex flex-col items-center justify-between gap-6 md:flex-row", children: [_jsx("div", { className: "text-center text-gray-400 md:text-left", children: _jsxs("p", { children: ["\u00A9 ", new Date().getFullYear(), " We Are Excursions. All rights reserved."] }) }), _jsxs("div", { className: "flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Shield, { className: "size-4 text-yellow-400" }), _jsx("span", { children: "SSL Secured" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Award, { className: "size-4 text-yellow-400" }), _jsx("span", { children: "TripAdvisor Certified" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "size-4 text-yellow-400" }), _jsx("span", { children: "GDPR Compliant" })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-yellow-400", children: "\uD83C\uDF0D" }), _jsxs("select", { className: "rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm transition-colors focus:border-yellow-400 focus:outline-none", children: [_jsx("option", { value: "en", className: "bg-gray-800", children: "English" }), _jsx("option", { value: "es", className: "bg-gray-800", children: "Espa\u00F1ol" }), _jsx("option", { value: "de", className: "bg-gray-800", children: "Deutsch" }), _jsx("option", { value: "fr", className: "bg-gray-800", children: "Fran\u00E7ais" }), _jsx("option", { value: "it", className: "bg-gray-800", children: "Italiano" })] })] })] }) }) })] })] }));
}
//# sourceMappingURL=component.js.map