"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import { Search, Filter, Activity, Users, Star, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function UniversalSearch({ onResultClick }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchType, setSearchType] = useState("all");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    // Mock data - In production, this would come from your API
    const mockData = useMemo(() => [
        {
            id: "1",
            type: "activity",
            title: "Alcúdia Bay Boat Trip",
            description: "Explore the beautiful waters of Alcúdia Bay with snorkeling and beach visits",
            category: "Water Sports",
            status: "active",
            rating: 4.8,
            date: "2024-01-15",
            relevance: 0
        },
        {
            id: "2",
            type: "activity",
            title: "Serra de Tramuntana Hiking",
            description: "Guided hiking tour through UNESCO World Heritage mountain range",
            category: "Land Adventures",
            status: "active",
            rating: 4.6,
            date: "2024-01-12",
            relevance: 0
        },
        {
            id: "3",
            type: "user",
            title: "John Smith",
            description: "Customer from UK, 5 bookings, joined March 2024",
            category: "customer",
            status: "active",
            date: "2024-03-01",
            relevance: 0
        },
        {
            id: "4",
            type: "review",
            title: "Amazing boat experience!",
            description: "Had the most wonderful time on the Alcúdia Bay trip. Highly recommended!",
            rating: 5,
            date: "2024-01-20",
            relevance: 0
        },
        {
            id: "5",
            type: "activity",
            title: "Palma Cathedral Tour",
            description: "Historical guided tour of the magnificent Gothic cathedral",
            category: "Cultural",
            status: "active",
            rating: 4.7,
            date: "2024-01-10",
            relevance: 0
        }
    ], []);
    const calculateRelevance = (item, searchTerm) => {
        if (!searchTerm)
            return 1;
        const term = searchTerm.toLowerCase();
        let score = 0;
        // Title match (highest weight)
        if (item.title.toLowerCase().includes(term)) {
            score += 10;
        }
        // Description match
        if (item.description.toLowerCase().includes(term)) {
            score += 5;
        }
        // Category match
        if (item.category?.toLowerCase().includes(term)) {
            score += 3;
        }
        // Exact word matches
        const titleWords = item.title.toLowerCase().split(" ");
        const termWords = term.split(" ");
        termWords.forEach(termWord => {
            titleWords.forEach(titleWord => {
                if (titleWord === termWord) {
                    score += 8;
                }
                else if (titleWord.startsWith(termWord)) {
                    score += 4;
                }
            });
        });
        return score;
    };
    const performSearch = async (term, type) => {
        if (!term.trim()) {
            setResults([]);
            return;
        }
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300));
        let filteredData = mockData;
        // Filter by type
        if (type !== "all") {
            filteredData = filteredData.filter(item => item.type === type);
        }
        // Calculate relevance and filter
        const searchResults = filteredData
            .map(item => ({
            ...item,
            relevance: calculateRelevance(item, term)
        }))
            .filter(item => item.relevance > 0)
            .sort((a, b) => b.relevance - a.relevance)
            .slice(0, 10); // Limit results
        setResults(searchResults);
        setLoading(false);
    };
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            performSearch(searchTerm, searchType);
        }, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm, searchType]);
    const getTypeIcon = (type) => {
        switch (type) {
            case "activity":
                return _jsx(Activity, { className: "size-4 text-orange-500" });
            case "user":
                return _jsx(Users, { className: "size-4 text-blue-500" });
            case "review":
                return _jsx(Star, { className: "size-4 text-yellow-500" });
            case "booking":
                return _jsx(Calendar, { className: "size-4 text-green-500" });
            default:
                return _jsx(Search, { className: "size-4 text-gray-500" });
        }
    };
    const getTypeColor = (type) => {
        switch (type) {
            case "activity":
                return "border-orange-500 text-orange-400";
            case "user":
                return "border-blue-500 text-blue-400";
            case "review":
                return "border-yellow-500 text-yellow-400";
            case "booking":
                return "border-green-500 text-green-400";
            default:
                return "border-gray-500 text-gray-400";
        }
    };
    const handleResultClick = (result) => {
        setIsOpen(false);
        setSearchTerm("");
        onResultClick?.(result);
    };
    return (_jsxs("div", { className: "relative", children: [_jsxs("div", { className: "flex gap-2", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" }), _jsx(Input, { placeholder: "Search activities, users, reviews...", value: searchTerm, onChange: e => {
                                    setSearchTerm(e.target.value);
                                    setIsOpen(true);
                                }, onFocus: () => setIsOpen(true), className: "border-gray-700 bg-gray-800 pl-10 text-white placeholder:text-gray-400" })] }), _jsxs(Select, { value: searchType, onValueChange: setSearchType, children: [_jsxs(SelectTrigger, { className: "w-32 border-gray-700 bg-gray-800 text-white", children: [_jsx(Filter, { className: "mr-2 size-4" }), _jsx(SelectValue, {})] }), _jsxs(SelectContent, { className: "border-gray-700 bg-gray-800", children: [_jsx(SelectItem, { value: "all", children: "All Types" }), _jsx(SelectItem, { value: "activity", children: "Activities" }), _jsx(SelectItem, { value: "user", children: "Users" }), _jsx(SelectItem, { value: "review", children: "Reviews" }), _jsx(SelectItem, { value: "booking", children: "Bookings" })] })] })] }), isOpen && (searchTerm || results.length > 0) && (_jsx(Card, { className: "absolute top-full z-50 mt-2 w-full border-gray-700 bg-gray-800 shadow-xl", children: _jsxs(CardContent, { className: "p-0", children: [loading && (_jsx("div", { className: "p-4", children: _jsxs("div", { className: "flex items-center space-x-2 text-gray-400", children: [_jsx("div", { className: "size-4 animate-spin rounded-full border-2 border-gray-600 border-t-orange-500" }), _jsx("span", { children: "Searching..." })] }) })), !loading && results.length === 0 && searchTerm && (_jsxs("div", { className: "p-4 text-center text-gray-400", children: ["No results found for \"", searchTerm, "\""] })), !loading && results.length > 0 && (_jsx("div", { className: "max-h-96 overflow-y-auto", children: results.map(result => (_jsxs("button", { onClick: () => handleResultClick(result), className: "flex w-full items-start space-x-3 p-4 text-left transition-colors hover:bg-gray-700", children: [getTypeIcon(result.type), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("span", { className: "font-medium text-white", children: result.title }), _jsx(Badge, { variant: "outline", className: `text-xs ${getTypeColor(result.type)}`, children: result.type }), result.rating && (_jsxs(Badge, { variant: "outline", className: "border-yellow-500 text-xs text-yellow-400", children: [result.rating, "\u2B50"] }))] }), _jsx("p", { className: "mt-1 truncate text-sm text-gray-400", children: result.description }), _jsxs("div", { className: "mt-2 flex items-center space-x-3 text-xs text-gray-500", children: [result.category && _jsx("span", { children: result.category }), result.date && (_jsx("span", { children: new Date(result.date).toLocaleDateString() })), _jsxs("span", { children: ["Relevance: ", result.relevance] })] })] })] }, result.id))) })), !loading && results.length > 0 && (_jsx("div", { className: "border-t border-gray-700 p-3", children: _jsx(Button, { variant: "ghost", size: "sm", onClick: () => setIsOpen(false), className: "w-full text-gray-400 hover:text-white", children: "Close" }) }))] }) })), isOpen && (_jsx("div", { className: "fixed inset-0 z-40", onClick: () => setIsOpen(false) }))] }));
}
//# sourceMappingURL=component.js.map