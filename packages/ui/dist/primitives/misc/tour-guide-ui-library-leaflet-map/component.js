"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/*
<ai_context>
Leaflet Map component for displaying activity locations across Mallorca.
No API key required - uses free OpenStreetMap data.
Shows colored markers for different activity types with interactive popups.
Much simpler than Google Maps and works immediately.
</ai_context>
*/
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, Star, Clock, Users, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./button";
import { Badge } from "./badge";
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
// Enhanced activity data with more customer-focused information
const activityLocations = [
    {
        id: 1,
        name: "Catamaran Sunset Cruise",
        position: [39.5696, 2.6502], // Palma Bay
        price: 45,
        originalPrice: 55,
        rating: 4.8,
        reviews: 324,
        duration: "3 hours",
        category: "water",
        emoji: "🌊",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop",
        description: "Sail into the sunset with unlimited drinks and stunning coastal views",
        highlights: ["Unlimited drinks", "Professional crew", "Swimming stops"],
        difficulty: "Easy",
        maxGuests: 45,
        popular: true
    },
    {
        id: 2,
        name: "Serra de Tramuntana Hiking",
        position: [39.7817, 2.8186], // Mountains
        price: 35,
        originalPrice: 45,
        rating: 4.9,
        reviews: 189,
        duration: "6 hours",
        category: "land",
        emoji: "🏔️",
        image: "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?q=80&w=400&auto=format&fit=crop",
        description: "UNESCO World Heritage mountain trails with breathtaking panoramic views",
        highlights: ["UNESCO site", "Expert guide", "Photo opportunities"],
        difficulty: "Moderate",
        maxGuests: 12,
        popular: false
    },
    {
        id: 3,
        name: "Palma Cathedral Tour",
        position: [39.5663, 2.6309], // Historic center
        price: 25,
        originalPrice: 30,
        rating: 4.7,
        reviews: 156,
        duration: "2 hours",
        category: "cultural",
        emoji: "🏛️",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop",
        description: "Discover the Gothic masterpiece with skip-the-line access",
        highlights: ["Skip the line", "Audio guide", "Rooftop access"],
        difficulty: "Easy",
        maxGuests: 25,
        popular: true
    },
    {
        id: 4,
        name: "Scuba Diving Adventure",
        position: [39.6954, 3.4707], // Eastern coast
        price: 65,
        originalPrice: 75,
        rating: 4.9,
        reviews: 98,
        duration: "4 hours",
        category: "water",
        emoji: "🌊",
        image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=400&auto=format&fit=crop",
        description: "Explore underwater caves and marine life with certified instructors",
        highlights: ["All equipment", "Certified instructor", "Underwater photos"],
        difficulty: "Intermediate",
        maxGuests: 8,
        popular: false
    },
    {
        id: 5,
        name: "Deia Village Walking Tour",
        position: [39.7442, 2.6486], // Traditional village
        price: 20,
        originalPrice: 25,
        rating: 4.6,
        reviews: 234,
        duration: "3 hours",
        category: "cultural",
        emoji: "🏛️",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop",
        description: "Authentic village experience with local tapas and cultural insights",
        highlights: ["Local guide", "Tapas included", "Art galleries"],
        difficulty: "Easy",
        maxGuests: 15,
        popular: true
    },
    {
        id: 6,
        name: "Beach Kayaking & Snorkeling",
        position: [39.4745, 3.0951], // Coastal waters
        price: 40,
        originalPrice: 50,
        rating: 4.8,
        reviews: 176,
        duration: "4 hours",
        category: "water",
        emoji: "🌊",
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901b50?q=80&w=400&auto=format&fit=crop",
        description: "Paddle through crystal clear waters and discover hidden coves",
        highlights: ["Equipment included", "Hidden beaches", "Snorkel gear"],
        difficulty: "Easy",
        maxGuests: 16,
        popular: false
    }
];
const categoryInfo = {
    water: {
        name: "Water Adventures",
        color: "bg-blue-600",
        lightColor: "bg-blue-50",
        borderColor: "border-blue-200",
        textColor: "text-blue-800",
        description: "Ocean & water-based activities",
        count: activityLocations.filter(a => a.category === "water").length
    },
    land: {
        name: "Mountain & Land",
        color: "bg-green-600",
        lightColor: "bg-green-50",
        borderColor: "border-green-200",
        textColor: "text-green-800",
        description: "Hiking & outdoor adventures",
        count: activityLocations.filter(a => a.category === "land").length
    },
    cultural: {
        name: "Cultural Experiences",
        color: "bg-purple-600",
        lightColor: "bg-purple-50",
        borderColor: "border-purple-200",
        textColor: "text-purple-800",
        description: "History, art & local culture",
        count: activityLocations.filter(a => a.category === "cultural").length
    }
};
// Enhanced Legend Component
function MapLegend({ isVisible, onClose }) {
    const [isExpanded, setIsExpanded] = useState(true);
    if (!isVisible)
        return null;
    return (_jsxs("div", { className: "absolute right-4 top-4 z-20 max-w-xs rounded-xl border border-gray-200 bg-white/95 shadow-lg backdrop-blur-sm", children: [_jsx("div", { className: "border-b border-gray-100 p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-bold text-gray-900", children: "Activity Guide" }), _jsx("p", { className: "text-xs text-gray-600", children: "Activity locations & info" })] }), _jsxs("div", { className: "flex gap-1", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setIsExpanded(!isExpanded), className: "size-6 p-0", children: isExpanded ? (_jsx(ChevronUp, { className: "size-4" })) : (_jsx(ChevronDown, { className: "size-4" })) }), _jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, className: "size-6 p-0 text-gray-500 hover:text-gray-700", children: "\u2715" })] })] }) }), isExpanded && (_jsxs("div", { className: "space-y-4 p-4", children: [_jsx("div", { className: "space-y-3", children: Object.entries(categoryInfo).map(([key, info]) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `size-3 rounded-full ${info.color}` }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold text-gray-900", children: info.name }), _jsx("p", { className: "text-xs text-gray-600", children: info.description })] })] }), _jsx(Badge, { variant: "outline", className: "px-2 py-0.5 text-xs", children: info.count })] }, key))) }), _jsx("div", { className: "space-y-2 border-t border-gray-100 pt-3", children: _jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [_jsxs("div", { className: "rounded-lg bg-orange-50 p-2 text-center", children: [_jsx("p", { className: "font-bold text-orange-600", children: "\u20AC20-65" }), _jsx("p", { className: "text-gray-600", children: "Price range" })] }), _jsxs("div", { className: "rounded-lg bg-green-50 p-2 text-center", children: [_jsx("p", { className: "font-bold text-green-600", children: "2-6h" }), _jsx("p", { className: "text-gray-600", children: "Duration" })] })] }) }), _jsxs("div", { className: "border-t border-gray-100 pt-3", children: [_jsx("p", { className: "mb-2 text-xs font-semibold text-gray-700", children: "Look for:" }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsx("span", { children: "\uD83D\uDD25" }), _jsx("span", { className: "text-gray-600", children: "Most popular activities" })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsx("span", { children: "\u2B50" }), _jsx("span", { className: "text-gray-600", children: "Highest rated experiences" })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsx("span", { children: "\uD83D\uDCB0" }), _jsx("span", { className: "text-gray-600", children: "Special discounted prices" })] })] })] })] }))] }));
}
// Custom marker component
function CustomMarker({ location, onMarkerClick }) {
    return (_jsx(Marker, { position: location.position, eventHandlers: {
            click: onMarkerClick
        }, children: _jsx(Popup, { minWidth: 320, maxWidth: 320, className: "custom-popup", children: _jsxs("div", { className: "-m-3 p-0", children: [_jsxs("div", { className: "relative -mx-3 -mt-3 mb-3 h-32 overflow-hidden rounded-t-lg", children: [_jsx("img", { src: location.image, alt: location.name, className: "size-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" }), _jsxs("div", { className: "absolute left-2 top-2 flex gap-2", children: [location.popular && (_jsx(Badge, { className: "bg-orange-500 px-2 py-1 text-xs text-white", children: "\uD83D\uDD25 Popular" })), _jsx(Badge, { className: `${categoryInfo[location.category].color} px-2 py-1 text-xs text-white`, children: location.emoji })] }), _jsx("div", { className: "absolute right-2 top-2 rounded-lg bg-white/90 px-2 py-1 backdrop-blur-sm", children: _jsxs("div", { className: "flex items-center gap-1", children: [location.originalPrice > location.price && (_jsxs("span", { className: "text-xs text-gray-500 line-through", children: ["\u20AC", location.originalPrice] })), _jsxs("span", { className: "text-sm font-bold text-gray-900", children: ["\u20AC", location.price] })] }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "mb-1 text-sm font-bold text-gray-900", children: location.name }), _jsx("p", { className: "text-xs leading-relaxed text-gray-600", children: location.description })] }), _jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "size-3 fill-yellow-400 text-yellow-400" }), _jsx("span", { className: "font-semibold", children: location.rating }), _jsxs("span", { className: "text-gray-500", children: ["(", location.reviews, ")"] })] }), _jsxs("div", { className: "flex items-center gap-1 text-gray-600", children: [_jsx(Clock, { className: "size-3" }), _jsx("span", { children: location.duration })] })] }), _jsxs("div", { className: "flex items-center gap-1 text-gray-600", children: [_jsx(Users, { className: "size-3" }), _jsxs("span", { children: ["Max ", location.maxGuests] })] })] }), _jsxs("div", { className: "space-y-1", children: [_jsx("p", { className: "text-xs font-semibold text-gray-700", children: "Includes:" }), _jsx("div", { className: "flex flex-wrap gap-1", children: location.highlights.slice(0, 3).map((highlight, idx) => (_jsx("span", { className: "rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700", children: highlight }, idx))) })] }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsxs(Button, { size: "sm", className: "h-8 flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-xs text-white hover:from-orange-600 hover:to-red-600", children: ["Book Now", _jsx(ArrowRight, { className: "ml-1 size-3" })] }), _jsx(Button, { size: "sm", variant: "outline", className: "h-8 border-gray-300 px-3 text-xs", children: "Details" })] })] })] }) }) }));
}
export default function LeafletMap({ height = "500px", className = "", showLegend = true }) {
    const [isClient, setIsClient] = useState(false);
    const [showLegendPanel, setShowLegendPanel] = useState(false);
    const [mapError, setMapError] = useState(false);
    useEffect(() => {
        setIsClient(true);
        // Ensure Leaflet icon fix for dynamic imports
        if (typeof window !== "undefined") {
            const L = require("leaflet");
            // Fix for default markers
            L.Icon.Default.mergeOptions({
                iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
                iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png"
            });
        }
    }, []);
    const handleMarkerClick = () => {
        if (showLegend) {
            setShowLegendPanel(true);
        }
    };
    const handleCloseLegend = () => {
        setShowLegendPanel(false);
    };
    if (!isClient) {
        return (_jsx("div", { className: `flex items-center justify-center rounded-lg bg-gray-100 ${className}`, style: { height }, children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "mx-auto mb-2 size-8 animate-spin rounded-full border-b-2 border-orange-500" }), _jsx("p", { className: "text-sm text-gray-600", children: "Loading interactive map..." })] }) }));
    }
    if (mapError) {
        return (_jsx("div", { className: `flex items-center justify-center rounded-lg border border-gray-200 bg-gray-100 ${className}`, style: { height }, children: _jsxs("div", { className: "p-4 text-center", children: [_jsx(MapPin, { className: "mx-auto mb-2 size-8 text-gray-400" }), _jsx("p", { className: "text-sm text-gray-600", children: "Map temporarily unavailable" }), _jsx("button", { onClick: () => setMapError(false), className: "mt-2 text-xs text-blue-600 hover:text-blue-800", children: "Try again" })] }) }));
    }
    try {
        return (_jsxs("div", { className: `relative overflow-hidden rounded-lg border border-gray-200 shadow-lg ${className}`, style: { height }, children: [_jsxs(MapContainer, { center: [39.6953, 2.9712], zoom: 10, style: { height: "100%", width: "100%" }, className: "leaflet-container", scrollWheelZoom: true, zoomControl: true, whenReady: () => {
                        // Ensure map is properly initialized
                        setTimeout(() => {
                            // Map will be invalidated automatically by react-leaflet
                        }, 100);
                    }, children: [_jsx(TileLayer, { attribution: '\u00A9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", maxZoom: 19, minZoom: 8 }), activityLocations.map(location => (_jsx(CustomMarker, { location: location, onMarkerClick: handleMarkerClick }, location.id)))] }), showLegend && (_jsx(MapLegend, { isVisible: showLegendPanel, onClose: handleCloseLegend })), !showLegendPanel && (_jsx("div", { className: "absolute bottom-4 left-4 z-10 rounded-lg bg-white/90 px-3 py-2 shadow-md backdrop-blur-sm", children: _jsx("p", { className: "text-xs text-gray-700", children: "\uD83D\uDCA1 Click any marker to see activity guide" }) })), _jsx("style", { jsx: true, global: true, children: `
          .leaflet-container {
            font-family: inherit;
            background: #f8fafc;
          }
          .leaflet-tile-pane {
            filter: contrast(1.1) saturate(1.1);
          }
          .leaflet-popup-content-wrapper {
            border-radius: 12px !important;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
          }
          .leaflet-popup-content {
            margin: 0 !important;
            line-height: 1.4 !important;
          }
          .leaflet-popup-tip {
            background: white !important;
          }
          .leaflet-control-zoom {
            border: none !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
          }
          .leaflet-control-zoom a {
            background-color: white !important;
            border: 1px solid #e5e7eb !important;
            color: #374151 !important;
          }
          .leaflet-control-zoom a:hover {
            background-color: #f9fafb !important;
          }
          .leaflet-tile {
            border-radius: 4px;
          }
        ` })] }));
    }
    catch (error) {
        console.error("Map render error:", error);
        setMapError(true);
        return null;
    }
}
//# sourceMappingURL=component.js.map