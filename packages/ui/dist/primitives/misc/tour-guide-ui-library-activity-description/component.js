"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
<ai_context>
Enhanced Activity Description - Dark Glassmorphism Theme
Features expandable sections with improved visual hierarchy and modern design.
Matches the new activity detail page design system with proper content organization.
</ai_context>
*/
import { useState } from "react";
import { Check, X, ChevronDown, ChevronUp, MapPin, Clock, Calendar, Star, Globe, Users, Shield, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
// Enhanced glassmorphism card component
function GlassmorphismCard({ children, className = "" }) {
    return (_jsx("div", { className: `rounded-xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-sm ${className}`, children: children }));
}
export default function ActivityDescription({ activity }) {
    const [expandedSection, setExpandedSection] = useState("highlights");
    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };
    // Transform database data to match expected interface
    const sections = [
        {
            id: "highlights",
            title: "Activity Highlights",
            items: [
                "Skip-the-line access to Palma Cathedral",
                "Expert art historian guide",
                "Explore Gothic and Renaissance architecture",
                "Learn about 700 years of history",
                "Small group experience (max 25 people)"
            ],
            icon: Star,
            color: "text-yellow-400"
        },
        {
            id: "bring",
            title: "What to Bring",
            items: activity.whatToBring || [
                "Valid driving license",
                "Closed-toe shoes",
                "Long pants",
                "Sunglasses",
                "Sunscreen",
                "Camera"
            ],
            icon: Info,
            color: "text-blue-400"
        },
        {
            id: "requirements",
            title: "Important Information",
            items: [
                `Minimum age: ${activity.minAge} years`,
                `Maximum participants: ${activity.maxParticipants}`,
                "Not suitable for mobility impaired",
                "Cathedral dress code applies",
                "Tour operates in English and Spanish"
            ],
            icon: Shield,
            color: "text-green-400"
        }
    ];
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(GlassmorphismCard, { children: [_jsx("h2", { className: "mb-6 text-2xl font-bold text-white", children: "About This Experience" }), _jsxs("div", { className: "prose prose-lg max-w-none", children: [_jsx("p", { className: "text-lg leading-relaxed text-white/80", children: activity.description ||
                                    "Discover the magnificent Palma Cathedral, one of the finest examples of Gothic architecture in Europe. This guided tour takes you through centuries of history, from its construction beginning in 1229 to the modern art installations by renowned artists. Explore the soaring nave, intricate stone work, and learn about the cathedral's role in Mallorcan culture and history." }), _jsxs("div", { className: "mt-6 grid gap-4 md:grid-cols-3", children: [_jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 p-3", children: [_jsx(Clock, { className: "size-5 text-yellow-400" }), _jsxs("div", { children: [_jsxs("p", { className: "font-medium text-white", children: [Math.floor(activity.durationMinutes / 60), "h Duration"] }), _jsx("p", { className: "text-sm text-white/60", children: "Guided experience" })] })] }), _jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 p-3", children: [_jsx(Users, { className: "size-5 text-yellow-400" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: "Small Groups" }), _jsxs("p", { className: "text-sm text-white/60", children: ["Max ", activity.maxParticipants, " people"] })] })] }), _jsxs("div", { className: "flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 p-3", children: [_jsx(Globe, { className: "size-5 text-yellow-400" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-white", children: "Multi-language" }), _jsx("p", { className: "text-sm text-white/60", children: "English, Spanish" })] })] })] })] })] }), _jsx("div", { className: "space-y-4", children: sections.map(section => (_jsxs(GlassmorphismCard, { className: "overflow-hidden p-0", children: [_jsxs("button", { className: "flex w-full items-center justify-between p-6 text-left transition-all hover:bg-white/5", onClick: () => toggleSection(section.id), children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(section.icon, { className: `size-6 ${section.color}` }), _jsx("h3", { className: "text-lg font-semibold text-white", children: section.title }), _jsx(Badge, { className: "border-white/30 bg-white/20 text-white/80", children: section.items.length })] }), expandedSection === section.id ? (_jsx(ChevronUp, { className: "size-5 text-white/60" })) : (_jsx(ChevronDown, { className: "size-5 text-white/60" }))] }), expandedSection === section.id && (_jsx("div", { className: "border-t border-white/10 px-6 pb-6", children: _jsx("ul", { className: "mt-4 space-y-3", children: section.items.map((item, index) => (_jsxs("li", { className: "flex items-start gap-3 text-white/80", children: [section.id === "excluded" ? (_jsx(X, { className: "mt-0.5 size-4 shrink-0 text-red-400" })) : (_jsx(Check, { className: "mt-0.5 size-4 shrink-0 text-green-400" })), _jsx("span", { className: "leading-relaxed", children: item })] }, index))) }) }))] }, section.id))) }), _jsxs(GlassmorphismCard, { children: [_jsxs("h3", { className: "mb-6 flex items-center gap-2 text-xl font-semibold text-white", children: [_jsx(MapPin, { className: "size-6 text-yellow-400" }), "Meeting Point & Logistics"] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-4 rounded-lg border border-white/10 bg-black/20 p-4", children: [_jsx(MapPin, { className: "mt-1 size-5 shrink-0 text-yellow-400" }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "mb-1 font-medium text-white", children: "Pla\u00E7a de la Seu, 07001 Palma" }), _jsx("p", { className: "mb-2 text-white/70", children: "Meet at the main entrance of Palma Cathedral" }), _jsxs("div", { className: "flex flex-wrap gap-2 text-sm", children: [_jsxs(Badge, { className: "border-yellow-500/30 bg-yellow-500/20 text-yellow-400", children: [_jsx(Clock, { className: "mr-1 size-3" }), "Arrive 15 min early"] }), _jsxs(Badge, { className: "border-blue-500/30 bg-blue-500/20 text-blue-400", children: [_jsx(MapPin, { className: "mr-1 size-3" }), "Easy to find"] })] })] })] }), _jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [_jsxs("div", { className: "rounded-lg border border-white/10 bg-black/20 p-4", children: [_jsx("h4", { className: "mb-2 font-medium text-white", children: "\uD83D\uDE87 Public Transport" }), _jsx("p", { className: "text-sm text-white/70", children: "Bus lines 3, 20, 25 to Plaza de la Reina" })] }), _jsxs("div", { className: "rounded-lg border border-white/10 bg-black/20 p-4", children: [_jsx("h4", { className: "mb-2 font-medium text-white", children: "\uD83D\uDE97 Parking" }), _jsx("p", { className: "text-sm text-white/70", children: "Parc de la Mar underground parking nearby" })] })] })] })] }), _jsxs(GlassmorphismCard, { children: [_jsx("h3", { className: "mb-6 text-xl font-semibold text-white", children: "Booking Policies" }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { className: "space-y-3 rounded-lg border border-white/10 bg-black/20 p-4", children: [_jsxs("h4", { className: "flex items-center gap-2 font-semibold text-white", children: [_jsx(Calendar, { className: "size-5 text-green-400" }), "Cancellation Policy"] }), _jsx("p", { className: "text-sm leading-relaxed text-white/80", children: "Free cancellation up to 24 hours before the activity starts. Cancel via email or phone for full refund." })] }), _jsxs("div", { className: "space-y-3 rounded-lg border border-white/10 bg-black/20 p-4", children: [_jsxs("h4", { className: "flex items-center gap-2 font-semibold text-white", children: [_jsx(Shield, { className: "size-5 text-blue-400" }), "Weather Policy"] }), _jsx("p", { className: "text-sm leading-relaxed text-white/80", children: "Tour operates in all weather conditions. Indoor cathedral tour continues regardless of weather." })] })] })] })] }));
}
//# sourceMappingURL=component.js.map