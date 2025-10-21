"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
<ai_context>
Enhanced LeafletMap component with dark theme styling and premium design.
Features custom dark map tiles, improved markers, glassmorphism popups, and better legend.
Integrates with real activity data instead of hard-coded locations.
</ai_context>
*/
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Star, Clock, Users, ArrowRight, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// Import Leaflet CSS
import "leaflet/dist/leaflet.css";
// Dynamic import to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), {
    ssr: false
});
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), {
    ssr: false
});
// Category styling configuration
const categoryInfo = {
    water_sports: {
        name: "Water Adventures",
        color: "#3B82F6",
        lightColor: "bg-blue-50",
        borderColor: "border-blue-200",
        textColor: "text-blue-400",
        bgColor: "bg-blue-500/10",
        gradient: "from-blue-500 to-cyan-400",
        description: "Ocean & water-based activities",
        emoji: "🌊"
    },
    land_adventures: {
        name: "Mountain & Land",
        color: "#10B981",
        lightColor: "bg-green-50",
        borderColor: "border-green-200",
        textColor: "text-green-400",
        bgColor: "bg-green-500/10",
        gradient: "from-green-500 to-emerald-400",
        description: "Hiking & outdoor adventures",
        emoji: "🏔️"
    },
    cultural: {
        name: "Cultural Experiences",
        color: "#8B5CF6",
        lightColor: "bg-purple-50",
        borderColor: "border-purple-200",
        textColor: "text-purple-400",
        bgColor: "bg-purple-500/10",
        gradient: "from-purple-500 to-violet-400",
        description: "History, art & local culture",
        emoji: "🏛️"
    },
    nightlife: {
        name: "Nightlife",
        color: "#F59E0B",
        lightColor: "bg-orange-50",
        borderColor: "border-orange-200",
        textColor: "text-orange-400",
        bgColor: "bg-orange-500/10",
        gradient: "from-orange-500 to-amber-400",
        description: "Clubs, bars & party experiences",
        emoji: "🎉"
    },
    family_fun: {
        name: "Family Fun",
        color: "#EF4444",
        lightColor: "bg-rose-50",
        borderColor: "border-rose-200",
        textColor: "text-rose-400",
        bgColor: "bg-rose-500/10",
        gradient: "from-rose-500 to-pink-400",
        description: "Family-friendly activities",
        emoji: "👨‍👩‍👧‍👦"
    },
    food_wine: {
        name: "Food & Wine",
        color: "#F59E0B",
        lightColor: "bg-amber-50",
        borderColor: "border-amber-200",
        textColor: "text-amber-400",
        bgColor: "bg-amber-500/10",
        gradient: "from-amber-500 to-yellow-400",
        description: "Culinary experiences",
        emoji: "🍷"
    }
};
// Enhanced Legend Component
function MapLegend({ isVisible, onClose, activities, visibleCategories, onCategoryToggle }) {
    if (!isVisible)
        return null;
    // Count activities by category
    const categoryCounts = activities.reduce((acc, activity) => {
        acc[activity.category] = (acc[activity.category] || 0) + 1;
        return acc;
    }, {});
    return (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 }, className: "absolute left-4 top-16 z-20 w-72 overflow-hidden rounded-lg border border-gray-700/50 bg-black/80 p-4 backdrop-blur-xl", children: [_jsxs("div", { className: "mb-3 flex items-center justify-between", children: [_jsx("h3", { className: "font-semibold text-white", children: "Activity Categories" }), _jsx(Button, { size: "sm", variant: "ghost", onClick: onClose, className: "size-6 p-0 text-gray-400 hover:text-white", children: _jsx(X, { className: "size-4" }) })] }), _jsx("div", { className: "space-y-2", children: Object.entries(categoryInfo).map(([key, info]) => {
                    const count = categoryCounts[key] || 0;
                    const isVisible = visibleCategories.has(key);
                    if (count === 0)
                        return null;
                    return (_jsx("button", { onClick: () => onCategoryToggle(key), className: `w-full rounded-lg border p-3 text-left transition-all duration-200 ${isVisible
                            ? `${info.borderColor} ${info.bgColor} opacity-100`
                            : "border-gray-700 bg-gray-800/50 opacity-60"}`, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "size-3 rounded-full", style: { backgroundColor: info.color } }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm", children: info.emoji }), _jsx("span", { className: `text-sm font-medium ${info.textColor}`, children: info.name })] }), _jsxs("p", { className: "text-xs text-gray-400", children: [count, " activities"] })] })] }), _jsx("div", { className: `text-xs ${info.textColor}`, children: isVisible ? "✓" : "" })] }) }, key));
                }) })] }));
}
// Create custom marker icon
function createCustomIcon(category) {
    if (typeof window === "undefined" || typeof document === "undefined")
        return null;
    try {
        const L = require("leaflet");
        const info = categoryInfo[category];
        if (!L || !info)
            return null;
        return L.divIcon({
            html: `
        <div class="relative">
          <div class="flex size-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br" style="background: linear-gradient(135deg, ${info.color}, ${info.color}dd); box-shadow: 0 4px 12px rgba(0,0,0,0.3)">
            <span class="text-sm">${info.emoji}</span>
          </div>
          <div class="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 border border-white" style="background: ${info.color}"></div>
        </div>
      `,
            className: "custom-div-icon",
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
    }
    catch (error) {
        console.error("Error creating custom icon:", error);
        return null;
    }
}
// Generate location coordinates for activities (simplified approach)
function getActivityLocation(activity) {
    const locations = {
        Palma: [39.5696, 2.6502],
        Magaluf: [39.5099, 2.5344],
        Alcudia: [39.8522, 3.1215],
        Pollenca: [39.8708, 3.0158],
        Soller: [39.7817, 2.7186],
        Deia: [39.7442, 2.6486],
        Valldemossa: [39.7099, 2.6229],
        "Cala Mondragó": [39.3367, 3.2032],
        "Es Trenc": [39.3547, 2.9736],
        Formentor: [39.9565, 3.208],
        Andratx: [39.5436, 2.3893],
        Llucmajor: [39.4822, 2.886]
    };
    // Try to match activity location with predefined coordinates
    const location = activity.location;
    // Direct match
    if (locations[location]) {
        return locations[location];
    }
    // Partial match
    for (const [key, coords] of Object.entries(locations)) {
        if (location.toLowerCase().includes(key.toLowerCase()) ||
            key.toLowerCase().includes(location.toLowerCase())) {
            return coords;
        }
    }
    // Category-based fallback locations
    const categoryLocations = {
        water_sports: [39.5696, 2.6502], // Palma Bay
        land_adventures: [39.7817, 2.7186], // Soller/Mountains
        cultural: [39.5663, 2.6309], // Historic Palma
        nightlife: [39.5099, 2.5344], // Magaluf
        family_fun: [39.5696, 2.6502], // Palma
        food_wine: [39.5663, 2.6309] // Palma center
    };
    return categoryLocations[activity.category] || [39.5696, 2.6502];
}
export function EnhancedLeafletMap({ activities, height = "500px", className = "", showLegend = true }) {
    const [showLegendPanel, setShowLegendPanel] = useState(false);
    const [visibleCategories, setVisibleCategories] = useState(new Set(Object.keys(categoryInfo)));
    const toggleLegend = () => {
        setShowLegendPanel(!showLegendPanel);
    };
    const handleCategoryToggle = (category) => {
        const newVisible = new Set(visibleCategories);
        if (newVisible.has(category)) {
            newVisible.delete(category);
        }
        else {
            newVisible.add(category);
        }
        setVisibleCategories(newVisible);
    };
    // Filter activities based on visible categories
    const visibleActivities = activities.filter(activity => visibleCategories.has(activity.category));
    try {
        return (_jsxs("div", { className: `relative overflow-hidden rounded-lg border border-gray-700/50 shadow-2xl ${className}`, style: { height }, children: [_jsxs(MapContainer, { center: [39.6953, 2.9712], zoom: 10, style: { height: "100%", width: "100%" }, className: "leaflet-container-dark", scrollWheelZoom: true, zoomControl: true, children: [_jsx(TileLayer, { attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", maxZoom: 19, minZoom: 8 }), visibleActivities.map((activity, index) => {
                            const position = getActivityLocation(activity);
                            const icon = createCustomIcon(activity.category);
                            if (!icon)
                                return null;
                            return (_jsx(Marker, { position: position, icon: icon, children: _jsx(Popup, { className: "custom-popup", children: _jsxs("div", { className: "w-64 overflow-hidden rounded-lg border border-gray-700/50 bg-black/90 backdrop-blur-xl", children: [activity.images[0]?.imageUrl && (_jsxs("div", { className: "relative h-32 overflow-hidden", children: [_jsx("img", { src: activity.images[0].imageUrl, alt: activity.title, className: "size-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" })] })), _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "mb-2 flex items-start justify-between", children: [_jsx("h3", { className: "text-sm font-semibold leading-tight text-white", children: activity.title }), _jsx(Badge, { className: `ml-2 ${categoryInfo[activity.category]?.bgColor} ${categoryInfo[activity.category]?.textColor} border-0`, children: categoryInfo[activity.category]?.emoji })] }), _jsx("p", { className: "mb-3 line-clamp-2 text-xs text-gray-300", children: activity.shortDescription }), _jsxs("div", { className: "mb-3 flex items-center gap-4 text-xs text-gray-400", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Clock, { className: "size-3" }), _jsxs("span", { children: [Math.floor(activity.durationMinutes / 60), "h"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "size-3" }), _jsxs("span", { children: ["Max ", activity.maxParticipants] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "size-3 text-yellow-400" }), _jsx("span", { children: activity.avgRating })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [activity.pricing[0] && (_jsxs("p", { className: "text-sm font-semibold text-orange-400", children: ["\u20AC", activity.pricing[0].basePrice] })), _jsx("p", { className: "text-xs text-gray-400", children: activity.location })] }), _jsx(Button, { size: "sm", className: "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600", onClick: () => window.open(`/activities/${activity.slug}`, "_blank"), children: _jsx(ArrowRight, { className: "size-3" }) })] })] })] }) }) }, `${activity.id}-${index}`));
                        })] }), _jsx("div", { className: "absolute left-4 top-4 z-10 flex flex-col gap-2", children: showLegend && (_jsxs(Button, { size: "sm", onClick: toggleLegend, className: "border-gray-600/50 bg-black/80 text-gray-300 backdrop-blur-xl hover:bg-black/90 hover:text-white", variant: "outline", children: [_jsx(Filter, { className: "mr-1 size-4" }), showLegendPanel ? "Hide" : "Show", " Filters"] })) }), showLegend && (_jsx(MapLegend, { isVisible: showLegendPanel, onClose: () => setShowLegendPanel(false), activities: activities, visibleCategories: visibleCategories, onCategoryToggle: handleCategoryToggle })), _jsx("div", { className: "absolute bottom-4 right-4 z-10", children: _jsxs(Badge, { className: "border-gray-600/50 bg-black/80 text-gray-300 backdrop-blur-xl", children: [visibleActivities.length, " activities"] }) })] }));
    }
    catch (error) {
        console.error("Error rendering map:", error);
        return (_jsx("div", { className: `flex items-center justify-center rounded-lg border border-gray-700/50 bg-gray-800/50 ${className}`, style: { height }, children: _jsx("p", { className: "text-gray-400", children: "Unable to load map" }) }));
    }
}
//# sourceMappingURL=component.js.map