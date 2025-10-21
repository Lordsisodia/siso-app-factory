"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Search, Filter, Edit, Save, Calendar, User, Type, FileText, ToggleLeft, Hash, Lock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function SettingsManagement({ initialData }) {
    const [settings, setSettings] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState("");
    const filteredSettings = settings.filter(setting => {
        const matchesSearch = setting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            setting.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            setting.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "all" || setting.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    const getTypeIcon = (type) => {
        switch (type) {
            case "text":
                return _jsx(Type, { className: "size-4 text-blue-500" });
            case "number":
                return _jsx(Hash, { className: "size-4 text-green-500" });
            case "boolean":
                return _jsx(ToggleLeft, { className: "size-4 text-purple-500" });
            case "password":
                return _jsx(Lock, { className: "size-4 text-red-500" });
            case "file":
                return _jsx(FileText, { className: "size-4 text-orange-500" });
            default:
                return _jsx(Type, { className: "size-4 text-gray-500" });
        }
    };
    const getCategoryBadge = (category) => {
        const colors = {
            General: "bg-blue-600",
            Notifications: "bg-green-600",
            Bookings: "bg-purple-600",
            Payments: "bg-orange-600",
            Security: "bg-red-600"
        };
        return (_jsx(Badge, { className: `${colors[category] || "bg-gray-600"} text-white`, children: category }));
    };
    const handleEdit = (setting) => {
        setEditingId(setting.id);
        setEditValue(setting.value);
    };
    const handleSave = (settingId) => {
        setSettings(prev => prev.map(setting => setting.id === settingId
            ? {
                ...setting,
                value: editValue,
                lastModified: new Date().toISOString(),
                modifiedBy: "Current User"
            }
            : setting));
        setEditingId(null);
        setEditValue("");
    };
    const handleCancel = () => {
        setEditingId(null);
        setEditValue("");
    };
    const handleBooleanToggle = (settingId, currentValue) => {
        const newValue = currentValue === "true" ? "false" : "true";
        setSettings(prev => prev.map(setting => setting.id === settingId
            ? {
                ...setting,
                value: newValue,
                lastModified: new Date().toISOString(),
                modifiedBy: "Current User"
            }
            : setting));
    };
    const renderValueInput = (setting) => {
        if (editingId === setting.id) {
            switch (setting.type) {
                case "boolean":
                    return (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { checked: editValue === "true", onCheckedChange: checked => setEditValue(checked ? "true" : "false") }), _jsx("span", { className: "text-white", children: editValue === "true" ? "Enabled" : "Disabled" })] }));
                case "password":
                    return (_jsx(Input, { type: "password", value: editValue, onChange: e => setEditValue(e.target.value), className: "border-gray-600 bg-gray-700 text-white", placeholder: "Enter new password" }));
                default:
                    return (_jsx(Input, { type: setting.type === "number" ? "number" : "text", value: editValue, onChange: e => setEditValue(e.target.value), className: "border-gray-600 bg-gray-700 text-white" }));
            }
        }
        // Display mode
        switch (setting.type) {
            case "boolean":
                return (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { checked: setting.value === "true", onCheckedChange: () => handleBooleanToggle(setting.id, setting.value) }), _jsx("span", { className: "text-white", children: setting.value === "true" ? "Enabled" : "Disabled" })] }));
            case "password":
                return (_jsx("span", { className: "font-mono text-gray-400", children: "*".repeat(setting.value.length) }));
            default:
                return _jsx("span", { className: "font-medium text-white", children: setting.value });
        }
    };
    const categories = Array.from(new Set(settings.map(setting => setting.category)));
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-4 sm:flex-row", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" }), _jsx(Input, { placeholder: "Search settings...", value: searchTerm, onChange: e => setSearchTerm(e.target.value), className: "border-gray-700 bg-gray-800 pl-10 text-white" })] }), _jsxs(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [_jsxs(SelectTrigger, { className: "w-48 border-gray-700 bg-gray-800 text-white", children: [_jsx(Filter, { className: "mr-2 size-4" }), _jsx(SelectValue, { placeholder: "Filter by category" })] }), _jsxs(SelectContent, { className: "border-gray-700 bg-gray-800", children: [_jsx(SelectItem, { value: "all", children: "All Categories" }), categories.map(category => (_jsx(SelectItem, { value: category, children: category }, category)))] })] })] }), _jsxs("div", { className: "text-white", children: [_jsx("span", { className: "font-medium", children: filteredSettings.length }), _jsxs("span", { className: "ml-1 text-gray-400", children: ["setting", filteredSettings.length !== 1 ? "s" : "", " found"] })] }), _jsx("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-2", children: filteredSettings.map(setting => (_jsxs(Card, { className: "border-gray-700 bg-gray-800", children: [_jsx(CardHeader, { className: "pb-3", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [getTypeIcon(setting.type), _jsx(CardTitle, { className: "text-white", children: setting.name })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [getCategoryBadge(setting.category), _jsxs("span", { className: "text-xs text-gray-400", children: ["ID: ", setting.id] })] })] }), editingId === setting.id ? (_jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { size: "sm", onClick: () => handleSave(setting.id), className: "bg-green-600 text-white hover:bg-green-700", children: _jsx(Save, { className: "size-3" }) }), _jsx(Button, { size: "sm", variant: "outline", onClick: handleCancel, className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: "Cancel" })] })) : (_jsx(Button, { size: "sm", variant: "outline", onClick: () => handleEdit(setting), className: "border-gray-600 text-gray-300 hover:bg-gray-700", children: _jsx(Edit, { className: "size-3" }) }))] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-sm text-gray-400", children: setting.description }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium text-gray-300", children: "Value:" }), renderValueInput(setting)] }), _jsxs("div", { className: "flex items-center justify-between border-t border-gray-700 pt-2 text-xs text-gray-500", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Calendar, { className: "size-3" }), _jsxs("span", { children: ["Modified: ", formatDate(setting.lastModified)] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(User, { className: "size-3" }), _jsxs("span", { children: ["By: ", setting.modifiedBy] })] })] })] })] }, setting.id))) }), filteredSettings.length === 0 && (_jsxs("div", { className: "py-12 text-center", children: [_jsx(Type, { className: "mx-auto mb-4 size-12 text-gray-600" }), _jsx("h3", { className: "mb-2 text-lg font-medium text-white", children: "No settings found" }), _jsx("p", { className: "text-gray-400", children: searchTerm || categoryFilter !== "all"
                            ? "Try adjusting your search or filters"
                            : "No settings configured yet" })] }))] }));
}
//# sourceMappingURL=component.js.map